import { db } from "@/db";
import { users } from "@/db/schema/users";
import { env } from "@/env";
import { createClient } from "@/lib/supabase/server";
import { eq } from "drizzle-orm";
import { createMiddleware } from "hono/factory";
import type { HonoEnv } from "../context";

export const requireAuth = createMiddleware<HonoEnv>(async (c, next) => {
  const supabase = await createClient();
  const {
    data: { user: authUser },
    error,
  } = await supabase.auth.getUser();

  if (error || !authUser) {
    return c.json({ error: "Unauthorized: Active session required" }, 401);
  }

  const [dbUser] = await db.select().from(users).where(eq(users.supabaseUid, authUser.id)).limit(1);

  if (!dbUser) {
    return c.json({ error: "User profile not found in campus directory" }, 401);
  }

  c.set("user", dbUser);
  await next();
});

export const requireStudent = createMiddleware<HonoEnv>(async (c, next) => {
  const supabase = await createClient();
  const {
    data: { user: authUser },
    error,
  } = await supabase.auth.getUser();

  if (error || !authUser) {
    return c.json({ error: "Unauthorized: Active session required" }, 401);
  }

  const [dbUser] = await db.select().from(users).where(eq(users.supabaseUid, authUser.id)).limit(1);

  if (!dbUser) {
    return c.json({ error: "User profile not found in campus directory" }, 401);
  }

  const hasCollegeEmail = dbUser.email.endsWith(`@${env.NEXT_PUBLIC_COLLEGE_DOMAIN}`);
  if (dbUser.role !== "student" || !hasCollegeEmail) {
    return c.json({ error: "Forbidden: Verified college student account required" }, 403);
  }

  c.set("user", dbUser);
  await next();
});

export const requireCompany = createMiddleware<HonoEnv>(async (c, next) => {
  const supabase = await createClient();
  const {
    data: { user: authUser },
    error,
  } = await supabase.auth.getUser();

  if (error || !authUser) {
    return c.json({ error: "Unauthorized: Active session required" }, 401);
  }

  const [dbUser] = await db.select().from(users).where(eq(users.supabaseUid, authUser.id)).limit(1);

  if (!dbUser) {
    return c.json({ error: "User profile not found in campus directory" }, 401);
  }

  if (dbUser.role !== "company" || !dbUser.isVerified) {
    return c.json({ error: "Forbidden: Verified company credentials required" }, 403);
  }

  c.set("user", dbUser);
  await next();
});

export const requireAdmin = createMiddleware<HonoEnv>(async (c, next) => {
  const supabase = await createClient();
  const {
    data: { user: authUser },
    error,
  } = await supabase.auth.getUser();

  if (error || !authUser) {
    return c.json({ error: "Unauthorized: Active session required" }, 401);
  }

  const [dbUser] = await db.select().from(users).where(eq(users.supabaseUid, authUser.id)).limit(1);

  if (!dbUser || dbUser.role !== "admin") {
    return c.json({ error: "Forbidden: Administrator privileges required" }, 403);
  }

  c.set("user", dbUser);
  await next();
});
