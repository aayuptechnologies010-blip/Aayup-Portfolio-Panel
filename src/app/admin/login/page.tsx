"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Lock, Mail, ArrowRight, AlertCircle, ShieldCheck } from "lucide-react";
import { API_BASE_URL, setAuthToken } from "@/lib/api";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("admin@aayuptechnologies.com");
  const [password, setPassword] = useState("admin@123");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Invalid credentials.");
      }

      setAuthToken(data.token);
      localStorage.setItem("aayup_admin_user", JSON.stringify(data.user));
      router.push("/admin");
    } catch (err: any) {
      setError(err.message || "Failed to authenticate. Ensure server is active.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FBFE] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl border border-[#E2E8F0] shadow-xl p-8 sm:p-10 text-left">
        {/* Brand Logo in Exact Header Proportion */}
        <div className="relative h-14 w-60 mb-6">
          <Image
            src="/aayup-logo-main.jpg"
            alt="Aayup Technologies"
            fill
            priority
            className="object-contain object-left"
          />
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E3EEF8] border border-[#C5DCF0] text-[#1769AA] text-xs font-bold uppercase tracking-wider mb-3">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>PORTFOLIO ADMIN PORTAL</span>
        </div>

        <h1 className="text-2xl font-black text-[#0B1220]">Secure Admin Login</h1>
        <p className="text-slate-600 text-xs mt-1 leading-relaxed">
          Authorized personnel only. Access case studies, leads, team members, and real-time portfolio data.
        </p>

        {error && (
          <div className="mt-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="mt-6 space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Admin Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@aayuptechnologies.com"
                className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-[#1769AA] text-sm text-slate-800"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-[#1769AA] text-sm text-slate-800"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-3 rounded-lg bg-[#1769AA] hover:bg-[#0D4F85] text-white font-bold uppercase tracking-wider text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {loading ? "Verifying..." : "Sign In to Admin Portal"}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-slate-100 text-center text-xs text-slate-400">
          Default seed credentials: <strong className="text-slate-600">admin@aayuptechnologies.com / admin@123</strong>
        </div>
      </div>
    </div>
  );
}
