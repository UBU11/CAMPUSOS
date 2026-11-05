import { db } from "@/db";
import { sql } from "drizzle-orm";
import { Hono } from "hono";
import type { HonoEnv } from "../context";

export const cronRoutes = new Hono<HonoEnv>().get("/keep-alive", async (c) => {
  const authHeader = c.req.header("authorization");
  const cronSecret = c.env?.CRON_SECRET ?? process.env.CRON_SECRET;

  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return c.json({ error: "Unauthorized cron trigger" }, 401);
  }

  await db.execute(sql`SELECT 1`);

  return c.json(
    {
      status: "healthy",
      timestamp: new Date().toISOString(),
    },
    200,
  );
});
