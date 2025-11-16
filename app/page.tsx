const features = [
  {
    title: "Multi-tenant aware core",
    description:
      "Superadmins provision isolated hospital sandboxes. Each tenant carries its own users, facilities, care teams and audit trail while sharing the same PostgreSQL cluster.",
  },
  {
    title: "Module based billing",
    description:
      "Plans are built from modules so subscriptions can toggle OPD, pharmacy, labs or finance individually. Billing cycles, trials and add-ons are calculated automatically.",
  },
  {
    title: "API ready for Flutter",
    description:
      "Next.js route handlers emit stable JSON contracts. The same APIs can power a Flutter mobile app or background jobs without any coupling to the UI layer.",
  },
];

const roadmap = [
  { title: "Provision hospital", detail: "Create tenant, attach modules and schedule billing period." },
  { title: "Invite staff", detail: "Hospital admins add doctors, nurses and accountants per facility." },
  { title: "Operate", detail: "Admissions, billing, pharmacy and lab data flow through shared services." },
];

const apiExamples = [
  {
    method: "GET",
    path: "/api/modules",
    description: "List all billable modules with pricing and whether they are part of the base plan.",
  },
  {
    method: "POST",
    path: "/api/modules",
    description: "Superadmin creates a reusable module. Response returns the Prisma record for management UIs.",
  },
  {
    method: "POST",
    path: "/api/tenants",
    description: "Provision a hospital tenant and spin up a subscription with calculated trial period.",
  },
];

const samplePayload = `{
  "name": "Sunrise Speciality Care",
  "slug": "sunrise-care",
  "contactEmail": "ops@sunrise-care.test",
  "planId": 1,
  "moduleIds": [1, 2, 3],
  "trialDays": 14
}`;

const highlightModules = [
  { name: "Admissions", price: "Included", detail: "Bed & ward orchestration with cross-branch transfers." },
  { name: "OPD", price: "$39", detail: "Token queues, vitals capture and doctor calendar sync." },
  { name: "Billing", price: "$35", detail: "Multi-branch cashiering, receivables and audit logs." },
  { name: "Laboratory", price: "$19", detail: "Sample tracking and smart result templates." },
  { name: "Pharmacy", price: "$25", detail: "Inventory, dispensing and supplier reconciliation." },
];

export default function Home() {
  return (
    <div className="bg-slate-950 text-slate-100">
      <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-16 px-6 py-16 lg:px-10">
        <section className="grid gap-8 lg:grid-cols-[3fr,2fr] lg:items-center">
          <div className="space-y-6">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">
              HospCare SaaS Platform
            </p>
            <h1 className="text-4xl font-semibold leading-tight text-white md:text-5xl">
              Sell Smart Hospital as a subscription product.
            </h1>
            <p className="text-lg text-slate-300">
              This Next.js starter stitches Prisma + PostgreSQL, module aware billing and API-first route handlers so you can
              onboard hospitals, branch facilities and staff in minutes. The backend is Flutter-ready and superadmin friendly.
            </p>
            <div className="flex flex-wrap gap-4 text-sm text-slate-300">
              {roadmap.map((item) => (
                <div key={item.title} className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4">
                  <p className="font-semibold text-white">{item.title}</p>
                  <p className="mt-2 max-w-[16rem] text-slate-400">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-800 p-6">
            <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-slate-500">
              <span>Postgres + Prisma</span>
              <span>Multi-tenant</span>
            </div>
            <div className="mt-6 space-y-4 text-sm">
              <div>
                <p className="text-slate-400">Current MRR</p>
                <p className="text-3xl font-semibold text-emerald-300">$18,640</p>
              </div>
              <div>
                <p className="text-slate-400">Active hospitals</p>
                <p className="text-3xl font-semibold text-white">42</p>
              </div>
              <div>
                <p className="text-slate-400">Modules shipped</p>
                <p className="text-3xl font-semibold text-white">12</p>
              </div>
            </div>
            <p className="mt-8 text-xs text-slate-500">
              Data is mocked for UI purposes. Real values come straight from Postgres once the Prisma client is pointed to your
              database URL.
            </p>
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-3">
          {features.map((feature) => (
            <article key={feature.title} className="rounded-3xl border border-slate-900 bg-slate-900/40 p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-300">{feature.title}</p>
              <p className="mt-4 text-sm leading-relaxed text-slate-300">{feature.description}</p>
            </article>
          ))}
        </section>

        <section className="rounded-3xl border border-slate-900 bg-slate-900/40 p-6">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">Module catalog</p>
              <h2 className="mt-2 text-3xl font-semibold text-white">Price modules individually per tenant.</h2>
              <p className="mt-2 max-w-2xl text-base text-slate-300">
                Modules are stored in PostgreSQL and exposed by `/api/modules`. Superadmins can toggle which items are bundled
                inside a plan and override prices per tenant via the Prisma powered TenantModule table.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4 text-sm text-slate-300">
              <p className="text-slate-400">POST /api/modules</p>
              <p className="mt-2 text-xs text-slate-500">Body</p>
              <pre className="mt-2 overflow-x-auto rounded-xl bg-black/40 p-3 text-[11px] text-slate-200">
{`{
  "name": "Dialysis",
  "code": "DIALYSIS",
  "category": "Clinical",
  "baseMonthlyPrice": 59,
  "isCore": false
}`}
              </pre>
            </div>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {highlightModules.map((module) => (
              <div key={module.name} className="rounded-2xl border border-slate-800/70 bg-slate-950/40 p-5">
                <div className="flex items-center justify-between">
                  <p className="text-white">{module.name}</p>
                  <p className="text-sm text-emerald-300">{module.price}</p>
                </div>
                <p className="mt-3 text-sm text-slate-400">{module.detail}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-slate-900 bg-slate-900/40 p-6">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="space-y-4">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">API surface</p>
              <h2 className="text-3xl font-semibold text-white">Tenant provisioning endpoints</h2>
              <p className="text-base text-slate-300">
                Route handlers live under <code className="rounded bg-slate-800 px-2 py-0.5 text-xs text-emerald-300">app/api</code> and use the shared Prisma
                client. Each response is JSON typed and ready to be consumed by Flutter, React Native or cron workers.
              </p>
              <div className="space-y-3 text-sm text-slate-300">
                {apiExamples.map((api) => (
                  <div key={api.path} className="rounded-2xl border border-slate-800/70 bg-slate-950/40 p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-300">
                      {api.method} {api.path}
                    </p>
                    <p className="mt-2 text-slate-400">{api.description}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-full rounded-2xl border border-slate-800 bg-black/40 p-5 text-sm text-slate-200 lg:max-w-md">
              <p className="text-slate-400">POST /api/tenants</p>
              <p className="mt-2 text-xs text-slate-500">Sample body</p>
              <pre className="mt-3 overflow-x-auto rounded-xl bg-slate-950/70 p-4 text-[12px] leading-relaxed text-slate-100">
{samplePayload}
              </pre>
              <p className="mt-4 text-xs text-slate-500">
                The handler validates input with Zod, checks plan-module relationships and stores subscription dates using the
                helper in <code className="rounded bg-slate-800 px-1">lib/utils/billing.ts</code>.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
