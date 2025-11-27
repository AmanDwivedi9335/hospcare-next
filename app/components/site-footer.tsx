import Link from "next/link";

const resourceLinks = [
  { href: "/features", label: "Product" },
  { href: "/pricing", label: "Pricing" },
  { href: "/contact", label: "Support" },
];

const compliance = [
  "HIPAA-ready audit trails",
  "Role based access control",
  "Data residency controls",
];

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950/80">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-12 lg:flex-row lg:justify-between lg:px-10">
        <div className="space-y-3 text-slate-300">
          <p className="text-lg font-semibold text-white">HospCare SaaS Platform</p>
          <p className="max-w-md text-sm text-slate-400">
            Ship a smart hospital stack as a service. Provision tenants, attach modules, bill per branch and keep APIs stable
            for mobile teams.
          </p>
          <div className="flex gap-3 text-xs text-emerald-300">
            <span className="rounded-full bg-emerald-500/10 px-3 py-1">Next.js</span>
            <span className="rounded-full bg-emerald-500/10 px-3 py-1">Prisma</span>
            <span className="rounded-full bg-emerald-500/10 px-3 py-1">PostgreSQL</span>
          </div>
        </div>

        <div className="flex flex-col gap-8 text-sm text-slate-300 md:flex-row md:gap-16">
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">Navigate</p>
            <div className="flex flex-col gap-2">
              {resourceLinks.map((link) => (
                <Link key={link.href} href={link.href} className="transition hover:text-white">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">Compliance</p>
            <div className="flex flex-col gap-2 text-slate-400">
              {compliance.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">Get in touch</p>
            <div className="flex flex-col gap-2 text-slate-400">
              <Link href="mailto:sales@hospcare.test" className="transition hover:text-white">
                sales@hospcare.test
              </Link>
              <Link href="/contact" className="transition hover:text-white">
                Schedule onboarding
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
