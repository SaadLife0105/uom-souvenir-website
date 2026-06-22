import { pgTable, text, integer, boolean, varchar } from 'drizzle-orm/pg-core';

export const productDetails = pgTable('productDetails', {
  id: varchar('id', { length: 7 }).primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
  category: varchar('category', { length: 50 }).notNull(),
  colors: text('colors'), 
  price: integer('price'),
  stock: integer('stock').notNull().default(0),
  isDisplayItem: boolean('is_display_item').default(false),
});