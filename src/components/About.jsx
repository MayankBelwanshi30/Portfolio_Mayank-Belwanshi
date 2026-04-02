// src/components/About.jsx
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { FiLinkedin, FiGithub, FiInstagram, FiTwitter } from 'react-icons/fi';
import { SiLeetcode } from 'react-icons/si';
import { GiTrophy } from "react-icons/gi";
import { fadeUp, stagger, slideRight } from '../animations/variants';
import profilePic from '../assets/images/profile.jpg';  // Import at top


const CHIPS = ['React','Next.js','TypeScript','Three.js','Node.js','PostgreSQL','Figma','AWS'];

const SOCIALS = [
  { icon: FiLinkedin,  url:'https://www.linkedin.com/in/mayank-belwanshi/' },
  { icon: FiGithub,    url:'https://github.com/MayankBelwanshi30' },
  { icon: SiLeetcode,  url:'https://leetcode.com/u/Mynk_30/' },
  { icon: FiTwitter,   url:'https://twitter.com/yourhandle' },
  { icon: FiInstagram, url:'https://www.instagram.com/_ma.ya.nk._?igsh=MTY2cWZmZWI1ZHNtaA==' },
];

/* ─────────────────────────────────────────────────────────────────────
   SECTION TAG — consistent with Projects.jsx design
   ───────────────────────────────────────────────────────────────────── */
function SectionTag({ isDark, label }) {
  const accent = isDark ? '#9B5CFF' : '#07BEB8';
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      fontFamily: 'DM Sans, sans-serif',
      fontSize: '0.7rem',
      fontWeight: 600,
      letterSpacing: '0.22em',
      textTransform: 'uppercase',
      marginBottom: '0.75rem',
      color: isDark ? 'rgba(245,245,245,0.42)' : 'rgba(10,10,10,0.42)'
    }}>
      <span style={{
        display: 'block',
        width: 16,
        height: 1.5,
        borderRadius: 9,
        background: accent
      }} />
      {label}
    </div>
  );
}

