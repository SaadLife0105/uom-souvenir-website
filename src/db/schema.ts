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
  index,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// ---------------------------------------------------------------------------
// Enums
// ---------------------------------------------------------------------------

export const reservationStatusEnum = pgEnum('reservation_status', [
  'pending',
  'confirmed',
  'collected',
  'cancelled',
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
// Users
// ---------------------------------------------------------------------------

export const users = pgTable('users', {
  id:            text('id').primaryKey(),
  email:         text('email').notNull().unique(),
  name:          text('name').notNull(),
  emailVerified: boolean('email_verified').notNull().default(false),
  image:         text('image'),
  role:          text('role').notNull().default('user'),
  banned:        boolean('banned').default(false),
  banReason:     text('ban_reason'),
  banExpires:    timestamp('ban_expires'),
  affiliation:   text('affiliation').notNull().default('none'),
  ...timestamps,
});

// ---------------------------------------------------------------------------
// Auth (better-auth managed)
// ---------------------------------------------------------------------------

export const sessions = pgTable(
  "sessions",
  {
    id: text("id").primaryKey(),
    expiresAt: timestamp("expires_at").notNull(),
    token: text("token").notNull().unique(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    impersonatedBy: text("impersonated_by"),
  },
  (table) => [index("sessions_userId_idx").on(table.userId)],
);

export const accounts = pgTable(
  "accounts",
  {
    id: text("id").primaryKey(),
    accountId: text("account_id").notNull(),
    providerId: text("provider_id").notNull(),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    accessToken: text("access_token"),
    refreshToken: text("refresh_token"),
    idToken: text("id_token"),
    accessTokenExpiresAt: timestamp("access_token_expires_at"),
    refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
    scope: text("scope"),
    password: text("password"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [index("accounts_userId_idx").on(table.userId)],
);

export const verifications = pgTable(
  "verifications",
  {
    id: text("id").primaryKey(),
    identifier: text("identifier").notNull(),
    value: text("value").notNull(),
    expiresAt: timestamp("expires_at").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [index("verifications_identifier_idx").on(table.identifier)],
);

export const usersRelations = relations(users, ({ many }) => ({
  sessionss: many(sessions),
  accountss: many(accounts),
}));

export const sessionsRelations = relations(sessions, ({ one }) => ({
  users: one(users, {
    fields: [sessions.userId],
    references: [users.id],
  }),
}));

export const accountsRelations = relations(accounts, ({ one }) => ({
  users: one(users, {
    fields: [accounts.userId],
    references: [users.id],
  }),
}));

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
  userId:            text('user_id').notNull().references(() => users.id),
  // Snapshot of the buyer's affiliation at reservation time — never re-read from users table
  affiliation:       text('affiliation').notNull(),
  receiptNumber:     varchar('receipt_number', { length: 50 }).notNull().unique(),
  // Customer-entered at checkout (e.g. bank transfer reference). Optional —
  // not all payment methods produce one.
  paymentReferenceNumber: text('payment_reference_number'),
  status:            reservationStatusEnum('status').notNull().default('pending'),
  // ponytail: stored in cents — matches priceCents on products
  totalAmountCents:  integer('total_amount_cents').notNull(),
  reservedAt:        timestamp('reserved_at').notNull().defaultNow(),
  expiresAt:         timestamp('expires_at').notNull(),
  collectedAt:       timestamp('collected_at'),
  // SET NULL so the reservation row survives if the staff account is deleted
  collectedBy:       text('collected_by').references(() => users.id, { onDelete: 'set null' }),
  notes:             text('notes'),
});

export const reservationItems = pgTable('reservation_items', {
  id:              uuid('id').primaryKey().defaultRandom(),
  reservationId:   uuid('reservation_id').notNull().references(() => reservations.id, { onDelete: 'cascade' }),
  productId:       uuid('product_id').notNull().references(() => products.id),
  quantity:        integer('quantity').notNull(),
  // Locked at purchase time — never recalculated from products.priceCents
  unitPriceCents:  integer('unit_price_cents').notNull(),
  // ponytail: snapshot of the line's display string at purchase time — same
  // locked-at-purchase pattern as unitPriceCents above; never recomputed from
  // the live product/color. Size is folded into this text, not a separate column.
  itemLabel:       text('item_label').notNull(),
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
  adminId:    text('admin_id').references(() => users.id, { onDelete: 'set null' }),
  action:     varchar('action', { length: 100 }).notNull(), // e.g. 'product.update', 'reservation.cancel'
  targetType: varchar('target_type', { length: 50 }).notNull(), // e.g. 'product', 'reservation'
  targetId:   uuid('target_id').notNull(), // no FK — logs must survive target deletion
  diff:       text('diff'), // JSON blob — before/after, nullable for actions with no diff
  createdAt:  timestamp('created_at').notNull().defaultNow(),
});

// ---------------------------------------------------------------------------
// Inferred types
// ---------------------------------------------------------------------------

export type User               = typeof users.$inferSelect;
export type NewUser            = typeof users.$inferInsert;
export type Session            = typeof sessions.$inferSelect;
export type Account            = typeof accounts.$inferSelect;
export type Verification       = typeof verifications.$inferSelect;
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
