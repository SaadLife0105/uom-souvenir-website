import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import * as schema from './schema';

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is missing');
}

// WebSocket pool driver — required for interactive transactions; the neon-http
// driver in index.ts throws "No transactions support in neon-http driver".
// Split from index.ts purely for organisation (http driver for reads, ws driver
// for transactions) — NOT as a bundling safety boundary. This module is safe to
// bundle into any route: Node 22 / the Next.js server runtime expose a global
// WebSocket, so we never install or import the `ws` package, and therefore pull
// in none of its optional native addons (bufferutil / utf-8-validate) that a
// bundler could fail to resolve.
// ponytail: a runtime without a global WebSocket (Node < 21) would need the `ws`
// package installed and assigned to neonConfig.webSocketConstructor here — which
// would also reintroduce those native addons.
const wsCtor = (globalThis as { WebSocket?: unknown }).WebSocket;
if (wsCtor && !neonConfig.webSocketConstructor) {
  neonConfig.webSocketConstructor = wsCtor as never;
}
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
export const txDb = drizzle(pool, { schema });
