# AGENTS.md — CampusOS

Campus-exclusive student marketplace (buy/sell/lend), internship portal, and student talent pool intermediary.

## Tech Stack (Strict Versions & Drivers)

* **Runtime & Package Manager**: Bun (`bun` / `bunx` only — never use `npm`, `yarn`, or `pnpm`)

* **Framework**: Next.js 16+ (App Router), TypeScript (strict), React 19

* **Deployment Target**: Cloudflare Workers with Static Assets via `@opennextjs/cloudflare` (`nodejs_compat` enabled)

* **Database**: Supabase PostgreSQL via Supavisor Transaction Pooler (Port `6543`, `prepare: false` required)

* **ORM & Validation**: Drizzle ORM (`drizzle-orm`, `postgres` driver), `drizzle-zod`, `zod`, `next-safe-action`

* **Auth**: Supabase Auth (`@supabase/ssr`) — Google OAuth (`hd: gecskp.ac.in`) + Postgres `before-user-created` Auth Hook

* **Object Storage**: Cloudflare R2 signed via `aws4fetch` (never `@aws-sdk/client-s3`) + client WebP compression (`browser-image-compression`)

* **UI & State**: Tailwind CSS v4, Shadcn UI, `nuqs` (URL search params), `react-hook-form`

* **Code Quality & Scalability**: `@biomejs/biome` (sole formatter & linter — never install ESLint or Prettier), `knip` (dead code, unused files, and unused dependency detector)

## Setup, Build & Verification Commands

Run these exact commands from the repository root:

* **Install dependencies**: `bun install`

* **Local Docker services (Postgres + MinIO R2)**: `docker compose up -d`

* **Start Next.js dev server**: `bun run dev`

* **Typecheck (must pass before finishing any task)**: `bun run typecheck` (`bunx tsc --noEmit`)

* **Format & Lint (Biome)**: `bun run check` (`bunx @biomejs/biome check --write .`)

* **Dead Code & Unused Dependency Check (Knip)**: `bun run knip` (`bunx knip`)

* **Full Pre-Commit Quality Gate**: `bun run verify` (`bun run typecheck && bun run check && bun run knip`)

* **Generate Drizzle migrations**: `bunx drizzle-kit generate`

* **Apply Drizzle migrations**: `bunx drizzle-kit migrate`

* **Preview on local Cloudflare Worker runtime**: `bun run preview` (`bunx opennextjs-cloudflare build && bunx wrangler dev`)

* **Deploy to Cloudflare Workers**: `bun run deploy` (`bunx opennextjs-cloudflare build && bunx wrangler deploy`)

## Repository Structure & Scope Rules

* `src/app/`: Next.js App Router pages, layouts, and thin route handlers only. No raw SQL or business logic here.

* `src/db/schema/`: Drizzle PostgreSQL table definitions (`users.ts`, `marketplace.ts`, `internships.ts`, `talent.ts`).

* `src/db/migrations/`: Auto-generated SQL migrations. **Never edit files in `src/db/migrations/` manually.**

* `src/server/actions/`: `next-safe-action` Server Actions grouped by domain (`marketplace.ts`, `auth.ts`, `r2.ts`).

* `src/lib/supabase/`: `@supabase/ssr` client factories (`server.ts`, `client.ts`, `middleware.ts`).

* `src/lib/r2/`: `aws4fetch` presigned URL helpers for Cloudflare R2.

* `src/components/ui/`: Shadcn UI primitives. **Do not modify generated primitives unless fixing an accessibility bug.**

* `biome.jsonc` & `knip.json`: Root static analysis configurations. Keep Next.js App Router entrypoints (`page.tsx`, `layout.tsx`, `route.ts`), Drizzle schemas, and `src/components/ui/**` registered in `knip.json` so valid framework exports are not flagged.

## Hard Architecture & Edge Runtime Constraints

1. **Cloudflare Workers 10 ms CPU Limit & Bundle Hygiene**:

   * Keep `src/proxy.ts` (formerly `middleware.ts`) ultra-lightweight (Supabase session cookie refresh and route protection only).

   * Never import heavy Node-only libraries (`sharp`, `@aws-sdk/*`, `bcrypt`, `puppeteer`) in Worker routes or Server Actions. Use Web Crypto APIs and `aws4fetch`.

   * Run `bun run knip` after refactoring features to strip dead exports, orphan files, and unused packages that bloat the Cloudflare Worker bundle.

2. **Database Connection Pooling**:

   * Always instantiate the `postgres` client in `src/db/index.ts` with `{ prepare: false }` to prevent prepared statement collisions on Supabase Supavisor (Port `6543`).

   * Never call `db` directly inside Client Components or shared UI components under `src/components/`.

3. **Authentication & Role Enforcement**:

   * Student accounts (`role = 'student'`) must have an official `@college.ac.in` email verified at both the OAuth client level (`queryParams: { hd: 'college.ac.in' }`) and the Supabase Postgres Auth Hook.

   * Company accounts (`role = 'company'`) cannot publish internships or talent requirements until `is_verified = true` is set by an `admin`.

   * Every Server Action in `src/server/actions/` must use `authenticatedActionClient` (or `adminActionClient`) from `next-safe-action` and validate inputs with a `drizzle-zod` schema before mutating data.

4. **Media & Storage Egress**:

   * Never store marketplace item photos or resumes in Supabase Storage (strict 5 GB free-tier egress limit).

   * Compress all images client-side to WebP (`maxSizeMB: 0.15`, `maxWidthOrHeight: 1200`) using `browser-image-compression` before uploading directly to Cloudflare R2 via presigned `PUT` URLs.

5. **Realtime & Messaging Quota**:

   * Do not open persistent Supabase Realtime WebSocket channels for marketplace listings or chat (200 concurrent connection limit on free tier). Use standard Server Actions with `revalidatePath` and Web Push notifications.

## Three-Tier Agent Boundaries

### Always Do

* Run `bun run typecheck`, `bun run check` (Biome), and `bun run knip` after modifying any `.ts` or `.tsx` file and resolve all errors, lint warnings, and unused exports before completing a task.

* Use `nuqs` (`useQueryState` / `createSearchParamsCache`) for all marketplace, internship, and talent filter states (`category`, `listingType`, `department`, `skills`).

* Support both selling and lending in `marketplace_listings` via `listing_type` (`'sell' | 'lend' | 'both'`).

* Store all monetary amounts in integer INR (`sell_price_inr`, `daily_rent_inr`, `security_deposit_inr`).

### Ask First

* Before adding any new dependency to `package.json` (must be verified for Cloudflare Workers edge runtime compatibility and bundle size).

* Before altering existing columns in `src/db/schema/` that would require a destructive migration.

* Before changing authentication middleware redirects, Supabase RLS policies, or ignoring rules in `biome.jsonc` / `knip.json`.

### Never Do

* Never install or configure `eslint`, `prettier`, or their plugins — `@biomejs/biome` is the single source of truth for formatting and linting.

* Never leave unused exports, dead files, or unlisted dependencies flagged by `knip`.

* Never commit `.env`, `.env.local`, `.dev.vars`, or raw Supabase/Cloudflare credentials. Read all secrets via validated `src/env.ts` (`@t3-oss/env-nextjs`).

* Never edit generated files in `.open-next/`, `.next/`, or `src/db/migrations/`.

* Never charge student accounts for registration, browsing, or applying (core CampusOS business rule).
