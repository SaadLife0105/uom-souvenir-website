'use server';

import { headers } from 'next/headers';
import { auth } from '@/lib/auth';
import { createReservation, type CartLineInput, type CreateReservationResult } from '@/db/mutations';

export interface SubmitReservationInput {
  items: CartLineInput[];
  paymentReferenceNumber?: string;
}

// Thin wrapper: hands the cart contents to createReservation() (where all the
// Drizzle/transaction logic lives) and returns its structured result unchanged.
// The client redirects + clears the cart on success — not done here.
export async function submitReservation(
  input: SubmitReservationInput,
): Promise<CreateReservationResult> {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return { ok: false, error: 'You must be signed in to reserve items.' };
  }

  const items = (input.items ?? []).map((line) => ({
    id: line.id,
    selectedColor: line.selectedColor,
    selectedSize: line.selectedSize,
    selectedQuantity: line.selectedQuantity,
  }));

  return createReservation(items, session.user.id, input.paymentReferenceNumber);
}
