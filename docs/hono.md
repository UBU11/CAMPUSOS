# HONO.md — Hybrid Hono + Next.js Cloudflare Architecture

This document defines the architectural rules, routing boundaries, and TypeScript RPC conventions for using **Hono** (`hono` + `@hono/zod-validator`) inside the CampusOS Next.js App Router on **Cloudflare Workers**.

---

## 1. Architectural Rationale: Why Hono + Next.js?

Using Hono alongside Next.js has a clear separation of responsibilities that eliminates the trade-offs of pure Next.js Server Actions:

1. **Cloudflare-Native & Ultra-Low CPU Overhead**: Hono is built natively on Web Standard `Request`/`Response` APIs (~14 KB bundle overhead) and executes route matching in microseconds—critical for staying under the **10 ms CPU/request limit** on the Cloudflare Workers Free tier.
2. **End-to-End Type Safety via Hono RPC (`hc`)**: Chained Hono routes export a single `AppType` consumed by `hc<AppType>()` on the client, providing full TypeScript autocomplete for inputs, query params, and JSON responses without code generation.
3. **Zero Vendor Lock-in & Mobile Readiness**: When CampusOS expands to a React Native mobile app or scales to a standalone microservice on Bun or dedicated Cloudflare Workers, `src/server/api/` can be lifted out of Next.js with **zero route rewrites**.
4. **First-Class Webhooks, Cron & QR Handover Endpoints**: Physical campus QR handovers, Cloudflare R2 presigned URL generation, and Supabase keep-alive Cron triggers work naturally as REST/RPC routes rather than awkward Server Action POSTs.

---

## 2. Strict Responsibility Matrix (Hono vs. Next.js)

Never duplicate logic between Next.js Server Actions and Hono routes. Follow this boundary strictly:

| Workload | Use Next.js App Router | Use Hono API (`/api/[[...route]]`) |
| :--- | :--- | :--- |
| **Initial Page SSR & SEO** | Yes (Server Components reading `src/db` directly) | No |
| **Mutations (Create Listing, Apply, Borrow, Verify)** | No (Do not create new Server Actions) | **Yes** (`POST /api/marketplace`, `POST /api/internships/apply`) |
| **Client-Side Filtering / Infinite Scroll / Search** | No | **Yes** (`GET /api/marketplace`, `GET /api/talent`) |
| **Cloudflare R2 Presigned URLs** | No | **Yes** (`POST /api/storage/presign`) |
| **Campus QR Handover & OTP Verification** | No | **Yes** (`POST /api/transactions/:id/verify-qr`) |
| **Cron Jobs (Supabase Keep-Alive & Overdue Alerts)** | No | **Yes** (`GET /api/cron/keep-alive`) |

---

## 3. Required Packages

Install only Web Standard Hono packages (never Node-specific adapters):

```bash
bun add hono @hono/zod-validator
```

---

## 4. Directory Structure for Hono

```text
src/
├── app/
│   └── api/
│       └── [[...route]]/
│           └── route.ts        # Thin Next.js catch-all adapter (exports GET, POST, PATCH, DELETE)
├── server/
│   ├── index.ts                # Root Hono app instance (.basePath('/api')) & AppType export
│   ├── context.ts              # Typed Hono Env (Cloudflare bindings + Supabase user/role Variables)
│   ├── middleware/
│   │   ├── auth.ts             # Supabase SSR session & @gecskp.ac.in / role verification middleware
│   │   └── rate-limit.ts       # Lightweight edge rate-limiting helper
│   └── routes/
│       ├── marketplace.ts      # Buy / Sell / Lend listings & QR handover endpoints
│       ├── internships.ts      # Company internship postings & student applications
│       ├── talent.ts           # Student skill profiles & company requirement matching
│       ├── storage.ts          # aws4fetch Cloudflare R2 presigned PUT URL generator
│       └── cron.ts             # 3-day Supabase SELECT 1 keep-alive & overdue lending check
└── lib/
    └── api-client.ts           # Isomorphic Hono RPC client: hc<AppType>('/api')
```

---

## 5. Core Implementation Patterns (Mandatory for Coding Agents)

### 5.1 Typed Hono Environment (`src/server/context.ts`)

Always type Cloudflare bindings (via `@opennextjs/cloudflare` `getCloudflareContext`) and authenticated user variables:

