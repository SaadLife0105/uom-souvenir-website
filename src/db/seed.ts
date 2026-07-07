import 'dotenv/config';
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });

async function main() {
  console.log('🌱 Seeding...');

  // ---------------------------------------------------------------------------
  // Categories
  // ---------------------------------------------------------------------------
  const [drinkware, apparel, stationery] = await db
    .insert(schema.productCategories)
    .values([
      { name: 'Drinkware',   description: 'Mugs, bottles and cups' },
      { name: 'Apparel',     description: 'Clothing and wearables' },
      { name: 'Stationery',  description: 'Pens, notebooks and desk items' },
    ])
    .returning();

  console.log('✓ Categories');

  // ---------------------------------------------------------------------------
  // Products
  // ---------------------------------------------------------------------------
  const [mug, shirt, pen] = await db
    .insert(schema.products)
    .values([
      {
        sku:           'UOM-MUG-001',
        name:          'UOM Souvenir Mug',
        description:   'Ceramic mug featuring the University of Mauritius crest. Microwave and dishwasher safe.',
        categoryId:    drinkware.id,
        priceCents:    50000, // MUR 500.00
        stock:         50,
        isDisplayItem: false,
        isActive:      true,
      },
      {
        sku:           'UOM-SHT-001',
        name:          'UOM Souvenir Shirt',
        description:   'Classic cotton t-shirt with embroidered University of Mauritius logo on the chest.',
        categoryId:    apparel.id,
        priceCents:    80000, // MUR 800.00
        stock:         30,
        isDisplayItem: false,
        isActive:      true,
      },
      {
        sku:           'UOM-PEN-001',
        name:          'UOM Souvenir Pen',
        description:   'Ballpoint pen engraved with the University of Mauritius name. Smooth ink, metal clip.',
        categoryId:    stationery.id,
        priceCents:    10000, // MUR 100.00
        stock:         200,
        isDisplayItem: false,
        isActive:      true,
      },
    ])
    .returning();

  console.log('✓ Products');

  // ---------------------------------------------------------------------------
  // Colors
  // ---------------------------------------------------------------------------
  await db.insert(schema.productColors).values([
    // Mug
    { productId: mug.id,   name: 'White', hexCode: '#FFFFFF', isActive: true },
    { productId: mug.id,   name: 'Black', hexCode: '#1A1A1A', isActive: true },
    // Shirt
    { productId: shirt.id, name: 'White', hexCode: '#FFFFFF', isActive: true },
    { productId: shirt.id, name: 'Black', hexCode: '#1A1A1A', isActive: true },
    { productId: shirt.id, name: 'Navy',  hexCode: '#1B2A4A', isActive: true },
    // Pen
    { productId: pen.id,   name: 'Blue',  hexCode: '#1D4ED8', isActive: true },
  ]);

  console.log('✓ Colors');

  // ---------------------------------------------------------------------------
  // Images (placeholder — swap for real URLs later)
  // ---------------------------------------------------------------------------
  await db.insert(schema.productImages).values([
    // Mug — 2 images
    { productId: mug.id,   url: 'https://placehold.co/600x600/e6f1fb/0c447c?text=UOM+Mug',       isPrimary: true,  sortOrder: 0 },
    { productId: mug.id,   url: 'https://placehold.co/600x600/1a1a1a/ffffff?text=UOM+Mug+Black', isPrimary: false, sortOrder: 1 },
    // Shirt — 2 images
    { productId: shirt.id, url: 'https://placehold.co/600x600/e6f1fb/0c447c?text=UOM+Shirt',      isPrimary: true,  sortOrder: 0 },
    { productId: shirt.id, url: 'https://placehold.co/600x600/1b2a4a/ffffff?text=UOM+Shirt+Navy', isPrimary: false, sortOrder: 1 },
    // Pen — 1 image
    { productId: pen.id,   url: 'https://placehold.co/600x600/e6f1fb/0c447c?text=UOM+Pen',        isPrimary: true,  sortOrder: 0 },
  ]);

  console.log('✓ Images');

  // ---------------------------------------------------------------------------
  // Guest user (temporary)
  // ---------------------------------------------------------------------------
  // ponytail: placeholder identity for reservations until real login lands
  // (Step 6 of our plan). reservations.userId is NOT NULL and there's no
  // session-based auth wired up yet, so every reservation references this
  // fixed guest record. Kept greppable via the 'guest@uom-souvenir.local'
  // email — swap out for real session users once login exists.
  await db.insert(schema.users).values({
    id:          crypto.randomUUID(),
    email:       'guest@uom-souvenir.local',
    name:        'Guest',
    role:        'user',
    affiliation: 'none',
  });

  console.log('✓ Guest user');
  console.log('✅ Seed complete');
  process.exit(0);
}

main().catch((err) => {
  console.error('❌ Seed failed:', err);
  process.exit(1);
});
