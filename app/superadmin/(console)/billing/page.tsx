"use client";

import Link from "next/link";
import type { JSX } from "react";

const modules = [
  {
    title: "Appointment",
    count: 35,
    icon: "calendar",
    accent: "from-cyan-500/80 to-cyan-600",
    href: "/superadmin/billing/appointment",
  },
  { title: "OPD", count: 21, icon: "crosshair", accent: "from-emerald-500/80 to-emerald-600" },
  { title: "Pathology", count: 14, icon: "flask", accent: "from-fuchsia-500/80 to-fuchsia-600" },
  { title: "Radiology", count: 12, icon: "radiology", accent: "from-indigo-500/80 to-indigo-600" },
  { title: "Blood Issue", count: 8, icon: "blood", accent: "from-rose-500/80 to-rose-600" },
  { title: "Blood Component Issue", count: 5, icon: "drops", accent: "from-orange-500/80 to-amber-600" },
];

const cases = [
  { caseId: "OPDN991155", patient: "Maccoll Jee", mode: "Cash", type: "OPD", date: "11-06-2021", status: "Complete" },
  { caseId: "OPDN991154", patient: "Daniel Rathe", mode: "Bank Transfer", type: "OPD", date: "10-06-2021", status: "Complete" },
  { caseId: "IPDN883210", patient: "Sejal Chaudhry", mode: "Insurance", type: "IPD", date: "09-06-2021", status: "Pending" },
];

const icons = {
  calendar: (
    <path
      d="M6.5 5.5h11a1.5 1.5 0 0 1 1.5 1.5v11a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 5 18V7a1.5 1.5 0 0 1 1.5-1.5Z"
      strokeWidth={1.6}
    />
  ),
  crosshair: (
    <>
      <circle cx="12" cy="12" r="4" strokeWidth={1.6} />
      <path d="M12 3v2.5M21 12h-2.5M12 21v-2.5M3 12h2.5" strokeWidth={1.6} />
    </>
  ),
  flask: (
    <>
      <path d="M9 4h6" strokeWidth={1.6} />
      <path d="M10.5 4v5l-3.5 6.2A2 2 0 0 0 8.8 19h6.4a2 2 0 0 0 1.7-3.8L13.5 9V4" strokeWidth={1.6} />
    </>
  ),
  radiology: (
    <>
      <path d="M12 4v6l5.2-3a1 1 0 0 0-.4-1.9Z" strokeWidth={1.6} />
      <path d="M12 10 6.8 7a1 1 0 0 0-.4 1.9Z" strokeWidth={1.6} />
      <path d="M12 20v-6l5.2 3a1 1 0 0 1-.4 1.9Z" strokeWidth={1.6} />
      <path d="M12 14 6.8 17a1 1 0 0 1-.4-1.9Z" strokeWidth={1.6} />
    </>
  ),
  blood: (
    <path d="M12 4c2.4 3 4.8 5.7 4.8 8.5a4.8 4.8 0 1 1-9.6 0C7.2 9.7 9.6 7 12 4Z" strokeWidth={1.6} />
  ),
  drops: (
    <>
      <path d="M9.5 5.5C11 7.6 13 9.9 13 12.3A3.5 3.5 0 1 1 6 12.3c0-2.4 2-4.7 3.5-6.8Z" strokeWidth={1.6} />
      <path d="M15.5 8.5c1.1 1.6 2.2 3.1 2.2 5.1a2.7 2.7 0 0 1-5.4 0c0-2 1.1-3.5 3.2-5.1Z" strokeWidth={1.6} />
    </>
  ),
} satisfies Record<string, JSX.Element>;

function ModuleIcon({ name }: { name: keyof typeof icons }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-7 w-7"
    >
      {icons[name]}
    </svg>
  );
}

export default function BillingConsole() {
  return (
    <div className="flex flex-1 flex-col">
      <header className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-400">Billing</p>
          <h1 className="text-2xl font-semibold text-slate-900">Manage Collections</h1>
        </div>
        <div className="flex items-center gap-3 text-sm text-slate-500">
          <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-emerald-700">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            Live sync enabled
          </span>
          <button className="rounded-full border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-50">
            Export Summary
          </button>
        </div>
      </header>

      <main className="flex-1 bg-slate-50 p-6">
        <div className="grid gap-6 lg:grid-cols-[1.15fr,1fr]">
          <section className="space-y-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-400">Single Module Billing</p>
                <p className="text-sm text-slate-500">Select a module to view its latest receipts</p>
              </div>
              <button className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 transition hover:bg-emerald-100">
                Sync Now
              </button>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {modules.map((module) => {
                const Card = module.href ? Link : "div";

                return (
                  <Card
                    key={module.title}
                    {...(module.href ? { href: module.href } : {})}
                    className="group flex flex-col justify-between gap-3 rounded-2xl border border-slate-100 bg-slate-50/70 p-4 transition hover:-translate-y-0.5 hover:border-slate-200 hover:bg-white"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className={`rounded-2xl bg-gradient-to-br ${module.accent} p-3 text-white shadow-inner shadow-slate-300/30`}>
                        <ModuleIcon name={module.icon as keyof typeof icons} />
                      </div>
                      <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-500 shadow-sm">Active</span>
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-slate-900">{module.title}</p>
                      <p className="text-sm text-slate-500">{module.count} invoices</p>
                    </div>
                  </Card>
                );
              })}
            </div>
          </section>

          <section className="space-y-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-400">OPD/IPD Billing Through Case Id</p>
                <p className="text-sm text-slate-500">Search by case number to attach receipts</p>
              </div>
              <div className="flex flex-wrap items-center gap-2 text-sm text-slate-500">
                <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-blue-700">
                  <span className="h-2 w-2 rounded-full bg-blue-500" />
                  OPD
                </span>
                <span className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1 text-amber-700">
                  <span className="h-2 w-2 rounded-full bg-amber-500" />
                  IPD
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <label className="flex flex-1 items-center gap-2 text-sm text-slate-500">
                <span className="font-semibold text-slate-600">Case ID</span>
                <input
                  type="text"
                  placeholder="Enter Case ID"
                  className="w-full flex-1 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none ring-emerald-500/20 focus:ring"
                />
              </label>
              <button className="rounded-xl bg-sky-600 px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-500">
                Search
              </button>
            </div>

            <div className="rounded-2xl border border-slate-100">
              <div className="grid grid-cols-[1.2fr,1fr,1fr,1fr,1fr] items-center gap-4 border-b border-slate-100 bg-slate-50 px-4 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                <span>Case ID</span>
                <span>Patient</span>
                <span>Payment</span>
                <span>OPD/IPD</span>
                <span>Date</span>
              </div>
              <div className="divide-y divide-slate-100 text-sm text-slate-700">
                {cases.map((item) => (
                  <div key={item.caseId} className="grid grid-cols-[1.2fr,1fr,1fr,1fr,1fr] items-center gap-4 px-4 py-3">
                    <div className="flex items-center gap-3 text-sky-700">
                      <span className="rounded-lg bg-sky-50 px-3 py-1 text-xs font-semibold">{item.caseId}</span>
                      <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${
                        item.status === "Complete"
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-amber-50 text-amber-700"
                      }`}>
                        <span
                          className={`h-2 w-2 rounded-full ${
                            item.status === "Complete" ? "bg-emerald-500" : "bg-amber-500"
                          }`}
                        />
                        {item.status}
                      </span>
                    </div>
                    <span className="text-slate-700">{item.patient}</span>
                    <span className="text-slate-500">{item.mode}</span>
                    <span className="text-slate-500">{item.type}</span>
                    <span className="text-slate-500">{item.date}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
