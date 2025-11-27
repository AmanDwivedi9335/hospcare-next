"use client";

import { useMemo, useState } from "react";

type Patient = {
  id: number;
  name: string;
  age: string;
  gender: "Male" | "Female";
  phone: string;
  guardian: string;
  address: string;
  tpa: string;
  tpaId: string;
  tpaValidity: string;
  email?: string;
  maritalStatus?: string;
  bloodGroup?: string;
  dob?: string;
  remarks?: string;
  allergies?: string;
  nationalId?: string;
  alternateNumber?: string;
};

type ColumnKey = "age" | "gender" | "phone" | "guardian" | "address" | "action";

const initialPatients: Patient[] = [
  {
    id: 1,
    name: "Oliver Thomas",
    age: "4 Years, 6 Month, 3 Day",
    gender: "Male",
    phone: "789654123",
    guardian: "Snow",
    address: "482, Kingsway, Brooklyn Newyork, CA",
    tpa: "DOHEALTH",
    tpaId: "TPA1023",
    tpaValidity: "2025-01-19",
  },
  {
    id: 2,
    name: "Emma MASH",
    age: "3 Years, 1 Month, 3 Day",
    gender: "Female",
    phone: "7689556234",
    guardian: "Jones",
    address: "Blackstone Park, Brooklyn Newyork, CA",
    tpa: "DOHEALTH",
    tpaId: "TPA123",
    tpaValidity: "2026-07-03",
  },
  {
    id: 3,
    name: "Miana Taylor",
    age: "4 Years, 10 Month, 3 Day",
    gender: "Female",
    phone: "4231345567",
    guardian: "Snow",
    address: "CA, USA",
    tpa: "DOHEALTH",
    tpaId: "TPA1843",
    tpaValidity: "2027-10-04",
  },
  {
    id: 4,
    name: "August Everheart",
    age: "3 Years, 6 Month, 5 Day",
    gender: "Male",
    phone: "7642345577",
    guardian: "John",
    address: "Blackstone Park, Brooklyn Newyork, CA",
    tpa: "DOHEALTH",
    tpaId: "TPA103",
    tpaValidity: "2026-08-20",
  },
  {
    id: 5,
    name: "Ava EVA",
    age: "5 Years, 9 Month, 5 Day",
    gender: "Female",
    phone: "7602345656",
    guardian: "Johnson",
    address: "Blackstone Park, Brooklyn Newyork, CA",
    tpa: "Dohealth",
    tpaId: "TPA105",
    tpaValidity: "2027-02-22",
  },
  {
    id: 6,
    name: "George Altter",
    age: "7 Years, 9 Month, 3 Day",
    gender: "Male",
    phone: "789065423",
    guardian: "Thomas",
    address: "482, Kingsway, Brooklyn Newyork, CA",
    tpa: "MAKETEHEALTH",
    tpaId: "TPA106",
    tpaValidity: "2027-04-26",
  },
];

const columnLabels: Record<ColumnKey, string> = {
  age: "Age",
  gender: "Gender",
  phone: "Phone",
  guardian: "Guardian Name",
  address: "Address",
  action: "Action",
};

const genders = ["Male", "Female"] as const;
const bloodGroups = ["A+"]; // can be extended when backend is available
const maritalStatuses = ["Married", "Single", "Widowed", "Divorced"];

