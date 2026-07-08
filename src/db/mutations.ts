import { eq, inArray } from 'drizzle-orm';
import { txDb } from './tx';
import {
  products,
  productColors,
  users,
  reservations,
  reservationItems,
  sessions,
  accounts,
} from './schema';

// Must match the seeded guest in src/db/seed.ts. We look the guest up by email
// (queried below) rather than hardcoding its UUID, so a re-seed can't desync it.
const GUEST_EMAIL = 'guest@uom-souvenir.local';
const RESERVATION_TTL_MS = 14 * 24 * 60 * 60 * 1000; // 14 days

export interface CartLineInput {
  id: string; // product id
  selectedColor?: string;
  selectedSize?: string;
  selectedQuantity: number;
}

export type CreateReservationResult =
  | { ok: true; reservationId: string }
  | {
      ok: false;
      error: string;
      insufficientItems?: { productId: string; name: string; available: number; requested: number }[];
    };

export async function createReservation(
  items: CartLineInput[],
  paymentReferenceNumber?: string | null,
): Promise<CreateReservationResult> {
  if (items.length === 0) return { ok: false, error: 'Your cart is empty.' };

  try {
    return await txDb.transaction(async (tx) => {
      // 1. Resolve the guest identity by email (never trust a client-supplied user).
      const [guest] = await tx.select().from(users).where(eq(users.email, GUEST_EMAIL));
      if (!guest) throw new Error('Guest user not found — seed the guest record.');

      // 2. Load + LOCK every involved product row (FOR UPDATE) so a concurrent
      //    checkout can't oversell between our read and our stock decrement.
      const productIds = [...new Set(items.map((i) => i.id))];
      const productRows = await tx
        .select()
        .from(products)
        .where(inArray(products.id, productIds))
        .for('update');
      const productMap = new Map(productRows.map((p) => [p.id, p]));

      // Colors for all involved products, keyed by "productId::name".
      const colorRows = await tx
        .select()
        .from(productColors)
        .where(inArray(productColors.productId, productIds));
      const colorMap = new Map(colorRows.map((c) => [`${c.productId}::${c.name}`, c]));

      // 3. Aggregate requested qty PER PRODUCT (stock is tracked per product, not
      //    per color/size) so two cart lines of the same product can't each pass
      //    validation independently and then oversell.
      const qtyByProduct = new Map<string, number>();
      for (const line of items) {
        qtyByProduct.set(line.id, (qtyByProduct.get(line.id) ?? 0) + line.selectedQuantity);
      }

      const insufficient: NonNullable<
        Extract<CreateReservationResult, { ok: false }>['insufficientItems']
      > = [];
      for (const [pid, qty] of qtyByProduct) {
        const p = productMap.get(pid);
        if (!p) throw new Error(`Product not found: ${pid}`);
        if (!p.isActive) throw new Error(`Product no longer available: ${p.name}`);
        if (qty > p.stock) {
          insufficient.push({ productId: pid, name: p.name, available: p.stock, requested: qty });
        }
      }
      // Only reads/locks so far — safe to return without an explicit rollback.
      if (insufficient.length > 0) {
        return {
          ok: false,
          error: 'Insufficient stock for one or more items.',
          insufficientItems: insufficient,
        };
      }

      // 4. Build reservation rows. One reservationItems row per cart line.
      const now = new Date();
      const reservationId = crypto.randomUUID(); // used as BOTH id and receiptNumber

      let totalAmountCents = 0;
      const itemValues = items.map((line) => {
        const p = productMap.get(line.id)!;
        const unitPriceCents = p.priceCents; // snapshot from the live product
        const unitTotalCents = unitPriceCents * line.selectedQuantity;
        totalAmountCents += unitTotalCents;

        const color = line.selectedColor
          ? colorMap.get(`${line.id}::${line.selectedColor}`)
          : undefined;

        // "{name} — {color}{, Size X}"  e.g. "UOM Shirt — Navy, Size M" / "UOM Mug — Navy"
        const segs: string[] = [];
        if (color?.name) segs.push(color.name);
        if (line.selectedSize) segs.push(`Size ${line.selectedSize}`);
        const itemLabel = segs.length ? `${p.name} — ${segs.join(', ')}` : p.name;

        return {
          reservationId,
          productId: p.id,
          quantity: line.selectedQuantity,
          unitPriceCents,
          unitTotalCents,
          itemLabel,
          selectedColorId: color?.id ?? null,
        };
      });

      // 5. Insert reservation (id === receiptNumber), then its items.
      await tx.insert(reservations).values({
        id: reservationId,
        receiptNumber: reservationId,
        userId: guest.id,
        affiliation: guest.affiliation,
        paymentReferenceNumber: paymentReferenceNumber?.trim() || null,
        status: 'pending',
        totalAmountCents,
        reservedAt: now,
        expiresAt: new Date(now.getTime() + RESERVATION_TTL_MS),
      });
      await tx.insert(reservationItems).values(itemValues);

      // 6. Decrement stock ONCE per product by the aggregated qty (rows are locked).
      for (const [pid, qty] of qtyByProduct) {
        const p = productMap.get(pid)!;
        await tx.update(products).set({ stock: p.stock - qty }).where(eq(products.id, pid));
      }

      return { ok: true, reservationId };
    });
  } catch (err) {
    console.error('createReservation failed:', err);
    return { ok: false, error: 'Could not create reservation. Please try again.' };
  }
}

