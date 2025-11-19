"use client";

import { ChangeEvent, FormEvent, useState } from "react";

const planOptions = [
  { id: 1, label: "Core Hospital", detail: "OPD + Billing + Pharmacy" },
  { id: 2, label: "Enterprise", detail: "Adds Laboratory, Blood Bank and HR" },
];

const valueProps = [
  "Multi-branch ready admissions and discharge summaries",
  "Unified OPD, pharmacy and lab billing",
  "Audit friendly access logs for regulators",
  "API access for your mobile apps on day one",
];

type FormStatus = {
  type: "idle" | "success" | "error" | "loading";
  message?: string;
};

const initialSignupState = {
  name: "",
  slug: "",
  contactEmail: "",
  contactPhone: "",
  adminEmail: "",
  adminPassword: "",
  planId: "1",
  trialDays: "14",
};

const initialLoginState = {
  email: "",
  password: "",
};

export default function HospitalAuthPage() {
  const [signupForm, setSignupForm] = useState(initialSignupState);
  const [loginForm, setLoginForm] = useState(initialLoginState);
  const [signupStatus, setSignupStatus] = useState<FormStatus>({ type: "idle" });
  const [loginStatus, setLoginStatus] = useState<FormStatus>({ type: "idle" });

  const handleSignupChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setSignupForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleLoginChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setLoginForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignupSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSignupStatus({ type: "loading", message: "Creating tenant..." });

    try {
      const response = await fetch("/api/auth/tenant-signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: signupForm.name,
          slug: signupForm.slug,
          contactEmail: signupForm.contactEmail,
          contactPhone: signupForm.contactPhone || undefined,
          planId: Number(signupForm.planId),
          billingCycle: undefined,
          trialDays: Number(signupForm.trialDays) || 14,
          moduleIds: [],
          adminEmail: signupForm.adminEmail,
          adminPassword: signupForm.adminPassword,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error ?? "Unable to create tenant");
      }

      setSignupStatus({ type: "success", message: "Hospital tenant created. Check your email for next steps." });
      setSignupForm(initialSignupState);
    } catch (error) {
      setSignupStatus({ type: "error", message: error instanceof Error ? error.message : "Unexpected error" });
    }
  };

  const handleLoginSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoginStatus({ type: "loading", message: "Verifying credentials..." });

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: loginForm.email,
          password: loginForm.password,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error ?? "Unable to login");
      }

      const data = await response.json();
      setLoginStatus({
        type: "success",
        message: `Welcome back ${data.data.user.email}. Token expires in 1 hour.`,
      });
      setLoginForm(initialLoginState);
    } catch (error) {
      setLoginStatus({ type: "error", message: error instanceof Error ? error.message : "Unexpected error" });
    }
  };

  const badgeClass = (status: FormStatus) => {
    switch (status.type) {
      case "success":
        return "text-emerald-300";
      case "error":
        return "text-rose-300";
      case "loading":
        return "text-amber-200";
      default:
        return "text-slate-400";
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-6 py-16 lg:px-10">
        <header className="space-y-4 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-emerald-400">Hospital Access</p>
          <h1 className="text-4xl font-semibold text-white md:text-5xl">Signup and login to your tenant in minutes.</h1>
          <p className="text-base text-slate-400 md:text-lg">
            Dedicated onboarding for hospital administrators. Create your tenant, receive a sandbox instantly and login using
            secure JWT backed sessions.
          </p>
        </header>

        <section className="grid gap-8 lg:grid-cols-2">
          <form
            onSubmit={handleSignupSubmit}
            className="space-y-4 rounded-3xl border border-slate-800 bg-slate-900/50 p-6 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.9)]"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.4em] text-slate-400">Tenant Signup</p>
                <h2 className="text-2xl font-semibold text-white">Create hospital</h2>
              </div>
              <span className={`text-xs font-medium ${badgeClass(signupStatus)}`}>
                {signupStatus.message ?? "Awaiting details"}
              </span>
            </div>

            <label className="block text-sm">
              <span className="text-slate-400">Hospital name</span>
              <input
                required
                name="name"
                value={signupForm.name}
                onChange={handleSignupChange}
                className="mt-1 w-full rounded-2xl border border-slate-800 bg-slate-950/70 px-4 py-2 text-white outline-none focus:ring focus:ring-emerald-500/40"
              />
            </label>

            <label className="block text-sm">
              <span className="text-slate-400">Slug</span>
              <input
                required
                name="slug"
                value={signupForm.slug}
                onChange={handleSignupChange}
                placeholder="sunrise-care"
                className="mt-1 w-full rounded-2xl border border-slate-800 bg-slate-950/70 px-4 py-2 text-white outline-none focus:ring focus:ring-emerald-500/40"
              />
            </label>

            <div className="grid gap-4 md:grid-cols-2">
              <label className="block text-sm">
                <span className="text-slate-400">Contact email</span>
                <input
                  required
                  type="email"
                  name="contactEmail"
                  value={signupForm.contactEmail}
                  onChange={handleSignupChange}
                  className="mt-1 w-full rounded-2xl border border-slate-800 bg-slate-950/70 px-4 py-2 text-white outline-none focus:ring focus:ring-emerald-500/40"
                />
              </label>
              <label className="block text-sm">
                <span className="text-slate-400">Contact phone</span>
                <input
                  name="contactPhone"
                  value={signupForm.contactPhone}
                  onChange={handleSignupChange}
                  className="mt-1 w-full rounded-2xl border border-slate-800 bg-slate-950/70 px-4 py-2 text-white outline-none focus:ring focus:ring-emerald-500/40"
                />
              </label>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <label className="block text-sm">
                <span className="text-slate-400">Admin email</span>
                <input
                  required
                  type="email"
                  name="adminEmail"
                  value={signupForm.adminEmail}
                  onChange={handleSignupChange}
                  className="mt-1 w-full rounded-2xl border border-slate-800 bg-slate-950/70 px-4 py-2 text-white outline-none focus:ring focus:ring-emerald-500/40"
                />
              </label>
              <label className="block text-sm">
                <span className="text-slate-400">Admin password</span>
                <input
                  required
                  type="password"
                  name="adminPassword"
                  value={signupForm.adminPassword}
                  onChange={handleSignupChange}
                  className="mt-1 w-full rounded-2xl border border-slate-800 bg-slate-950/70 px-4 py-2 text-white outline-none focus:ring focus:ring-emerald-500/40"
                />
              </label>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <label className="block text-sm">
                <span className="text-slate-400">Plan</span>
                <select
                  name="planId"
                  value={signupForm.planId}
                  onChange={handleSignupChange}
                  className="mt-1 w-full rounded-2xl border border-slate-800 bg-slate-950/70 px-4 py-2 text-white outline-none focus:ring focus:ring-emerald-500/40"
                >
                  {planOptions.map((plan) => (
                    <option key={plan.id} value={plan.id} className="bg-slate-900">
                      {plan.label}
                    </option>
                  ))}
                </select>
                <p className="mt-2 text-xs text-slate-500">
                  {planOptions.find((plan) => plan.id.toString() === signupForm.planId)?.detail}
                </p>
              </label>
              <label className="block text-sm">
                <span className="text-slate-400">Trial days</span>
                <input
                  type="number"
                  min={0}
                  max={60}
                  name="trialDays"
                  value={signupForm.trialDays}
                  onChange={handleSignupChange}
                  className="mt-1 w-full rounded-2xl border border-slate-800 bg-slate-950/70 px-4 py-2 text-white outline-none focus:ring focus:ring-emerald-500/40"
                />
              </label>
            </div>

            <button
              type="submit"
              className="w-full rounded-2xl bg-emerald-500 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-slate-950 transition hover:bg-emerald-400 disabled:opacity-50"
              disabled={signupStatus.type === "loading"}
            >
              {signupStatus.type === "loading" ? "Creating..." : "Create tenant"}
            </button>
          </form>

          <form
            onSubmit={handleLoginSubmit}
            className="space-y-4 rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-800 p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.4em] text-slate-400">Tenant Login</p>
                <h2 className="text-2xl font-semibold text-white">Hospital console</h2>
              </div>
              <span className={`text-xs font-medium ${badgeClass(loginStatus)}`}>
                {loginStatus.message ?? "Awaiting credentials"}
              </span>
            </div>

            <label className="block text-sm">
              <span className="text-slate-400">Email</span>
              <input
                required
                type="email"
                name="email"
                value={loginForm.email}
                onChange={handleLoginChange}
                className="mt-1 w-full rounded-2xl border border-slate-800 bg-slate-950/70 px-4 py-2 text-white outline-none focus:ring focus:ring-emerald-500/40"
              />
            </label>

            <label className="block text-sm">
              <span className="text-slate-400">Password</span>
              <input
                required
                type="password"
                name="password"
                value={loginForm.password}
                onChange={handleLoginChange}
                className="mt-1 w-full rounded-2xl border border-slate-800 bg-slate-950/70 px-4 py-2 text-white outline-none focus:ring focus:ring-emerald-500/40"
              />
            </label>

            <div className="flex items-center justify-between text-xs text-slate-400">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded border-slate-600 text-emerald-500" />
                Remember device
              </label>
              <button type="button" className="font-semibold text-emerald-400">
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              className="w-full rounded-2xl border border-emerald-200/40 bg-slate-950 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-emerald-300 hover:bg-slate-900 disabled:opacity-50"
              disabled={loginStatus.type === "loading"}
            >
              {loginStatus.type === "loading" ? "Signing in..." : "Login"}
            </button>

            <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4 text-xs text-slate-400">
              <p className="font-semibold text-white">SAML & MFA</p>
              <p className="mt-1">
                Enterprise tenants can later upgrade with SAML SSO and device based multi-factor authentication.
              </p>
            </div>
          </form>
        </section>

        <section className="rounded-3xl border border-slate-800 bg-slate-900/40 p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-emerald-300">Why hospitals choose HospCare</p>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {valueProps.map((prop) => (
              <div key={prop} className="rounded-2xl border border-slate-800/60 bg-slate-950/50 p-4 text-sm text-slate-300">
                {prop}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
