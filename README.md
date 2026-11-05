# CampusOS

CampusOS is a private campus platform designed for college communities, currently configured for Government Engineering College (GEC) Palakkad. It provides a verified student marketplace for buying, selling, and lending campus essentials, an internship board, and a student talent directory.

Unlike public marketplaces or fragmented messaging groups, CampusOS enforces student domain verification (`gecskp.ac.in`), structured rental and deposit tracking, and zero advertising or platform fees.

---

## Architecture Overview

The system is engineered to run on lightweight edge infrastructure with low operational overhead and predictable resource bounds:

- **Framework & Runtime**: Next.js 16 (App Router) on React 19 and TypeScript, powered by Bun.
- **Edge Deployment Target**: Cloudflare Workers with Static Assets via `@opennextjs/cloudflare`.
- **Database & Pooling**: Supabase PostgreSQL accessed through the Supavisor Transaction Pooler (port `6543`) with `prepare: false` using Drizzle ORM.
- **Object Storage**: Direct client uploads to Cloudflare R2 using `aws4fetch` presigned URLs, paired with client-side WebP compression via `browser-image-compression` to avoid server egress costs.
- **Authentication**: Supabase Auth with Google OAuth restricted to the institutional domain (`hd: gecskp.ac.in`) alongside a PostgreSQL `before-user-created` hook for role provisioning.
- **Tooling & Code Hygiene**: Biome for formatting and linting, Knip for dead code and dependency pruning, and Drizzle Kit for schema migrations.

---

## Directory Structure

```text
campusOS/
├── docs/                 # Architectural rules (AGENTS.md) and coding standards (principle.md)
├── src/
│   ├── app/              # Next.js App Router pages, layouts, and route handlers
│   ├── assets/           # Static icons and branding elements
│   ├── components/       # Shared UI primitives and feature modules
│   │   ├── auth/         # Authentication views and forms
│   │   ├── home/         # Landing page sections, hero transitions, and feature blocks
│   │   ├── marketplace/  # Listing feeds, filter controls, and item cards
│   │   ├── navigation/   # Top navbar, mobile sheets, and footer
│   │   └── ui/           # Headless primitives (Shadcn-based)
│   ├── config/           # Static feature copy, navigation items, and error configs
│   ├── db/               # Database connection factory, migrations, and Drizzle schemas
│   ├── hooks/            # Reusable React and animation hooks (e.g. GSAP parallax)
│   ├── lib/              # Supabase clients, R2 signing, safe actions, and utility helpers
│   ├── server/           # Typed Server Actions (next-safe-action) and domain logic
│   └── types/            # Shared TypeScript interfaces and schema contracts
├── docker-compose.yml    # Local Postgres and MinIO containers for offline development
├── biome.jsonc           # Biome configuration for linting and formatting
└── knip.json             # Knip configuration for unused code detection
```

---

## Getting Started

### Prerequisites

- **Bun**: version 1.4 or higher. Always use `bun` and `bunx`. Do not use `npm`, `yarn`, or `pnpm`.
- **Docker**: (optional) for running local PostgreSQL and MinIO instances.

### 1. Clone & Install

```bash
git clone https://github.com/your-username/campusOS.git
cd campusOS
bun install
```

### 2. Configure Environment

Copy the example environment file and supply your development credentials:

```bash
cp .env.example .env.local
```

Key environment variables:
- `DATABASE_URL`: Connection string to your PostgreSQL instance (port `6543` for Supavisor).
- `NEXT_PUBLIC_SUPABASE_URL` and keys: Project credentials from your Supabase dashboard.
- `R2_ACCOUNT_ID`, `R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY`, `R2_BUCKET_NAME`: Cloudflare R2 storage credentials.
- `NEXT_PUBLIC_COLLEGE_DOMAIN`: Institutional domain used for authentication gating (`gecskp.ac.in`).

### 3. Local Database & Migrations

If developing against local Docker containers:

```bash
docker compose up -d
```

To run existing migrations or sync schemas:

```bash
bun run db:migrate
```

To generate a new migration after editing `src/db/schema/`:

```bash
bun run db:generate
```

### 4. Run the Development Server

```bash
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Quality Gates & Verification

Before submitting pull requests or finishing a task, the repository must pass all automated verification checks. Run the following command from the project root:

```bash
bun run verify
```

This runs three strict verification stages:
1. `bun run typecheck`: Validates TypeScript types across the entire project (`tsc --noEmit`).
2. `bun run check`: Enforces formatting and linting rules using Biome (`biome check --write .`).
3. `bun run knip`: Identifies unused exports, dead files, and unreferenced dependencies.

To preview the build under the Cloudflare Worker runtime locally:

```bash
bun run preview
```

---

## Contributing Guidelines

Please consult [docs/AGENTS.md](docs/AGENTS.md) and [docs/principle.md](docs/principle.md) for detailed development standards. When submitting changes, keep the following core guidelines in mind:

- **Modularity**: Avoid monolithic files. Break complex features into small, single-responsibility files (types, hooks, UI components, and Server Actions).
- **No Linter/Formatter Mixing**: Biome is the sole linter and formatter. Do not install ESLint or Prettier.
- **Edge Runtime Compatibility**: Avoid Node-only libraries (`sharp`, `@aws-sdk/*`, `fs`, `crypto`) in code that executes on Cloudflare Workers. Use standard Web APIs and `aws4fetch`.
- **Database Safety**: Never execute raw database queries in Client Components. All mutations must go through typed Server Actions using `next-safe-action`.
- **Monetary Values**: Store all currency values as integers representing Indian Rupees (`sell_price_inr`, `daily_rent_inr`, `security_deposit_inr`) to eliminate floating-point rounding issues.
- **Code Comments**: Keep code self-documenting through precise naming. Only add comments to explain unintuitive edge cases or critical architectural decisions.
- **Commit Messages**: Use conventional commits (e.g. `feat(marketplace): ...`, `fix(auth): ...`).
