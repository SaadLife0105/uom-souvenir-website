import { createAccessControl } from "better-auth/plugins/access";
import { defaultStatements, adminAc } from "better-auth/plugins/admin/access";

const statement = {
  ...defaultStatements,
} as const;

export const ac = createAccessControl(statement);

// Regular shoppers — no admin permissions at all
export const userRole = ac.newRole({});

// Admins — everything superadmin has on the "user" resource EXCEPT
// create and set-role. They cannot create accounts or change roles,
// only superadmin can.
export const adminRole = ac.newRole({
  user: adminAc.statements.user.filter(
    (action) => action !== "create" && action !== "set-role"
  ),
});

// Superadmin — full permissions, unchanged
export const superadminRole = ac.newRole(adminAc.statements);