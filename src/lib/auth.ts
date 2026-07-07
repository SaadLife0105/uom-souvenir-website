import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { admin } from "better-auth/plugins";
import { nextCookies } from "better-auth/next-js";
import { db } from "@/db";
import * as schema from "@/db/schema";
import { ac, userRole, adminRole, superadminRole } from "@/lib/permissions";

export const auth = betterAuth({
  database: drizzleAdapter(db, { provider: "pg", schema }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false, // deferred — no email provider yet
  },
  user: {
    modelName: "users",
    additionalFields: {
      affiliation: {
        type: "string",
        required: false,
        defaultValue: "none",
        input: true,
      },
    },
  },
  session: {
    modelName: "sessions",
  },
  account: {
    modelName: "accounts",
  },
  verification: {
    modelName: "verifications",
  },
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.BETTER_AUTH_URL,
  plugins: [
    admin({
      ac,
      roles: { user: userRole, admin: adminRole, superadmin: superadminRole },
    }),
    nextCookies(), // must stay last
  ],
});