"use client";

import { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import {
  Users,
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
  Linkedin,
  Award,
} from "lucide-react";
import { API_BASE_URL, fetchWithAuth } from "@/lib/api";
import Image from "next/image";

export default function AdminTeamPage() {
  const [members, setMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    department: "Executive Leadership",
    badge: "Director",
    directorField: "",
    bio: "",
    visionQuote: "",
    avatar: "",
    linkedin: "",
    highlights: "",
    isDirector: true,
    active: true,
  });

  const fetchMembers = async () => {
    setLoading(true);
    try {
      const res = await fetchWithAuth(
        `/team/admin/all?page=${page}&limit=8&search=${encodeURIComponent(search)}`
      );
      const json = await res.json();
      if (json.success) {
        setMembers(json.data);
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
    fetchMembers();
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
    const payload = {
      ...formData,
      highlights: typeof formData.highlights === "string"
        ? formData.highlights.split(",").map((s) => s.trim()).filter(Boolean)
        : formData.highlights,
    };

    try {
      const url = editingId ? `/team/${editingId}` : "/team";
      const method = editingId ? "PUT" : "POST";
      const res = await fetchWithAuth(url, {
        method,
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success) {
        setIsModalOpen(false);
        setEditingId(null);
        fetchMembers();
      }
    } catch (err) {
      alert("Error saving team member.");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this member?")) return;
    try {
      const res = await fetchWithAuth(`/team/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) fetchMembers();
    } catch (err) {
      alert("Error deleting member.");
    }
  };

  const openEditModal = (m: any) => {
    setEditingId(m._id);
    setFormData({
      name: m.name || "",
      role: m.role || "",
      department: m.department || "Executive Leadership",
      badge: m.badge || "Director",
      directorField: m.directorField || "",
      bio: m.bio || "",
      visionQuote: m.visionQuote || "",
      avatar: m.avatar || "",
      linkedin: m.linkedin || "",
      highlights: Array.isArray(m.highlights) ? m.highlights.join(", ") : m.highlights || "",
      isDirector: m.isDirector !== false,
      active: m.active !== false,
    });
    setIsModalOpen(true);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E2E8F0]">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#1769AA] bg-[#E3EEF8] px-3 py-1 rounded-full">
              LEADERSHIP &amp; TEAM ROSTER
            </span>
            <h1 className="text-2xl font-black text-[#0B1220] mt-1.5">Manage Directors &amp; Staff</h1>
            <p className="text-slate-500 text-xs mt-0.5">Total {total} members registered.</p>
          </div>

          <button
            onClick={() => {
              setEditingId(null);
              setFormData({
                name: "",
                role: "",
                department: "Executive Leadership",
                badge: "Director",
                directorField: "Technology & Software Engineering",
                bio: "",
                visionQuote: "",
                avatar: "",
                linkedin: "",
                highlights: "Cloud Systems, Microservices, Security",
                isDirector: true,
                active: true,
              });
              setIsModalOpen(true);
            }}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#1769AA] hover:bg-[#0D4F85] text-white text-xs font-bold uppercase tracking-wider shadow-sm transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Add Team Member
          </button>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-sm overflow-hidden">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#F8FBFE] border-b border-[#E2E8F0] text-slate-600 font-bold uppercase tracking-wider text-[11px]">
                <th className="py-3.5 px-4">Member</th>
                <th className="py-3.5 px-4">Role &amp; Badge</th>
                <th className="py-3.5 px-4">Field / Focus</th>
                <th className="py-3.5 px-4">Board Director</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0]">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400">Loading roster...</td>
                </tr>
              ) : members.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400">No members found.</td>
                </tr>
              ) : (
                members.map((m) => (
                  <tr key={m._id} className="hover:bg-[#F8FBFE] transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-10 h-10 rounded-full overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                          {m.avatar && <Image src={m.avatar} alt={m.name} fill className="object-cover" />}
                        </div>
                        <div>
                          <div className="font-bold text-slate-900">{m.name}</div>
                          <div className="text-[11px] text-slate-500">{m.department}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-semibold text-slate-800">{m.role}</div>
                      <span className="text-[10px] text-[#1769AA] font-bold">{m.badge}</span>
                    </td>
                    <td className="py-3 px-4 text-slate-600">
                      {m.directorField || "—"}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                        m.isDirector ? "bg-[#E3EEF8] text-[#1769AA]" : "bg-slate-100 text-slate-600"
                      }`}>
                        {m.isDirector ? "Yes" : "No"}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                        m.active ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-600"
                      }`}>
                        {m.active ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="inline-flex items-center gap-2">
                        <button
                          onClick={() => openEditModal(m)}
                          className="p-1.5 rounded hover:bg-slate-100 text-slate-600 hover:text-[#1769AA] cursor-pointer"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(m._id)}
                          className="p-1.5 rounded hover:bg-red-50 text-slate-400 hover:text-red-600 cursor-pointer"
                        >
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
              <button
                disabled={page <= 1}
                onClick={() => setPage(page - 1)}
                className="px-3 py-1 rounded border border-slate-200 hover:bg-slate-50 disabled:opacity-40 cursor-pointer flex items-center gap-1"
              >
                <ChevronLeft className="w-3.5 h-3.5" /> Prev
              </button>
              <button
                disabled={page >= totalPages}
                onClick={() => setPage(page + 1)}
                className="px-3 py-1 rounded border border-slate-200 hover:bg-slate-50 disabled:opacity-40 cursor-pointer flex items-center gap-1"
              >
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
                {editingId ? "Edit Team Member" : "Add Team Member"}
              </h2>

              <form onSubmit={handleSave} className="mt-5 space-y-4 text-xs">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Aayush Pandey"
                      className="w-full px-3 py-2 rounded-lg border border-slate-300"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Role / Designation *</label>
                    <input
                      type="text"
                      required
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      placeholder="e.g. Managing Director & CTO"
                      className="w-full px-3 py-2 rounded-lg border border-slate-300"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Badge Tag</label>
                    <input
                      type="text"
                      value={formData.badge}
                      onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                      placeholder="e.g. Founder & CEO / Director & CTO"
                      className="w-full px-3 py-2 rounded-lg border border-slate-300"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Specialized Field</label>
                    <input
                      type="text"
                      value={formData.directorField}
                      onChange={(e) => setFormData({ ...formData, directorField: e.target.value })}
                      placeholder="e.g. Cloud & Software Engineering"
                      className="w-full px-3 py-2 rounded-lg border border-slate-300"
                    />
                  </div>
                </div>

                {/* Profile Photo Upload / Link */}
                <div className="p-4 bg-[#F8FBFE] rounded-xl border border-[#E2E8F0] space-y-3">
                  <label className="block font-bold text-slate-800 uppercase tracking-wider">
                    Profile Photo (Upload File OR Paste Link)
                  </label>
                  <div className="flex flex-col sm:flex-row gap-3 items-center">
                    <label className="w-full sm:w-auto px-4 py-2 rounded-lg bg-white border border-slate-300 text-slate-700 flex items-center justify-center gap-2 cursor-pointer shadow-sm">
                      <Upload className="w-4 h-4 text-[#1769AA]" />
                      <span>{uploading ? "Uploading..." : "Upload Local Photo"}</span>
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
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Director Vision Quote</label>
                  <textarea
                    rows={2}
                    value={formData.visionQuote}
                    onChange={(e) => setFormData({ ...formData, visionQuote: e.target.value })}
                    placeholder="Personal vision or strategic philosophy..."
                    className="w-full px-3 py-2 rounded-lg border border-slate-300"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Biography</label>
                  <textarea
                    rows={2}
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    placeholder="Background and experience summary..."
                    className="w-full px-3 py-2 rounded-lg border border-slate-300"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">LinkedIn URL</label>
                    <input
                      type="url"
                      value={formData.linkedin}
                      onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                      placeholder="https://linkedin.com/in/username"
                      className="w-full px-3 py-2 rounded-lg border border-slate-300"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Highlights (comma-separated)</label>
                    <input
                      type="text"
                      value={formData.highlights}
                      onChange={(e) => setFormData({ ...formData, highlights: e.target.value })}
                      placeholder="Cloud Systems, Security, Scalability"
                      className="w-full px-3 py-2 rounded-lg border border-slate-300"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-4 pt-2">
                  <label className="flex items-center gap-2 cursor-pointer font-bold text-slate-700">
                    <input
                      type="checkbox"
                      checked={formData.isDirector}
                      onChange={(e) => setFormData({ ...formData, isDirector: e.target.checked })}
                      className="w-4 h-4 text-[#1769AA]"
                    />
                    Board of Directors (Featured Showcase)
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer font-bold text-slate-700">
                    <input
                      type="checkbox"
                      checked={formData.active}
                      onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                      className="w-4 h-4 text-[#1769AA]"
                    />
                    Active Member
                  </label>
                </div>

                <div className="pt-4 border-t border-slate-200 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 rounded-lg bg-[#1769AA] hover:bg-[#0D4F85] text-white font-bold cursor-pointer"
                  >
                    Save Member
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
