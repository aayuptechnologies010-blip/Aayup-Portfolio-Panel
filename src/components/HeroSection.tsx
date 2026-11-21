"use client";

import Image from "next/image";
import { 
  FolderGit2, 
  Users, 
  Zap
} from "lucide-react";
import { COMPANY_INFO } from "@/data/portfolioData";

export default function HeroSection() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const navOffset = 96;
      const elementPosition = el.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - navOffset,
        behavior: "smooth",
      });
    }
  };

  return (
    <section id="home" className="bg-[#F8FBFE] border-b border-[#E2E8F0] pt-36 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Exactly Left-Aligned with Logo line */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E3EEF8] border border-[#C5DCF0] text-[#1769AA] text-xs font-bold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>OFFICIAL AGENCY WORK &amp; ENGINEERING PORTFOLIO</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#0B1220] tracking-tight leading-[1.12] text-left">
              Building High-Velocity{" "}
              <span className="text-[#1769AA]">Digital Products</span>, Cloud Systems &amp; Modern Apps.
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal max-w-2xl text-left">
              We are a software engineering agency led by architects and product builders. We design, develop, and scale custom web platforms, mobile ecosystems, enterprise CRM/ERP suites, and AI automations.
            </p>

            {/* Portfolio Highlights Pill Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-1 text-left">
              <div className="p-3 bg-white rounded-xl border border-[#E2E8F0] shadow-sm">
                <div className="text-2xl font-black text-[#1769AA]">50+</div>
                <div className="text-xs font-semibold text-slate-600">Shipped Case Studies</div>
              </div>
              <div className="p-3 bg-white rounded-xl border border-[#E2E8F0] shadow-sm">
                <div className="text-2xl font-black text-[#1769AA]">99.8%</div>
                <div className="text-xs font-semibold text-slate-600">Client CSAT Score</div>
              </div>
              <div className="p-3 bg-white rounded-xl border border-[#E2E8F0] shadow-sm col-span-2 sm:col-span-1">
                <div className="text-2xl font-black text-[#1769AA]">7+ Yrs</div>
                <div className="text-xs font-semibold text-slate-600">Executive Tech Leadership</div>
              </div>
            </div>

            {/* Quick Actions Left-Aligned */}
            <div className="flex flex-wrap items-center gap-4 pt-3 text-left">
              <button
                onClick={() => scrollTo("projects")}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg text-sm font-bold bg-[#1769AA] hover:bg-[#0D4F85] text-white shadow-md shadow-[#1769AA]/20 transition-all cursor-pointer"
              >
                <FolderGit2 className="w-4 h-4" /> View Selected Works
              </button>
              <button
                onClick={() => scrollTo("leadership")}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg text-sm font-bold bg-white hover:bg-slate-50 text-[#0B1220] border-2 border-slate-300 hover:border-[#1769AA] transition-all cursor-pointer"
              >
                <Users className="w-4 h-4 text-[#1769AA]" /> Leadership Team
              </button>
            </div>
          </div>

          {/* Right Column: Visual Showcase Mockup */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border-4 border-white shadow-xl bg-slate-100">
              <Image
                src="/portfolio-hero-showcase.webp"
                alt="Aayup Technologies Featured Engineering"
                fill
                priority
                className="object-cover"
              />
            </div>

            {/* Floating Live Badge */}
            <div className="absolute -bottom-5 -left-5 bg-white p-4 rounded-xl border border-slate-200 shadow-xl hidden sm:flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-lg bg-[#E3EEF8] flex items-center justify-center text-[#1769AA]">
                <Zap className="w-5 h-5" />
              </div>
              <div className="text-left">
                <div className="text-xs font-bold text-[#0B1220]">Production Ready</div>
                <div className="text-[11px] text-slate-500">Next.js • Flutter • FastAPI • Cloud</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
