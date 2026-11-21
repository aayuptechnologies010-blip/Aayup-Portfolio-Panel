"use client";

import { motion } from "framer-motion";
import { Cpu, Code2, Database, Cloud, Shield, Server } from "lucide-react";

const techCategories = [
  {
    category: "Frontend & Web Architectures",
    icon: Code2,
    technologies: [
      { name: "Next.js 15 (App Router)", desc: "Server Components & Edge Caching" },
      { name: "React 19", desc: "Concurrent & Optimistic UI" },
      { name: "TypeScript", desc: "Type-Safe Enterprise Codebase" },
      { name: "Tailwind CSS", desc: "Design Systems & High Performance" },
    ],
  },
  {
    category: "Mobile Ecosystems",
    icon: Cpu,
    technologies: [
      { name: "Flutter", desc: "High-FPS Cross-Platform iOS & Android" },
      { name: "React Native", desc: "Universal Native UI Modules" },
      { name: "SQLite / Hive", desc: "Local-First Offline Persistence" },
      { name: "Firebase Telemetry", desc: "Push Notifications & Real-Time Sync" },
    ],
  },
  {
    category: "Backend & Distributed Databases",
    icon: Database,
    technologies: [
      { name: "Node.js & Express", desc: "High-Throughput Microservice APIs" },
      { name: "Python / FastAPI", desc: "Asynchronous Endpoints for ML Models" },
      { name: "PostgreSQL", desc: "ACID Relational Enterprise Data" },
      { name: "MongoDB & Redis", desc: "Document Caching & Message Queues" },
    ],
  },
  {
    category: "Cloud, DevOps & AI Pipelines",
    icon: Cloud,
    technologies: [
      { name: "AWS Cloud & Vercel", desc: "Zero-Downtime Global Edge CDN" },
      { name: "Docker Containers", desc: "Isolated Production Environments" },
      { name: "OpenAI & LangChain", desc: "RAG & LLM Autonomous Agents" },
      { name: "GitHub Actions", desc: "Automated Testing & CI/CD Pipelines" },
    ],
  },
];

export default function TechStackSection() {
  return (
    <section id="tech-stack" className="py-24 bg-[#070C18] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1769AA]/15 border border-[#1769AA]/30 text-[#38BDF8] text-xs font-black tracking-widest uppercase mb-4">
            <Server className="w-3.5 h-3.5" />
            <span>MODERN ENGINEERING STACK</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Battle-Tested Technologies Built for{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#38BDF8] via-[#2D86C9] to-[#0066FF]">
              Speed &amp; Longevity
            </span>
          </h2>
          <p className="mt-4 text-slate-300 text-base sm:text-lg">
            We avoid fragile technical debt by selecting proven, highly scalable tools trusted by Fortune 500 tech teams.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {techCategories.map((group, idx) => {
            const Icon = group.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-6 rounded-3xl bg-[#0B1220] border border-white/10 hover:border-[#1769AA]/50 transition-all"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#1769AA]/15 flex items-center justify-center text-[#38BDF8] mb-5">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-white mb-4">{group.category}</h3>
                <div className="space-y-3">
                  {group.technologies.map((t, tIdx) => (
                    <div key={tIdx} className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                      <div className="text-xs font-bold text-slate-100">{t.name}</div>
                      <div className="text-[11px] text-slate-400 mt-0.5">{t.desc}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
