"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";

type TenantRecord = {
  id: string;
  name: string;
  slug: string;
  contactEmail: string;
  contactPhone?: string | null;
  createdAt: string;
  modules: { module: { name: string } }[];
  subscription?: { plan?: { name: string } | null } | null;
};

type FormState = {
  name: string;
  slug: string;
  contactEmail: string;
  contactPhone: string;
  planId: string;
  trialDays: string;
};

type UpdateFormState = {
  name: string;
  slug: string;
  contactEmail: string;
  contactPhone: string;
};

const defaultCreateForm: FormState = {
  name: "",
  slug: "",
  contactEmail: "",
  contactPhone: "",
  planId: "1",
  trialDays: "14",
};

const defaultUpdateForm: UpdateFormState = {
  name: "",
  slug: "",
  contactEmail: "",
  contactPhone: "",
};

export function TenantsPanel() {
  const [tenants, setTenants] = useState<TenantRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [createForm, setCreateForm] = useState<FormState>(defaultCreateForm);
  const [updateForm, setUpdateForm] = useState<UpdateFormState>(defaultUpdateForm);
  const [createStatus, setCreateStatus] = useState<string | null>(null);
  const [updateStatus, setUpdateStatus] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [selectedTenantId, setSelectedTenantId] = useState<string | null>(null);

  const fetchTenants = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/tenants", { cache: "no-store" });
      if (!response.ok) {
        const body = await response.json();
        throw new Error(body.error ?? "Unable to load tenants");
      }
      const body = await response.json();
      setTenants(body.data ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to load tenants");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTenants();
  }, []);

  const handleCreate = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsCreating(true);
    setCreateStatus("Creating tenant...");

    try {
      const response = await fetch("/api/tenants", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: createForm.name,
          slug: createForm.slug,
          contactEmail: createForm.contactEmail,
          contactPhone: createForm.contactPhone || undefined,
          planId: Number(createForm.planId),
          trialDays: Number(createForm.trialDays) || 14,
          moduleIds: [],
        }),
      });

      if (!response.ok) {
        const body = await response.json();
        throw new Error(body.error ?? "Unable to create tenant");
      }

      setCreateStatus("Tenant created successfully");
      setCreateForm(defaultCreateForm);
      await fetchTenants();
    } catch (err) {
      setCreateStatus(err instanceof Error ? err.message : "Unable to create tenant");
    } finally {
      setIsCreating(false);
    }
  };

  const handleSelectTenant = (tenant: TenantRecord) => {
    setSelectedTenantId(tenant.id);
    setUpdateForm({
      name: tenant.name,
      slug: tenant.slug,
      contactEmail: tenant.contactEmail,
      contactPhone: tenant.contactPhone ?? "",
    });
    setUpdateStatus(null);
  };

  const handleUpdate = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedTenantId) {
      setUpdateStatus("Select a tenant to update");
      return;
    }

    setIsUpdating(true);
    setUpdateStatus("Saving changes...");

    try {
      const response = await fetch(`/api/tenants/${selectedTenantId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: updateForm.name,
          slug: updateForm.slug,
          contactEmail: updateForm.contactEmail,
          contactPhone: updateForm.contactPhone || undefined,
        }),
      });

      if (!response.ok) {
        const body = await response.json();
        throw new Error(body.error ?? "Unable to update tenant");
      }

      setUpdateStatus("Tenant updated");
      await fetchTenants();
    } catch (err) {
      setUpdateStatus(err instanceof Error ? err.message : "Unable to update tenant");
    } finally {
      setIsUpdating(false);
    }
  };

  const selectedTenant = useMemo(
    () => tenants.find((tenant) => tenant.id === selectedTenantId) ?? null,
    [selectedTenantId, tenants],
  );

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-500">Tenant Control</p>
          <h2 className="text-2xl font-semibold text-slate-900">Hospitals overview</h2>
        </div>
        <button
          type="button"
          onClick={fetchTenants}
          className="rounded-full border border-emerald-100 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700"
        >
          Refresh
        </button>
      </div>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-slate-200">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-50 text-xs uppercase tracking-widest text-slate-400">
            <tr>
              <th className="px-4 py-3">Hospital</th>
              <th className="px-4 py-3">Plan</th>
              <th className="px-4 py-3">Modules</th>
              <th className="px-4 py-3">Created</th>
              <th className="px-4 py-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center text-slate-400">
                  Loading tenants...
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center text-rose-500">
                  {error}
                </td>
              </tr>
            ) : tenants.length ? (
              tenants.map((tenant) => (
                <tr key={tenant.id} className="border-t border-slate-100">
                  <td className="px-4 py-3">
                    <div className="font-semibold text-slate-900">{tenant.name}</div>
                    <div className="text-xs text-slate-400">{tenant.slug}</div>
                    <div className="text-xs text-slate-400">{tenant.contactEmail}</div>
                  </td>
                  <td className="px-4 py-3">{tenant.subscription?.plan?.name ?? "-"}</td>
                  <td className="px-4 py-3">{tenant.modules.map((tm) => tm.module.name).join(", ") || "-"}</td>
                  <td className="px-4 py-3 text-xs text-slate-400">
                    {new Date(tenant.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      type="button"
                      onClick={() => handleSelectTenant(tenant)}
                      className="rounded-full border border-slate-200 px-4 py-1 text-xs font-semibold text-slate-700"
                    >
                      {selectedTenantId === tenant.id ? "Selected" : "Edit"}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center text-slate-400">
                  No tenants yet. Create one below.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <form onSubmit={handleCreate} className="space-y-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Create tenant</p>
            <p className="text-sm text-slate-500">Provision hospitals manually from Superadmin.</p>
          </div>
          <label className="block text-sm">
            <span className="text-slate-500">Name</span>
            <input
              required
              name="name"
              value={createForm.name}
              onChange={(event) => setCreateForm((prev) => ({ ...prev, name: event.target.value }))}
              className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-900 outline-none focus:ring focus:ring-emerald-200"
            />
          </label>
          <label className="block text-sm">
            <span className="text-slate-500">Slug</span>
            <input
              required
              name="slug"
              value={createForm.slug}
              onChange={(event) => setCreateForm((prev) => ({ ...prev, slug: event.target.value }))}
              className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-900 outline-none focus:ring focus:ring-emerald-200"
            />
          </label>
          <label className="block text-sm">
            <span className="text-slate-500">Contact email</span>
            <input
              required
              type="email"
              name="contactEmail"
              value={createForm.contactEmail}
              onChange={(event) => setCreateForm((prev) => ({ ...prev, contactEmail: event.target.value }))}
              className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-900 outline-none focus:ring focus:ring-emerald-200"
            />
          </label>
          <label className="block text-sm">
            <span className="text-slate-500">Contact phone</span>
            <input
              name="contactPhone"
              value={createForm.contactPhone}
              onChange={(event) => setCreateForm((prev) => ({ ...prev, contactPhone: event.target.value }))}
              className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-900 outline-none focus:ring focus:ring-emerald-200"
            />
          </label>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="block text-sm">
              <span className="text-slate-500">Plan ID</span>
              <input
                type="number"
                min={1}
                value={createForm.planId}
                onChange={(event) => setCreateForm((prev) => ({ ...prev, planId: event.target.value }))}
                className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-900 outline-none focus:ring focus:ring-emerald-200"
              />
            </label>
            <label className="block text-sm">
              <span className="text-slate-500">Trial days</span>
              <input
                type="number"
                min={0}
                max={60}
                value={createForm.trialDays}
                onChange={(event) => setCreateForm((prev) => ({ ...prev, trialDays: event.target.value }))}
                className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-900 outline-none focus:ring focus:ring-emerald-200"
              />
            </label>
          </div>
          <button
            type="submit"
            disabled={isCreating}
            className="w-full rounded-xl bg-emerald-600 py-2 text-sm font-semibold text-white hover:bg-emerald-500 disabled:opacity-60"
          >
            {isCreating ? "Creating..." : "Create tenant"}
          </button>
          {createStatus && <p className="text-xs text-slate-500">{createStatus}</p>}
        </form>

        <form onSubmit={handleUpdate} className="space-y-4 rounded-2xl border border-slate-200 bg-white p-4">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Update tenant</p>
            <p className="text-sm text-slate-500">
              {selectedTenant ? `Editing ${selectedTenant.name}` : "Select a tenant from the table."}
            </p>
          </div>
          <label className="block text-sm">
            <span className="text-slate-500">Name</span>
            <input
              name="edit-name"
              value={updateForm.name}
              onChange={(event) => setUpdateForm((prev) => ({ ...prev, name: event.target.value }))}
              className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-slate-900 outline-none focus:ring focus:ring-emerald-200"
            />
          </label>
          <label className="block text-sm">
            <span className="text-slate-500">Slug</span>
            <input
              name="edit-slug"
              value={updateForm.slug}
              onChange={(event) => setUpdateForm((prev) => ({ ...prev, slug: event.target.value }))}
              className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-slate-900 outline-none focus:ring focus:ring-emerald-200"
            />
          </label>
          <label className="block text-sm">
            <span className="text-slate-500">Contact email</span>
            <input
              type="email"
              name="edit-contact-email"
              value={updateForm.contactEmail}
              onChange={(event) => setUpdateForm((prev) => ({ ...prev, contactEmail: event.target.value }))}
              className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-slate-900 outline-none focus:ring focus:ring-emerald-200"
            />
          </label>
          <label className="block text-sm">
            <span className="text-slate-500">Contact phone</span>
            <input
              name="edit-contact-phone"
              value={updateForm.contactPhone}
              onChange={(event) => setUpdateForm((prev) => ({ ...prev, contactPhone: event.target.value }))}
              className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-slate-900 outline-none focus:ring focus:ring-emerald-200"
            />
          </label>
          <button
            type="submit"
            disabled={isUpdating}
            className="w-full rounded-xl border border-emerald-200 bg-white py-2 text-sm font-semibold text-emerald-600 hover:bg-emerald-50 disabled:opacity-60"
          >
            {isUpdating ? "Updating..." : "Update tenant"}
          </button>
          {updateStatus && <p className="text-xs text-slate-500">{updateStatus}</p>}
        </form>
      </div>
    </div>
  );
}
