const capabilitySections = [
  {
    title: "Tenant provisioning",
    points: [
      "Create hospitals with plans, trial periods and region aware modules.",
      "Attach multiple facilities and branch level billing contacts.",
      "Automate renewal windows using helpers in lib/utils/billing.ts.",
    ],
  },
  {
    title: "Clinical & ops modules",
    points: [
      "Admissions, OPD, pharmacy and lab modules that can be toggled per tenant.",
      "Shared patient identity with cross-branch transfer history.",
      "Audit-friendly events for finance, claims and laboratory results.",
    ],
  },
  {
    title: "Developer ergonomics",
    points: [
      "API-first route handlers under app/api with stable JSON responses.",
      "Prisma schema and migrations ready to deploy to PostgreSQL.",
      "Guard rails for superadmin vs tenant roles baked into the stack.",
    ],
  },
];

export default function FeaturesPage() {
  return (
    <div className="mx-auto w-full max-w-5xl space-y-10 px-6 py-16 lg:px-10">
      <header className="space-y-3 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-200">Product overview</p>
        <h1 className="text-4xl font-semibold text-white">Everything to launch a hospital SaaS.</h1>
        <p className="text-base text-slate-300">
          HospCare comes with tenant-aware provisioning, modular billing and developer friendly APIs so your team can focus on
          onboarding hospitals instead of rebuilding boilerplate.
        </p>
      </header>

      <section className="grid gap-6 md:grid-cols-3">
        {capabilitySections.map((capability) => (
          <article key={capability.title} className="rounded-3xl border border-slate-900 bg-slate-900/40 p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-300">{capability.title}</p>
            <ul className="mt-4 space-y-3 text-sm text-slate-300">
              {capability.points.map((point) => (
                <li key={point} className="flex gap-2">
                  <span className="mt-1 h-2 w-2 rounded-full bg-emerald-400" aria-hidden />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </section>

      <section className="rounded-3xl border border-emerald-500/30 bg-emerald-500/5 p-8">
        <div className="flex flex-col gap-3 text-center lg:text-left">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-200">Backend ready</p>
          <h2 className="text-3xl font-semibold text-white">Flutter compatible APIs.</h2>
          <p className="text-base text-slate-300">
            Each route handler is typed, returns JSON and reuses the Prisma client. Mobile engineers can plug in without
            rewriting contracts, and cron jobs can reuse the same endpoints for automation.
          </p>
          <div className="mt-3 flex flex-wrap justify-center gap-3 text-sm font-semibold lg:justify-start">
            <a className="rounded-full bg-white px-5 py-3 text-slate-900 transition hover:bg-emerald-100" href="/contact">
              Schedule a demo
            </a>
            <a
              className="rounded-full border border-emerald-300/50 px-5 py-3 text-emerald-100 transition hover:bg-emerald-500/10"
              href="/pricing"
            >
              View pricing
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
