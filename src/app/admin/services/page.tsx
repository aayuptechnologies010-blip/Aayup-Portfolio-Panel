"use client";

import { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  CheckCircle2, 
  XCircle, 
  Loader2, 
  AlertCircle,
  Globe,
  Smartphone,
  LayoutDashboard,
  Bot,
  Palette,
  Cloud,
  Layers
} from "lucide-react";
import { fetchWithAuth } from "@/lib/api";
import { TableSkeleton } from "@/components/admin/Skeleton";

interface ServiceItem {
  _id: string;
  title: string;
  category: string;
  icon: string;
  description: string;
  highlight: string;
  deliverables: string[];
  techTags: string[];
  order: number;
  active: boolean;
}

const AVAILABLE_ICONS = ["Globe", "Smartphone", "LayoutDashboard", "Bot", "Palette", "Cloud"];

const iconComponents: Record<string, any> = {
  Globe,
  Smartphone,
  LayoutDashboard,
  Bot,
  Palette,
  Cloud,
};

export default function AdminServicesPage() {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const initialForm = {
    title: "",
    category: "Full-Stack Development",
    icon: "Globe",
    description: "",
    highlight: "",
    deliverables: "",
    techTags: "",
    order: 0,
    active: true,
  };

  const [formData, setFormData] = useState(initialForm);

  const fetchServices = async () => {
    setLoading(true);
    try {
      const res = await fetchWithAuth(
        `/services/admin/all?page=${page}&limit=10&search=${encodeURIComponent(search)}`
      );
      if (res.ok) {
        const data = await res.json();
        setServices(data.data || []);
        setTotalPages(data.pagination?.totalPages || 1);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, [page, search]);

  const handleOpenCreate = () => {
    setEditingId(null);
    setFormData(initialForm);
    setError(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (s: ServiceItem) => {
    setEditingId(s._id);
    setFormData({
      title: s.title,
      category: s.category,
      icon: s.icon || "Globe",
      description: s.description,
      highlight: s.highlight || "",
      deliverables: s.deliverables ? s.deliverables.join("\n") : "",
      techTags: s.techTags ? s.techTags.join(", ") : "",
      order: s.order || 0,
      active: s.active !== false,
    });
    setError(null);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this service?")) return;
    try {
      const res = await fetchWithAuth(`/services/${id}`, { method: "DELETE" });
      if (res.ok) {
        fetchServices();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const payload = {
      title: formData.title,
      category: formData.category,
      icon: formData.icon,
      description: formData.description,
      highlight: formData.highlight,
      deliverables: formData.deliverables
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean),
      techTags: formData.techTags
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      order: Number(formData.order),
      active: formData.active,
    };

    try {
      const url = editingId ? `/services/${editingId}` : "/services";
      const method = editingId ? "PUT" : "POST";
      const res = await fetchWithAuth(url, {
        method,
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setIsModalOpen(false);
        fetchServices();
      } else {
        const d = await res.json().catch(() => ({}));
        setError(d.message || "Failed to save service");
      }
    } catch (err: any) {
      setError(err.message || "Network error");
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6 text-left">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E2E8F0]">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#1769AA] bg-[#E3EEF8] px-3 py-1 rounded-full">
              SERVICE OFFERINGS MANAGEMENT
            </span>
            <h1 className="text-3xl font-black text-[#0B1220] mt-2">Manage Capabilities &amp; Services</h1>
            <p className="text-slate-600 text-xs mt-1">
              Add and update engineering services shown in the Services section of the portfolio.
            </p>
          </div>

          <button
            onClick={handleOpenCreate}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#1769AA] hover:bg-[#0D4F85] text-white text-xs font-bold uppercase tracking-wider shadow-sm transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Add New Service
          </button>
        </div>

        {/* Search */}
        <div className="bg-white p-4 rounded-xl border border-[#E2E8F0] shadow-sm">
          <div className="relative max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search services by title..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="w-full pl-9 pr-4 py-2 border border-slate-300 rounded-lg text-xs focus:outline-none focus:border-[#1769AA] text-slate-800"
            />
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm overflow-hidden text-left">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F8FBFE] border-b border-[#E2E8F0] text-slate-500 uppercase font-bold tracking-wider">
                <tr>
                  <th className="py-3.5 px-4">Icon</th>
                  <th className="py-3.5 px-4">Service Title</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">Highlight</th>
                  <th className="py-3.5 px-4">Tech Tags</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {loading ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-slate-400">
                      <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2 text-[#1769AA]" />
                      <span>Loading services...</span>
                    </td>
                  </tr>
                ) : services.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-slate-400">
                      No services found. Click &quot;Add New Service&quot; to create one.
                    </td>
                  </tr>
                ) : (
                  services.map((s) => {
                    const IconComponent = iconComponents[s.icon] || Globe;
                    return (
                      <tr key={s._id} className="hover:bg-slate-50 transition-colors">
                        <td className="py-3 px-4">
                          <div className="w-8 h-8 rounded-lg bg-[#E3EEF8] text-[#1769AA] flex items-center justify-center">
                            <IconComponent className="w-4 h-4" />
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <strong className="block text-slate-900 text-sm">{s.title}</strong>
                          <span className="text-slate-500 text-[11px] line-clamp-1">{s.description}</span>
                        </td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-0.5 rounded bg-slate-100 font-semibold text-slate-700 text-[11px]">
                            {s.category}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-slate-600 max-w-[180px] truncate">
                          {s.highlight || "-"}
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex flex-wrap gap-1 max-w-[200px]">
                            {s.techTags?.slice(0, 3).map((t, i) => (
                              <span key={i} className="px-1.5 py-0.5 rounded bg-[#E3EEF8] text-[#1769AA] text-[10px] font-bold">
                                {t}
                              </span>
                            ))}
                            {(s.techTags?.length || 0) > 3 && (
                              <span className="text-[10px] text-slate-400">+{s.techTags.length - 3}</span>
                            )}
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          {s.active ? (
                            <span className="inline-flex items-center gap-1 text-emerald-600 font-bold text-[11px]">
                              <CheckCircle2 className="w-3.5 h-3.5" /> Active
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-slate-400 font-bold text-[11px]">
                              <XCircle className="w-3.5 h-3.5" /> Inactive
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => handleOpenEdit(s)}
                              className="p-1.5 rounded hover:bg-slate-100 text-slate-600 hover:text-[#1769AA] transition-colors cursor-pointer"
                              title="Edit"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(s._id)}
                              className="p-1.5 rounded hover:bg-rose-50 text-slate-600 hover:text-rose-600 transition-colors cursor-pointer"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="p-4 border-t border-[#E2E8F0] flex items-center justify-between text-xs text-slate-600">
              <span>Page {page} of {totalPages}</span>
              <div className="flex gap-2">
                <button
                  disabled={page <= 1}
                  onClick={() => setPage(page - 1)}
                  className="px-3 py-1 rounded border border-slate-300 disabled:opacity-40 hover:bg-slate-50 cursor-pointer"
                >
                  Prev
                </button>
                <button
                  disabled={page >= totalPages}
                  onClick={() => setPage(page + 1)}
                  className="px-3 py-1 rounded border border-slate-300 disabled:opacity-40 hover:bg-slate-50 cursor-pointer"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Form */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-[#E2E8F0] shadow-2xl p-6 sm:p-8 space-y-6 text-left">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <h3 className="text-xl font-black text-[#0B1220]">
                  {editingId ? "Edit Service Offering" : "Add New Service Offering"}
                </h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-sm cursor-pointer"
                >
                  ✕
                </button>
              </div>

              {error && (
                <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4 text-xs text-slate-700">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Service Title *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Web &amp; SaaS Engineering"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-[#1769AA]"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Category Tag *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Full-Stack Development"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-[#1769AA]"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Select Icon
                    </label>
                    <select
                      value={formData.icon}
                      onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-[#1769AA] bg-white"
                    >
                      {AVAILABLE_ICONS.map((ic) => (
                        <option key={ic} value={ic}>{ic}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Highlight / Feature Banner
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Engineered for 10x traffic bursts"
                      value={formData.highlight}
                      onChange={(e) => setFormData({ ...formData, highlight: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-[#1769AA]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Service Description *
                  </label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Provide overview of what this service delivers..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-[#1769AA]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Deliverables (One per line)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Sub-second page speeds&#10;Dynamic Headless CMS&#10;PWA &amp; Responsive edge caching"
                    value={formData.deliverables}
                    onChange={(e) => setFormData({ ...formData, deliverables: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-[#1769AA]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Tech Stack Tags (Comma separated)
                  </label>
                  <input
                    type="text"
                    placeholder="Next.js, React, Node.js, TypeScript"
                    value={formData.techTags}
                    onChange={(e) => setFormData({ ...formData, techTags: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-[#1769AA]"
                  />
                </div>

                <div className="flex items-center gap-6 pt-2">
                  <div>
                    <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Display Order
                    </label>
                    <input
                      type="number"
                      value={formData.order}
                      onChange={(e) => setFormData({ ...formData, order: Number(e.target.value) })}
                      className="w-24 px-3 py-1.5 border border-slate-300 rounded-lg focus:outline-none focus:border-[#1769AA]"
                    />
                  </div>

                  <div className="flex items-center gap-2 mt-4">
                    <input
                      type="checkbox"
                      id="active"
                      checked={formData.active}
                      onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                      className="w-4 h-4 text-[#1769AA] rounded border-slate-300"
                    />
                    <label htmlFor="active" className="font-bold text-slate-800 cursor-pointer">
                      Active &amp; Visible on Portfolio
                    </label>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 border border-slate-300 text-slate-700 font-bold uppercase rounded-lg hover:bg-slate-50 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="px-5 py-2 bg-[#1769AA] hover:bg-[#0D4F85] text-white font-bold uppercase rounded-lg shadow-sm cursor-pointer disabled:opacity-50 flex items-center gap-2"
                  >
                    {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                    {editingId ? "Update Service" : "Create Service"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
