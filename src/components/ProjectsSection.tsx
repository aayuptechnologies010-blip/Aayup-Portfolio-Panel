"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { 
  Clock, 
  TrendingUp, 
  ExternalLink, 
  CheckCircle2, 
  Layers, 
  FolderGit2, 
  Sparkles,
  ArrowRight
} from "lucide-react";
import { PROJECTS as STATIC_PROJECTS, Project } from "@/data/portfolioData";
import { API_BASE_URL } from "@/lib/api";

export default function ProjectsSection() {
  const [projectsList, setProjectsList] = useState<Project[]>(STATIC_PROJECTS);
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  useEffect(() => {
    async function loadProjects() {
      try {
        const res = await fetch(`${API_BASE_URL}/projects?limit=50`);
        if (res.ok) {
          const data = await res.json();
          if (data && data.projects && data.projects.length > 0) {
            setProjectsList(data.projects);
          }
        }
      } catch {
        // Fallback to static data
      }
    }
    loadProjects();
  }, []);

  const categories = ["All", "Web Platforms", "Mobile Apps", "CRM / ERP", "AI & Automation"];

  const filtered =
    activeCategory === "All"
      ? projectsList
      : projectsList.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" className="py-24 bg-white border-b border-[#E2E8F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E3EEF8] text-[#1769AA] text-xs font-bold uppercase tracking-wider mb-3">
              <FolderGit2 className="w-3.5 h-3.5" />
              <span>ENGINEERED WORKS &amp; CASE STUDIES</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1220] tracking-tight">
              Featured Client Case Studies
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-xl">
              In-depth view of enterprise platforms, mobile architectures, and automated pipelines designed and deployed by our team.
            </p>
          </div>

          {/* Interactive Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  activeCategory === cat
                    ? "bg-[#1769AA] text-white shadow-sm"
                    : "bg-[#F3F7FA] text-slate-700 hover:bg-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Portfolio Cards Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {filtered.map((project, idx) => (
            <div
              key={project.id}
              className="bg-[#F8FBFE] rounded-2xl border border-[#E2E8F0] overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
            >
              {/* Media Container */}
              <div className="relative aspect-[16/10] bg-slate-100 border-b border-[#E2E8F0] overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-102 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="px-3 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-[#1769AA] text-white shadow">
                    {project.category}
                  </span>
                  <span className="px-3 py-1 rounded-md text-[11px] font-semibold bg-white/95 text-slate-800 shadow flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#1769AA]" />
                    {project.duration}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#1769AA]">
                      Case Study 0{idx + 1}
                    </span>
                    <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      Shipped
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-[#0B1220] mt-1.5">
                    {project.title}
                  </h3>
                  <p className="text-xs font-semibold text-[#1769AA] mt-0.5">{project.tagline}</p>
                  
                  <p className="text-slate-600 text-sm mt-3 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Impact Metric Bar */}
                  <div className="mt-4 p-3 rounded-lg bg-[#E3EEF8] border border-[#C5DCF0] flex items-center gap-2.5">
                    <TrendingUp className="w-4 h-4 text-[#1769AA] flex-shrink-0" />
                    <span className="text-xs font-bold text-[#0D4F85]">
                      {project.metrics}
                    </span>
                  </div>

                  {/* Problem vs Solution Split */}
                  <div className="mt-4 space-y-2 text-xs">
                    <div className="p-3 bg-white rounded-lg border border-[#E2E8F0]">
                      <strong className="text-slate-900 block mb-0.5">The Challenge:</strong>
                      <span className="text-slate-600">{project.problem}</span>
                    </div>
                    <div className="p-3 bg-white rounded-lg border border-[#E2E8F0]">
                      <strong className="text-[#1769AA] block mb-0.5">Our Engineered Solution:</strong>
                      <span className="text-slate-600">{project.solution}</span>
                    </div>
                  </div>
                </div>

                {/* Tech Stack & Modal Action */}
                <div className="mt-6 pt-4 border-t border-[#E2E8F0] flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap gap-1.5">
                    {project.techStack.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2 py-0.5 rounded text-[11px] font-medium bg-white border border-[#E2E8F0] text-slate-700"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => setActiveModalProject(project)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1769AA] hover:text-[#0D4F85] cursor-pointer ml-auto"
                  >
                    Deep Dive <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Project Details Modal */}
        {activeModalProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
            <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto relative shadow-2xl border border-slate-200">
              <button
                onClick={() => setActiveModalProject(null)}
                className="absolute top-4 right-4 p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold"
              >
                ✕
              </button>

              <span className="text-xs font-bold uppercase tracking-wider text-[#1769AA] bg-[#E3EEF8] px-2.5 py-1 rounded">
                {activeModalProject.category}
              </span>

              <h3 className="text-2xl font-black text-[#0B1220] mt-3">
                {activeModalProject.title}
              </h3>
              <p className="text-xs font-semibold text-[#1769AA] mt-1">
                {activeModalProject.tagline}
              </p>

              <div className="relative aspect-[16/9] rounded-xl overflow-hidden my-4 border border-slate-200">
                <Image
                  src={activeModalProject.image}
                  alt={activeModalProject.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="space-y-4 text-sm text-slate-700">
                <p className="leading-relaxed">{activeModalProject.description}</p>
                
                <div className="p-3.5 rounded-lg bg-[#E3EEF8] border border-[#C5DCF0]">
                  <strong className="text-[#0D4F85] block mb-1">Key Results &amp; Impact:</strong>
                  <span>{activeModalProject.metrics}</span>
                </div>

                <div>
                  <h4 className="font-bold text-[#0B1220] mb-2">Core Features Engineered:</h4>
                  <div className="space-y-1.5">
                    {activeModalProject.keyFeatures.map((f, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-slate-600">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#1769AA] flex-shrink-0" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-[#0B1220] mb-2">Technologies Used:</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {activeModalProject.techStack.map((t, i) => (
                      <span key={i} className="px-2 py-0.5 rounded text-xs font-semibold bg-[#F3F7FA] border border-slate-200 text-slate-800">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
