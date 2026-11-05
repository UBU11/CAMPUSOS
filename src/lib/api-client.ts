import type { AppType } from "@/server";
import { hc } from "hono/client";

export const api = hc<AppType>(
  typeof window !== "undefined" ? window.location.origin : "http://localhost:3000",
).api;