```typescript
import type { InferSelectModel } from 'drizzle-orm';
import type { users } from '@/db/schema/users';

export type AuthUser = InferSelectModel<typeof users>;

export type HonoEnv = {
  Bindings: {
    R2_BUCKET?: R2Bucket;
    CRON_SECRET: string;
  };
  Variables: {
    user: AuthUser;
  };
};
```

### 5.2 Method Chaining Rule for Hono RPC (`src/server/routes/*.ts`)

**CRITICAL**: For Hono RPC (`hc<AppType>`) to infer route types, you **must chain route handlers** directly onto the `new Hono<HonoEnv>()` instance and export the chained variable. Never register routes as detached statements (`app.get(...); app.post(...);`).

```typescript
// src/server/routes/marketplace.ts
import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';
import { db } from '@/db';
import { marketplaceListings } from '@/db/schema/marketplace';
import { requireStudent } from '../middleware/auth';
import type { HonoEnv } from '../context';

const createListingSchema = z.object({
  title: z.string().min(3).max(120),
  category: z.enum(['electronics', 'books', 'lab_gear', 'other']),
  description: z.string().min(10).max(2000),
  condition: z.enum(['new', 'like_new', 'good', 'fair']),
  listingType: z.enum(['sell', 'lend', 'both']),
  sellPriceInr: z.number().int().nonnegative().optional(),
  dailyRentInr: z.number().int().nonnegative().optional(),
  securityDepositInr: z.number().int().nonnegative().default(0),
  maxLendDays: z.number().int().positive().max(60).optional(),
  pickupLocation: z.string().min(2).max(100),
  imageKeys: z.array(z.string()).min(1).max(4),
});

export const marketplaceRoutes = new Hono<HonoEnv>()
  .get('/', async (c) => {
    const items = await db.query.marketplaceListings.findMany({
      limit: 24,
      orderBy: (t, { desc }) => [desc(t.createdAt)],
    });
    return c.json({ items }, 200);
  })
  .post(
    '/',
    requireStudent,
    zValidator('json', createListingSchema),
    async (c) => {
      const input = c.req.valid('json');
      const user = c.get('user');

      const [created] = await db
        .insert(marketplaceListings)
        .values({
          ...input,
          ownerId: user.id,
        })
        .returning();

      return c.json({ listing: created }, 201);
    }
  );
```

### 5.3 Root Hono App & `AppType` Export (`src/server/index.ts`)

```typescript
import { Hono } from 'hono';
import { logger } from 'hono/logger';
import type { HonoEnv } from './context';
import { marketplaceRoutes } from './routes/marketplace';
import { internshipRoutes } from './routes/internships';
import { talentRoutes } from './routes/talent';
import { storageRoutes } from './routes/storage';
import { cronRoutes } from './routes/cron';

export const app = new Hono<HonoEnv>()
  .basePath('/api')
  .use('*', logger())
  .route('/marketplace', marketplaceRoutes)
  .route('/internships', internshipRoutes)
  .route('/talent', talentRoutes)
  .route('/storage', storageRoutes)
  .route('/cron', cronRoutes);

export type AppType = typeof app;
```

### 5.4 Next.js Catch-All Route Adapter (`src/app/api/[[...route]]/route.ts`)

Use `hono/vercel` (which wraps standard Web `fetch` handlers for Next.js App Router on both Bun and Cloudflare Workers):

```typescript
import { handle } from 'hono/vercel';
import { app } from '@/server';

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);
```

### 5.5 Type-Safe Client Consumption (`src/lib/api-client.ts`)

```typescript
import { hc } from 'hono/client';
import type { AppType } from '@/server';

export const api = hc<AppType>(
  typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000'
).api;
```

---

## 6. Agent Guardrails for Hono

1. **Always Chain Routes**: Every `.get()`, `.post()`, `.patch()`, `.delete()`, and `.route()` call must be chained so `AppType` preserves full RPC inference.
2. **Validate Every Input**: Every mutation or query parameter route must use `zValidator('json' | 'query' | 'param', schema)` from `@hono/zod-validator`.
3. **Explicit HTTP Status Codes**: Always pass the numeric status code as the second argument to `c.json(payload, 200)` or `c.json({ error }, 403)` so the Hono RPC client discriminates union return types accurately.
4. **Knip Configuration**: Keep `src/app/api/[[...route]]/route.ts` recognized as a Next.js entry file so `bun run knip` traces all Hono route modules cleanly.