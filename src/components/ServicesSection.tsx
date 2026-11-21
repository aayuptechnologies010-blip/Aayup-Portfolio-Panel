"use client";

import Image from "next/image";
import {
  Globe,
  Smartphone,
  LayoutDashboard,
  Bot,
  Palette,
  Cloud,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { SERVICES } from "@/data/portfolioData";

const iconMap: Record<string, any> = {
  Globe,
  Smartphone,
  LayoutDashboard,
  Bot,
  Palette,
  Cloud,
};

export default function ServicesSection() {
  return (
    <section id="services" className="py-20 bg-[#F3F7FA] border-b border-[#E2E8F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
        {/* Header Left-Aligned with Logo */}
        <div className="max-w-3xl mb-16 text-left">
          <span className="text-xs uppercase tracking-wider font-bold text-[#1769AA]">
            Capabilities &amp; Expertise
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1220] mt-2 text-left">
            Our Software Development Services
          </h2>
          <p className="text-slate-600 text-base sm:text-lg mt-3 text-left">
            We deliver end-to-end digital engineering services that empower modern enterprises to scale, automate, and lead in their markets.
          </p>
        </div>

        {/* 6 Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
          {SERVICES.map((service) => {
            const Icon = iconMap[service.icon] || Globe;

            return (
              <div
                key={service.id}
                className="bg-white p-8 rounded-2xl border border-[#E2E8F0] shadow-sm hover:shadow-lg hover:border-[#1769AA]/40 transition-all flex flex-col justify-between group text-left"
              >
                <div>
                  <div className="w-14 h-14 rounded-xl bg-[#E3EEF8] flex items-center justify-center text-[#1769AA] mb-6 group-hover:bg-[#1769AA] group-hover:text-white transition-colors duration-200">
                    <Icon className="w-7 h-7" />
                  </div>

                  <h3 className="text-xl font-bold text-[#0B1220] mb-2 text-left">
                    {service.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed text-left">
                    {service.description}
                  </p>

                  <div className="mt-4 p-2.5 rounded-lg bg-[#F8FBFE] border-l-4 border-[#1769AA] text-xs font-semibold text-slate-700 text-left">
                    {service.highlight}
                  </div>

                  <div className="mt-5 space-y-2 border-t border-slate-100 pt-4 text-left">
                    {service.deliverables.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-600 text-left">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#1769AA] mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex flex-wrap gap-1">
                    {service.techTags.slice(0, 3).map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[10px] font-semibold text-[#1769AA] bg-[#E3EEF8] px-2 py-0.5 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
