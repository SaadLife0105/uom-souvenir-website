import {
  pgTable,
  pgEnum,
  text,
  integer,
  boolean,
  varchar,
  uuid,
  timestamp,
  unique,
} from 'drizzle-orm/pg-core';

// ---------------------------------------------------------------------------
// Enums
// ---------------------------------------------------------------------------

export const reservationStatusEnum = pgEnum('reservation_status', [
  'pending',
  'confirmed',
  'collected',
  'cancelled',
]);

export const affiliationTypeEnum = pgEnum('affiliation_type', [
  'student',
  'staff',
  'alumni',
  'external',
]);

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

// ponytail: reusable timestamp columns — avoids repeating the pattern 8 times
const timestamps = {
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow().$onUpdate(() => new Date()),
};

// ---------------------------------------------------------------------------
// Access control
// ---------------------------------------------------------------------------

export const roles = pgTable('roles', {
  id:   uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 50 }).notNull().unique(),
});

// ---------------------------------------------------------------------------
// Users & affiliations
// ---------------------------------------------------------------------------

export const users = pgTable('users', {
  id:           uuid('id').primaryKey().defaultRandom(),
  email:        text('email').notNull().unique(),
  name:         text('name').notNull(),
  passwordHash: text('password_hash').notNull(),
  roleId:       uuid('role_id').notNull().references(() => roles.id),
  ...timestamps,
});

export const affiliations = pgTable('affiliations', {
  id:   uuid('id').primaryKey().defaultRandom(),
  code: varchar('code', { length: 50 }).notNull().unique(),
  name: text('name').notNull(),
  type: affiliationTypeEnum('type').notNull(),
});

export const userAffiliations = pgTable('user_affiliations', {
  id:            uuid('id').primaryKey().defaultRandom(),
  userId:        uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  affiliationId: uuid('affiliation_id').notNull().references(() => affiliations.id),
  isPrimary:     boolean('is_primary').notNull().default(false),
  ...timestamps,
});

// ---------------------------------------------------------------------------
// Products & catalog
// ---------------------------------------------------------------------------

export const productCategories = pgTable('product_categories', {
  id:          uuid('id').primaryKey().defaultRandom(),
  name:        varchar('name', { length: 100 }).notNull().unique(),
  description: text('description'),
  isActive:    boolean('is_active').notNull().default(true),
});

export const products = pgTable('products', {
  id:            uuid('id').primaryKey().defaultRandom(),
  sku:           varchar('sku', { length: 100 }).notNull().unique(),
  name:          text('name').notNull(),
  description:   text('description'),
  categoryId:    uuid('category_id').notNull().references(() => productCategories.id),
  // ponytail: stored in cents (e.g. 1000 = MUR 10.00) — never whole currency units
  priceCents:    integer('price_cents').notNull(),
  stock:         integer('stock').notNull().default(0),
  isDisplayItem: boolean('is_display_item').notNull().default(false),
  isActive:      boolean('is_active').notNull().default(true),
  ...timestamps,
});

export const productImages = pgTable('product_images', {
  id:        uuid('id').primaryKey().defaultRandom(),
  productId: uuid('product_id').notNull().references(() => products.id, { onDelete: 'cascade' }),
  url:       text('url').notNull(),
  isPrimary: boolean('is_primary').notNull().default(false),
  sortOrder: integer('sort_order').notNull().default(0),
});

export const productColors = pgTable('product_colors', {
  id:        uuid('id').primaryKey().defaultRandom(),
  productId: uuid('product_id').notNull().references(() => products.id, { onDelete: 'cascade' }),
  name:      varchar('name', { length: 50 }).notNull(),
  hexCode:   varchar('hex_code', { length: 7 }).notNull(),
  isActive:  boolean('is_active').notNull().default(true),
}, (t) => [
  unique().on(t.productId, t.name),
]);

// ---------------------------------------------------------------------------
// Reservations
// ---------------------------------------------------------------------------

export const reservations = pgTable('reservations', {
  id:                uuid('id').primaryKey().defaultRandom(),
  userId:            uuid('user_id').notNull().references(() => users.id),
  // Snapshot of which affiliation the buyer held at checkout time
  userAffiliationId: uuid('user_affiliation_id').notNull().references(() => userAffiliations.id),
  receiptNumber:     varchar('receipt_number', { length: 50 }).notNull().unique(),
  status:            reservationStatusEnum('status').notNull().default('pending'),
  // ponytail: stored in cents — matches priceCents on products
  totalAmountCents:  integer('total_amount_cents').notNull(),
  reservedAt:        timestamp('reserved_at').notNull().defaultNow(),
  expiresAt:         timestamp('expires_at').notNull(),
  collectedAt:       timestamp('collected_at'),
  // SET NULL so the reservation row survives if the staff account is deleted
  collectedBy:       uuid('collected_by').references(() => users.id, { onDelete: 'set null' }),
  notes:             text('notes'),
});

export const reservationItems = pgTable('reservation_items', {
  id:              uuid('id').primaryKey().defaultRandom(),
  reservationId:   uuid('reservation_id').notNull().references(() => reservations.id, { onDelete: 'cascade' }),
  productId:       uuid('product_id').notNull().references(() => products.id),
  quantity:        integer('quantity').notNull(),
  // Locked at purchase time — never recalculated from products.priceCents
  unitPriceCents:  integer('unit_price_cents').notNull(),
  // Nullable: only set when the product has color variants
  selectedColorId: uuid('selected_color_id').references(() => productColors.id, { onDelete: 'set null' }),
  unitTotalCents:  integer('unit_total_cents').notNull(),
});

// ---------------------------------------------------------------------------
// Audit log
// ---------------------------------------------------------------------------

export const auditLogs = pgTable('audit_logs', {
  id:         uuid('id').primaryKey().defaultRandom(),
  // SET NULL so logs survive if an admin account is deleted
  adminId:    uuid('admin_id').references(() => users.id, { onDelete: 'set null' }),
  action:     varchar('action', { length: 100 }).notNull(), // e.g. 'product.update', 'reservation.cancel'
  targetType: varchar('target_type', { length: 50 }).notNull(), // e.g. 'product', 'reservation'
  targetId:   uuid('target_id').notNull(), // no FK — logs must survive target deletion
  diff:       text('diff'), // JSON blob — before/after, nullable for actions with no diff
  createdAt:  timestamp('created_at').notNull().defaultNow(),
});

// ---------------------------------------------------------------------------
// Inferred types
// ---------------------------------------------------------------------------

export type Role               = typeof roles.$inferSelect;
export type User               = typeof users.$inferSelect;
export type NewUser            = typeof users.$inferInsert;
export type Affiliation        = typeof affiliations.$inferSelect;
export type UserAffiliation    = typeof userAffiliations.$inferSelect;
export type Product            = typeof products.$inferSelect;
export type NewProduct         = typeof products.$inferInsert;
export type ProductCategory    = typeof productCategories.$inferSelect;
export type ProductImage       = typeof productImages.$inferSelect;
export type ProductColor       = typeof productColors.$inferSelect;
export type Reservation        = typeof reservations.$inferSelect;
export type NewReservation     = typeof reservations.$inferInsert;
export type ReservationItem    = typeof reservationItems.$inferSelect;
export type NewReservationItem = typeof reservationItems.$inferInsert;
export type AuditLog           = typeof auditLogs.$inferSelect;
export type NewAuditLog        = typeof auditLogs.$inferInsert;
