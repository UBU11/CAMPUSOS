import type { users } from "@/db/schema/users";
import type { InferSelectModel } from "drizzle-orm";

export type AuthUser = InferSelectModel<typeof users>;

export type HonoEnv = {
  Bindings: {
    R2_BUCKET?: unknown;
    CRON_SECRET?: string;
  };
  Variables: {
    user: AuthUser;
  };
};
