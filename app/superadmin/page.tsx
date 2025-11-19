import Link from "next/link";
import { TenantsPanel } from "./_components/tenants-panel";

const onboardingSteps = [
  {
    label: "Create superadmin",
    detail:
      "Spin up the very first account that manages hospitals, modules and tenant billing without touching the database.",
  },
  {
    label: "Invite hospitals",
    detail: "Provision a tenant, assign modules and set a trial or go-live date straight from the dashboard.",
  },
  {
    label: "Monitor revenue",
    detail: "Use the analytics wallboard to watch collections and capacity by service line in real time.",
  },
];

const formFields = [
  { name: "fullName", label: "Full name", placeholder: "Jane Lawson" },
  { name: "email", label: "Work email", placeholder: "jane@smarthospital.dev" },
  { name: "password", label: "Password", placeholder: "••••••••" },
];

const sellingPoints = [
  "Multi-tenant aware authentication with audit trails",
  "Module billing toggles for OPD, Pharmacy, Labs, Blood Bank and more",
  "Whitelabel friendly layout with drag-and-drop branding",
  "API ready for Flutter mobile consoles",
];

export default function SuperadminAccess() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-6 py-16 lg:px-10">
        <header className="space-y-4 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-emerald-600">Superadmin Console</p>
          <h1 className="text-4xl font-semibold text-slate-900 md:text-5xl">Authenticate once. Manage every hospital.</h1>
          <p className="text-base text-slate-500 md:text-lg">
            The Superadmin workspace keeps onboarding, login and signup unified so you can create your first account, invite
            additional operators and jump straight to the analytics dashboard inspired by Smart Hospital UI kits.
          </p>
        </header>

        <section className="grid gap-8 lg:grid-cols-[3fr,2fr]">
          <div className="rounded-3xl border border-slate-200 bg-white/70 p-8 shadow-[0_20px_45px_-24px_rgba(15,23,42,0.6)]">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-500">Unified Access</p>
                <h2 className="mt-2 text-2xl font-semibold text-slate-900">Signup + Login</h2>
              </div>
              <Link
                href="/superadmin/dashboard"
                className="rounded-full bg-emerald-600 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-emerald-600/30"
              >
                Preview Dashboard
              </Link>
            </div>

            <div className="mt-8 grid gap-6 md:grid-cols-2">
              <form className="space-y-4 rounded-2xl border border-slate-200/70 bg-slate-50/80 p-5 shadow-inner">
                <p className="text-sm font-semibold text-slate-600">Create superadmin</p>
                {formFields.map((field) => (
                  <label key={`signup-${field.name}`} className="block text-sm">
                    <span className="text-slate-500">{field.label}</span>
                    <input
                      type={field.name === "password" ? "password" : "text"}
                      name={field.name}
                      placeholder={field.placeholder}
                      className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-900 outline-none ring-emerald-500/20 focus:ring"
                    />
                  </label>
                ))}
                <button
                  type="button"
                  className="w-full rounded-xl bg-emerald-600 py-2 text-sm font-semibold text-white transition hover:bg-emerald-500"
                >
                  Create account
                </button>
                <p className="text-xs text-slate-400">
                  Passwords are hashed with bcrypt and a JWT is minted for multi-tenant aware sessions.
                </p>
              </form>

              <form className="space-y-4 rounded-2xl border border-slate-200/70 bg-white p-5 shadow-inner">
                <p className="text-sm font-semibold text-slate-600">Login existing user</p>
                {formFields.slice(1).map((field) => (
                  <label key={`login-${field.name}`} className="block text-sm">
                    <span className="text-slate-500">{field.label}</span>
                    <input
                      type={field.name === "password" ? "password" : "email"}
                      name={field.name}
                      placeholder={field.placeholder}
                      className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-slate-900 outline-none ring-emerald-500/20 focus:ring"
                    />
                  </label>
                ))}
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded border-slate-300 text-emerald-600" />
                    Remember device
                  </label>
                  <button type="button" className="font-semibold text-emerald-600">
                    Forgot password?
                  </button>
                </div>
                <button
                  type="button"
                  className="w-full rounded-xl border border-emerald-200 bg-white py-2 text-sm font-semibold text-emerald-600 transition hover:bg-emerald-50"
                >
                  Login
                </button>
                <p className="text-xs text-slate-400">MFA and IP allow lists can be toggled per operator.</p>
              </form>
            </div>
          </div>

          <div className="space-y-6 rounded-3xl border border-emerald-100 bg-gradient-to-br from-emerald-50 via-white to-white p-8 shadow-inner">
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-emerald-600">Why superadmins love this</p>
            <ul className="space-y-3 text-sm text-slate-600">
              {sellingPoints.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-emerald-500" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
            <div className="rounded-2xl border border-emerald-100 bg-white/80 p-5 text-sm text-slate-500">
              <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-400">Onboarding</p>
              <div className="mt-4 space-y-4">
                {onboardingSteps.map((step) => (
                  <div key={step.label} className="rounded-xl border border-slate-100 bg-slate-50/80 p-4">
                    <p className="text-sm font-semibold text-slate-900">{step.label}</p>
                    <p className="mt-2 text-xs text-slate-500">{step.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section>
          <TenantsPanel />
        </section>
      </div>
    </div>
  );
}
