const contactReasons = [
  {
    title: "Book a demo",
    detail: "Walk through tenant provisioning, module toggles and billing automation with our team.",
  },
  {
    title: "Migrate an existing stack",
    detail: "Bring your PostgreSQL database and run Prisma migrations with guided support.",
  },
  {
    title: "Enterprise questions",
    detail: "Ask about SLAs, data residency, HIPAA readiness and private cloud deployments.",
  },
];

export default function ContactPage() {
  return (
    <div className="mx-auto w-full max-w-4xl space-y-10 px-6 py-16 lg:px-10">
      <header className="space-y-3 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-200">Contact</p>
        <h1 className="text-4xl font-semibold text-white">Talk with the HospCare team.</h1>
        <p className="text-base text-slate-300">
          Tell us about your hospital network, the modules you need and how you plan to bill tenants. We will reply within one
          business day with onboarding steps.
        </p>
      </header>

      <section className="grid gap-6 md:grid-cols-3">
        {contactReasons.map((reason) => (
          <article key={reason.title} className="rounded-3xl border border-slate-900 bg-slate-900/40 p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-300">{reason.title}</p>
            <p className="mt-3 text-sm text-slate-300">{reason.detail}</p>
          </article>
        ))}
      </section>

      <section className="rounded-3xl border border-slate-900 bg-slate-900/40 p-8">
        <div className="space-y-4 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-200">Reach out</p>
          <p className="text-2xl font-semibold text-white">sales@hospcare.test</p>
          <p className="text-base text-slate-300">
            Include your facility count, preferred go-live date and any compliance requirements. We will share a tailored
            billing plan and tenant provisioning guide.
          </p>
          <div className="flex flex-wrap justify-center gap-3 text-sm font-semibold">
            <a className="rounded-full bg-emerald-500 px-5 py-3 text-slate-900 transition hover:bg-emerald-400" href="mailto:sales@hospcare.test">
              Email sales
            </a>
            <a
              className="rounded-full border border-emerald-300/50 px-5 py-3 text-emerald-100 transition hover:bg-emerald-500/10"
              href="/pricing"
            >
              Review plans
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
