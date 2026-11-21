"use client";

import { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { FolderGit2, Users, Star, Inbox, ArrowUpRight, Plus, Sparkles } from "lucide-react";
import { API_BASE_URL, fetchWithAuth } from "@/lib/api";
import Link from "next/link";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    projectsCount: 4,
    teamCount: 2,
    testimonialsCount: 2,
    leadsCount: 0,
  });

  useEffect(() => {
    // Fetch dashboard counts in parallel
    Promise.all([
      fetch(`${API_BASE_URL}/projects`).then((r) => r.json()).catch(() => null),
      fetch(`${API_BASE_URL}/team`).then((r) => r.json()).catch(() => null),
      fetch(`${API_BASE_URL}/testimonials`).then((r) => r.json()).catch(() => null),
      fetchWithAuth("/leads/admin/all?limit=1").then((r) => r.json()).catch(() => null),
    ]).then(([p, t, test, l]) => {
      setStats({
        projectsCount: p?.data?.length || 4,
        teamCount: t?.data?.length || 2,
        testimonialsCount: test?.data?.length || 2,
        leadsCount: l?.pagination?.total || 0,
      });
    });
  }, []);

  const cards = [
    { title: "Published Projects", count: stats.projectsCount, href: "/admin/projects", icon: FolderGit2, color: "text-[#1769AA]" },
    { title: "Board & Team Members", count: stats.teamCount, href: "/admin/team", icon: Users, color: "text-[#2D86C9]" },
    { title: "Client Testimonials", count: stats.testimonialsCount, href: "/admin/testimonials", icon: Star, color: "text-amber-500" },
    { title: "Inbound Leads", count: stats.leadsCount, href: "/admin/leads", icon: Inbox, color: "text-emerald-600" },
  ];

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E2E8F0]">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#1769AA] bg-[#E3EEF8] px-3 py-1 rounded-full">
              ADMIN DASHBOARD OVERVIEW
            </span>
            <h1 className="text-3xl font-black text-[#0B1220] mt-2">Aayup Technologies Control Center</h1>
            <p className="text-slate-600 text-xs mt-1">
              Manage live website content, client case studies, testimonials, and review contact leads.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/admin/projects"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#1769AA] hover:bg-[#0D4F85] text-white text-xs font-bold uppercase tracking-wider shadow-sm transition-colors"
            >
              <Plus className="w-4 h-4" /> Add Case Study
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
                className="p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm hover:shadow-md transition-shadow group flex flex-col justify-between"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold text-slate-500">{card.title}</span>
                  <div className={`p-2 rounded-lg bg-[#F8FBFE] ${card.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                </div>
                <div className="flex items-end justify-between">
                  <div className="text-3xl font-black text-[#0B1220]">{card.count}</div>
                  <span className="text-xs font-bold text-[#1769AA] flex items-center gap-1 group-hover:underline">
                    Manage <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Quick Operations Guide */}
        <div className="p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm space-y-4">
          <h3 className="text-base font-bold text-[#0B1220]">Portfolio Management Quick Guide</h3>
          <div className="grid sm:grid-cols-3 gap-4 text-xs text-slate-600">
            <div className="p-4 rounded-xl bg-[#F8FBFE] border border-[#E2E8F0]">
              <strong className="text-slate-900 block mb-1">Image Upload / URL Pasting:</strong>
              Upload direct image files (.png, .jpg, .webp) or paste external URLs (Unsplash, CDN links) interchangeably.
            </div>
            <div className="p-4 rounded-xl bg-[#F8FBFE] border border-[#E2E8F0]">
              <strong className="text-slate-900 block mb-1">Dynamic Live Updates:</strong>
              Any changes made in this portal instantly reflect on the main portfolio landing page.
            </div>
            <div className="p-4 rounded-xl bg-[#F8FBFE] border border-[#E2E8F0]">
              <strong className="text-slate-900 block mb-1">Lead Management CRM:</strong>
              View and filter contact requests submitted through the portfolio contact form.
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