export default function About() {
  const { isDark } = useTheme();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  const accent = isDark ? '#9B5CFF' : '#07BEB8';
  const textC = isDark ? '#f5f5f5' : '#0a0a0a';
  const subC = isDark ? 'rgba(245,245,245,0.45)' : 'rgba(10,10,10,0.5)';
  const borderC = isDark ? 'rgba(255,255,255,0.09)' : 'rgba(0,0,0,0.09)';
  const cardBg = isDark ? 'rgba(14,14,14,0.8)' : 'rgba(250,250,250,0.85)';
  const surfBg = isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)';

  return (
    <section 
      id="about" 
      style={{
        padding: '6rem clamp(1.25rem,5vw,4rem)',
        maxWidth: 1100,
        margin: '0 auto'
      }}
    >
      <div 
        ref={ref} 
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '3.5rem',
          alignItems: 'center'
        }}
        className="about-grid"
      >
        {/* Image column */}
        <motion.div
          variants={slideRight}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          style={{ position: 'relative' }}
        >
          <div style={{
            width: '85%',
            aspectRatio: '4/5',
            borderRadius: 18,
            border: `1px solid ${borderC}`,
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: cardBg,
            backdropFilter: 'blur(18px) saturate(150%)',
            WebkitBackdropFilter: 'blur(18px) saturate(150%)',
            margin: '0 auto'
          }}>
            <img 
              src={profilePic}
              alt="Profile" 
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
          </div>

          {/* Badge */}
          <div
            style={{
              position: 'absolute',
              bottom: '-1.5rem',
              right: '0rem',
              backdropFilter: 'blur(18px) saturate(150%)',
              WebkitBackdropFilter: 'blur(18px) saturate(150%)',
              borderRadius: 14,
              padding: '0.75rem 1.5rem',
              border: `1px solid ${borderC}`,
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              background: cardBg,
              transform: 'scale(0.95)',
              boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
            }}
          >
            <GiTrophy style={{ width: 24, height: 24, color: '#fbbf24' }} />
            <div>
              <div style={{
                fontSize: '0.82rem',
                fontWeight: 500,
                color: textC,
                fontFamily: 'Syne, sans-serif'
              }}>CIIS 2025</div>
              <div style={{
                fontSize: '0.72rem',
                color: subC,
                fontFamily: 'DM Sans, sans-serif'
              }}>Winner</div>
            </div>
          </div>

          {/* Float tag */}
          <div
            style={{
              position: 'absolute',
              top: '-1rem',
              left: '2rem',
              borderRadius: 10,
              padding: '0.375rem 0.75rem',
              fontSize: '0.72rem',
              fontWeight: 600,
              fontFamily: 'DM Sans, sans-serif',
              backgroundColor: accent,
              color: '#fff'
            }}
          >
            ✦ Open to Work
          </div>
        </motion.div>

        {/* Text column */}
        <motion.div
          variants={stagger(0.09)}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <motion.div variants={fadeUp}>
            <SectionTag isDark={isDark} label="About Me" />
            <h2 style={{
              fontFamily: 'Syne, sans-serif',
              fontWeight: 800,
              fontSize: 'clamp(1.9rem,4vw,3rem)',
              lineHeight: 1.08,
              letterSpacing: '-0.02em',
              marginBottom: '1.25rem',
              color: textC
            }}>
              <span style={{ color: accent }}>About</span> Me
            </h2>
          </motion.div>

          <motion.p variants={fadeUp} style={{
            fontFamily: 'DM Sans, sans-serif',
            lineHeight: 1.7,
            marginBottom: '1rem',
            color: subC,
            fontSize: '0.95rem'
          }}>
            Hi, I'm Mayank — a full-stack developer and creative technologist with a passion for crafting products that feel as good as they look.
          </motion.p>

          <motion.p variants={fadeUp} style={{
            fontFamily: 'DM Sans, sans-serif',
            lineHeight: 1.7,
            marginBottom: '1rem',
            color: subC,
            fontSize: '0.95rem'
          }}>
            I specialize in React ecosystems, WebGL experiences, and performant front-end architecture.
          </motion.p>

          <motion.p variants={fadeUp} style={{
            fontFamily: 'DM Sans, sans-serif',
            lineHeight: 1.7,
            marginBottom: '1.25rem',
            color: subC,
            fontSize: '0.95rem'
          }}>
            Currently available for freelance projects and open to full-time roles.
          </motion.p>

          {/* Socials */}
          <motion.div variants={fadeUp} style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.25rem' }}>
            {SOCIALS.map(({ icon: Icon, url }) => (
              <a
                key={url}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: 10,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: `1px solid ${borderC}`,
                  background: surfBg,
                  color: subC,
                  transition: 'all 0.2s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = isDark ? '#f5f5f5' : '#0a0a0a';
                  e.currentTarget.style.color = isDark ? '#080808' : '#ffffff';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = surfBg;
                  e.currentTarget.style.color = subC;
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <Icon style={{ width: 16, height: 16 }} />
              </a>
            ))}
          </motion.div>

          {/* Chips */}
          <motion.div variants={fadeUp} style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {CHIPS.map(c => (
              <span
                key={c}
                style={{
                  padding: '0.375rem 0.75rem',
                  borderRadius: 999,
                  fontSize: '0.75rem',
                  fontWeight: 500,
                  fontFamily: 'DM Sans, sans-serif',
                  border: `1px solid ${borderC}`,
                  background: surfBg,
                  color: textC,
                  transition: 'all 0.2s ease',
                  cursor: 'default'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = isDark ? '#f5f5f5' : '#0a0a0a';
                  e.currentTarget.style.color = isDark ? '#080808' : '#ffffff';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = surfBg;
                  e.currentTarget.style.color = textC;
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                {c}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Responsive CSS */}
      <style>{`
        @media (max-width: 768px) {
          .about-grid { grid-template-columns: 1fr !important; gap: 2rem !important; }
        }
      `}</style>
    </section>
  );
}