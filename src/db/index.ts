import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is missing');
}

// HTTP driver — fast, connectionless, used for all reads (see queries.ts).
// The transactional WebSocket driver lives in ./tx so read-only routes don't
// bundle it.
const sql = neon(process.env.DATABASE_URL);
export const db = drizzle(sql, { schema });