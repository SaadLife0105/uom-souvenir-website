import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { Pool } from 'pg';

async function main() {
  const pool = new Pool({ connectionString: process.env.DIRECT_URL });
  const db = drizzle(pool);

  console.log('Applying migrations...');
  await migrate(db, { migrationsFolder: './drizzle' });
  console.log('✅ Migrations applied successfully.');

  await pool.end();
  process.exit(0);
}

main().catch((err) => {
  console.error('❌ Migration failed:', err);
  process.exit(1);
});