// Header.jsx
import React, { useState, useEffect, useRef } from "react";
import { useTheme } from "../context/ThemeContext";

// Import SVG icons (paths you already have)
import UserIcon from "../assets/images/about.svg";
import ProjectsIcon from "../assets/images/project.svg";
import SkillsIcon from "../assets/images/skill.svg";
import ExperienceIcon from "../assets/images/exp.svg";
import EducationIcon from "../assets/images/ed.svg";
import ContactIcon from "../assets/images/connect.svg";
import ResumeIcon from "../assets/images/resume.svg";
import CloseIcon from "../assets/images/close.svg";
import BarsIcon from "../assets/images/bars.svg";

const links = [
  { name: "About", id: "about", icon: UserIcon },
  { name: "Projects", id: "projects", icon: ProjectsIcon },
  { name: "Skills", id: "skills", icon: SkillsIcon },
  { name: "Experience", id: "experience", icon: ExperienceIcon },
  { name: "Education", id: "education", icon: EducationIcon },
  { name: "Contact", id: "contact", icon: ContactIcon },
  { name: "Resume", id: "resume", href: "/resume.pdf", icon: ResumeIcon },
];

const Header = () => {
  const { isDark } = useTheme();
  const [activeTab, setActiveTab] = useState("about");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showGlow, setShowGlow] = useState(false);
  const mobileRef = useRef(null);

  // Close mobile menu on resize
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Close popup on outside click
  useEffect(() => {
    const handleDocClick = (e) => {
      if (mobileRef.current && !mobileRef.current.contains(e.target)) {
        if (mobileOpen) setMobileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleDocClick);
    return () => document.removeEventListener("mousedown", handleDocClick);
  }, [mobileOpen]);

  // Glow animation
  useEffect(() => {
    if (mobileOpen) {
      setShowGlow(true);
      const t = setTimeout(() => setShowGlow(false), 1000);
      return () => clearTimeout(t);
    } else {
      setShowGlow(false);
    }
  }, [mobileOpen]);

  const handleNavClick = (id, href) => {
    setActiveTab(id);
    setMobileOpen(false);
    if (href) {
      window.location.href = href;
      return;
    }
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Theme-aware backgrounds with glassmorphism
  const themeBgDesktop = isDark
    ? "bg-[#0b0b0c]/70 border-[#27272a] text-white backdrop-blur-md"
    : "bg-white/60 border-gray-200 text-gray-800 backdrop-blur-md";

  const themeBgMobile = isDark
    ? "bg-[#0b0b0c]/70 backdrop-blur-md text-white"
    : "bg-white/60 backdrop-blur-md text-gray-800";

  const hoverBg = isDark ? "hover:bg-white/10" : "hover:bg-gray-900/5";
  const iconInvert = isDark ? "invert-[0.1]" : "invert-[0.8]";

  return (
    <>
      {/* MOBILE NAV (fixed bottom) */}
      <nav
        aria-label="Primary"
        className="fixed left-1/2 transform -translate-x-1/2 bottom-6 z-50 w-[min(96%,46rem)] md:hidden"
      >
        <div
          className={`flex items-center justify-evenly px-4 py-2 rounded-3xl border transition-all duration-300 ${
            isDark
              ? "shadow-lg shadow-gray-900/50 border-[#27272a]"
              : "shadow-lg border-gray-200"
          } ${themeBgMobile}`}
        >
          {links.slice(0, 3).map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id, link.href)}
              className={`flex flex-col items-center justify-center text-xs font-medium rounded-lg px-2 py-1 transition-all ${
                activeTab === link.id
                  ? isDark
                    ? "text-white"
                    : "text-gray-900"
                  : `${hoverBg} ${isDark ? "text-white/70" : "text-gray-700"}`
              }`}
            >
              <img
                src={link.icon}
                alt={`${link.name} icon`}
                className={`w-6 h-6 mb-0.5 ${iconInvert}`}
              />
              {link.name}
            </button>
          ))}

          {/* Menu Button — no shaking */}
          <button
            onClick={() => setMobileOpen((s) => !s)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            className={`flex flex-col items-center justify-center text-xs font-medium rounded-lg px-2 py-1 transition-all duration-200 focus:outline-none relative ${
              mobileOpen
                ? isDark
                  ? "bg-white/10 text-white"
                  : "bg-gray-900/10 text-gray-900"
                : `${hoverBg} ${isDark ? "text-white/70" : "text-gray-700"}`
            }`}
            style={{
              boxShadow: showGlow
                ? isDark
                  ? "0 0 0 2px rgba(255,219,112,0.4)"
                  : "0 0 0 2px rgba(7,190,184,0.4)"
                : "0 0 0 2px transparent", // maintain layout space
            }}
          >
            <div className="flex flex-col items-center justify-center min-w-[40px] min-h-[40px]">
              <img
                src={mobileOpen ? CloseIcon : BarsIcon}
                alt={mobileOpen ? "Close" : "Menu"}
                className={`w-6 h-6 mb-0.5 ${iconInvert}`}
              />
              <span className="mt-0.5">{mobileOpen ? "Close" : "Menu"}</span>
            </div>
          </button>
        </div>

        {/* Overlay */}
        {mobileOpen && (
          <div
            className="fixed inset-0 z-40"
            onClick={() => setMobileOpen(false)}
            aria-hidden
          />
        )}

        {/* Mobile popup menu */}
        {mobileOpen && (
          <div
            id="mobile-popover"
            ref={mobileRef}
            className={`mt-2 rounded-xl overflow-hidden shadow-xl fixed left-1/2 transform -translate-x-1/2 bottom-20 z-50 w-[min(96%,46rem)] ${
              isDark
                ? "bg-[#0b0b0c]/95 backdrop-blur-md"
                : "bg-white/95 backdrop-blur-md"
            }`}
            role="dialog"
            aria-modal="true"
          >
            <div className="p-3 pt-4">
              <div className="flex flex-col gap-1.5">
                {links.map((l) => (
                  <button
                    key={l.id}
                    onClick={() => handleNavClick(l.id, l.href)}
                    className={`w-full text-left px-3 py-3 rounded-lg transition flex items-center gap-4 ${
                      activeTab === l.id
                        ? isDark
                          ? "bg-white/10 text-white"
                          : "bg-gray-900/10 text-gray-900"
                        : isDark
                        ? "text-white/70 hover:bg-white/5"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <img src={l.icon} alt="" className={`w-6 h-6 ${iconInvert}`} />
                    <span className="font-medium">{l.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* DESKTOP NAV (fixed top, glassmorphism) */}
      <header className="hidden md:block fixed top-6 left-1/2 transform -translate-x-1/2 z-50 w-[min(89%,64rem)]">
        <div
          className={`flex items-center justify-evenly gap-4 px-6 py-4 rounded-2xl border shadow-md transition-all duration-300 ${themeBgDesktop}`}
          role="navigation"
        >
          {links.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id, link.href)}
              className={`px-4 py-3 rounded-lg font-medium transition flex items-center gap-3 ${
                activeTab === link.id
                  ? isDark
                    ? "bg-white/10 text-white"
                    : "bg-gray-900/10 text-gray-900"
                  : `${hoverBg} ${isDark ? "text-white/70" : "text-gray-700"}`
              }`}
            >
              <img
                src={link.icon}
                alt=""
                className={`w-5 h-5 ${iconInvert} opacity-90`}
              />
              <span className="text-base  mr-3">{link.name}</span>
            </button>
          ))}
        </div>
      </header>
    </>
  );
};

export default Header;
