"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { 
  FolderGit2, 
  Users, 
  Star, 
  Inbox, 
  ArrowUpRight, 
  Plus, 
  Clock, 
  CheckCircle2, 
  Calendar,
  Layers,
  Sparkles,
  TrendingUp,
  Activity,
  UserCheck,
  RefreshCw
} from "lucide-react";
import { API_BASE_URL, fetchWithAuth } from "@/lib/api";
import Link from "next/link";
import { DashboardSkeleton } from "@/components/admin/Skeleton";

// Dynamic SSR-disabled imports for Recharts to avoid SSR webpack module mismatch
const ResponsiveContainer = dynamic(
  () => import("recharts").then((mod) => mod.ResponsiveContainer),
  { ssr: false }
);
const BarChart = dynamic(
  () => import("recharts").then((mod) => mod.BarChart),
  { ssr: false }
);
const Bar = dynamic(
  () => import("recharts").then((mod) => mod.Bar),
  { ssr: false }
);
const XAxis = dynamic(
  () => import("recharts").then((mod) => mod.XAxis),
  { ssr: false }
);
const YAxis = dynamic(
  () => import("recharts").then((mod) => mod.YAxis),
  { ssr: false }
);
const Tooltip = dynamic(
  () => import("recharts").then((mod) => mod.Tooltip),
  { ssr: false }
);
const PieChart = dynamic(
  () => import("recharts").then((mod) => mod.PieChart),
  { ssr: false }
);
const Pie = dynamic(
  () => import("recharts").then((mod) => mod.Pie),
  { ssr: false }
);
const Cell = dynamic(
  () => import("recharts").then((mod) => mod.Cell),
  { ssr: false }
);
const Legend = dynamic(
  () => import("recharts").then((mod) => mod.Legend),
  { ssr: false }
);
const CartesianGrid = dynamic(
  () => import("recharts").then((mod) => mod.CartesianGrid),
  { ssr: false }
);

interface LeadItem {
  _id: string;
  name: string;
  email: string;
  service: string;
  status: string;
  createdAt: string;
}

interface ProjectItem {
  _id: string;
  title: string;
  category: string;
  isPublished: boolean;
  createdAt: string;
}

interface TeamItem {
  _id: string;
  name: string;
  role: string;
  type: string;
}

interface TestimonialItem {
  _id: string;
  clientName: string;
  company: string;
  rating: number;
}

