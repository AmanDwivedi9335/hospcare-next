const incomeWidgets = [
  { title: "OPD Income", amount: "$23,040", detail: "Today", accent: "from-pink-500 to-rose-500" },
  { title: "IPD Income", amount: "$19,640", detail: "Today", accent: "from-orange-500 to-amber-500" },
  { title: "Pharmacy Income", amount: "$32,244", detail: "Today", accent: "from-teal-500 to-emerald-500" },
  { title: "Pathology Income", amount: "$18,090", detail: "Today", accent: "from-cyan-500 to-sky-500" },
  { title: "Blood Bank", amount: "$4,830", detail: "Today", accent: "from-fuchsia-500 to-purple-500" },
  { title: "Ambulance", amount: "$9,260", detail: "Today", accent: "from-blue-500 to-indigo-500" },
  { title: "General Income", amount: "$12,041", detail: "Today", accent: "from-emerald-500 to-lime-500" },
  { title: "Radiology", amount: "$21,809", detail: "Today", accent: "from-slate-600 to-slate-900" },
];

const monthlySegments = [
  { label: "OPD", value: 36, color: "#34d399" },
  { label: "IPD", value: 22, color: "#f97316" },
  { label: "Blood Bank", value: 12, color: "#f472b6" },
  { label: "Pharmacy", value: 18, color: "#0ea5e9" },
  { label: "Pathology", value: 12, color: "#a855f7" },
];

const staff = [
  { name: "Admin 1", role: "Superadmin", status: "Online" },
  { name: "Accountant", role: "Finance", status: "Away" },
  { name: "Doctor", role: "Cardiology", status: "In OPD" },
];

const calendarDays = [
  { day: "Mon", date: "17", active: false },
  { day: "Tue", date: "18", active: false },
  { day: "Wed", date: "19", active: false },
  { day: "Thu", date: "20", active: true },
  { day: "Fri", date: "21", active: false },
  { day: "Sat", date: "22", active: false },
  { day: "Sun", date: "23", active: false },
];

const timeline = [72, 85, 64, 76, 90, 82, 95, 88, 92, 85, 97, 90];

const quickMetrics = [
  { title: "Bed Occupancy", value: "86%", sub: "Across 4 branches" },
  { title: "New Admissions", value: "54", sub: "Last 24 hours" },
  { title: "Average Token Time", value: "12m", sub: "OPD queue" },
];

const patientTypes = [
  { label: "In Patient", value: 120 },
  { label: "Out Patient", value: 320 },
  { label: "Emergency", value: 42 },
];

const menuGroups = [
  { title: "Patients", items: ["Patient", "OPD - Out Patient", "IPD - In Patient", "Daycare"] },
  { title: "Departments", items: ["Pharmacy", "Pathology", "Blood Bank", "Radiology"] },
  { title: "Resources", items: ["Ambulance", "Inventory", "Finance"] },
];

const revenueSummary = [
  { label: "Collections", value: "$112,400", change: "+8.2%" },
  { label: "Expenses", value: "$78,210", change: "+1.4%" },
];

const scheduledEvents = [
  { title: "Equipment maintenance", time: "10:00 AM", department: "Radiology" },
  { title: "Purchase review", time: "01:00 PM", department: "Finance" },
];

function getLinePath(width: number, height: number, values: number[]) {
  if (values.length === 0) {
    return "";
  }
  return values
    .map((value, index) => {
      const x = (index / (values.length - 1 || 1)) * width;
      const y = height - (value / 100) * height;
      const prefix = index === 0 ? "M" : "L";
      return `${prefix}${x},${y}`;
    })
    .join(" ");
}

