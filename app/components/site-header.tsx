import Link from "next/link";

const navLinks = [
  { href: "/features", label: "Features" },
  { href: "/pricing", label: "Pricing" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  return (
    <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-4 lg:px-10">
        <Link
          href="/"
          className="flex items-center gap-2 rounded-full px-2 py-1 text-sm font-semibold text-white transition hover:text-emerald-300"
        >
          <span className="rounded-full bg-emerald-500/20 px-3 py-2 text-xs uppercase tracking-[0.25em] text-emerald-200">
            HC
          </span>
          <span className="text-base">HospCare SaaS</span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium text-slate-300 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-3 py-2 transition hover:bg-slate-900 hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3 text-sm font-semibold">
          <Link
            href="#modules"
            className="hidden rounded-full border border-slate-800 px-4 py-2 text-slate-200 transition hover:border-emerald-400/60 hover:text-white md:inline"
          >
            View modules
          </Link>
          <Link
            href="/contact"
            className="rounded-full bg-emerald-500 px-4 py-2 text-slate-900 transition hover:bg-emerald-400"
          >
            Request demo
          </Link>
        </div>
      </div>
    </header>
  );
}
