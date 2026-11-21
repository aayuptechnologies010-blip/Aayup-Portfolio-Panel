"use client";

import { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import {
  FolderGit2,
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
  Clock,
  TrendingUp,
} from "lucide-react";
import { API_BASE_URL, fetchWithAuth } from "@/lib/api";
import Image from "next/image";

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    tagline: "",
    category: "Web Platforms",
    image: "",
    description: "",
    problem: "",
    solution: "",
    metrics: "",
    duration: "",
    techStack: "",
    isPublished: true,
  });

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const res = await fetchWithAuth(
        `/projects/admin/all?page=${page}&limit=8&search=${encodeURIComponent(
          search
        )}&category=${category}`
      );
      const json = await res.json();
      if (json.success) {
        setProjects(json.data);
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
    fetchProjects();
  }, [page, category]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchProjects();
  };

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
        setFormData({ ...formData, image: `http://localhost:5000${data.url}` });
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
      techStack: typeof formData.techStack === "string"
        ? formData.techStack.split(",").map((s) => s.trim()).filter(Boolean)
        : formData.techStack,
    };

    try {
      const url = editingId ? `/projects/${editingId}` : "/projects";
      const method = editingId ? "PUT" : "POST";
      const res = await fetchWithAuth(url, {
        method,
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success) {
        setIsModalOpen(false);
        setEditingId(null);
        fetchProjects();
      }
    } catch (err) {
      alert("Error saving project.");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this case study?")) return;
    try {
      const res = await fetchWithAuth(`/projects/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        fetchProjects();
      }
    } catch (err) {
      alert("Error deleting project.");
    }
  };

  const openEditModal = (p: any) => {
    setEditingId(p._id);
    setFormData({
      title: p.title || "",
      tagline: p.tagline || "",
      category: p.category || "Web Platforms",
      image: p.image || "",
      description: p.description || "",
      problem: p.problem || "",
      solution: p.solution || "",
      metrics: p.metrics || "",
      duration: p.duration || "",
      techStack: Array.isArray(p.techStack) ? p.techStack.join(", ") : p.techStack || "",
      isPublished: p.isPublished !== false,
    });
    setIsModalOpen(true);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E2E8F0]">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#1769AA] bg-[#E3EEF8] px-3 py-1 rounded-full">
              PORTFOLIO PROJECTS &amp; CASE STUDIES
            </span>
            <h1 className="text-2xl font-black text-[#0B1220] mt-1.5">Manage Portfolio Works</h1>
            <p className="text-slate-500 text-xs mt-0.5">Total {total} case studies recorded.</p>
          </div>

          <button
            onClick={() => {
              setEditingId(null);
              setFormData({
                title: "",
                tagline: "",
                category: "Web Platforms",
                image: "",
                description: "",
                problem: "",
                solution: "",
                metrics: "",
                duration: "",
                techStack: "Next.js, TypeScript, Tailwind CSS",
                isPublished: true,
              });
              setIsModalOpen(true);
            }}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#1769AA] hover:bg-[#0D4F85] text-white text-xs font-bold uppercase tracking-wider shadow-sm transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Add Case Study
          </button>
        </div>

        {/* Filters & Search Bar */}
        <div className="flex flex-col sm:flex-row gap-3 justify-between items-center bg-white p-4 rounded-xl border border-[#E2E8F0] shadow-sm">
          <form onSubmit={handleSearchSubmit} className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search case studies..."
              className="w-full pl-9 pr-3 py-1.5 rounded-lg border border-slate-300 text-xs text-slate-800 focus:outline-none focus:border-[#1769AA]"
            />
          </form>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <select
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                setPage(1);
              }}
              className="px-3 py-1.5 rounded-lg border border-slate-300 text-xs text-slate-700 bg-white focus:outline-none"
            >
              <option value="All">All Categories</option>
              <option value="Web Platforms">Web Platforms</option>
              <option value="Mobile Apps">Mobile Apps</option>
              <option value="CRM / ERP">CRM / ERP</option>
              <option value="AI & Automation">AI &amp; Automation</option>
            </select>
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-sm overflow-hidden">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#F8FBFE] border-b border-[#E2E8F0] text-slate-600 font-bold uppercase tracking-wider text-[11px]">
                <th className="py-3.5 px-4">Project</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Metric / Impact</th>
                <th className="py-3.5 px-4">Duration</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0]">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400">
                    Loading case studies...
                  </td>
                </tr>
              ) : projects.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400">
                    No case studies found. Click &quot;Add Case Study&quot; to create one.
                  </td>
                </tr>
              ) : (
                projects.map((p) => (
                  <tr key={p._id} className="hover:bg-[#F8FBFE] transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-9 rounded overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                          {p.image ? (
                            <Image src={p.image} alt={p.title} fill className="object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-slate-300 text-[10px]">No img</div>
                          )}
                        </div>
                        <div>
                          <div className="font-bold text-slate-900">{p.title}</div>
                          <div className="text-[11px] text-slate-500 truncate max-w-xs">{p.tagline}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[#E3EEF8] text-[#1769AA]">
                        {p.category}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-700 font-medium">
                      {p.metrics || "—"}
                    </td>
                    <td className="py-3 px-4 text-slate-600">
                      {p.duration || "—"}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                          p.isPublished
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : "bg-amber-50 text-amber-700 border border-amber-200"
                        }`}
                      >
                        {p.isPublished ? "Published" : "Draft"}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="inline-flex items-center gap-2">
                        <button
                          onClick={() => openEditModal(p)}
                          className="p-1.5 rounded hover:bg-slate-100 text-slate-600 hover:text-[#1769AA] cursor-pointer"
                          title="Edit"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(p._id)}
                          className="p-1.5 rounded hover:bg-red-50 text-slate-400 hover:text-red-600 cursor-pointer"
                          title="Delete"
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

          {/* Pagination */}
          <div className="p-4 border-t border-[#E2E8F0] flex items-center justify-between text-xs text-slate-500">
            <div>
              Page {page} of {totalPages}
            </div>
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

        {/* Modal: Add / Edit Case Study */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 relative text-left">
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>

              <h2 className="text-xl font-black text-[#0B1220]">
                {editingId ? "Edit Case Study" : "Add New Case Study"}
              </h2>

              <form onSubmit={handleSave} className="mt-5 space-y-4 text-xs">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Project Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="e.g. SynergyFlow CRM"
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-slate-800"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Category *
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-slate-800 bg-white"
                    >
                      <option value="Web Platforms">Web Platforms</option>
                      <option value="Mobile Apps">Mobile Apps</option>
                      <option value="CRM / ERP">CRM / ERP</option>
                      <option value="AI & Automation">AI &amp; Automation</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Tagline / Subheading
                  </label>
                  <input
                    type="text"
                    value={formData.tagline}
                    onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                    placeholder="e.g. Unified Multi-Branch Operations Suite"
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-slate-800"
                  />
                </div>

                {/* Image Upload / URL Section */}
                <div className="p-4 bg-[#F8FBFE] rounded-xl border border-[#E2E8F0] space-y-3">
                  <label className="block font-bold text-slate-800 uppercase tracking-wider">
                    Project Cover Image (Upload File OR Paste Link)
                  </label>
                  <div className="flex flex-col sm:flex-row gap-3 items-center">
                    <label className="w-full sm:w-auto px-4 py-2 rounded-lg bg-white border border-slate-300 hover:border-[#1769AA] text-slate-700 flex items-center justify-center gap-2 cursor-pointer shadow-sm">
                      <Upload className="w-4 h-4 text-[#1769AA]" />
                      <span>{uploading ? "Uploading..." : "Upload Local Image"}</span>
                      <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                    </label>
                    <span className="text-slate-400 font-bold">OR</span>
                    <div className="relative flex-1 w-full">
                      <LinkIcon className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                      <input
                        type="url"
                        value={formData.image}
                        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                        placeholder="Paste image URL (e.g. /project-crm-dashboard.webp)"
                        className="w-full pl-8 pr-3 py-1.5 rounded-lg border border-slate-300 bg-white text-slate-800"
                      />
                    </div>
                  </div>
                  {formData.image && (
                    <div className="text-[11px] text-emerald-600 flex items-center gap-1 font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Image attached: {formData.image}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Description *
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-slate-800"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Problem Addressed
                    </label>
                    <textarea
                      rows={2}
                      value={formData.problem}
                      onChange={(e) => setFormData({ ...formData, problem: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-slate-800"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Engineered Solution
                    </label>
                    <textarea
                      rows={2}
                      value={formData.solution}
                      onChange={(e) => setFormData({ ...formData, solution: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-slate-800"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Key Metrics / Results
                    </label>
                    <input
                      type="text"
                      value={formData.metrics}
                      onChange={(e) => setFormData({ ...formData, metrics: e.target.value })}
                      placeholder="e.g. 45% faster invoice collections"
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-slate-800"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Duration
                    </label>
                    <input
                      type="text"
                      value={formData.duration}
                      onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                      placeholder="e.g. 5 Months"
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-slate-800"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Tech Stack (comma separated)
                  </label>
                  <input
                    type="text"
                    value={formData.techStack}
                    onChange={(e) => setFormData({ ...formData, techStack: e.target.value })}
                    placeholder="Next.js, TypeScript, PostgreSQL, Tailwind CSS"
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-slate-800"
                  />
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="checkbox"
                    id="isPublished"
                    checked={formData.isPublished}
                    onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                    className="w-4 h-4 text-[#1769AA]"
                  />
                  <label htmlFor="isPublished" className="font-bold text-slate-700">
                    Publish immediately on live portfolio
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
                    {editingId ? "Save Changes" : "Create Case Study"}
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
