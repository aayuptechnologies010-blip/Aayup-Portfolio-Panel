import Image from "next/image";
import { Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";
import { COMPANY_INFO } from "@/data/portfolioData";

export default function Footer() {
  return (
    <footer className="bg-[#0B1220] text-white pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-12 gap-10 mb-12 items-start">
          {/* Brand Info with EXACT same 280px x 68px size aligned to the left grid line */}
          <div className="lg:col-span-5 space-y-4 text-left">
            <a href="#home" className="inline-block">
              <div className="relative h-[68px] w-[260px] sm:w-[280px]">
                <Image
                  src="/aayup-logo-footer.png"
                  alt="Aayup Technologies"
                  fill
                  className="object-contain object-left filter brightness-0 invert"
                />
              </div>
            </a>
            <p className="text-slate-300 text-sm leading-relaxed max-w-md text-left">
              AAYUP Technologies Pvt. Ltd. is a full-service software development agency building modern web applications, scalable mobile apps, custom enterprise CRM/ERP software, and AI solutions.
            </p>
            <div className="text-xs text-slate-400 font-medium text-left">
              Registered Software Engineering Agency • Maharashtra, India
            </div>
          </div>

          {/* Quick Nav Links */}
          <div className="lg:col-span-3 space-y-3 text-left">
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#2D86C9]">
              Portfolio Sections
            </h4>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>
                <a href="#about" className="hover:text-white transition-colors">
                  About Company
                </a>
              </li>
              <li>
                <a href="#leadership" className="hover:text-white transition-colors">
                  Board of Directors
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Services &amp; Capabilities
                </a>
              </li>
              <li>
                <a href="#projects" className="hover:text-white transition-colors">
                  Case Studies &amp; Projects
                </a>
              </li>
              <li>
                <a href="#clients" className="hover:text-white transition-colors">
                  Client Experiences
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-colors">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Corporate Contact */}
          <div className="lg:col-span-4 space-y-3 text-left">
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#2D86C9]">
              Headquarters &amp; Direct Reach
            </h4>
            <div className="flex items-start gap-3 text-sm text-slate-300">
              <MapPin className="w-4 h-4 text-[#2D86C9] mt-1 flex-shrink-0" />
              <span>{COMPANY_INFO.location}</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-300">
              <Mail className="w-4 h-4 text-[#2D86C9] flex-shrink-0" />
              <a href={`mailto:${COMPANY_INFO.email}`} className="hover:text-white transition-colors">
                {COMPANY_INFO.email}
              </a>
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-300">
              <Phone className="w-4 h-4 text-[#2D86C9] flex-shrink-0" />
              <a href={`tel:${COMPANY_INFO.phone}`} className="hover:text-white transition-colors">
                {COMPANY_INFO.phone}
              </a>
            </div>
            <div className="pt-2">
              <a
                href="https://www.aayuptechnologies.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#2D86C9] hover:text-white uppercase tracking-wider"
              >
                Go to aayuptechnologies.com <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 text-left">
          <p>© {new Date().getFullYear()} Aayup Technologies Pvt. Ltd. All rights reserved.</p>
          <p>Engineered for Speed, Reliability &amp; Scalability.</p>
        </div>
      </div>
    </footer>
  );
}
