// src/components/Footer.jsx
import { useTheme } from '../context/ThemeContext';

export default function Footer() {
  const { isDark } = useTheme();
  
  const accent = isDark ? '#9B5CFF' : '#07BEB8';
  const accentGlow = isDark
    ? 'rgba(155,92,255,0.22)'
    : 'rgba(7,190,184,0.18)';
  const borderC = isDark ? 'rgba(255,255,255,0.09)' : 'rgba(0,0,0,0.09)';
  const subC = isDark ? 'rgba(245,245,245,0.45)' : 'rgba(10,10,10,0.45)';
  const textC = isDark ? '#f5f5f5' : '#0a0a0a';

  return (
    <footer 
      style={{
        borderTop: `1px solid ${borderC}`,
        padding: '2rem clamp(2rem,4rem,4rem)',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '0.5rem',
        position: 'relative',
        zIndex: 10,
        marginBottom: '6rem',
        flexWrap: 'wrap'
      }}
      className="footer-container"
    >
      {/* Top subtle gradient line (taken from Projects section) */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: 1,
          background: `linear-gradient(to right, transparent, ${accent}, transparent)`,
          opacity: 0.35,
        }}
      />

      <span 
        style={{
          fontFamily: 'DM Sans, sans-serif',
          fontSize: '0.92rem',
          color: subC,
          letterSpacing: '0.02em',
          transition: 'color 0.2s ease'
        }}
        onMouseEnter={(e) => e.currentTarget.style.color = accent}
        onMouseLeave={(e) => e.currentTarget.style.color = subC}
      >
        © 2026 Mayank Belwanshi. All rights reserved.
      </span>
      
      <span 
        style={{
          fontFamily: 'DM Sans, sans-serif',
          fontSize: '0.92rem',
          color: subC,
          letterSpacing: '0.02em',
          transition: 'color 0.2s ease',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.25rem'
        }}
        onMouseEnter={(e) => e.currentTarget.style.color = accent}
        onMouseLeave={(e) => e.currentTarget.style.color = subC}
      >
        Designed & built with 
        <span style={{ color: accent, fontSize: '1rem' }}>♥</span> 
        by Mayank
      </span>

      <style>{`
        @media (max-width: 640px) {
          .footer-container {
            flex-direction: column !important;
            text-align: center !important;
            gap: 0.75rem !important;
          }
        }
      `}</style>
    </footer>
  );
}