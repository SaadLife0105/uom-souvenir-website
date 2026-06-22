import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './drizzle',
  schema: './src/db/schema.ts', // We will create this file next
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DIRECT_URL!, // Uses the direct connection string for migrations
  },
});