# HospCare Next.js SaaS starter

HospCare is a multi-tenant clone of the Smart Hospital (Codecanyon) workflow but delivered as a subscription product. Superadmins
can sell the platform to hospitals, toggle modules per tenant and keep everything in a single PostgreSQL cluster that is exposed
through Next.js route handlers ready for Flutter or any other client.

## Stack

- **Next.js App Router** for the UI shell and API route handlers.
- **Prisma** as the ORM targeting PostgreSQL with a multi-tenant schema (tenants, facilities, modules, subscriptions, staff,
  patients, appointments, invoices and audit friendly timestamps).
- **Zod** based validation for every public endpoint.
- **Bcrypt + Prisma seed** to create example Super Admin and Hospital Admin accounts.

## Database schema highlights

| Domain          | Description                                                                                      |
| --------------- | ------------------------------------------------------------------------------------------------ |
| `Tenant`        | Represents each hospital buying the SaaS. Holds contact data and is linked 1:1 with a subscription. |
| `Module`        | Billable features like OPD, Pharmacy or Laboratory. They can be marked as core modules.           |
| `Plan`          | Pricing plans combine billing cycles with included modules.                                       |
| `TenantModule`  | Junction that lets superadmins activate/deactivate modules per hospital and override pricing.     |
| `Facility`      | Branch/locations that sit under a tenant and own departments, staff and patients.                 |
| `User`/`Staff`  | Superadmins live outside tenants. Hospital admins/staff are linked to their tenant + facility.    |
| `Patient`/`Appointment` | Core clinical records already wired to the tenant/facility/department context.                   |

The schema lives in [`prisma/schema.prisma`](prisma/schema.prisma) and the generated Prisma client is emitted at
`app/generated/prisma` for tree-shakable imports in both server components and API handlers.

## Getting started

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Configure Postgres** by copying `.env.example` to `.env` (create the file if it does not exist yet) and populate
   `DATABASE_URL` with your PostgreSQL connection string. Prisma also reads the variable when running CLI commands.

3. **Generate the Prisma client**

   ```bash
   DATABASE_URL="postgres://user:pass@host:5432/hospcare" npx prisma generate
   ```

4. **Apply the schema**

   ```bash
   DATABASE_URL="postgres://user:pass@host:5432/hospcare" npx prisma db push
   ```

5. **Seed demo data** (creates modules, plans, a demo tenant and two users – Super Admin + Hospital Admin)

   ```bash
   DATABASE_URL="postgres://user:pass@host:5432/hospcare" npm run db:seed
   ```

6. **Run the dev server**

   ```bash
   npm run dev
   ```

Visit [http://localhost:3000](http://localhost:3000) to view the marketing shell that explains the SaaS and highlights the API
contracts.

## API surface

| Method | Path            | Description                                                                 |
| ------ | --------------- | --------------------------------------------------------------------------- |
| `GET`  | `/api/modules`  | Lists every module with pricing and whether it is core or optional.         |
| `POST` | `/api/modules`  | Superadmin creates a new module. Validated by Zod before hitting Postgres.  |
| `GET`  | `/api/tenants`  | Returns tenants along with subscriptions and active modules.                |
| `POST` | `/api/tenants`  | Provisions a hospital, links modules and spins up a subscription/trial.     |

All endpoints share the same Prisma client (`lib/prisma.ts`) so they can be imported inside the future Flutter backend-for-
frontend or any background worker without duplicating connection logic.

## Useful scripts

| Script          | Description                                                   |
| --------------- | ------------------------------------------------------------- |
| `npm run dev`   | Next.js development server.                                   |
| `npm run build` | Production build.                                             |
| `npm run lint`  | ESLint for the entire workspace.                              |
| `npm run db:seed` | Executes `prisma/seed.mjs` to populate demo data.            |
| `npm run db:push` | Shorthand for `prisma db push`.                              |
| `npm run db:migrate` | Runs `prisma migrate deploy` (use in CI/CD).             |
| `npm run db:studio` | Opens Prisma Studio for quick data inspection.           |

## Directory overview

```
app/
  api/                <- REST-ish route handlers for modules & tenants
  generated/prisma/   <- Prisma client output
  page.tsx            <- Marketing/overview page for the SaaS
lib/
  prisma.ts           <- Shared Prisma client instance
  utils/billing.ts    <- Billing helpers for trial + period calculations
  validators/         <- Zod schemas used by the APIs
prisma/
  schema.prisma       <- Relational schema for tenants, modules, staff, etc.
  seed.mjs            <- Demo data bootstrap
```

Feel free to extend the schema with additional hospital workflows (inventory, insurance, ICU, etc.) or expose new APIs. The
current foundation keeps tenant isolation inside the database while keeping the HTTP layer thin and Flutter-friendly.
