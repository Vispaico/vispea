# Vispea — Agent Instructions

Next.js 16 (App Router) + React 19 + TypeScript (strict). E-commerce for print-on-demand apparel.

## Commands

| Command | Purpose |
|---|---|
| `npm run dev` | Dev server (localhost:3000) |
| `npm run build` | Production build |
| `npm run lint` | ESLint |
| `npm run db:generate` | Generate Drizzle migrations |
| `npm run db:push` | Push schema to Turso/libSQL |

No tests or typecheck script exist. No CI.

## Architecture

- **Database**: Turso (libSQL) via Drizzle ORM. Falls back to `file:./dev.db` (local SQLite) when `TURSO_DATABASE_URL` is unset. Schema in `src/lib/db/schema.ts`.
- **Auth**: NextAuth v4 with Drizzle adapter. Email + Google providers. Sign-in page at `/account/sign-in`. Imports via `@/lib/auth` (`authOptions`); `getServerSession` uses the shim in `@/lib/nextAuth` (tries two import paths).
- **Product catalog**: Fetched live from Printful API (`@/lib/printful`). Product metadata can be overridden in `@/data/product-overrides.ts`. All fetches use `cache: "no-store"`. An in-memory cache exists for `listAllPrintfulProducts` with `PRINTFUL_CACHE_TTL` (default 60s).
- **Cart**: Client-only Zustand store (`@/store/cart`), persisted to localStorage under key `vispea-cart`.
- **Checkout flow**: PayPal (create + capture) → Printful order submission. PayPal defaults to sandbox via `PAYPAL_BASE_URL` env var.
- **State management**: Zustand for cart; no React Context for global state.
- **Styling**: Tailwind CSS v4 via `@tailwindcss/postcss` (PostCSS plugin, **not** the old `tailwindcss` config). `tw-animate-css` for animations. shadcn/ui New York style, RSC mode.
- **Animations**: GSAP via `@gsap/react` + `gsap`. OGL/Three.js for 3D (LiquidEther background).
- **Path alias**: `@/*` → `./src/*`.

## Key locations

| Path | Purpose |
|---|---|
| `src/app/` | All Next.js App Router pages and API routes |
| `src/app/api/` | API routes: auth, checkout, paypal, printful, webhooks, vispea, newsletter, contact |
| `src/components/` | Shared components (header, footer, product-card, product-configurator, hero-video, AudioPlayer, AgentWidget, etc.) |
| `src/components/ui/` | shadcn primitives |
| `src/lib/db/schema.ts` | Single-file Drizzle schema (Auth.js tables + app tables) |
| `src/lib/printful.ts` | Printful API client (products, orders, webhook verification) |
| `src/lib/paypal.ts` | PayPal REST API server-side helpers |
| `src/lib/seo.ts` | `getSiteUrl()`, `getMetadataBase()`, `buildCanonicalUrl()`, `stripHtmlToText()` |
| `src/data/product-overrides.ts` | Per-product description, gallery, tag, and sort-order overrides |
| `src/store/cart.ts` | Zustand cart store |

## Conventions

- `.env*` files are gitignored. **Do not commit `.env.local`** — it contains live production API keys.
- No test framework. Verify manually or via `npm run build` + `npm run lint`.
- Font: Geist (via `next/font/google`), applied as CSS variables `--font-geist-sans` / `--font-geist-mono`.
- Metadata is set in `src/app/layout.tsx` with a template: `"%s | Vispea"`.
- Product thumbnails/images are served from Printful CDN or Cloudinary.
- Google Tag Manager ID: `GTM-TRWWTMMJ`.
- Site URL resolved at runtime: `NEXT_PUBLIC_SITE_URL` → `SITE_URL` → `https://vispea.com`.

## Gotchas

- **Next.js 16** — may have unreleased quirks. Run `npm run build` to catch build-time issues.
- **Drizzle dialect is "turso"** even for local dev. `drizzle-kit` config is in `drizzle.config.ts`.
- **Tailwind CSS v4** — no `tailwind.config.js`. Config lives in CSS via `@theme` directives in `src/app/globals.css`.
- **Printful calls are uncached** (`cache: "no-store"`) except the in-memory all-products cache. Be mindful of rate limits.
- **`next-auth` v4** with Drizzle adapter uses a specific table shape defined in the schema. The shim in `nextAuth.ts` exists because Next.js 16 may change the import path.
- **Do NOT remove `"use client"`** from zustand store files — they rely on browser APIs (localStorage).
- The `LICENSE` placeholder directory is just a ghost — not used.

## Must Observe Rules
- Do not preserve backward compatibility.
- Choose the simplest implementation that fully meets the current requirements.
- Prefer established, well-maintained libraries over custom implementations.
- Avoid premature abstraction: prefer simple concrete solutions until real patterns emerge.
- Prefer composition over centralization: use small focused modules with explicit interfaces instead of centralized systems.
- Keep responsibilities clear: keep modules focused and avoid mixing transport, orchestration, domain/workflow state, persistence, infrastructure.
- Never skip verification: do not bypass required checks, tests, or quality gates.
