// src/components/Skills.jsx
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { fadeUp, stagger, scaleIn } from '../animations/variants';

/* Skill images */
import reactImg from '../assets/images/s4.png';
import nodeImg from '../assets/images/s5.png';
import figmaImg from '../assets/images/s6.png';
import dsaImg from '../assets/images/s1.png';
import daImg from '../assets/images/s3.png';
import aiImg from '../assets/images/s0.png';

const SKILL_CARDS = [
  {
    img: reactImg,
    title: 'Frontend Development',
    desc: 'Building modern, responsive interfaces using React and modern frontend technologies.',
    bar: 'React / JavaScript',
    pct: 95,
  },
  {
    img: nodeImg,
    title: 'Backend & APIs',
    desc: 'Creating scalable APIs and backend systems using Node.js & databases.',
    bar: 'Node.js / APIs',
    pct: 88,
  },
  {
    img: aiImg,
    title: 'Machine Learning & AI',
    desc: 'Building practical ML solutions through data processing, modeling and evaluation.',
    bar: 'Python / Scikit-learn',
    pct: 88,
  },
  {
    img: dsaImg,
    title: 'DSA',
    desc: 'Strong problem solving with data structures & algorithms.',
    bar: 'Problem Solving',
    pct: 85,
  },
  {
    img: daImg,
    title: 'Data Analytics',
    desc: 'Turning raw data into actionable insights through analysis, visualization and dashboards.',
    bar: 'Pandas / Tableau / Power BI',
    pct: 92,
  },
  {
     img: figmaImg,
    title: 'UI/UX Design',
    desc: 'Designing clean, intuitive and visually engaging user experiences.',
    bar: 'Figma / UX',
    pct: 90,
  },
];

function SectionTag({ isDark, label }) {
  const accent = isDark ? '#9B5CFF' : '#007AFF';
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

function SkillBar({ label, pct, accent, inView }) {
  const accentGlow = `0 0 8px ${accent}66`;

  return (
    <div style={{ marginTop: '1rem' }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: '0.75rem',
        marginBottom: '0.375rem',
        opacity: 0.6,
        fontFamily: 'DM Sans, sans-serif'
      }}>
        <span>{label}</span>
        <span>{pct}%</span>
      </div>
      <div style={{
        height: '4px',
        borderRadius: '999px',
        background: 'rgba(128,128,128,0.2)',
        overflow: 'hidden'
      }}>
        <motion.div
          style={{
            height: '100%',
            borderRadius: '999px',
            background: accent,
            boxShadow: accentGlow
          }}
          initial={{ width: 0 }}
          animate={{ width: inView ? `${pct}%` : 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </div>
  );
}

export default function Skills() {
  const { isDark } = useTheme();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const accent = isDark ? '#9B5CFF' : '#007AFF';
  const textC = isDark ? '#f5f5f5' : '#0a0a0a';
  const subC = isDark ? 'rgba(245,245,245,0.45)' : 'rgba(10,10,10,0.5)';
  const baseBorder = isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(0,0,0,0.08)';
  const glassBg = isDark
    ? 'linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))'
    : 'linear-gradient(135deg, rgba(255,255,255,0.9), rgba(255,255,255,0.6))';

  return (
    <section
      id="skills"
      style={{
        padding: '6rem clamp(2rem, 5vw, 4rem)',
        maxWidth: 1400,
        margin: '40 auto'
      }}
    >
      <motion.div
        ref={ref}
        variants={stagger(0.08)}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
      >
        {/* Header */}
        <motion.div variants={fadeUp} style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <SectionTag isDark={isDark} label="Skills" />
          <h2 style={{
            fontFamily: 'Syne, sans-serif',
            fontWeight: 800,
            fontSize: 'clamp(2rem,4vw,3rem)',
            color: textC,
            lineHeight: 1.08,
            letterSpacing: '-0.02em'
          }}>
            <span style={{ color: accent }}>Skills</span>{' '} & Technologies
          </h2>
        </motion.div>

        {/* Skills Grid */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1.5rem',
            alignItems: 'stretch'
          }}
          className="skills-grid"
        >
          {SKILL_CARDS.map((s, idx) => (
            <motion.div
              key={s.title}
              variants={scaleIn}
              custom={idx}
              transition={{ delay: idx * 0.05 }}
              whileHover={{ y: -6, scale: 1.02 }}
              style={{
                borderRadius: 20,
                padding: '1.75rem',
                backdropFilter: 'blur(18px) saturate(150%)',
                WebkitBackdropFilter: 'blur(18px) saturate(150%)',
                background: glassBg,
                border: baseBorder,
                boxShadow: isDark
                  ? '0 10px 30px rgba(0,0,0,0.4)'
                  : '0 10px 30px rgba(0,0,0,0.08)',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = `0 0 30px ${accent}33`;
                e.currentTarget.style.border = `1px solid ${accent}`;
                e.currentTarget.style.transform = 'translateY(-6px) scale(1.02)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = isDark
                  ? '0 10px 30px rgba(0,0,0,0.4)'
                  : '0 10px 30px rgba(0,0,0,0.08)';
                e.currentTarget.style.border = baseBorder;
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
              }}
            >
              {/* Icon */}
              <div style={{
                width: 44,
                height: 44,
                marginBottom: '1.2rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <img
                  src={s.img}
                  alt={s.title}
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                />
              </div>

              {/* Title */}
              <h3 style={{
                fontFamily: 'Syne, sans-serif',
                fontWeight: 700,
                fontSize: '1.05rem',
                marginBottom: '0.5rem',
                color: textC,
                lineHeight: 1.3
              }}>
                {s.title}
              </h3>

              {/* Description */}
              <p style={{
                fontFamily: 'DM Sans, sans-serif',
                fontSize: '0.85rem',
                lineHeight: 1.6,
                color: subC,
                marginBottom: '1.2rem'
              }}>
                {s.desc}
              </p>

              {/* Progress Bar */}
              <SkillBar
                label={s.bar}
                pct={s.pct}
                accent={accent}
                inView={inView}
              />
            </motion.div>
          ))}
        </div>

        
      </motion.div>

      {/* Responsive Grid */}
      <style>{`
        @media (max-width: 1024px) {
          .skills-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 600px) {
          .skills-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}