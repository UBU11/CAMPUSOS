import { Hono } from "hono";
import { logger } from "hono/logger";
import type { HonoEnv } from "./context";
import { createRateLimiter } from "./middleware/rate-limit";
import { cronRoutes } from "./routes/cron";
import { internshipRoutes } from "./routes/internships";
import { marketplaceRoutes } from "./routes/marketplace";
import { storageRoutes } from "./routes/storage";
import { talentRoutes } from "./routes/talent";

export const app = new Hono<HonoEnv>()
  .basePath("/api")
  .use("*", logger())
  .use("*", createRateLimiter(120, 60_000))
  .route("/marketplace", marketplaceRoutes)
  .route("/internships", internshipRoutes)
  .route("/talent", talentRoutes)
  .route("/storage", storageRoutes)
  .route("/cron", cronRoutes);

export type AppType = typeof app;
