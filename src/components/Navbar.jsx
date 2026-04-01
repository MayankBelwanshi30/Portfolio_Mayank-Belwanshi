// src/components/Navbar.jsx
import { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';

/* ── Nav link definitions ── */
const NAV_LINKS = [
  {
    label: 'About', id: 'about',
    d: 'M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-4 0-8 2-8 5v1h16v-1c0-3-4-5-8-5z',
  },
  {
    label: 'Skills', id: 'skills',
    d: 'M4 21v-7M4 10V3M12 21v-4M12 13V3M20 21v-9M20 8V3M2 14h4M10 13h4M18 8h4',
  },
  {
    label: 'Projects', id: 'projects',
    d: 'M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z',
  },
  {
    label: 'Experience', id: 'experience',
    d: 'M2 7h20v14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7zM16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2',
  },
  {
    label: 'Contact', id: 'contact',
    d: 'M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zM22 6 12 13 2 6',
  },
];

/* ── Inline icon components ── */
const SunIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
    strokeLinecap="round" strokeLinejoin="round"
    style={{ width: 18, height: 18, flexShrink: 0 }}>
    <circle cx="12" cy="12" r="5"/>
    <line x1="12" y1="1" x2="12" y2="3"/>
    <line x1="12" y1="21" x2="12" y2="23"/>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
    <line x1="1" y1="12" x2="3" y2="12"/>
    <line x1="21" y1="12" x2="23" y2="12"/>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
  </svg>
);

const MoonIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
    strokeLinecap="round" strokeLinejoin="round"
    style={{ width: 18, height: 18, flexShrink: 0 }}>
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
);

