import Link from "next/link";

const navLinks = [
  { href: "/features", label: "Features" },
  { href: "/pricing", label: "Pricing" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-emerald-100 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-4 lg:px-10">
        <Link
          href="/"
          className="flex items-center gap-2 rounded-full px-2 py-1 text-sm font-semibold text-emerald-900 transition hover:text-emerald-600"
        >
          <span className="rounded-full bg-emerald-100 px-3 py-2 text-xs uppercase tracking-[0.25em] text-emerald-700">
            HC
          </span>
          <span className="text-base">HospCare SaaS</span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-3 py-2 transition hover:bg-emerald-50 hover:text-emerald-700"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3 text-sm font-semibold">
          <Link
            href="#modules"
            className="hidden rounded-full border border-emerald-200 px-4 py-2 text-slate-700 transition hover:border-emerald-400 hover:text-emerald-700 md:inline"
          >
            View modules
          </Link>
          <Link
            href="/contact"
            className="rounded-full bg-emerald-600 px-4 py-2 text-white transition hover:bg-emerald-500"
          >
            Request demo
          </Link>
        </div>
      </div>
    </header>
  );
}
