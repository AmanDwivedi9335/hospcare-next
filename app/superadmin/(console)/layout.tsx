"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

type SidebarIconProps = {
  className?: string;
};

type SidebarIcon = (props: SidebarIconProps) => JSX.Element;

type SidebarItem = {
  label: string;
  href: string;
  icon: SidebarIcon;
};

type SidebarSection = {
  heading?: string;
  items: SidebarItem[];
};

type SuperadminLayoutProps = {
  children: ReactNode;
};

const createIcon = (children: React.ReactNode, name: string): SidebarIcon => {
  const IconComponent: SidebarIcon = ({ className = "h-5 w-5" }) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      {children}
    </svg>
  );

  IconComponent.displayName = name;
  return IconComponent;
};

const icons = {
  dashboard: createIcon(
    <>
      <rect x="3" y="3" width="7.5" height="7.5" rx="1.5" />
      <rect x="13.5" y="3" width="7.5" height="7.5" rx="1.5" />
      <rect x="3" y="13.5" width="7.5" height="7.5" rx="1.5" />
      <rect x="13.5" y="13.5" width="7.5" height="7.5" rx="1.5" />
    </>,
    "DashboardIcon",
  ),
  patient: createIcon(
    <>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 20.5c1.5-3 4.2-4.5 7-4.5s5.5 1.5 7 4.5" />
    </>,
    "PatientIcon",
  ),
  billing: createIcon(
    <>
      <path d="M7 4.5h7L19 9v10.5H7z" />
      <path d="M12 13c-1.2 0-2-.6-2-1.5s.8-1.5 2-1.5 2-.6 2-1.5-.8-1.5-2-1.5-2 .6-2 1.5" />
      <path d="M12 14.5v2" />
    </>,
    "BillingIcon",
  ),
  opd: createIcon(
    <>
      <path d="M12 6.5v11" />
      <path d="M6.5 12h11" />
      <circle cx="12" cy="12" r="7.5" />
    </>,
    "OpdIcon",
  ),
  ipd: createIcon(
    <>
      <path d="M6 7.5h12L21 11v8.5H3V11z" />
      <path d="M9.5 18v-4.5h5V18" />
      <path d="M10 7.5V5h4v2.5" />
    </>,
    "IpdIcon",
  ),
  pharmacy: createIcon(
    <>
      <rect x="4" y="5" width="16" height="14" rx="3" />
      <path d="M8.5 12h7" />
      <path d="M12 8.5v7" />
    </>,
    "PharmacyIcon",
  ),
  lab: createIcon(
    <>
      <path d="M9.5 4.5V13" />
      <path d="M14.5 4.5V13" />
      <path d="M6 13c0 3.5 2.4 6.5 6 6.5s6-3 6-6.5z" />
    </>,
    "LabIcon",
  ),
  blood: createIcon(
    <>
      <path d="M12 4c2 3 4.5 5.6 4.5 8.4a4.5 4.5 0 1 1-9 0C7.5 9.6 10 7 12 4Z" />
    </>,
    "BloodIcon",
  ),
  ambulance: createIcon(
    <>
      <path d="M3.5 15.5h17v3.5H20" />
      <path d="M17 8h2.5L22 11v4.5" />
      <rect x="3.5" y="8" width="13.5" height="7.5" rx="2" />
      <circle cx="8" cy="19" r="1.5" />
      <circle cx="17" cy="19" r="1.5" />
      <path d="M7 11.5h2" />
      <path d="M8 10.5v2" />
    </>,
    "AmbulanceIcon",
  ),
  frontOffice: createIcon(
    <>
      <path d="M4 20.5h16" />
      <rect x="5" y="4" width="14" height="12" rx="2" />
      <path d="M5 12h14" />
    </>,
    "FrontOfficeIcon",
  ),
  records: createIcon(
    <>
      <path d="M7 4h10" />
      <path d="M5 7h14" />
      <path d="M7 10h10" />
      <path d="M5 13h14" />
      <path d="M7 16h6" />
      <path d="M5 4v16" />
      <path d="M19 4v16" />
    </>,
    "RecordsIcon",
  ),
  branches: createIcon(
    <>
      <path d="M12 4v16" />
      <circle cx="12" cy="8" r="3" />
      <circle cx="7" cy="16" r="3" />
      <circle cx="17" cy="16" r="3" />
      <path d="M9 13l-1-2" />
      <path d="M15 13l1-2" />
    </>,
    "BranchesIcon",
  ),
  hr: createIcon(
    <>
      <circle cx="8" cy="8.5" r="2.5" />
      <circle cx="16" cy="8.5" r="2.5" />
      <path d="M4.5 19.5c1-2.7 2.8-4.5 5.5-4.5s4.5 1.8 5.5 4.5" />
      <path d="M12 11.5v1.5" />
    </>,
    "HumanResourceIcon",
  ),
};