export default function Navbar() {
  const { isDark, toggleTheme } = useTheme();
  const [active, setActive] = useState('');
  const [hovered, setHovered] = useState('');
  const [tooltip, setTooltip] = useState('');

  /* ── Accent palette ── */
  const accent = isDark ? '#9B5CFF' : '#07BEB8';
  const accentSoft = isDark ? 'rgba(155,92,255,0.16)' : 'rgba(7,190,184,0.14)';
  const accentGlow = isDark 
    ? 'rgba(155,92,255,0.24)'   // 80% of 0.30
    : 'rgba(7,190,184,0.192)';  // 80% of 0.24

  const dimText = isDark ? 'rgba(245,245,245,0.45)' : 'rgba(10,10,10,0.48)';
  const brightText = isDark ? '#f5f5f5' : '#0a0a0a';
  const dividerBg = isDark ? 'rgba(255,255,255,0.14)' : 'rgba(0,0,0,0.09)';

  /* ── Glass nav background ── */
  const navBg = isDark
    ? 'linear-gradient(135deg, rgba(22,20,32,0.74) 0%, rgba(14,12,22,0.60) 100%)'
    : 'linear-gradient(135deg, rgba(255,255,255,0.82) 0%, rgba(245,245,255,0.62) 100%)';
  const navBorder = isDark
    ? '1px solid rgba(255,255,255,0.16)'
    : '1px solid rgba(0,0,0,0.09)';
  const navShadow = isDark
    ? `0 10px 48px rgba(0,0,0,0.60), inset 0 1px 0 rgba(255,255,255,0.06), 0 0 25.6px ${accentGlow}`
    : `0 8px 32px rgba(0,0,0,0.10), inset 0 1px 0 rgba(255,255,255,0.9)`;

  /* ── Active section tracking ── */
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { threshold: 0.3 }
    );

    const sections = document.querySelectorAll('section[id]');
    sections.forEach((s) => obs.observe(s));

    return () => obs.disconnect();
  }, []);

  /* ── Per-link styles ── */
  const linkStyle = (id) => {
    const isActive = active === id;
    const isHovered = hovered === id;

    return {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      gap: '0.42rem',
      padding: '0.62rem 0.72rem',
      borderRadius: '999px',
      textDecoration: 'none',
      fontFamily: 'DM Sans, sans-serif',
      fontSize: '0.86rem',
      fontWeight: isActive ? 600 : 500,
      whiteSpace: 'nowrap',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      color: isActive ? accent : (isHovered ? brightText : dimText),
      background: isActive
        ? accentSoft
        : isHovered
          ? (isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.05)')
          : 'transparent',
      border: isActive ? `1px solid ${accent}44` : '1px solid transparent',
      boxShadow: isActive ? `0 0 12.8px ${accentGlow}` : 'none', // 80% glow
    };
  };

  const iconStyle = (id) => ({
    width: 17,
    height: 17,
    flexShrink: 0,
    transition: 'stroke 0.2s',
  });

  return (
    <>
      <nav
        aria-label="Main navigation"
        style={{
          position: 'fixed',
          bottom: '2.8rem',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 200,
          display: 'flex',
          alignItems: 'center',
          gap: '0.15rem',
          maxWidth: 'calc(100vw - 1.25rem)',
          padding: '0.52rem 0.78rem',
          borderRadius: '999px',
          background: navBg,
          backdropFilter: 'blur(28px) saturate(180%)',
          WebkitBackdropFilter: 'blur(28px) saturate(180%)',
          border: navBorder,
          boxShadow: navShadow,
          animation: 'navUp 0.7s cubic-bezier(0.34,1.56,0.64,1) 0.5s both',
        }}
      >
        {/* Logo + Divider - Hidden on mobile */}
        <span className="nav-logo" style={{
          fontFamily: 'Syne, sans-serif',
          fontWeight: 800,
          fontSize: '1.15rem',
          padding: '0.38rem 0.82rem',
          color: accent,
          letterSpacing: '-0.01em',
          textShadow: `0 0 17.6px ${accentGlow}`, // 80% glow
          flexShrink: 0,
        }}>
          MB.
        </span>

        <span className="nav-divider" style={{ width: 1, height: 22, background: dividerBg, flexShrink: 0, margin: '0 0.2rem' }} />

        {/* Links */}
        {NAV_LINKS.map((link) => (
          <a
            key={link.id}
            href={`#${link.id}`}
            aria-label={link.label}
            style={linkStyle(link.id)}
            onMouseEnter={() => { setHovered(link.id); setTooltip(link.id); }}
            onMouseLeave={() => { setHovered(''); setTooltip(''); }}
            onClick={() => setActive(link.id)}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={iconStyle(link.id)}
              stroke={active === link.id ? accent : (hovered === link.id ? brightText : dimText)}
            >
              <path d={link.d} />
            </svg>

            <span className="nav-label">{link.label}</span>

            {active === link.id && (
              <span
                className="nav-dot"
                style={{
                  position: 'absolute',
                  bottom: -5,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: 4,
                  height: 4,
                  borderRadius: '50%',
                  background: accent,
                  boxShadow: `0 0 4.8px ${accent}`, // softer
                }}
              />
            )}
          </a>
        ))}

        {/* Divider before theme toggle - Hidden on mobile */}
        <span className="nav-divider" style={{ width: 1, height: 22, background: dividerBg, flexShrink: 0, margin: '0 0.2rem' }} />

        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          aria-label="Toggle colour theme"
          style={{
            width: 42,
            height: 42,
            borderRadius: '50%',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            cursor: 'pointer',
            color: accent,
            background: accentSoft,
            boxShadow: `0 0 9.6px ${accentGlow}`, // 80% glow
            transition: 'transform 0.22s, box-shadow 0.22s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.13) rotate(18deg)';
            e.currentTarget.style.boxShadow = `0 0 19.2px ${accentGlow}`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
            e.currentTarget.style.boxShadow = `0 0 9.6px ${accentGlow}`;
          }}
        >
          {isDark ? <SunIcon /> : <MoonIcon />}
        </button>
      </nav>

      {/* Mobile Tooltip */}
      {tooltip && (
        <div
          className="nav-tooltip"
          style={{
            position: 'fixed',
            bottom: '6.6rem',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 201,
            pointerEvents: 'none',
            padding: '0.28rem 0.75rem',
            borderRadius: '8px',
            fontFamily: 'DM Sans, sans-serif',
            fontSize: '0.7rem',
            fontWeight: 600,
            letterSpacing: '0.07em',
            textTransform: 'uppercase',
            color: accent,
            background: isDark ? 'rgba(22,20,32,0.90)' : 'rgba(255,255,255,0.94)',
            border: `1px solid ${accent}44`,
            backdropFilter: 'blur(12px)',
            boxShadow: '0 4px 14px rgba(0,0,0,0.22)',
            whiteSpace: 'nowrap',
          }}
        >
          {NAV_LINKS.find((l) => l.id === tooltip)?.label || ''}
        </div>
      )}

      {/* Scoped styles */}
      <style>{`
        @keyframes navUp {
          from { transform: translateX(-50%) translateY(70px); opacity: 0; }
          to { transform: translateX(-50%) translateY(0); opacity: 1; }
        }

        .nav-label { display: none; }
        .nav-dot { display: block; }
        .nav-logo,
        .nav-divider { display: none; }   /* Hidden by default (mobile) */

        @media (min-width: 640px) {
          .nav-label { display: inline; }
          .nav-dot { display: none; }
          .nav-tooltip { display: none; }
          .nav-logo,
          .nav-divider { display: inline-flex; }   /* Show on desktop */

          /* 1.1× larger on desktop */
          nav { 
            padding: 0.572rem 0.858rem !important; 
            gap: 0.165rem !important;
          }
          nav a { 
            padding: 0.682rem 1.155rem !important; 
            font-size: 0.946rem !important;
          }
          nav .nav-logo {
            font-size: 1.265rem !important;
            padding: 0.418rem 0.902rem !important;
          }
          nav button { width: 46.2px; height: 46.2px; }
        }
      `}</style>
    </>
  );
}