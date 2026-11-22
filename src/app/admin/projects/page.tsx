"use client";

import { useEffect, useState } from "react";
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
  ExternalLink,
  Loader2,
  AlertCircle,
  Package,
} from "lucide-react";
import { API_BASE_URL, fetchWithAuth } from "@/lib/api";
import Image from "next/image";
import { TableSkeleton } from "@/components/admin/Skeleton";

interface ProjectItem {
  _id: string;
  title: string;
  category: "Web Platforms" | "Mobile Apps" | "CRM / ERP" | "AI & Automation" | "Our Products";
  liveLink: string;
  image: string; // Base64 Thumbnail
  isProduct?: boolean;
  isPublished: boolean;
  createdAt: string;
}

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<ProjectItem[]>([]);
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
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const initialForm = {
    title: "",
    category: "Web Platforms" as "Web Platforms" | "Mobile Apps" | "CRM / ERP" | "AI & Automation" | "Our Products",
    liveLink: "",
    image: "",
    isProduct: false,
    isPublished: true,
  };

  const [formData, setFormData] = useState(initialForm);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const res = await fetchWithAuth(
        `/projects/admin/all?page=${page}&limit=10&search=${encodeURIComponent(
          search
        )}&category=${category}`
      );
      const data = await res.json();
      if (data.success) {
        setProjects(data.data || []);
        setTotalPages(data.pagination?.totalPages || 1);
        setTotal(data.pagination?.total || 0);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [page, category, search]);

  const handleOpenCreate = () => {
    setEditingId(null);
    setFormData(initialForm);
    setError(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (p: ProjectItem) => {
    setEditingId(p._id);
    setFormData({
      title: p.title,
      category: p.category,
      liveLink: p.liveLink || "",
      image: p.image || "",
      isProduct: Boolean(p.isProduct || p.category === "Our Products"),
      isPublished: p.isPublished !== false,
    });
    setError(null);
    setIsModalOpen(true);
  };

  // Convert File to Base64
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file (.jpg, .png, .webp)");
      return;
    }

    setUploading(true);
    setError(null);
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      setFormData((prev) => ({ ...prev, image: base64String }));
      setUploading(false);
    };
    reader.onerror = () => {
      setError("Failed to convert image to Base64");
      setUploading(false);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.image) {
      setError("Please upload a project thumbnail image.");
      return;
    }

    setSaving(true);
    setError(null);

    try {
      const url = editingId ? `/projects/${editingId}` : "/projects";
      const method = editingId ? "PUT" : "POST";
      const res = await fetchWithAuth(url, {
        method,
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        setIsModalOpen(false);
        setEditingId(null);
        fetchProjects();
      } else {
        setError(data.message || "Failed to save project");
      }
    } catch (err: any) {
      setError(err.message || "Network error");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    try {
      const res = await fetchWithAuth(`/projects/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        fetchProjects();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6 text-left">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E2E8F0]">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#1769AA] bg-[#E3EEF8] px-3 py-1 rounded-full">
            PORTFOLIO &amp; PRODUCTS SHOWCASE
          </span>
          <h1 className="text-3xl font-black text-[#0B1220] mt-2">Projects &amp; Products</h1>
          <p className="text-slate-600 text-xs mt-1">
            Manage your works: Add Project Name, Category, Live Link, Thumbnail and optional &quot;Our Product&quot; tag.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#1769AA] hover:bg-[#0D4F85] text-white text-xs font-bold uppercase tracking-wider shadow-sm transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Add Project / Product
        </button>
      </div>

      {/* Filters & Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 justify-between items-center bg-white p-4 rounded-xl border border-[#E2E8F0] shadow-sm">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder="Search projects..."
            className="w-full pl-9 pr-3 py-1.5 rounded-lg border border-slate-300 text-xs text-slate-800 focus:outline-none focus:border-[#1769AA]"
          />
        </div>

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
            <option value="Our Products">Our Products (SaaS / In-House)</option>
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
              <th className="py-3.5 px-4">Thumbnail</th>
              <th className="py-3.5 px-4">Project Name</th>
              <th className="py-3.5 px-4">Category</th>
              <th className="py-3.5 px-4">Type</th>
              <th className="py-3.5 px-4">Live URL</th>
              <th className="py-3.5 px-4">Status</th>
              <th className="py-3.5 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E2E8F0]">
            {loading ? (
              <tr>
                <td colSpan={7} className="p-8">
                  <TableSkeleton rows={4} cols={7} />
                </td>
              </tr>
            ) : projects.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-12 text-center text-slate-400">
                  No projects found. Click &quot;Add Project / Product&quot; to add one.
                </td>
              </tr>
            ) : (
              projects.map((p) => (
                <tr key={p._id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-4">
                    <div className="relative w-14 h-10 rounded-lg overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                      {p.image ? (
                        <Image src={p.image} alt={p.title} fill className="object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-300 text-[10px]">
                          No img
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <strong className="block text-slate-900 font-bold text-sm">{p.title}</strong>
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2.5 py-1 rounded bg-[#E3EEF8] text-[#1769AA] font-bold text-[11px]">
                      {p.category}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    {p.isProduct || p.category === "Our Products" ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold text-[10px]">
                        <Package className="w-3 h-3" /> Our Product
                      </span>
                    ) : (
                      <span className="text-slate-400 text-[11px]">Client Project</span>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    {p.liveLink ? (
                      <a
                        href={p.liveLink}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-[#1769AA] hover:underline font-semibold"
                      >
                        Visit Link <ExternalLink className="w-3 h-3" />
                      </a>
                    ) : (
                      <span className="text-slate-400 text-xs">No link</span>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    {p.isPublished ? (
                      <span className="inline-flex items-center gap-1 text-emerald-600 font-bold text-[11px]">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Published
                      </span>
                    ) : (
                      <span className="text-slate-400 font-bold text-[11px]">Draft</span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleOpenEdit(p)}
                        className="p-1.5 rounded hover:bg-slate-100 text-slate-600 hover:text-[#1769AA] transition-colors cursor-pointer"
                        title="Edit"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(p._id)}
                        className="p-1.5 rounded hover:bg-rose-50 text-slate-600 hover:text-rose-600 transition-colors cursor-pointer"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="p-4 border-t border-[#E2E8F0] flex items-center justify-between text-xs text-slate-600">
            <span>
              Showing {projects.length} of {total} Items
            </span>
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

      {/* Simplified Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden border border-[#E2E8F0] shadow-2xl p-6 sm:p-7 space-y-5 text-left">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-xl font-black text-[#0B1220]">
                {editingId ? "Edit Project / Product" : "Add Project / Product"}
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

            <form onSubmit={handleSave} className="space-y-4 text-xs text-slate-700">
              {/* 1. Project Name */}
              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Project / Product Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Aayup CRM Pro / E-Commerce Engine"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:outline-none focus:border-[#1769AA]"
                />
              </div>

              {/* 2. Categories */}
              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Category *
                </label>
                <select
                  value={formData.category}
                  onChange={(e: any) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:outline-none focus:border-[#1769AA] bg-white"
                >
                  <option value="Web Platforms">Web Platforms</option>
                  <option value="Mobile Apps">Mobile Apps</option>
                  <option value="CRM / ERP">CRM / ERP</option>
                  <option value="AI & Automation">AI &amp; Automation</option>
                  <option value="Our Products">Our Products (In-House SaaS)</option>
                </select>
              </div>

              {/* Optional Product Checkbox Toggle */}
              <div className="p-3 bg-[#F8FBFE] border border-[#E2E8F0] rounded-xl flex items-center gap-3">
                <input
                  type="checkbox"
                  id="isProduct"
                  checked={formData.isProduct}
                  onChange={(e) => setFormData({ ...formData, isProduct: e.target.checked })}
                  className="w-4 h-4 text-[#1769AA] rounded border-slate-300"
                />
                <label htmlFor="isProduct" className="cursor-pointer">
                  <span className="font-bold text-slate-900 block">Mark as &quot;Our Product&quot; (Optional)</span>
                  <span className="text-[11px] text-slate-500 block">
                    Check this if it is an in-house SaaS/Product by Aayup Technologies.
                  </span>
                </label>
              </div>

              {/* 3. Live Link */}
              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Live Link (URL)
                </label>
                <div className="relative">
                  <ExternalLink className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="url"
                    placeholder="https://example.com"
                    value={formData.liveLink}
                    onChange={(e) => setFormData({ ...formData, liveLink: e.target.value })}
                    className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-lg text-xs focus:outline-none focus:border-[#1769AA]"
                  />
                </div>
              </div>

              {/* 4. Thumbnail (Base64) */}
              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Thumbnail Image (Base64 Upload) *
                </label>
                <div className="mt-1 flex items-center gap-4">
                  <label className="flex items-center gap-2 px-4 py-2 bg-[#F3F7FA] hover:bg-slate-200 text-slate-700 font-bold uppercase rounded-lg border border-slate-300 cursor-pointer transition-colors text-xs">
                    <Upload className="w-4 h-4 text-[#1769AA]" />
                    <span>Choose Image</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                  {uploading && (
                    <span className="flex items-center gap-1 text-[#1769AA] font-semibold">
                      <Loader2 className="w-3.5 h-3.5 animate-spin" /> Processing...
                    </span>
                  )}
                </div>

                {formData.image && (
                  <div className="mt-3 relative w-32 h-20 rounded-lg overflow-hidden border border-slate-300 shadow-sm">
                    <Image
                      src={formData.image}
                      alt="Thumbnail Preview"
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
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
                  disabled={saving || uploading}
                  className="px-5 py-2 bg-[#1769AA] hover:bg-[#0D4F85] text-white font-bold uppercase rounded-lg shadow-sm cursor-pointer disabled:opacity-50 flex items-center gap-2"
                >
                  {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                  {editingId ? "Update" : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