export default function SuperadminDashboard() {
  const width = 420;
  const height = 140;
  const chartPath = getLinePath(width, height, timeline);
  const totalSegments = monthlySegments.reduce((sum, segment) => sum + segment.value, 0);
  const radius = 48;
  const circumference = 2 * Math.PI * radius;
  const donutSegments = monthlySegments.reduce(
    (acc, segment) => {
      const length = (segment.value / totalSegments) * circumference;
      const previous = acc.at(-1);
      const offset = previous ? previous.offset - previous.length : 0;
      acc.push({ ...segment, length, offset });
      return acc;
    },
    [] as Array<{ label: string; value: number; color: string; length: number; offset: number }>,
  );

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="flex min-h-screen">
        <aside className="hidden w-72 flex-shrink-0 flex-col bg-gradient-to-b from-slate-900 to-slate-950 px-6 py-8 text-white lg:flex">
          <div className="space-y-1">
            <p className="text-xs uppercase tracking-[0.4em] text-emerald-400">HospCare</p>
            <p className="text-2xl font-semibold">Smart Hospital</p>
          </div>
          <div className="mt-6 rounded-2xl border border-white/10 bg-white/10 p-4 text-sm text-slate-200">
            Monitor OPD, IPD, lab and billing KPIs across every tenant in real time.
          </div>
          <nav className="mt-8 space-y-6 text-sm">
            {menuGroups.map((group) => (
              <div key={group.title}>
                <p className="text-xs uppercase tracking-[0.4em] text-slate-400">{group.title}</p>
                <ul className="mt-3 space-y-2">
                  {group.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-slate-200">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
          <div className="mt-auto space-y-3 rounded-2xl border border-white/10 bg-white/10 p-4 text-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-emerald-400">Users online</p>
            <ul className="space-y-3">
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

        <div className="flex flex-1 flex-col">
          <header className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 bg-white px-6 py-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-400">Dashboard</p>
              <h1 className="text-2xl font-semibold text-slate-900">Superadmin Overview</h1>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="text"
                placeholder="Search patient name"
                className="rounded-full border border-slate-200 px-4 py-2 text-sm text-slate-600"
              />
              <button className="rounded-full border border-slate-200 px-3 py-2 text-sm">Filter</button>
            </div>
          </header>

          <main className="flex-1 space-y-6 bg-slate-50 p-6">
            <section className="grid gap-4 lg:grid-cols-4">
              {incomeWidgets.map((widget) => (
                <div
                  key={widget.title}
                  className="rounded-2xl border border-white/60 bg-white p-4 shadow-sm shadow-slate-200"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">{widget.title}</p>
                  <p className="mt-2 text-2xl font-semibold text-slate-900">{widget.amount}</p>
                  <p className="text-xs text-slate-400">{widget.detail}</p>
                  <div className={`mt-4 h-1 rounded-full bg-gradient-to-r ${widget.accent}`} />
                </div>
              ))}
            </section>

            <section className="grid gap-6 lg:grid-cols-[3fr,2fr]">
              <div className="space-y-6 rounded-3xl border border-slate-200 bg-white p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Yearly Income & Expense</p>
                    <p className="text-sm text-slate-500">Income vs Expense</p>
                  </div>
                  <div className="text-xs text-slate-500">2025</div>
                </div>
                <div className="relative">
                  <svg viewBox={`0 0 ${width} ${height}`} className="w-full" role="img">
                    <title>Revenue trend</title>
                    <defs>
                      <linearGradient id="incomeGradient" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="#34d399" />
                        <stop offset="100%" stopColor="#34d399" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path d={chartPath} fill="none" stroke="#34d399" strokeWidth={4} strokeLinecap="round" />
                    <path d={`${chartPath} L${width},${height} L0,${height} Z`} fill="url(#incomeGradient)" opacity={0.2} />
                  </svg>
                  <div className="mt-4 flex justify-between text-xs text-slate-400">
                    {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map(
                      (month) => (
                        <span key={month}>{month}</span>
                      ),
                    )}
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  {revenueSummary.map((item) => (
                    <div key={item.label} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                      <p className="text-xs uppercase tracking-[0.3em] text-slate-400">{item.label}</p>
                      <p className="mt-2 text-2xl font-semibold text-slate-900">{item.value}</p>
                      <p className="text-xs text-emerald-500">{item.change}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-6 rounded-3xl border border-slate-200 bg-white p-6">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Monthly Income Overview</p>
                  <p className="text-sm text-slate-500">Share by department</p>
                </div>
                <div className="flex items-center gap-6">
                  <svg viewBox="0 0 160 160" className="h-44 w-44" role="img">
                    <title>Monthly overview donut chart</title>
                    <g transform="translate(80,80)">
                      {donutSegments.map((segment) => (
                        <circle
                          key={segment.label}
                          r={radius}
                          fill="transparent"
                          stroke={segment.color}
                          strokeWidth={18}
                          strokeDasharray={`${segment.length} ${circumference}`}
                          strokeDashoffset={segment.offset}
                          transform="rotate(-90)"
                        />
                      ))}
                      <circle r={32} fill="white" />
                    </g>
                  </svg>
                  <div className="space-y-3 text-sm">
                    {monthlySegments.map((segment) => (
                      <div key={segment.label} className="flex items-center gap-3">
                        <span className="h-3 w-3 rounded-full" style={{ background: segment.color }} />
                        <p className="font-semibold text-slate-700">{segment.label}</p>
                        <p className="text-xs text-slate-400">{segment.value}%</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="grid gap-3 text-sm text-slate-600">
                  {quickMetrics.map((metric) => (
                    <div
                      key={metric.title}
                      className="flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3"
                    >
                      <div>
                        <p className="text-xs uppercase tracking-[0.3em] text-slate-400">{metric.title}</p>
                        <p className="text-sm text-slate-500">{metric.sub}</p>
                      </div>
                      <p className="text-xl font-semibold text-slate-900">{metric.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section className="grid gap-6 lg:grid-cols-[2fr,1fr]">
              <div className="space-y-6 rounded-3xl border border-slate-200 bg-white p-6">
                <div className="flex flex-wrap items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Calendar</p>
                    <p className="text-sm text-slate-500">November 16 – 22 2025</p>
                  </div>
                  <div className="flex gap-2 text-xs">
                    <button className="rounded-full border border-slate-200 px-3 py-1">Month</button>
                    <button className="rounded-full border border-slate-200 bg-slate-900 px-3 py-1 text-white">Week</button>
                    <button className="rounded-full border border-slate-200 px-3 py-1">Day</button>
                  </div>
                </div>
                <div className="grid grid-cols-7 gap-4 text-center text-sm">
                  {calendarDays.map((day) => (
                    <div
                      key={day.day}
                      className={`rounded-2xl border p-4 ${
                        day.active ? "border-emerald-200 bg-emerald-50" : "border-slate-100 bg-slate-50"
                      }`}
                    >
                      <p className="text-xs uppercase tracking-[0.3em] text-slate-400">{day.day}</p>
                      <p className="mt-2 text-2xl font-semibold text-slate-900">{day.date}</p>
                    </div>
                  ))}
                </div>
                <div className="space-y-4 text-sm text-slate-600">
                  {scheduledEvents.map((event) => (
                    <div key={event.title} className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                      <p className="text-sm font-semibold text-slate-900">{event.title}</p>
                      <p className="text-xs text-slate-500">{event.department}</p>
                      <p className="text-xs text-slate-500">{event.time}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-6 rounded-3xl border border-slate-200 bg-white p-6">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Patient Mix</p>
                  <p className="text-sm text-slate-500">OPD vs IPD</p>
                </div>
                <div className="space-y-3">
                  {patientTypes.map((type) => (
                    <div key={type.label} className="space-y-1">
                      <div className="flex items-center justify-between text-sm text-slate-600">
                        <p className="font-semibold text-slate-700">{type.label}</p>
                        <p>{type.value}</p>
                      </div>
                      <div className="h-2 rounded-full bg-slate-100">
                        <div
                          className="h-full rounded-full bg-emerald-500"
                          style={{ width: `${Math.min(100, (type.value / 400) * 100)}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4 text-sm text-slate-600">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Alerts</p>
                  <p className="mt-2 text-slate-900">3 lab reports pending approval</p>
                  <p className="text-xs text-slate-500">Tap to escalate with the respective department.</p>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
