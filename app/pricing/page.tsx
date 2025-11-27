const plans = [
  {
    name: "Starter",
    price: "₹19,000 /mo",
    description: "Single hospital with up to 2 branches and core modules enabled.",
    perks: ["Admissions + OPD", "Core billing", "Email support"],
  },
  {
    name: "Growth",
    price: "₹34,000 /mo",
    description: "Multi-branch hospitals that need pharmacy, lab and finance automation.",
    perks: ["Everything in Starter", "Laboratory + Pharmacy", "Finance + audit exports", "Priority support"],
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For chains with regional data residency, HIPAA readiness and dedicated SLAs.",
    perks: ["Advanced RBAC", "Data residency controls", "Dedicated success manager", "Custom integrations"],
  },
];

export default function PricingPage() {
  return (
    <div className="mx-auto w-full max-w-5xl space-y-12 px-6 py-16 lg:px-10">
      <header className="space-y-3 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-200">Pricing</p>
        <h1 className="text-4xl font-semibold text-white">Choose how you sell HospCare.</h1>
        <p className="text-base text-slate-300">
          Attach modules per tenant and automate renewals. Plans can be tuned for each hospital and billed monthly or annually
          through the built-in billing helpers.
        </p>
      </header>

      <section className="grid gap-6 md:grid-cols-3">
        {plans.map((plan) => (
          <article
            key={plan.name}
            className="flex flex-col gap-4 rounded-3xl border border-slate-900 bg-slate-900/40 p-6 shadow-lg"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-300">{plan.name}</p>
              <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs text-emerald-200">Multi-tenant</span>
            </div>
            <p className="text-3xl font-semibold text-white">{plan.price}</p>
            <p className="text-sm text-slate-300">{plan.description}</p>
            <ul className="space-y-2 text-sm text-slate-200">
              {plan.perks.map((perk) => (
                <li key={perk} className="flex gap-2">
                  <span className="mt-1 h-2 w-2 rounded-full bg-emerald-400" aria-hidden />
                  <span>{perk}</span>
                </li>
              ))}
            </ul>
            <a
              className="mt-auto inline-flex items-center justify-center rounded-full bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-emerald-400"
              href="/contact"
            >
              Request this plan
            </a>
          </article>
        ))}
      </section>

      <section className="rounded-3xl border border-slate-900 bg-slate-900/40 p-8">
        <div className="grid gap-6 lg:grid-cols-2 lg:items-center">
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-200">Billing automation</p>
            <h2 className="text-3xl font-semibold text-white">Prorate add-ons and trials automatically.</h2>
            <p className="text-base text-slate-300">
              The billing helpers keep module toggles in sync with subscription dates. Tenants can enter paid trials, switch
              between monthly and annual plans, and get invoices generated with plan metadata.
            </p>
          </div>
          <div className="space-y-3 rounded-2xl border border-slate-800 bg-slate-950/40 p-5 text-sm text-slate-200">
            <p className="text-slate-400">Sample subscription schedule</p>
            <ul className="space-y-2 text-slate-300">
              <li>Trial: 14 days starting today</li>
              <li>Initial invoice: generated on activation with selected modules</li>
              <li>Renewal: monthly on the activation day</li>
              <li>Proration: automatic when toggling modules mid-cycle</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