const sidebarSections: SidebarSection[] = [
  {
    items: [
      { label: "Dashboard", href: "/superadmin/dashboard", icon: icons.dashboard },
      { label: "Patient", href: "/superadmin/patient", icon: icons.patient },
      { label: "Billing", href: "/superadmin/billing", icon: icons.billing },
    ],
  },
  {
    heading: "Appointment",
    items: [
      { label: "OPD - Out Patient", href: "/superadmin/appointment/opd", icon: icons.opd },
      { label: "IPD - In Patient", href: "/superadmin/appointment/ipd", icon: icons.ipd },
      { label: "Pharmacy", href: "/superadmin/appointment/pharmacy", icon: icons.pharmacy },
      { label: "Pathology", href: "/superadmin/appointment/pathology", icon: icons.lab },
      { label: "Radiology", href: "/superadmin/appointment/radiology", icon: icons.lab },
      { label: "Blood Bank", href: "/superadmin/appointment/blood-bank", icon: icons.blood },
      { label: "Ambulance", href: "/superadmin/appointment/ambulance", icon: icons.ambulance },
    ],
  },
  {
    items: [
      { label: "Front Office", href: "/superadmin/front-office", icon: icons.frontOffice },
      { label: "Birth & Death Record", href: "/superadmin/birth-death", icon: icons.records },
      { label: "Multi Branch", href: "/superadmin/multi-branch", icon: icons.branches },
      { label: "Human Resource", href: "/superadmin/human-resource", icon: icons.hr },
    ],
  },
];

const staff = [
  { name: "Admin 1", role: "Superadmin", status: "Online" },
  { name: "Accountant", role: "Finance", status: "Away" },
  { name: "Doctor", role: "Cardiology", status: "In OPD" },
];

export default function SuperadminLayout({ children }: SuperadminLayoutProps) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="flex min-h-screen">
        <aside className="hidden w-72 flex-shrink-0 flex-col bg-gradient-to-b from-slate-950 to-slate-900 px-4 py-6 text-white lg:flex">
          <div className="flex flex-col gap-2 rounded-3xl border border-white/10 bg-white/5 p-5 shadow-lg shadow-slate-900/20">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-cyan-500/10 p-3 text-cyan-300">
                <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M5 7.5h14v11H5z" />
                  <path d="M5 11h14" />
                  <path d="M8 4v3.5" />
                  <path d="M16 4v3.5" />
                </svg>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.4em] text-cyan-300">HospCare</p>
                <p className="text-xl font-semibold">Super Admin</p>
              </div>
            </div>
            <p className="text-sm text-slate-200">Monitor OPD, IPD, lab and billing KPIs across every tenant in real time.</p>
          </div>

          <nav className="mt-8 flex-1 space-y-6 text-sm">
            {sidebarSections.map((section, sectionIndex) => (
              <div key={`section-${sectionIndex}`}>
                {section.heading && (
                  <p className="px-3 text-xs font-semibold uppercase tracking-[0.4em] text-cyan-300/70">{section.heading}</p>
                )}
                <div className="mt-2 space-y-2">
                  {section.items.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                      <Link
                        key={item.label}
                        href={item.href}
                        aria-current={isActive ? "page" : undefined}
                        className={`group flex items-center justify-between rounded-xl px-3 py-2 transition hover:bg-white/10 ${
                          isActive ? "bg-cyan-500/20 text-white ring-1 ring-cyan-400/50" : "text-slate-200"
                        }`}
                      >
                        <span className="flex items-center gap-3">
                          <span
                            className={`rounded-2xl bg-white/5 p-2 transition group-hover:bg-white/10 ${
                              isActive ? "text-cyan-200" : "text-cyan-300/80"
                            }`}
                          >
                            <item.icon className="h-5 w-5" />
                          </span>
                          <span className="font-medium">{item.label}</span>
                        </span>
                        <svg
                          viewBox="0 0 24 24"
                          className={`h-3.5 w-3.5 transition ${
                            isActive ? "text-cyan-200" : "text-cyan-200/40 group-hover:text-cyan-200"
                          }`}
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M9 6l6 6-6 6" />
                        </svg>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>

          <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-4 text-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-cyan-300">Users online</p>
            <ul className="mt-4 space-y-3">
              {staff.map((member) => (
                <li key={member.name} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-white">{member.name}</p>
                    <p className="text-xs text-slate-300">{member.role}</p>
                  </div>
                  <span className="text-xs text-emerald-400">{member.status}</span>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <div className="flex flex-1 flex-col bg-slate-50">{children}</div>
      </div>
    </div>
  );
}
