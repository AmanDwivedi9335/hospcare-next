"use client";

import { useMemo, useState } from "react";

const appointmentData = [
  {
    id: "OPDN991155",
    patient: "Astin",
    registrationDate: "11/03/2025",
    appointmentTime: "02:37 PM",
    phone: "08027298336",
    gender: "Male",
    doctor: "Super Admin",
    visit: "Normal",
    referral: "Normal",
    liveConsultant: "Live",
    appointmentBy: "App",
    email: "a@gmail.com",
    address: "25 New Road, Abuja",
    fee: "12.00",
    discount: "0.00",
    paid: "12.00",
    status: "Approved",
    category: "today",
  },
  {
    id: "OPDN991154",
    patient: "Astin",
    registrationDate: "11/03/2025",
    appointmentTime: "09:00 AM",
    phone: "08027298336",
    gender: "Female",
    doctor: "Super Admin",
    visit: "Normal",
    referral: "Normal",
    liveConsultant: "Live",
    appointmentBy: "App",
    email: "a@gmail.com",
    address: "House No: 13, B, South Colony, Abuja",
    fee: "12.00",
    discount: "0.00",
    paid: "12.00",
    status: "Approved",
    category: "upcoming",
  },
  {
    id: "OPDN991153",
    patient: "Astin",
    registrationDate: "10/03/2025",
    appointmentTime: "07:45 AM",
    phone: "08027298336",
    gender: "Female",
    doctor: "Super Admin",
    visit: "Normal",
    referral: "Normal",
    liveConsultant: "Live",
    appointmentBy: "App",
    email: "a@gmail.com",
    address: "House No: 13, B, South Colony, Abuja",
    fee: "12.00",
    discount: "0.00",
    paid: "12.00",
    status: "Pending",
    category: "old",
  },
  {
    id: "OPDN991152",
    patient: "Samuel Philips",
    registrationDate: "10/03/2025",
    appointmentTime: "12:57 PM",
    phone: "08027298336",
    gender: "Male",
    doctor: "Super Admin",
    visit: "Normal",
    referral: "Normal",
    liveConsultant: "Live",
    appointmentBy: "App",
    email: "a@gmail.com",
    address: "House No: 13, B, South Colony, Abuja",
    fee: "12.00",
    discount: "0.00",
    paid: "12.00",
    status: "Approved",
    category: "old",
  },
];

const tabs = [
  { id: "today", label: "Today Appointment" },
  { id: "upcoming", label: "Upcoming Appointment" },
  { id: "old", label: "Old Appointment" },
];

export default function AppointmentBilling() {
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]["id"]>("today");

  const filteredData = useMemo(
    () => appointmentData.filter((item) => item.category === activeTab),
    [activeTab],
  );

  return (
    <div className="flex flex-1 flex-col bg-slate-50">
      <header className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-400">Billing</p>
          <h1 className="text-2xl font-semibold text-slate-900">Appointment Collections</h1>
          <p className="text-sm text-slate-500">Review appointment receipts and statuses</p>
        </div>
        <div className="flex items-center gap-3 text-sm text-slate-500">
          <div className="rounded-full bg-emerald-50 px-3 py-1 text-emerald-700">All modules synced</div>
          <button className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-50">
            Export
          </button>
        </div>
      </header>

      <main className="flex-1 space-y-6 px-6 pb-10 pt-6">
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex flex-wrap items-center gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
                  activeTab === tab.id
                    ? "bg-blue-600 text-white shadow-sm"
                    : "border border-slate-200 bg-slate-50 text-slate-600 hover:border-slate-300"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-3 text-sm text-slate-600">
            <span className="text-slate-500">100</span>
            <span className="text-slate-400">Records Found</span>
            <div className="grid grid-cols-2 divide-x divide-slate-200 overflow-hidden rounded-lg border border-slate-200">
              <button className="px-3 py-1.5 font-semibold text-blue-600">PDF</button>
              <button className="px-3 py-1.5 font-semibold text-slate-600 hover:bg-slate-50">Print</button>
            </div>
            <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-500">
              + Add Appointment
            </button>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm text-sm text-slate-600">
          <label className="flex items-center gap-2">
            <span className="text-slate-500">Date</span>
            <input
              type="date"
              className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none ring-emerald-500/20 focus:border-blue-400 focus:ring"
              defaultValue="2025-03-11"
            />
          </label>
          <label className="flex items-center gap-2">
            <span className="text-slate-500">Select</span>
            <select className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none ring-emerald-500/20 focus:border-blue-400 focus:ring">
              <option>All</option>
              <option>Approved</option>
              <option>Pending</option>
            </select>
          </label>
          <div className="flex flex-1 items-center gap-2">
            <input
              type="search"
              placeholder="Search..."
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none ring-emerald-500/20 focus:border-blue-400 focus:ring"
            />
            <button className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-500">
              Search
            </button>
          </div>
          <label className="flex items-center gap-2">
            <span className="text-slate-500">Status</span>
            <select className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none ring-emerald-500/20 focus:border-blue-400 focus:ring">
              <option>Approved</option>
              <option>Pending</option>
              <option>Cancelled</option>
            </select>
          </label>
          <label className="flex items-center gap-2">
            <span className="text-slate-500">Showing</span>
            <select className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none ring-emerald-500/20 focus:border-blue-400 focus:ring">
              <option>25</option>
              <option>50</option>
              <option>100</option>
            </select>
          </label>
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <table className="min-w-full text-left text-sm text-slate-700">
            <thead className="bg-slate-50 text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">
              <tr>
                <th className="px-4 py-3">Patient</th>
                <th className="px-4 py-3">Appointment No</th>
                <th className="px-4 py-3">Appointment Date</th>
                <th className="px-4 py-3">Phone</th>
                <th className="px-4 py-3">Gender</th>
                <th className="px-4 py-3">Doctor</th>
                <th className="px-4 py-3">Appointment Priority</th>
                <th className="px-4 py-3">Reference</th>
                <th className="px-4 py-3">Live Consultant</th>
                <th className="px-4 py-3">Appointment By</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Address</th>
                <th className="px-4 py-3">Fees</th>
                <th className="px-4 py-3">Discount</th>
                <th className="px-4 py-3">Paid Amount</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredData.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/80">
                  <td className="px-4 py-3 text-blue-700">
                    <div className="font-semibold text-blue-700">{item.patient}</div>
                    <p className="text-xs text-slate-500">{item.registrationDate}</p>
                  </td>
                  <td className="px-4 py-3">{item.id}</td>
                  <td className="px-4 py-3">
                    <div>{item.registrationDate}</div>
                    <p className="text-xs text-slate-500">{item.appointmentTime}</p>
                  </td>
                  <td className="px-4 py-3">{item.phone}</td>
                  <td className="px-4 py-3">{item.gender}</td>
                  <td className="px-4 py-3">{item.doctor}</td>
                  <td className="px-4 py-3">{item.visit}</td>
                  <td className="px-4 py-3">{item.referral}</td>
                  <td className="px-4 py-3">{item.liveConsultant}</td>
                  <td className="px-4 py-3">{item.appointmentBy}</td>
                  <td className="px-4 py-3">{item.email}</td>
                  <td className="px-4 py-3">{item.address}</td>
                  <td className="px-4 py-3">{item.fee}</td>
                  <td className="px-4 py-3">{item.discount}</td>
                  <td className="px-4 py-3">{item.paid}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                        item.status === "Approved" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
