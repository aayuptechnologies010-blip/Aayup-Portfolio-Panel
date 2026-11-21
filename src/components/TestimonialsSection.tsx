"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Star, Quote, CheckCircle2 } from "lucide-react";
import { TESTIMONIALS as STATIC_TESTIMONIALS, Testimonial } from "@/data/portfolioData";
import { API_BASE_URL } from "@/lib/api";

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(STATIC_TESTIMONIALS);

  useEffect(() => {
    async function loadTestimonials() {
      try {
        const res = await fetch(`${API_BASE_URL}/testimonials`);
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            setTestimonials(data);
          }
        }
      } catch {
        // Fallback to static
      }
    }
    loadTestimonials();
  }, []);

  return (
    <section id="clients" className="py-20 bg-[#F3F7FA] border-b border-[#E2E8F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
        {/* Header Left-Aligned with Logo */}
        <div className="max-w-3xl mb-16 text-left">
          <span className="text-xs uppercase tracking-wider font-bold text-[#1769AA]">
            Social Proof &amp; Client Feedback
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1220] mt-2 text-left">
            Client Experience &amp; Testimonials
          </h2>
          <p className="text-slate-600 text-base sm:text-lg mt-3 text-left">
            What founders, CTOs, and product directors say about working directly with Aayup Technologies.
          </p>
        </div>

        {/* Testimonials 2-Column Grid */}
        <div className="grid md:grid-cols-2 gap-8 text-left">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="p-8 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm flex flex-col justify-between relative text-left"
            >
              <Quote className="w-8 h-8 text-[#1769AA]/15 absolute top-6 right-6" />

              <div>
                {/* 5-Star Rating */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                  <span className="ml-2 text-xs font-bold text-slate-500">5.0 / 5.0 Rating</span>
                </div>

                <p className="text-slate-700 text-base italic leading-relaxed pr-4 text-left">
                  &quot;{t.feedback}&quot;
                </p>

                <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E3EEF8] text-xs font-semibold text-[#1769AA]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#1769AA]" />
                  Delivered: {t.projectDelivered}
                </div>
              </div>

              {/* Author footer */}
              <div className="mt-6 pt-5 border-t border-slate-100 flex items-center gap-3 text-left">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border border-slate-200">
                  <Image src={t.avatar} alt={t.clientName} fill className="object-cover" />
                </div>
                <div className="text-left">
                  <h4 className="text-base font-bold text-[#0B1220] text-left">{t.clientName}</h4>
                  <p className="text-xs font-semibold text-[#1769AA] text-left">{t.role}</p>
                  <p className="text-xs text-slate-500 text-left">{t.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
