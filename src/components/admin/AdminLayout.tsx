"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  FolderGit2,
  Users,
  Briefcase,
  Star,
  Inbox,
  LogOut,
  ExternalLink,
  ChevronRight,
} from "lucide-react";
import { removeAuthToken, getStoredUser } from "@/lib/api";
import AdminAuthGuard from "./AdminAuthGuard";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const user = getStoredUser();

  const handleLogout = () => {
    removeAuthToken();
    router.replace("/admin/login");
  };

  const navItems = [
    { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { label: "Projects / Case Studies", href: "/admin/projects", icon: FolderGit2 },
    { label: "Directors & Team", href: "/admin/team", icon: Users },
    { label: "Services", href: "/admin/services", icon: Briefcase },
    { label: "Client Testimonials", href: "/admin/testimonials", icon: Star },
    { label: "Contact Leads / CRM", href: "/admin/leads", icon: Inbox },
  ];

  return (
    <AdminAuthGuard>
      <div className="min-h-screen bg-[#F3F7FA] flex text-[#0B1220]">
        {/* Left Sidebar */}
        <aside className="w-64 bg-white border-r border-[#E2E8F0] flex flex-col justify-between shrink-0 shadow-sm fixed top-0 bottom-0 left-0 z-30">
          <div>
            {/* Logo in Top Header */}
            <div className="h-24 px-6 border-b border-[#E2E8F0] flex items-center">
              <div className="relative h-12 w-48">
                <Image
                  src="/aayup-logo-main.jpg"
                  alt="Aayup Technologies"
                  fill
                  className="object-contain object-left"
                />
              </div>
            </div>

            {/* Nav Menu */}
            <div className="p-4 space-y-1">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 py-1">
                Content Management
              </div>
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold transition-colors ${
                      isActive
                        ? "bg-[#1769AA] text-white shadow-sm font-bold"
                        : "text-slate-700 hover:bg-[#F3F7FA] hover:text-[#1769AA]"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Footer User Info & Logout */}
          <div className="p-4 border-t border-[#E2E8F0] space-y-2">
            <div className="px-3 py-2 bg-[#F8FBFE] rounded-lg border border-[#E2E8F0]">
              <div className="text-xs font-bold text-[#0B1220]">{user?.name || "Administrator"}</div>
              <div className="text-[11px] text-slate-500 truncate">{user?.email || "admin@aayuptechnologies.com"}</div>
            </div>

            <div className="flex gap-2">
              <a
                href="/"
                target="_blank"
                className="flex-1 py-2 text-center text-xs font-semibold bg-[#F3F7FA] hover:bg-slate-200 text-slate-700 rounded-lg flex items-center justify-center gap-1"
              >
                Live Site <ExternalLink className="w-3 h-3" />
              </a>
              <button
                onClick={handleLogout}
                className="py-2 px-3 text-xs font-semibold bg-red-50 hover:bg-red-100 text-red-600 rounded-lg flex items-center justify-center gap-1 cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </aside>

        {/* Right Main Content Area */}
        <main className="flex-1 ml-64 p-8 sm:p-10">
          {children}
        </main>
      </div>
    </AdminAuthGuard>
  );
}
