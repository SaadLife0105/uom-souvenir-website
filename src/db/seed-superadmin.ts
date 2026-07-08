import 'dotenv/config';
import { eq } from 'drizzle-orm';
import { db } from './index';
import { users } from './schema';
import { auth } from '@/lib/auth';

async function main() {
  const email = process.env.SUPERADMIN_EMAIL;
  const password = process.env.SUPERADMIN_PASSWORD;

  if (!email || !password) {
    throw new Error('SUPERADMIN_EMAIL and SUPERADMIN_PASSWORD must be set in .env');
  }

  // Guard: never create a second superadmin.
  const [existing] = await db.select().from(users).where(eq(users.role, 'superadmin'));
  if (existing) {
    console.log(`Superadmin already exists (${existing.email}). Skipping.`);
    process.exit(0);
  }

  const result = await auth.api.createUser({
    body: {
      email,
      password,
      name: 'Super Admin',
      role: 'superadmin',
    },
  });

  console.log('✅ Superadmin created:', result.user.email);
  process.exit(0);
}

main().catch((err) => {
  console.error('❌ Failed to create superadmin:', err);
  process.exit(1);
});