function AddPatientModal({
  open,
  onClose,
  onSave,
}: {
  open: boolean;
  onClose: () => void;
  onSave: (patient: Patient) => void;
}) {
  const [form, setForm] = useState({
    name: "",
    guardian: "",
    gender: "Male",
    dob: "",
    ageYears: "",
    ageMonths: "",
    ageDays: "",
    bloodGroup: "",
    maritalStatus: "",
    phone: "",
    email: "",
    address: "",
    remarks: "",
    allergies: "",
    tpa: "",
    tpaId: "",
    tpaValidity: "",
    nationalId: "",
    alternateNumber: "",
  });

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-8">
      <div className="w-full max-w-5xl rounded-xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b px-6 py-4">
          <h2 className="text-xl font-semibold text-slate-800">Add Patient</h2>
          <button
            onClick={onClose}
            className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700 hover:bg-slate-200"
          >
            Close
          </button>
        </div>

        <div className="max-h-[70vh] overflow-y-auto px-6 py-6 text-sm text-slate-700">
          <div className="grid gap-4 md:grid-cols-2">
            <label className="flex flex-col gap-1">
              <span className="font-medium">Patient Name</span>
              <input
                className="rounded-lg border border-slate-300 px-3 py-2"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Enter Patient Name"
              />
            </label>
            <label className="flex flex-col gap-1">
              <span className="font-medium">Guardian Name</span>
              <input
                className="rounded-lg border border-slate-300 px-3 py-2"
                value={form.guardian}
                onChange={(e) => setForm({ ...form, guardian: e.target.value })}
                placeholder="Enter Guardian Name"
              />
            </label>
          </div>

          <div className="mt-4 grid gap-4 md:grid-cols-3">
            <label className="flex flex-col gap-1">
              <span className="font-medium">Gender</span>
              <select
                className="rounded-lg border border-slate-300 px-3 py-2"
                value={form.gender}
                onChange={(e) => setForm({ ...form, gender: e.target.value })}
              >
                {genders.map((gender) => (
                  <option key={gender}>{gender}</option>
                ))}
              </select>
            </label>
            <label className="flex flex-col gap-1">
              <span className="font-medium">Date Of Birth</span>
              <input
                type="date"
                className="rounded-lg border border-slate-300 px-3 py-2"
                value={form.dob}
                onChange={(e) => setForm({ ...form, dob: e.target.value })}
              />
            </label>
            <div className="flex flex-col gap-1">
              <span className="font-medium">Age (y/m/d)</span>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { key: "ageYears", placeholder: "Year" },
                  { key: "ageMonths", placeholder: "Month" },
                  { key: "ageDays", placeholder: "Day" },
                ].map(({ key, placeholder }) => (
                  <input
                    key={key}
                    className="rounded-lg border border-slate-300 px-3 py-2"
                    placeholder={placeholder}
                    value={form[key as keyof typeof form]}
                    onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="mt-4 grid gap-4 md:grid-cols-3">
            <label className="flex flex-col gap-1">
              <span className="font-medium">Blood Group</span>
              <select
                className="rounded-lg border border-slate-300 px-3 py-2"
                value={form.bloodGroup}
                onChange={(e) => setForm({ ...form, bloodGroup: e.target.value })}
              >
                <option value="">Select</option>
                {bloodGroups.map((group) => (
                  <option key={group}>{group}</option>
                ))}
              </select>
            </label>
            <label className="flex flex-col gap-1">
              <span className="font-medium">Marital Status</span>
              <select
                className="rounded-lg border border-slate-300 px-3 py-2"
                value={form.maritalStatus}
                onChange={(e) => setForm({ ...form, maritalStatus: e.target.value })}
              >
                <option value="">Select</option>
                {maritalStatuses.map((status) => (
                  <option key={status}>{status}</option>
                ))}
              </select>
            </label>
            <div className="flex flex-col gap-1">
              <span className="font-medium">Patient Photo</span>
              <div className="flex h-full min-h-20 items-center justify-center rounded-lg border border-dashed border-slate-300 text-slate-500">
                Drop a file here or click
              </div>
            </div>
          </div>

          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <label className="flex flex-col gap-1">
              <span className="font-medium">Phone</span>
              <input
                className="rounded-lg border border-slate-300 px-3 py-2"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="Phone"
              />
            </label>
            <label className="flex flex-col gap-1">
              <span className="font-medium">Email</span>
              <input
                type="email"
                className="rounded-lg border border-slate-300 px-3 py-2"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="Email"
              />
            </label>
          </div>

          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <label className="flex flex-col gap-1">
              <span className="font-medium">Address</span>
              <input
                className="rounded-lg border border-slate-300 px-3 py-2"
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                placeholder="Address"
              />
            </label>
            <label className="flex flex-col gap-1">
              <span className="font-medium">Remarks</span>
              <input
                className="rounded-lg border border-slate-300 px-3 py-2"
                value={form.remarks}
                onChange={(e) => setForm({ ...form, remarks: e.target.value })}
                placeholder="Remarks"
              />
            </label>
          </div>

          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <label className="flex flex-col gap-1">
              <span className="font-medium">Any Known Allergies</span>
              <input
                className="rounded-lg border border-slate-300 px-3 py-2"
                value={form.allergies}
                onChange={(e) => setForm({ ...form, allergies: e.target.value })}
                placeholder="Allergies"
              />
            </label>
            <label className="flex flex-col gap-1">
              <span className="font-medium">TPA</span>
              <input
                className="rounded-lg border border-slate-300 px-3 py-2"
                value={form.tpa}
                onChange={(e) => setForm({ ...form, tpa: e.target.value })}
                placeholder="TPA"
              />
            </label>
          </div>

          <div className="mt-4 grid gap-4 md:grid-cols-3">
            <label className="flex flex-col gap-1">
              <span className="font-medium">TPA ID</span>
              <input
                className="rounded-lg border border-slate-300 px-3 py-2"
                value={form.tpaId}
                onChange={(e) => setForm({ ...form, tpaId: e.target.value })}
                placeholder="TPA ID"
              />
            </label>
            <label className="flex flex-col gap-1">
              <span className="font-medium">TPA Validity</span>
              <input
                type="date"
                className="rounded-lg border border-slate-300 px-3 py-2"
                value={form.tpaValidity}
                onChange={(e) => setForm({ ...form, tpaValidity: e.target.value })}
              />
            </label>
            <label className="flex flex-col gap-1">
              <span className="font-medium">National Identification Number</span>
              <input
                className="rounded-lg border border-slate-300 px-3 py-2"
                value={form.nationalId}
                onChange={(e) => setForm({ ...form, nationalId: e.target.value })}
                placeholder="National Identification Number"
              />
            </label>
          </div>

          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <label className="flex flex-col gap-1">
              <span className="font-medium">Alternate Number</span>
              <input
                className="rounded-lg border border-slate-300 px-3 py-2"
                value={form.alternateNumber}
                onChange={(e) => setForm({ ...form, alternateNumber: e.target.value })}
                placeholder="Alternate Number"
              />
            </label>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 border-t px-6 py-4">
          <button
            onClick={onClose}
            className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              const ageParts = [form.ageYears, form.ageMonths, form.ageDays].filter(Boolean);
              const ageLabel = ageParts.length
                ? `${form.ageYears || "0"} Years, ${form.ageMonths || "0"} Month, ${form.ageDays || "0"} Day`
                : "";

              const newPatient: Patient = {
                id: Date.now(),
                name: form.name || "New Patient",
                age: ageLabel || "Not provided",
                gender: (form.gender as Patient["gender"]) || "Male",
                phone: form.phone || "-",
                dob: form.dob,
                remarks: form.remarks,
                allergies: form.allergies,
                guardian: form.guardian || "",
                address: form.address || "",
                nationalId: form.nationalId,
                alternateNumber: form.alternateNumber,
                tpa: form.tpa || "",
                tpaId: form.tpaId || "",
                tpaValidity: form.tpaValidity || "",
                email: form.email,
                bloodGroup: form.bloodGroup,
                maritalStatus: form.maritalStatus,
              };

              onSave(newPatient);
              onClose();
            }}
            className="rounded-lg bg-emerald-600 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default function PatientListPage() {
  const [patients, setPatients] = useState(initialPatients);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [search, setSearch] = useState("");
  const [genderFilter, setGenderFilter] = useState<string>("");
  const [maritalFilter, setMaritalFilter] = useState<string>("");
  const [bloodGroupFilter, setBloodGroupFilter] = useState<string>("");
  const [visibleColumns, setVisibleColumns] = useState<Record<ColumnKey, boolean>>({
    age: true,
    gender: true,
    phone: true,
    guardian: true,
    address: true,
    action: true,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredPatients = useMemo(() => {
    return patients.filter((patient) => {
      const matchesSearch = patient.name.toLowerCase().includes(search.toLowerCase());
      const matchesGender = genderFilter ? patient.gender === genderFilter : true;
      const matchesMarital = maritalFilter ? patient.maritalStatus === maritalFilter : true;
      const matchesBlood = bloodGroupFilter ? patient.bloodGroup === bloodGroupFilter : true;

      return matchesSearch && matchesGender && matchesMarital && matchesBlood;
    });
  }, [patients, search, genderFilter, maritalFilter, bloodGroupFilter]);

  const toggleSelectAll = (checked: boolean) => {
    setSelectedIds(checked ? filteredPatients.map((p) => p.id) : []);
  };

  const toggleSelectOne = (id: number, checked: boolean) => {
    setSelectedIds((prev) => (checked ? [...prev, id] : prev.filter((pid) => pid !== id)));
  };

  const toggleColumn = (key: ColumnKey) => {
    setVisibleColumns((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="flex flex-1 flex-col">
      <header className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 bg-white px-6 py-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-400">Hospital</p>
          <h1 className="text-2xl font-semibold text-slate-900">Patient Management</h1>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsModalOpen(true)}
            className="rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500"
          >
            + Add New Patient
          </button>
          <button className="rounded-full border border-slate-200 px-3 py-2 text-sm text-slate-600">Download</button>
        </div>
      </header>

      <main className="flex-1 space-y-6 bg-slate-50 p-6">
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-4">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-emerald-600">Hospital</p>
              <h2 className="text-xl font-semibold text-slate-900">Patient List</h2>
              <p className="text-sm text-slate-500">Manage registrations, filters, exports and quick actions.</p>
            </div>
            <div className="flex flex-wrap items-center gap-2 text-sm">
              <button className="rounded-full border border-slate-200 px-4 py-2 text-slate-600 hover:border-emerald-300">Enabled Patient List</button>
              <button
                onClick={() => setIsModalOpen(true)}
                className="rounded-full bg-emerald-600 px-4 py-2 font-semibold text-white shadow-sm hover:bg-emerald-500"
              >
                + Add New Patient
              </button>
              <button className="rounded-full border border-slate-200 px-4 py-2 text-slate-600 hover:border-emerald-300">Import Patient</button>
              <button className="rounded-full border border-slate-200 px-4 py-2 text-slate-600 hover:border-emerald-300">Download Sample File</button>
              <button className="rounded-full border border-red-200 bg-red-50 px-4 py-2 text-red-600 hover:border-red-400">Delete Selected</button>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-3 text-sm">
            <input
              className="w-full rounded-full border border-slate-200 bg-white px-4 py-2 text-slate-700 placeholder:text-slate-400 md:w-80"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <div className="flex flex-wrap items-center gap-2">
              <label className="flex items-center gap-2 rounded-full border border-slate-200 px-3 py-2 text-slate-600">
                <span>Gender</span>
                <select
                  value={genderFilter}
                  onChange={(e) => setGenderFilter(e.target.value)}
                  className="bg-transparent outline-none"
                >
                  <option value="">All</option>
                  {genders.map((gender) => (
                    <option key={gender}>{gender}</option>
                  ))}
                </select>
              </label>
              <label className="flex items-center gap-2 rounded-full border border-slate-200 px-3 py-2 text-slate-600">
                <span>Marital Status</span>
                <select
                  value={maritalFilter}
                  onChange={(e) => setMaritalFilter(e.target.value)}
                  className="bg-transparent outline-none"
                >
                  <option value="">Any</option>
                  {maritalStatuses.map((status) => (
                    <option key={status}>{status}</option>
                  ))}
                </select>
              </label>
              <label className="flex items-center gap-2 rounded-full border border-slate-200 px-3 py-2 text-slate-600">
                <span>Blood Group</span>
                <select
                  value={bloodGroupFilter}
                  onChange={(e) => setBloodGroupFilter(e.target.value)}
                  className="bg-transparent outline-none"
                >
                  <option value="">Any</option>
                  {bloodGroups.map((group) => (
                    <option key={group}>{group}</option>
                  ))}
                </select>
              </label>
              <div className="flex items-center gap-2 rounded-full border border-slate-200 px-3 py-2 text-slate-600">
                <span>Column visibility:</span>
                <div className="flex flex-wrap gap-2">
                  {(Object.keys(columnLabels) as ColumnKey[]).map((key) => (
                    <label key={key} className="flex items-center gap-1 rounded-full bg-slate-50 px-2 py-1 text-xs">
                      <input
                        type="checkbox"
                        checked={visibleColumns[key]}
                        onChange={() => toggleColumn(key)}
                        className="accent-emerald-500"
                      />
                      {columnLabels[key]}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedIds.length === filteredPatients.length && filteredPatients.length > 0}
                  onChange={(e) => toggleSelectAll(e.target.checked)}
                  className="accent-emerald-500"
                />
                <span>Patient Name</span>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <label className="flex items-center gap-1">
                  Show
                  <select className="rounded border border-slate-200 bg-white px-2 py-1">
                    <option>10</option>
                    <option>25</option>
                    <option>50</option>
                  </select>
                </label>
                <span>entries</span>
              </div>
            </div>
            <div className="overflow-x-auto bg-white">
              <table className="min-w-full text-left text-sm text-slate-700">
                <thead className="bg-slate-50 text-xs uppercase text-slate-500">
                  <tr>
                    <th className="px-4 py-3">
                      <input
                        type="checkbox"
                        checked={selectedIds.length === filteredPatients.length && filteredPatients.length > 0}
                        onChange={(e) => toggleSelectAll(e.target.checked)}
                        className="accent-emerald-500"
                      />
                    </th>
                    <th className="px-4 py-3">Patient Name</th>
                    {visibleColumns.age && <th className="px-4 py-3">Age</th>}
                    {visibleColumns.gender && <th className="px-4 py-3">Gender</th>}
                    {visibleColumns.phone && <th className="px-4 py-3">Phone</th>}
                    {visibleColumns.guardian && <th className="px-4 py-3">Guardian Name</th>}
                    {visibleColumns.address && <th className="px-4 py-3">Address</th>}
                    {visibleColumns.action && <th className="px-4 py-3">Action</th>}
                  </tr>
                </thead>
                <tbody>
                  {filteredPatients.map((patient) => (
                    <tr key={patient.id} className="border-t border-slate-200 hover:bg-slate-50">
                      <td className="px-4 py-3">
                        <input
                          type="checkbox"
                          checked={selectedIds.includes(patient.id)}
                          onChange={(e) => toggleSelectOne(patient.id, e.target.checked)}
                          className="accent-emerald-500"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-blue-500 text-sm font-semibold text-white">
                            {patient.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-semibold text-slate-900">{patient.name}</p>
                            <p className="text-xs text-slate-500">TPA ID: {patient.tpaId}</p>
                          </div>
                        </div>
                      </td>
                      {visibleColumns.age && <td className="px-4 py-3 text-slate-700">{patient.age}</td>}
                      {visibleColumns.gender && <td className="px-4 py-3 text-slate-700">{patient.gender}</td>}
                      {visibleColumns.phone && <td className="px-4 py-3 text-slate-700">{patient.phone}</td>}
                      {visibleColumns.guardian && <td className="px-4 py-3 text-slate-700">{patient.guardian}</td>}
                      {visibleColumns.address && <td className="px-4 py-3 text-slate-700">{patient.address}</td>}
                      {visibleColumns.action && (
                        <td className="px-4 py-3">
                          <select className="rounded border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700">
                            <option>Show</option>
                            <option>IPD</option>
                            <option>Pharmacy</option>
                            <option>Pathology</option>
                            <option>Radiology</option>
                            <option>Ambulance</option>
                          </select>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-sm text-slate-600">
            <p>
              Showing 1 to {filteredPatients.length} of {patients.length} entries
            </p>
            <div className="flex items-center gap-2">
              <button className="rounded-lg border border-slate-200 px-3 py-1 hover:border-emerald-300">Previous</button>
              <button className="rounded-lg border border-slate-200 px-3 py-1 hover:border-emerald-300">1</button>
              <button className="rounded-lg border border-slate-200 px-3 py-1 hover:border-emerald-300">2</button>
              <button className="rounded-lg border border-slate-200 px-3 py-1 hover:border-emerald-300">3</button>
              <button className="rounded-lg border border-slate-200 px-3 py-1 hover:border-emerald-300">Next</button>
            </div>
          </div>
        </section>
      </main>

      <AddPatientModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={(patient) => setPatients((prev) => [...prev, patient])}
      />
    </div>
  );
}
