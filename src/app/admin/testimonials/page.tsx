"use client";

import { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import {
  Star,
  Plus,
  Trash2,
  Edit2,
  Search,
  Upload,
  Link as LinkIcon,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  X,
} from "lucide-react";
import { API_BASE_URL, fetchWithAuth } from "@/lib/api";
import Image from "next/image";

export default function AdminTestimonialsPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    clientName: "",
    role: "",
    company: "",
    feedback: "",
    rating: 5,
    projectDelivered: "",
    avatar: "",
    approved: true,
  });

  const fetchItems = async () => {
    setLoading(true);
    try {
      const res = await fetchWithAuth(
        `/testimonials/admin/all?page=${page}&limit=8&search=${encodeURIComponent(search)}`
      );
      const json = await res.json();
      if (json.success) {
        setItems(json.data);
        setTotalPages(json.pagination.totalPages || 1);
        setTotal(json.pagination.total || 0);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, [page]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const fd = new FormData();
    fd.append("file", file);

    try {
      const token = localStorage.getItem("aayup_admin_token");
      const res = await fetch(`${API_BASE_URL}/upload`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: fd,
      });
      const data = await res.json();
      if (data.success) {
        setFormData({ ...formData, avatar: `http://localhost:5000${data.url}` });
      }
    } catch (err) {
      alert("Failed to upload image.");
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = editingId ? `/testimonials/${editingId}` : "/testimonials";
      const method = editingId ? "PUT" : "POST";
      const res = await fetchWithAuth(url, {
        method,
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        setIsModalOpen(false);
        setEditingId(null);
        fetchItems();
      }
    } catch (err) {
      alert("Error saving testimonial.");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this testimonial?")) return;
    try {
      await fetchWithAuth(`/testimonials/${id}`, { method: "DELETE" });
      fetchItems();
    } catch (err) {
      alert("Error deleting testimonial.");
    }
  };

  const openEditModal = (t: any) => {
    setEditingId(t._id);
    setFormData({
      clientName: t.clientName || "",
      role: t.role || "",
      company: t.company || "",
      feedback: t.feedback || "",
      rating: t.rating || 5,
      projectDelivered: t.projectDelivered || "",
      avatar: t.avatar || "",
      approved: t.approved !== false,
    });
    setIsModalOpen(true);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E2E8F0]">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#1769AA] bg-[#E3EEF8] px-3 py-1 rounded-full">
              CLIENT TESTIMONIALS &amp; REVIEWS
            </span>
            <h1 className="text-2xl font-black text-[#0B1220] mt-1.5">Manage Client Reviews</h1>
            <p className="text-slate-500 text-xs mt-0.5">Total {total} verified client testimonials.</p>
          </div>

          <button
            onClick={() => {
              setEditingId(null);
              setFormData({
                clientName: "",
                role: "Founder & CEO",
                company: "",
                feedback: "",
                rating: 5,
                projectDelivered: "Custom Enterprise Software",
                avatar: "",
                approved: true,
              });
              setIsModalOpen(true);
            }}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#1769AA] hover:bg-[#0D4F85] text-white text-xs font-bold uppercase tracking-wider shadow-sm transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Add Testimonial
          </button>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-sm overflow-hidden">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#F8FBFE] border-b border-[#E2E8F0] text-slate-600 font-bold uppercase tracking-wider text-[11px]">
                <th className="py-3.5 px-4">Client</th>
                <th className="py-3.5 px-4">Feedback Quote</th>
                <th className="py-3.5 px-4">Rating</th>
                <th className="py-3.5 px-4">Project Delivered</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0]">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400">Loading reviews...</td>
                </tr>
              ) : items.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400">No testimonials found.</td>
                </tr>
              ) : (
                items.map((t) => (
                  <tr key={t._id} className="hover:bg-[#F8FBFE]">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-10 h-10 rounded-full overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                          {t.avatar && <Image src={t.avatar} alt={t.clientName} fill className="object-cover" />}
                        </div>
                        <div>
                          <div className="font-bold text-slate-900">{t.clientName}</div>
                          <div className="text-[11px] text-slate-500">{t.role}, {t.company}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 max-w-sm text-slate-600 truncate" title={t.feedback}>
                      &quot;{t.feedback}&quot;
                    </td>
                    <td className="py-3 px-4 text-amber-500 font-bold">
                      ★ {t.rating}.0
                    </td>
                    <td className="py-3 px-4 text-slate-600">
                      {t.projectDelivered}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        t.approved ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"
                      }`}>
                        {t.approved ? "Approved" : "Pending"}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="inline-flex items-center gap-2">
                        <button onClick={() => openEditModal(t)} className="p-1.5 rounded hover:bg-slate-100 text-slate-600 hover:text-[#1769AA]">
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button onClick={() => handleDelete(t._id)} className="p-1.5 rounded hover:bg-red-50 text-slate-400 hover:text-red-600">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          <div className="p-4 border-t border-[#E2E8F0] flex items-center justify-between text-xs text-slate-500">
            <div>Page {page} of {totalPages}</div>
            <div className="flex gap-2">
              <button disabled={page <= 1} onClick={() => setPage(page - 1)} className="px-3 py-1 rounded border border-slate-200 disabled:opacity-40">
                <ChevronLeft className="w-3.5 h-3.5" /> Prev
              </button>
              <button disabled={page >= totalPages} onClick={() => setPage(page + 1)} className="px-3 py-1 rounded border border-slate-200 disabled:opacity-40">
                Next <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl max-w-xl w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 relative text-left">
              <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 p-2 text-slate-400">
                <X className="w-5 h-5" />
              </button>

              <h2 className="text-xl font-black text-[#0B1220]">
                {editingId ? "Edit Client Testimonial" : "Add Client Testimonial"}
              </h2>

              <form onSubmit={handleSave} className="mt-5 space-y-4 text-xs">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Client Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.clientName}
                      onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                      placeholder="e.g. Rajesh Sharma"
                      className="w-full px-3 py-2 rounded-lg border border-slate-300"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Role / Position *</label>
                    <input
                      type="text"
                      required
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      placeholder="e.g. Chief Technology Officer"
                      className="w-full px-3 py-2 rounded-lg border border-slate-300"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Company *</label>
                    <input
                      type="text"
                      required
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="e.g. FinEdge Global"
                      className="w-full px-3 py-2 rounded-lg border border-slate-300"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Delivered Project</label>
                    <input
                      type="text"
                      value={formData.projectDelivered}
                      onChange={(e) => setFormData({ ...formData, projectDelivered: e.target.value })}
                      placeholder="e.g. Fintech Microservices & Web Platform"
                      className="w-full px-3 py-2 rounded-lg border border-slate-300"
                    />
                  </div>
                </div>

                {/* Avatar upload */}
                <div className="p-4 bg-[#F8FBFE] rounded-xl border border-[#E2E8F0] space-y-3">
                  <label className="block font-bold text-slate-800 uppercase tracking-wider">
                    Client Avatar (Upload File OR Paste Link)
                  </label>
                  <div className="flex flex-col sm:flex-row gap-3 items-center">
                    <label className="w-full sm:w-auto px-4 py-2 rounded-lg bg-white border border-slate-300 text-slate-700 flex items-center justify-center gap-2 cursor-pointer shadow-sm">
                      <Upload className="w-4 h-4 text-[#1769AA]" />
                      <span>{uploading ? "Uploading..." : "Upload Photo"}</span>
                      <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                    </label>
                    <span className="text-slate-400 font-bold">OR</span>
                    <div className="relative flex-1 w-full">
                      <LinkIcon className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                      <input
                        type="url"
                        value={formData.avatar}
                        onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
                        placeholder="Paste image URL (Unsplash or CDN link)"
                        className="w-full pl-8 pr-3 py-1.5 rounded-lg border border-slate-300 bg-white"
                      />
                    </div>
                  </div>
                  {formData.avatar && (
                    <div className="text-[11px] text-emerald-600 flex items-center gap-1 font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Attached: {formData.avatar}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Feedback Quote *</label>
                  <textarea
                    rows={3}
                    required
                    value={formData.feedback}
                    onChange={(e) => setFormData({ ...formData, feedback: e.target.value })}
                    placeholder="Enter the client feedback..."
                    className="w-full px-3 py-2 rounded-lg border border-slate-300"
                  />
                </div>

                <div className="flex items-center gap-6 pt-1">
                  <div>
                    <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Rating</label>
                    <select
                      value={formData.rating}
                      onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) })}
                      className="px-3 py-1.5 rounded-lg border border-slate-300 bg-white"
                    >
                      <option value={5}>5 Stars ★★★★★</option>
                      <option value={4}>4 Stars ★★★★☆</option>
                      <option value={3}>3 Stars ★★★☆☆</option>
                    </select>
                  </div>
                  <label className="flex items-center gap-2 cursor-pointer font-bold text-slate-700 pt-4">
                    <input
                      type="checkbox"
                      checked={formData.approved}
                      onChange={(e) => setFormData({ ...formData, approved: e.target.checked })}
                      className="w-4 h-4 text-[#1769AA]"
                    />
                    Approved &amp; Visible on Live Portfolio
                  </label>
                </div>

                <div className="pt-4 border-t border-slate-200 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 rounded-lg bg-[#1769AA] hover:bg-[#0D4F85] text-white font-bold"
                  >
                    Save Testimonial
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