export default function AdminDashboardPage() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    projectsCount: 0,
    teamCount: 0,
    testimonialsCount: 0,
    leadsCount: 0,
  });

  const [categoryBreakdown, setCategoryBreakdown] = useState<any[]>([]);
  const [leadStatusBreakdown, setLeadStatusBreakdown] = useState<any[]>([]);
  const [serviceDistribution, setServiceDistribution] = useState<any[]>([]);
  const [recentLeads, setRecentLeads] = useState<LeadItem[]>([]);
  const [recentProjects, setRecentProjects] = useState<ProjectItem[]>([]);

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      const [projRes, teamRes, testRes, leadsRes] = await Promise.all([
        fetchWithAuth("/projects/admin/all?limit=100").then((r) => r.json()).catch(() => null),
        fetchWithAuth("/team/admin/all?limit=100").then((r) => r.json()).catch(() => null),
        fetchWithAuth("/testimonials/admin/all?limit=100").then((r) => r.json()).catch(() => null),
        fetchWithAuth("/leads/admin/all?limit=100").then((r) => r.json()).catch(() => null),
      ]);

      const projects: ProjectItem[] = projRes?.data || [];
      const team: TeamItem[] = teamRes?.data || [];
      const testimonials: TestimonialItem[] = testRes?.data || [];
      const leads: LeadItem[] = leadsRes?.data || [];

      setStats({
        projectsCount: projRes?.pagination?.total ?? projects.length,
        teamCount: teamRes?.pagination?.total ?? team.length,
        testimonialsCount: testRes?.pagination?.total ?? testimonials.length,
        leadsCount: leadsRes?.pagination?.total ?? leads.length,
      });

      // 1. Project Category Breakdown for Chart
      const catCount: Record<string, number> = {};
      projects.forEach((p) => {
        const cat = p.category || "General";
        catCount[cat] = (catCount[cat] || 0) + 1;
      });
      const catChartData = Object.keys(catCount).map((k) => ({
        name: k,
        projects: catCount[k],
      }));
      setCategoryBreakdown(catChartData);

      // 2. Lead Status Breakdown for Pie Chart
      const statusCount: Record<string, number> = {
        New: 0,
        Contacted: 0,
        "Meeting Scheduled": 0,
        Closed: 0,
      };
      leads.forEach((l) => {
        const s = l.status || "New";
        statusCount[s] = (statusCount[s] || 0) + 1;
      });
      const statusChartData = Object.keys(statusCount).map((k) => ({
        name: k,
        value: statusCount[k],
      }));
      setLeadStatusBreakdown(statusChartData);

      // 3. Service inquiries distribution
      const servCount: Record<string, number> = {};
      leads.forEach((l) => {
        const s = l.service || "Website Development";
        servCount[s] = (servCount[s] || 0) + 1;
      });
      const servChartData = Object.keys(servCount).map((k) => ({
        service: k.replace(" Development", ""),
        leads: servCount[k],
      }));
      setServiceDistribution(servChartData);

      // 4. Tables data
      setRecentLeads(leads.slice(0, 5));
      setRecentProjects(projects.slice(0, 5));
    } catch (e) {
      console.error("Dashboard data load error:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  const cards = [
    { title: "Published Case Studies", count: stats.projectsCount, href: "/admin/projects", icon: FolderGit2, color: "text-[#1769AA]", bg: "bg-[#E3EEF8]" },
    { title: "Directors & Team", count: stats.teamCount, href: "/admin/team", icon: Users, color: "text-[#2D86C9]", bg: "bg-blue-50" },
    { title: "Verified Testimonials", count: stats.testimonialsCount, href: "/admin/testimonials", icon: Star, color: "text-amber-500", bg: "bg-amber-50" },
    { title: "Total Contact Leads", count: stats.leadsCount, href: "/admin/leads", icon: Inbox, color: "text-emerald-600", bg: "bg-emerald-50" },
  ];

  const PIE_COLORS = ["#1769AA", "#38BDF8", "#F59E0B", "#10B981"];

  if (loading) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="space-y-8 text-left">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E2E8F0]">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E3EEF8] text-[#1769AA] text-xs font-bold uppercase tracking-wider mb-2">
              <Activity className="w-3.5 h-3.5" />
              <span>LIVE DATABASE TELEMETRY &amp; METRICS</span>
            </div>
            <h1 className="text-3xl font-black text-[#0B1220]">Aayup Analytics Control Center</h1>
            <p className="text-slate-600 text-xs mt-1">
              Real-time synchronization with MongoDB Atlas database: Track live projects, customer feedback, and sales inquiries.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={loadDashboardData}
              disabled={loading}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} /> Refresh Data
            </button>
            <Link
              href="/admin/projects"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#1769AA] hover:bg-[#0D4F85] text-white text-xs font-bold uppercase tracking-wider shadow-sm transition-colors"
            >
              <Plus className="w-4 h-4" /> Add Project
            </Link>
          </div>
        </div>

        {/* 4 Cards Stat Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, i) => {
            const Icon = card.icon;
            return (
              <Link
                key={i}
                href={card.href}
                className="p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm hover:shadow-md transition-shadow group flex flex-col justify-between text-left"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{card.title}</span>
                  <div className={`p-2.5 rounded-xl ${card.bg} ${card.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                </div>
                <div className="flex items-end justify-between">
                  <div className="text-3xl font-black text-[#0B1220]">
                    {loading ? "..." : card.count}
                  </div>
                  <span className="text-xs font-bold text-[#1769AA] flex items-center gap-1 group-hover:underline">
                    Manage <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Visual Charts Grid (Real MongoDB Data) */}
        <div className="grid lg:grid-cols-12 gap-8 text-left">
          {/* Bar Chart: Projects by Category */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-7 rounded-2xl border border-[#E2E8F0] shadow-sm flex flex-col justify-between text-left">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-base font-bold text-[#0B1220] flex items-center gap-2">
                  <Layers className="w-4 h-4 text-[#1769AA]" />
                  Projects Distribution by Category
                </h3>
                <p className="text-slate-500 text-xs mt-0.5">Live case studies grouped by technology discipline</p>
              </div>
              <span className="text-xs font-bold px-2.5 py-1 rounded bg-[#E3EEF8] text-[#1769AA]">
                {categoryBreakdown.length} Categories
              </span>
            </div>

            <div className="h-64 w-full">
              {categoryBreakdown.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={categoryBreakdown} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                    <XAxis 
                      dataKey="name" 
                      tick={{ fill: "#64748B", fontSize: 11, fontWeight: 600 }}
                      interval={0}
                      angle={-15}
                      textAnchor="end"
                    />
                    <YAxis allowDecimals={false} tick={{ fill: "#64748B", fontSize: 11 }} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: "#0B1220", borderRadius: "8px", border: "none", color: "#fff", fontSize: "12px" }} 
                      cursor={{ fill: "#F8FBFE" }}
                    />
                    <Bar dataKey="projects" fill="#1769AA" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center text-slate-400 text-xs">
                  {loading ? "Loading telemetry..." : "No project categories found in database"}
                </div>
              )}
            </div>
          </div>

          {/* Pie Chart: Lead Status Funnel */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-7 rounded-2xl border border-[#E2E8F0] shadow-sm flex flex-col justify-between text-left">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-base font-bold text-[#0B1220] flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-[#1769AA]" />
                  Lead Conversion Pipeline
                </h3>
                <p className="text-slate-500 text-xs mt-0.5">Status breakdown of inquiries received</p>
              </div>
            </div>

            <div className="h-64 w-full flex items-center justify-center">
              {leadStatusBreakdown.some((d) => d.value > 0) ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={leadStatusBreakdown}
                      cx="50%"
                      cy="50%"
                      innerRadius={55}
                      outerRadius={80}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {leadStatusBreakdown.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ backgroundColor: "#0B1220", borderRadius: "8px", border: "none", color: "#fff", fontSize: "12px" }}
                    />
                    <Legend 
                      verticalAlign="bottom" 
                      height={36} 
                      wrapperStyle={{ fontSize: "11px", fontWeight: "600" }} 
                    />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="text-center p-6 text-slate-400 text-xs">
                  <Inbox className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <span>No inbound leads recorded in pipeline yet.</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Real MongoDB Data Tables */}
        <div className="grid lg:grid-cols-2 gap-8 text-left">
          {/* Recent Inquiries Table */}
          <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm overflow-hidden text-left">
            <div className="p-6 border-b border-[#E2E8F0] flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-[#0B1220]">Recent Inbound Leads</h3>
                <p className="text-slate-500 text-xs mt-0.5">Latest client requests submitted via contact form</p>
              </div>
              <Link href="/admin/leads" className="text-xs font-bold text-[#1769AA] hover:underline flex items-center gap-1">
                View All <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#F8FBFE] border-b border-[#E2E8F0] text-slate-500 uppercase font-bold tracking-wider">
                  <tr>
                    <th className="py-3 px-4">Contact</th>
                    <th className="py-3 px-4">Service Required</th>
                    <th className="py-3 px-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {recentLeads.length > 0 ? (
                    recentLeads.map((lead) => (
                      <tr key={lead._id} className="hover:bg-slate-50 transition-colors">
                        <td className="py-3 px-4">
                          <strong className="block text-slate-900">{lead.name}</strong>
                          <span className="text-slate-500 text-[11px]">{lead.email}</span>
                        </td>
                        <td className="py-3 px-4 text-slate-700">{lead.service}</td>
                        <td className="py-3 px-4">
                          <span
                            className={`inline-block px-2.5 py-0.5 rounded text-[11px] font-bold ${
                              lead.status === "Closed"
                                ? "bg-emerald-100 text-emerald-800"
                                : lead.status === "Meeting Scheduled"
                                ? "bg-blue-100 text-blue-800"
                                : lead.status === "Contacted"
                                ? "bg-amber-100 text-amber-800"
                                : "bg-slate-100 text-slate-800"
                            }`}
                          >
                            {lead.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={3} className="py-8 text-center text-slate-400 text-xs">
                        No leads in database yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Active Projects Table */}
          <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm overflow-hidden text-left">
            <div className="p-6 border-b border-[#E2E8F0] flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-[#0B1220]">Case Studies &amp; Projects</h3>
                <p className="text-slate-500 text-xs mt-0.5">Active engineering works published on portfolio</p>
              </div>
              <Link href="/admin/projects" className="text-xs font-bold text-[#1769AA] hover:underline flex items-center gap-1">
                View All <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#F8FBFE] border-b border-[#E2E8F0] text-slate-500 uppercase font-bold tracking-wider">
                  <tr>
                    <th className="py-3 px-4">Project Title</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Visibility</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {recentProjects.length > 0 ? (
                    recentProjects.map((p) => (
                      <tr key={p._id} className="hover:bg-slate-50 transition-colors">
                        <td className="py-3 px-4 font-bold text-slate-900">{p.title}</td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-0.5 rounded bg-[#E3EEF8] text-[#1769AA] font-semibold text-[11px]">
                            {p.category}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <span className="inline-flex items-center gap-1 text-emerald-600 font-bold text-[11px]">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Live
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={3} className="py-8 text-center text-slate-400 text-xs">
                        No projects in database yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
  );
}
