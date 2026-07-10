import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { admin } from "better-auth/plugins";
import { nextCookies } from "better-auth/next-js";
import { db } from "@/db";
import * as schema from "@/db/schema";
import { ac, userRole, adminRole, superadminRole } from "@/lib/permissions";
import { createAuthMiddleware, APIError } from "better-auth/api";
import { getPasswordErrors } from "@/lib/password-validation";

export const auth = betterAuth({
  hooks: {
  before: createAuthMiddleware(async (ctx) => {
    if (ctx.path !== "/sign-up/email") return;

    const password = ctx.body?.password as string | undefined;
    if (password) {
      const errors = getPasswordErrors(password);
      if (errors.length > 0) {
        throw new APIError("BAD_REQUEST", {
          message: `Password requirements not met: ${errors.join(", ")}`,
        });
      }
    }

    // Guard the affiliation field against garbage values — the sign-up form
    // will only ever send one of these four, but never trust the client.
    const allowedAffiliations = ["student", "staff", "alumni", "none"];
    const affiliation = ctx.body?.affiliation as string | undefined;
    if (affiliation && !allowedAffiliations.includes(affiliation)) {
      throw new APIError("BAD_REQUEST", { message: "Invalid affiliation value" });
      }
    }),
  },
  
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