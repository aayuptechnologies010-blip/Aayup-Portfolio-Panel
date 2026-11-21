"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Menu, X, ArrowUpRight, Phone } from "lucide-react";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const navLinks = [
    { label: "Home", href: "#home", id: "home" },
    { label: "About", href: "#about", id: "about" },
    { label: "Directors & Team", href: "#leadership", id: "leadership" },
    { label: "Services", href: "#services", id: "services" },
    { label: "Projects", href: "#projects", id: "projects" },
    { label: "Client Experience", href: "#clients", id: "clients" },
  ];

  // ScrollSpy to track active section while scrolling
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 120; // 120px offset for active detection
      
      const allSections = [
        ...navLinks,
        { label: "Contact", href: "#contact", id: "contact" },
      ];

      const sections = allSections.map((link) => {
        const el = document.getElementById(link.id);
        if (el) {
          return {
            id: link.id,
            top: el.offsetTop,
            bottom: el.offsetTop + el.offsetHeight,
          };
        }
        return null;
      }).filter(Boolean);

      for (let i = sections.length - 1; i >= 0; i--) {
        const sec = sections[i];
        if (sec && scrollPosition >= sec.top - 80) {
          setActiveSection(sec.id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string, id: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      const navOffset = 96;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - navOffset,
        behavior: "smooth",
      });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-[#E2E8F0] shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          {/* Logo container matching exact 280px x 68px */}
          <a
            href="#home"
            onClick={(e) => handleScroll(e, "#home", "home")}
            className="flex items-center cursor-pointer"
          >
            <div className="relative h-[68px] w-[260px] sm:w-[280px]">
              <Image
                src="/aayup-logo-main.jpg"
                alt="Aayup Technologies"
                fill
                priority
                className="object-contain object-left"
              />
            </div>
          </a>

          {/* Desktop Navigation Links (Duplicate Contact Removed) */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleScroll(e, link.href, link.id)}
                  className={`px-3.5 py-2 text-sm font-semibold rounded-md transition-all duration-150 cursor-pointer ${
                    isActive
                      ? "bg-[#1769AA] text-white shadow-sm font-bold"
                      : "text-slate-700 hover:text-[#1769AA] hover:bg-[#F3F7FA]"
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Action CTAs (Primary Contact Button) */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="https://www.aayuptechnologies.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-3.5 py-2.5 rounded-md bg-[#F3F7FA] hover:bg-[#E2E8F0] text-slate-700 border border-[#E2E8F0] transition-colors"
            >
              Main Site <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
            <a
              href="#contact"
              onClick={(e) => handleScroll(e, "#contact", "contact")}
              className={`inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold uppercase tracking-wider rounded-md shadow-sm transition-colors cursor-pointer ${
                activeSection === "contact"
                  ? "bg-[#0D4F85] text-white ring-2 ring-[#1769AA]"
                  : "bg-[#1769AA] hover:bg-[#0D4F85] text-white"
              }`}
            >
              <Phone className="w-3.5 h-3.5" />
              Contact Us
            </a>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
            className="md:hidden p-2 rounded-lg bg-[#F3F7FA] text-slate-700 hover:bg-slate-200 transition-colors"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-[#E2E8F0] bg-white">
            <div className="flex flex-col space-y-1">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => handleScroll(e, link.href, link.id)}
                    className={`px-3 py-2.5 rounded-md text-sm font-semibold cursor-pointer ${
                      isActive
                        ? "bg-[#1769AA] text-white font-bold"
                        : "text-slate-700 hover:bg-[#F3F7FA] hover:text-[#1769AA]"
                    }`}
                  >
                    {link.label}
                  </a>
                );
              })}
              <div className="pt-3">
                <a
                  href="#contact"
                  onClick={(e) => handleScroll(e, "#contact", "contact")}
                  className="w-full text-center py-2.5 text-xs font-bold uppercase tracking-wider bg-[#1769AA] text-white rounded-md cursor-pointer block"
                >
                  Contact Aayup Team
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
