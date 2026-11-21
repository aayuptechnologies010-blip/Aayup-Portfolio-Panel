"use client";

import { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import {
  Inbox,
  Search,
  ChevronLeft,
  ChevronRight,
  Trash2,
  Mail,
  Phone,
  Clock,
  CheckCircle2,
} from "lucide-react";
import { fetchWithAuth } from "@/lib/api";

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const res = await fetchWithAuth(
        `/leads/admin/all?page=${page}&limit=10&search=${encodeURIComponent(
          search
        )}&status=${status}`
      );
      const json = await res.json();
      if (json.success) {
        setLeads(json.data);
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
    fetchLeads();
  }, [page, status]);

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      await fetchWithAuth(`/leads/${id}`, {
        method: "PUT",
        body: JSON.stringify({ status: newStatus }),
      });
      fetchLeads();
    } catch (err) {
      alert("Failed to update status.");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this lead?")) return;
    try {
      await fetchWithAuth(`/leads/${id}`, { method: "DELETE" });
      fetchLeads();
    } catch (err) {
      alert("Failed to delete lead.");
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E2E8F0]">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#1769AA] bg-[#E3EEF8] px-3 py-1 rounded-full">
              INBOUND CLIENT LEADS &amp; CRM
            </span>
            <h1 className="text-2xl font-black text-[#0B1220] mt-1.5">Manage Client Inquiries</h1>
            <p className="text-slate-500 text-xs mt-0.5">Total {total} inquiries received from contact form.</p>
          </div>
        </div>

        {/* Filter bar */}
        <div className="flex flex-col sm:flex-row gap-3 justify-between items-center bg-white p-4 rounded-xl border border-[#E2E8F0] shadow-sm">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setPage(1);
              fetchLeads();
            }}
            className="relative w-full sm:w-72"
          >
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, email, or phone..."
              className="w-full pl-9 pr-3 py-1.5 rounded-lg border border-slate-300 text-xs text-slate-800 focus:outline-none"
            />
          </form>

          <select
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
              setPage(1);
            }}
            className="px-3 py-1.5 rounded-lg border border-slate-300 text-xs text-slate-700 bg-white"
          >
            <option value="All">All Statuses</option>
            <option value="New">New</option>
            <option value="Contacted">Contacted</option>
            <option value="Meeting Scheduled">Meeting Scheduled</option>
            <option value="Closed">Closed</option>
          </select>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-sm overflow-hidden">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#F8FBFE] border-b border-[#E2E8F0] text-slate-600 font-bold uppercase tracking-wider text-[11px]">
                <th className="py-3.5 px-4">Contact</th>
                <th className="py-3.5 px-4">Service</th>
                <th className="py-3.5 px-4">Message</th>
                <th className="py-3.5 px-4">Received On</th>
                <th className="py-3.5 px-4">Pipeline Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0]">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400">Loading inquiries...</td>
                </tr>
              ) : leads.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400">No client inquiries found.</td>
                </tr>
              ) : (
                leads.map((l) => (
                  <tr key={l._id} className="hover:bg-[#F8FBFE]">
                    <td className="py-3 px-4">
                      <div className="font-bold text-slate-900">{l.name}</div>
                      <div className="text-[11px] text-slate-500">{l.email}</div>
                      {l.phone && <div className="text-[11px] text-[#1769AA]">{l.phone}</div>}
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#E3EEF8] text-[#1769AA]">
                        {l.service}
                      </span>
                    </td>
                    <td className="py-3 px-4 max-w-xs text-slate-600 truncate" title={l.message}>
                      {l.message}
                    </td>
                    <td className="py-3 px-4 text-slate-500">
                      {new Date(l.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4">
                      <select
                        value={l.status}
                        onChange={(e) => handleStatusChange(l._id, e.target.value)}
                        className={`text-[11px] font-bold px-2 py-1 rounded border ${
                          l.status === "New"
                            ? "bg-blue-50 text-blue-700 border-blue-200"
                            : l.status === "Contacted"
                            ? "bg-amber-50 text-amber-700 border-amber-200"
                            : l.status === "Meeting Scheduled"
                            ? "bg-purple-50 text-purple-700 border-purple-200"
                            : "bg-emerald-50 text-emerald-700 border-emerald-200"
                        }`}
                      >
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Meeting Scheduled">Meeting Scheduled</option>
                        <option value="Closed">Closed</option>
                      </select>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => handleDelete(l._id)}
                        className="p-1.5 rounded hover:bg-red-50 text-slate-400 hover:text-red-600"
                        title="Delete inquiry"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="p-4 border-t border-[#E2E8F0] flex items-center justify-between text-xs text-slate-500">
            <div>Page {page} of {totalPages}</div>
            <div className="flex gap-2">
              <button
                disabled={page <= 1}
                onClick={() => setPage(page - 1)}
                className="px-3 py-1 rounded border border-slate-200 hover:bg-slate-50 disabled:opacity-40"
              >
                <ChevronLeft className="w-3.5 h-3.5" /> Prev
              </button>
              <button
                disabled={page >= totalPages}
                onClick={() => setPage(page + 1)}
                className="px-3 py-1 rounded border border-slate-200 hover:bg-slate-50 disabled:opacity-40"
              >
                Next <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
