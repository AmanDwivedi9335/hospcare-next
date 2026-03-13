const metrics = [
  { label: "Hospitals onboarded", value: "120+" },
  { label: "Avg. onboarding", value: "9 mins" },
  { label: "Uptime", value: "99.95%" },
];

const features = [
  {
    title: "Care operations in one view",
    description:
      "Unify admissions, OPD flow, doctor schedules, pharmacy and lab operations with tenant-safe data isolation.",
  },
  {
    title: "Subscription-ready billing",
    description:
      "Mix and match modules, automate trials and invoicing, and roll branch-wise pricing into a single recurring bill.",
  },
  {
    title: "API-first architecture",
    description:
      "Typed Next.js route handlers and Prisma models make integration with Flutter, web portals and automation simple.",
  },
];

const modules = [
  { name: "Admissions", price: "Included", detail: "Digital registration, bed assignment and transfer workflow." },
  { name: "OPD", price: "₹39", detail: "Queue management, triage templates and doctor notes." },
  { name: "Billing", price: "₹35", detail: "Cashier, package billing and branch-level settlement." },
  { name: "Laboratory", price: "₹19", detail: "Sample lifecycle tracking with report templates." },
  { name: "Pharmacy", price: "₹25", detail: "Stock alerts, dispensing and supplier reconciliation." },
  { name: "Finance", price: "₹29", detail: "Collections, invoice aging and export-friendly ledgers." },
];

export default function Home() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-emerald-50 via-white to-white">
      <div className="absolute inset-x-0 top-0 -z-10 h-64 bg-emerald-200/40 blur-3xl" aria-hidden />
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-14 px-6 py-14 lg:px-10">
        <section className="grid gap-10 lg:grid-cols-[3fr,2fr] lg:items-center">
          <div className="space-y-6">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-emerald-700">HospCare Platform</p>
            <h1 className="text-4xl font-semibold leading-tight text-slate-900 md:text-5xl">
              A beautiful, modern hospital SaaS landing experience.
            </h1>
            <p className="text-lg text-slate-600">
              Launch and scale your hospital platform with a polished light-theme storefront built for trust, clarity and faster
              product discovery.
            </p>
            <div className="flex flex-wrap gap-3 text-sm font-semibold">
              <a className="rounded-full bg-emerald-600 px-5 py-3 text-white transition hover:bg-emerald-500" href="/pricing">
                Start with pricing
              </a>
              <a
                className="rounded-full border border-emerald-200 bg-white px-5 py-3 text-slate-700 transition hover:border-emerald-400 hover:text-emerald-700"
                href="/contact"
              >
                Book a walkthrough
              </a>
            </div>
          </div>

          <div className="rounded-3xl border border-emerald-100 bg-white p-6 shadow-[0_20px_60px_-30px_rgba(16,185,129,0.45)]">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">Live growth pulse</p>
            <div className="mt-5 space-y-4">
              {metrics.map((metric) => (
                <div key={metric.label} className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4">
                  <p className="text-sm text-slate-500">{metric.label}</p>
                  <p className="mt-1 text-3xl font-semibold text-emerald-700">{metric.value}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-3" id="features">
          {features.map((feature) => (
            <article key={feature.title} className="rounded-3xl border border-emerald-100 bg-white p-6 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">{feature.title}</p>
              <p className="mt-4 text-sm leading-relaxed text-slate-600">{feature.description}</p>
            </article>
          ))}
        </section>

        <section className="rounded-3xl border border-emerald-100 bg-white p-6 shadow-sm" id="modules">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">Module catalog</p>
            <h2 className="mt-2 text-3xl font-semibold text-slate-900">Compose your plan, one module at a time.</h2>
            <p className="mt-3 max-w-3xl text-slate-600">
              Keep pricing transparent and flexible. Turn modules on/off per tenant while preserving a clean operational
              experience for every hospital branch.
            </p>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {modules.map((module) => (
              <div key={module.name} className="rounded-2xl border border-slate-100 bg-slate-50/60 p-5">
                <div className="flex items-center justify-between">
                  <p className="font-medium text-slate-800">{module.name}</p>
                  <p className="text-sm font-semibold text-emerald-700">{module.price}</p>
                </div>
                <p className="mt-3 text-sm text-slate-600">{module.detail}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-emerald-200 bg-emerald-50 p-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-700">Ready to launch</p>
          <h3 className="mt-3 text-3xl font-semibold text-slate-900">Create your first tenant in under 10 minutes.</h3>
          <p className="mx-auto mt-3 max-w-2xl text-slate-600">
            HospCare gives you a polished website experience plus API-first internals so product, operations and engineering can
            scale together from day one.
          </p>
          <a
            href="/contact"
            className="mt-6 inline-flex rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-500"
          >
            Talk to our team
          </a>
        </section>
      </main>
    </div>
  );
}
