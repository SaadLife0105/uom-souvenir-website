import { eq, inArray } from 'drizzle-orm';
import { db } from './index';
import {
  products,
  productCategories,
  productColors,
  productImages,
  reservations,
  reservationItems,
  reservationStatusEnum,
} from './schema';

export interface ShopProductData {
  id: string;
  name: string;
  description: string | null;
  category: string;
  priceCents: number;
  stock: number;
  isDisplayItem: boolean;
  imageUrl: string | null;
  images: string[];
  colors: { name: string; hexCode: string }[];
  createdAt: Date;
}

async function attachVariants(rows: (typeof products.$inferSelect & { category: string })[]): Promise<ShopProductData[]> {
  if (rows.length === 0) return [];

  const productIds = rows.map((row) => row.id);

  const [colors, images] = await Promise.all([
    db.select().from(productColors).where(inArray(productColors.productId, productIds)),
    db.select().from(productImages).where(inArray(productImages.productId, productIds)),
  ]);

  return rows.map((row) => {
    const sortedImages = images
      .filter((image) => image.productId === row.id)
      .sort((a, b) => (b.isPrimary ? 1 : 0) - (a.isPrimary ? 1 : 0) || a.sortOrder - b.sortOrder)
      .map((image) => image.url);

    return {
      id: row.id,
      name: row.name,
      description: row.description,
      category: row.category,
      priceCents: row.priceCents,
      stock: row.stock,
      isDisplayItem: row.isDisplayItem,
      imageUrl: sortedImages[0] ?? null,
      images: sortedImages,
      colors: colors
        .filter((color) => color.productId === row.id && color.isActive)
        .map((color) => ({ name: color.name, hexCode: color.hexCode })),
      createdAt: row.createdAt,
    };
  });
}

export async function getShopProducts(): Promise<ShopProductData[]> {
  const rows = await db
    .select({
      id: products.id,
      sku: products.sku,
      name: products.name,
      description: products.description,
      categoryId: products.categoryId,
      priceCents: products.priceCents,
      stock: products.stock,
      isDisplayItem: products.isDisplayItem,
      isActive: products.isActive,
      createdAt: products.createdAt,
      updatedAt: products.updatedAt,
      category: productCategories.name,
    })
    .from(products)
    .innerJoin(productCategories, eq(products.categoryId, productCategories.id))
    .where(eq(products.isActive, true));

  return attachVariants(rows);
}

export async function getProductById(id: string): Promise<ShopProductData | null> {
  const rows = await db
    .select({
      id: products.id,
      sku: products.sku,
      name: products.name,
      description: products.description,
      categoryId: products.categoryId,
      priceCents: products.priceCents,
      stock: products.stock,
      isDisplayItem: products.isDisplayItem,
      isActive: products.isActive,
      createdAt: products.createdAt,
      updatedAt: products.updatedAt,
      category: productCategories.name,
    })
    .from(products)
    .innerJoin(productCategories, eq(products.categoryId, productCategories.id))
    .where(eq(products.id, id));

  const [result] = await attachVariants(rows);
  return result ?? null;
}

// ---------------------------------------------------------------------------
// Reservations
// ---------------------------------------------------------------------------

export interface ReservationItemData {
  id: string;
  quantity: number;
  unitPriceCents: number;
  // Purchase-time snapshot string — color/size already folded in (see
  // reservationItems.itemLabel in schema.ts), so no productColors join needed.
  itemLabel: string;
  unitTotalCents: number;
}

export interface ReservationData {
  id: string;
  // Not surfaced as visible UI text (a deliberate project decision) — used only
  // for the download-as-image filename.
  receiptNumber: string;
  status: (typeof reservationStatusEnum.enumValues)[number];
  paymentReferenceNumber: string | null;
  totalAmountCents: number;
  reservedAt: Date;
  expiresAt: Date;
  items: ReservationItemData[];
}

export async function getReservationById(id: string): Promise<ReservationData | null> {
  const [reservation] = await db.select().from(reservations).where(eq(reservations.id, id));
  if (!reservation) return null;

  const items = await db
    .select()
    .from(reservationItems)
    .where(eq(reservationItems.reservationId, id));

  return {
    id: reservation.id,
    receiptNumber: reservation.receiptNumber,
    status: reservation.status,
    paymentReferenceNumber: reservation.paymentReferenceNumber,
    totalAmountCents: reservation.totalAmountCents,
    reservedAt: reservation.reservedAt,
    expiresAt: reservation.expiresAt,
    items: items.map((item) => ({
      id: item.id,
      quantity: item.quantity,
      unitPriceCents: item.unitPriceCents,
      itemLabel: item.itemLabel,
      unitTotalCents: item.unitTotalCents,
    })),
  };
}
