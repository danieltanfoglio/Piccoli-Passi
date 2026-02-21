# Replit.md

## Overview

**PiccoliPassi** is an Italian-language marketing and service website for a babysitting and tutoring business. It presents services, pricing plans, and a contact form. The application is a full-stack TypeScript project with a React frontend and Express backend, backed by a PostgreSQL database. The site is designed with a warm, child-friendly aesthetic using teal (#75c7c0) and yellow (#FFD166) as primary brand colors.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend
- **Framework:** React 18 with TypeScript
- **Routing:** Wouter (lightweight client-side router)
- **State/Data Fetching:** TanStack React Query for server state management
- **Styling:** Tailwind CSS with CSS variables for theming, using the "Lexend" Google Font
- **UI Components:** shadcn/ui (new-york style) built on Radix UI primitives
- **Animations:** Framer Motion for page transitions and scroll animations
- **Forms:** React Hook Form with Zod resolver for validation
- **Build Tool:** Vite
- **Path Aliases:** `@/` maps to `client/src/`, `@shared/` maps to `shared/`

**Pages:**
- `/` — Home (hero, services overview, testimonials)
- `/servizi` — Services listing (fetched from API)
- `/prezzi` — Pricing plans (fetched from API)
- `/contatti` — Contact form (submits to API)
- `/chi-sono` — About me page (static content)

### Backend
- **Framework:** Express 5 running on Node.js with TypeScript (via tsx)
- **API Pattern:** RESTful JSON API under `/api/` prefix
- **API Routes:**
  - `GET /api/services` — Returns all services
  - `GET /api/pricing` — Returns all pricing plans
  - `POST /api/contact` — Creates a contact message (validated with Zod)
- **Route Definitions:** Shared route contract in `shared/routes.ts` defines paths, methods, input schemas, and response schemas — used by both client and server
- **Development:** Vite dev server middleware integrated into Express for HMR
- **Production:** Client is built to `dist/public`, server is bundled with esbuild to `dist/index.cjs`

### Shared Layer (`shared/`)
- **Schema (`shared/schema.ts`):** Drizzle ORM table definitions and Zod schemas generated via `drizzle-zod`. Three tables: `services`, `pricing_plans`, `contact_messages`
- **Routes (`shared/routes.ts`):** API contract object defining endpoints, methods, input/output schemas. Consumed by both frontend hooks and backend route handlers for type safety.

### Database
- **ORM:** Drizzle ORM with PostgreSQL dialect
- **Driver:** `pg` (node-postgres) Pool
- **Schema Management:** `drizzle-kit push` for schema migrations (no migration files needed in dev)
- **Connection:** Requires `DATABASE_URL` environment variable
- **Seeding:** The server seeds initial data (services, pricing plans) on startup via `seedDatabase()` in `routes.ts`

### Storage Pattern
- `server/storage.ts` defines an `IStorage` interface and `DatabaseStorage` implementation
- All database operations go through the `storage` singleton, making it easy to swap implementations

### Build System
- **Dev:** `tsx server/index.ts` runs the server with Vite middleware for hot reloading
- **Build:** Custom `script/build.ts` that runs Vite build for client and esbuild for server
- **Output:** `dist/public/` for static assets, `dist/index.cjs` for server bundle

## External Dependencies

### Database
- **PostgreSQL** — Primary data store, connected via `DATABASE_URL` environment variable
- **connect-pg-simple** — Session store (available but sessions not actively used yet)

### Key NPM Packages
- **drizzle-orm** + **drizzle-kit** — ORM and schema management for PostgreSQL
- **express** v5 — HTTP server framework
- **@tanstack/react-query** — Async data fetching and caching
- **framer-motion** — Animation library
- **zod** + **drizzle-zod** — Runtime validation and schema generation
- **react-hook-form** + **@hookform/resolvers** — Form handling with Zod integration
- **wouter** — Lightweight client-side routing
- **lucide-react** — Icon library
- **shadcn/ui components** — Full suite of Radix-based UI primitives (dialog, toast, form, etc.)

### Replit-Specific
- **@replit/vite-plugin-runtime-error-modal** — Error overlay in development
- **@replit/vite-plugin-cartographer** — Dev tooling (dev only)
- **@replit/vite-plugin-dev-banner** — Dev banner (dev only)