export type DeleteUserResult =
  | { ok: true; mode: 'anonymized' | 'deleted' }
  | { ok: false; error: string };

// Admin-initiated user deletion. NOT the same as better-auth's admin.removeUser
// endpoint — that hard-deletes unconditionally with no hook, which would break
// our reservations FK and destroy sales history. This function is the one and
// only path admin/superadmin actions should call to remove a user.
//
// Rules:
//   - superadmin can never be deleted (by anyone, including itself)
//   - admin accounts can only be deleted by superadmin
//   - regular users can be deleted by either admin role
//   - if the target has any reservations, we ANONYMIZE (preserve receipt/sales
//     history) instead of hard-deleting
//   - either way, their sessions/accounts are removed so they're logged out
//     and can't sign back in
export async function deleteUserByAdmin(
  targetUserId: string,
  actingUserRole: 'user' | 'admin' | 'superadmin',
): Promise<DeleteUserResult> {
  return await txDb.transaction(async (tx) => {
    const [target] = await tx.select().from(users).where(eq(users.id, targetUserId));
    if (!target) return { ok: false, error: 'User not found.' };

    if (target.role === 'superadmin') {
      return { ok: false, error: 'The superadmin account cannot be deleted.' };
    }
    if (target.role === 'admin' && actingUserRole !== 'superadmin') {
      return { ok: false, error: 'Only the superadmin can delete an admin account.' };
    }

    // Does this user have any reservations? If so, anonymize instead of
    // hard-deleting, to preserve sales/receipt history.
    const [existingReservation] = await tx
      .select({ id: reservations.id })
      .from(reservations)
      .where(eq(reservations.userId, targetUserId))
      .limit(1);

    // Either way: kill active sessions/credentials so they can't log back in.
    await tx.delete(sessions).where(eq(sessions.userId, targetUserId));
    await tx.delete(accounts).where(eq(accounts.userId, targetUserId));

    if (existingReservation) {
      await tx
        .update(users)
        .set({
          name: 'Deleted User',
          email: `deleted-${targetUserId}@uom-souvenir.local`,
          affiliation: 'none',
        })
        .where(eq(users.id, targetUserId));
      return { ok: true, mode: 'anonymized' };
    }

    await tx.delete(users).where(eq(users.id, targetUserId));
    return { ok: true, mode: 'deleted' };
  });
}
