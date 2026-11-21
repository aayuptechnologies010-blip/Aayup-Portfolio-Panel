"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Award, Quote, CheckCircle2 } from "lucide-react";
import { LEADERSHIP as STATIC_LEADERSHIP, CORE_TEAM as STATIC_CORE_TEAM, Leader, TeamMember } from "@/data/portfolioData";
import { API_BASE_URL } from "@/lib/api";

export default function LeadershipSection() {
  const [leadership, setLeadership] = useState<Leader[]>(STATIC_LEADERSHIP);
  const [coreTeam, setCoreTeam] = useState<TeamMember[]>(STATIC_CORE_TEAM);

  useEffect(() => {
    async function loadTeam() {
      try {
        const res = await fetch(`${API_BASE_URL}/team`);
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            const directors = data.filter((m: any) => m.type === "director");
            const team = data.filter((m: any) => m.type !== "director");
            if (directors.length > 0) setLeadership(directors);
            if (team.length > 0) setCoreTeam(team);
          }
        }
      } catch {
        // Fallback to static
      }
    }
    loadTeam();
  }, []);
  return (
    <section id="leadership" className="py-20 bg-white border-b border-[#E2E8F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
        {/* Section Header Left-Aligned with Logo */}
        <div className="max-w-3xl mb-16 text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E3EEF8] border border-[#C5DCF0] text-[#1769AA] text-xs font-bold uppercase tracking-wider mb-4">
            <Award className="w-4 h-4" />
            <span>BOARD OF DIRECTORS &amp; EXECUTIVE LEADERSHIP</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1220] tracking-tight text-left">
            Guiding Vision, Strategy &amp;{" "}
            <span className="text-[#1769AA]">Industry Leadership</span>
          </h2>
          <p className="mt-4 text-slate-600 text-base sm:text-lg text-left">
            Meet our directors and founders heading specialized fields of digital innovation, engineering excellence, and client transformation.
          </p>
        </div>

        {/* Directors Zig-Zag Cards */}
        <div className="space-y-12">
          {leadership.map((leader, index) => {
            const isReversed = index % 2 === 1;

            return (
              <div
                key={leader.id}
                className={`grid lg:grid-cols-12 gap-8 items-center bg-[#F3F7FA] p-6 sm:p-10 rounded-2xl border border-[#E2E8F0] shadow-sm text-left ${
                  isReversed ? "lg:flex-row-reverse" : ""
                }`}
              >
                {/* Photo Column */}
                <div className={`lg:col-span-4 ${isReversed ? "lg:order-2" : ""}`}>
                  <div className="relative aspect-[4/5] rounded-xl overflow-hidden border-2 border-white shadow-md bg-slate-200">
                    <Image
                      src={leader.avatar}
                      alt={leader.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black/80 to-transparent text-white text-left">
                      <div className="text-xs font-bold text-[#38BDF8] uppercase">
                        {leader.badge}
                      </div>
                      <div className="text-sm font-extrabold">{leader.name}</div>
                    </div>
                  </div>
                </div>

                {/* Details Column */}
                <div className={`lg:col-span-8 flex flex-col justify-center text-left ${isReversed ? "lg:order-1" : ""}`}>
                  <div className="inline-block text-xs font-bold uppercase tracking-wider text-[#1769AA] bg-white border border-[#C5DCF0] px-3 py-1 rounded-full w-fit mb-2">
                    {leader.directorField}
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0B1220] text-left">
                    {leader.name}
                  </h3>
                  <p className="text-sm sm:text-base font-semibold text-[#1769AA] mt-0.5 text-left">
                    {leader.role}
                  </p>

                  {/* Vision Quote Card */}
                  <div className="mt-5 p-4 rounded-xl bg-white border border-[#E2E8F0] relative text-left">
                    <Quote className="w-6 h-6 text-[#1769AA]/30 absolute top-3 right-3" />
                    <p className="text-slate-700 text-sm sm:text-base italic leading-relaxed pr-6 text-left">
                      &quot;{leader.visionQuote}&quot;
                    </p>
                  </div>

                  {/* Bio */}
                  <p className="mt-4 text-slate-600 text-sm leading-relaxed text-left">
                    {leader.bio}
                  </p>

                  {/* Key Highlights */}
                  <div className="mt-5 flex flex-wrap gap-2 text-left">
                    {leader.highlights.map((h, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-white border border-slate-200 text-xs font-medium text-slate-800"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#1769AA]" />
                        {h}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Engineering Leads */}
        <div className="mt-16 pt-12 border-t border-[#E2E8F0] text-left">
          <div className="mb-8 text-left">
            <h3 className="text-2xl font-bold text-[#0B1220] text-left">
              Core Engineering &amp; Design Leads
            </h3>
            <p className="text-slate-500 text-sm mt-1 text-left">
              Cross-disciplinary talent driving sprint velocity and architectural stability.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
            {coreTeam.map((member, i) => (
              <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-[#F8FBFE] border border-[#E2E8F0] text-left">
                <div className="relative w-14 h-14 rounded-xl overflow-hidden border border-white shadow-sm flex-shrink-0">
                  <Image src={member.avatar} alt={member.name} fill className="object-cover" />
                </div>
                <div className="text-left">
                  <h4 className="text-base font-bold text-[#0B1220] text-left">{member.name}</h4>
                  <p className="text-xs font-semibold text-[#1769AA] text-left">{member.role}</p>
                  <p className="text-xs text-slate-500 mt-0.5 text-left">{member.focus}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
