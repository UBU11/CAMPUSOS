import { db } from "@/db";
import { users } from "@/db/schema/users";
import { createClient } from "@/lib/supabase/server";
import { eq } from "drizzle-orm";
import { createSafeActionClient } from "next-safe-action";

export const actionClient = createSafeActionClient();

export const authenticatedActionClient = actionClient.use(async ({ next }) => {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    throw new Error("Unauthorized: Please sign in with your college account");
  }

  const [dbUser] = await db.select().from(users).where(eq(users.supabaseUid, user.id)).limit(1);

  if (!dbUser) {
    throw new Error("User record not found in campus directory");
  }

  return next({
    ctx: {
      auth: user,
      user: dbUser,
    },
  });
});

export const adminActionClient = authenticatedActionClient.use(async ({ next, ctx }) => {
  if (ctx.user.role !== "admin") {
    throw new Error("Forbidden: Admin privileges required");
  }

  return next({ ctx });
});
