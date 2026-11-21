import Image from "next/image";
import { Target, Eye, Code2, Users } from "lucide-react";

export default function AboutSection() {
  const values = [
    { icon: Code2, title: "Innovation", desc: "Pushing boundaries with cutting-edge software architecture and resilient systems." },
    { icon: Target, title: "Integrity", desc: "Building long-term client trust through complete transparency and 100% IP ownership." },
    { icon: Users, title: "Collaboration", desc: "Working as a tight-knit internal technology extension with client stakeholders." },
    { icon: Eye, title: "Excellence", desc: "Zero compromise on code quality, security audits, and sub-second performance." },
  ];

  return (
    <section id="about" className="py-20 bg-white border-b border-[#E2E8F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
        <div className="grid lg:grid-cols-12 gap-10 items-center mb-16">
          <div className="lg:col-span-7 space-y-5 text-left">
            <span className="inline-block px-3 py-1 rounded-full bg-[#E3EEF8] text-[#1769AA] text-xs font-bold uppercase tracking-wider">
              ABOUT AAYUP TECHNOLOGIES
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1220] tracking-tight leading-tight text-left">
              Engineering World-Class Digital Solutions with Integrity &amp; Precision.
            </h2>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed text-left">
              AAYUP Technologies Pvt. Ltd. was founded on a singular premise: modern businesses need digital engineering partners who build resilient, scalable architectures that eliminate operational bottlenecks and drive massive revenue growth.
            </p>
            <div className="grid grid-cols-2 gap-4 pt-2 text-left">
              <div className="p-4 rounded-xl bg-[#F8FBFE] border border-[#E2E8F0]">
                <h4 className="font-bold text-[#1769AA] text-lg">Our Mission</h4>
                <p className="text-xs text-slate-600 mt-1">
                  Deliver bulletproof web architectures, custom ERP systems, and AI models with zero tech debt.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-[#F8FBFE] border border-[#E2E8F0]">
                <h4 className="font-bold text-[#2D86C9] text-lg">Our Vision</h4>
                <p className="text-xs text-slate-600 mt-1">
                  Be the most dependable technology engineering agency, known for craftsmanship and client trust.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border-2 border-white shadow-lg bg-slate-100">
              <Image
                src="/about-hero-team.png"
                alt="Aayup Technologies Team"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* 4 Core Values: Clean Left-Aligned */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
          {values.map((v, i) => {
            const Icon = v.icon;
            return (
              <div key={i} className="p-6 rounded-xl bg-[#F3F7FA] border border-[#E2E8F0] shadow-sm text-left">
                <div className="w-10 h-10 rounded-lg bg-[#E3EEF8] text-[#1769AA] flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-[#0B1220] mb-1">{v.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{v.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
