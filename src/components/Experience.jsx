// src/components/Experience.jsx
import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { fadeUp, stagger } from '../animations/variants';
import { FiX, FiSearch } from 'react-icons/fi'; // Removed FiHeart

// Education Icons
import manit from '../assets/images/manit.png';
import mva from '../assets/images/mva.jpg';
import jgis from '../assets/images/jgis.jpg';

// Certificate Images
import cert1 from '../assets/images/cert1.png';
import cert2 from '../assets/images/cert2.png';
import cert3 from '../assets/images/cert3.png';
import cert4 from '../assets/images/cert4.png';
import cert5 from '../assets/images/cert5.png';
import cert6 from '../assets/images/cert6.png';


/* ─────────────────────────────────────────────────────────────────────
   SHARED HELPERS
   ───────────────────────────────────────────────────────────────────── */
function SectionTag({ isDark, label }) {
  const accent = isDark ? '#9B5CFF' : '#07BEB8';
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: '0.5rem',
      fontFamily: 'DM Sans, sans-serif', fontSize: '0.7rem',
      fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase',
      marginBottom: '0.75rem',
      color: isDark ? 'rgba(245,245,245,0.42)' : 'rgba(10,10,10,0.42)',
    }}>
      <span style={{ display:'block', width:16, height:1.5, borderRadius:9, background:accent }}/>
      {label}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────
   TIMELINE ITEM
   ───────────────────────────────────────────────────────────────────── */
function TimelineItem({ date, role, company, desc, logo, isDark }) {
  const accent = isDark ? '#9B5CFF' : '#07BEB8';
  const textC = isDark ? '#f5f5f5' : '#0a0a0a';
  const subC = isDark ? 'rgba(245,245,245,0.45)' : 'rgba(10,10,10,0.5)';

  return (
    <motion.div
      variants={fadeUp}
      style={{ paddingLeft:'2.25rem', paddingBottom:'2.5rem', position:'relative' }}
    >
      {/* Accent dot */}
      <span style={{
        position:'absolute', left:'-6px', top:'0.42rem',
        width:12, height:12, borderRadius:'50%',
        background: accent,
        boxShadow:`0 0 0 4px ${isDark?'rgba(155,92,255,0.18)':'rgba(7,190,184,0.18)'}`,
      }}/>

      {logo && (
        <div style={{
          flexShrink: 0, width: 52, height: 52, borderRadius: 10,
          border: `1.5px solid ${accent}44`,
          background: isDark ? 'rgba(155,92,255,0.10)' : 'rgba(7,190,184,0.08)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          overflow: 'hidden'
        }}>
          <img
            src={logo} alt={company}
            style={{ width: 44, height: 44, objectFit: 'cover', borderRadius: 7 }}
          />
        </div>
      )}

      {/* Date */}
      <p style={{
        fontFamily:'DM Sans, sans-serif', fontSize:'0.72rem',
        letterSpacing:'0.1em', textTransform:'uppercase',
        fontWeight:500, marginBottom:'0.28rem', color:subC, 
      }}>
        {date}
      </p>

      {/* Role */}
      <h4 style={{
        fontFamily:'Syne, sans-serif', fontWeight:700,
        fontSize:'1.05rem', marginBottom:'0.15rem',
        color:textC, lineHeight:1.3,
      }}>
        {role}
      </h4>

      {/* Company */}
      <p style={{
        fontFamily:'DM Sans, sans-serif', fontSize:'0.86rem',
        fontWeight:600, marginBottom:'0.55rem', color:accent,
      }}>
        {company}
      </p>

      {/* Desc */}
      <p style={{
        fontFamily:'DM Sans, sans-serif', fontSize:'0.86rem',
        lineHeight:1.7, color:subC,
      }}>
        {desc}
      </p>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────────────
   CERTIFICATE CARD (with uniform backdrop filter, no verified, outline on title)
   ───────────────────────────────────────────────────────────────────── */
function CertCard({ cert, isDark, onPreview }) {
  const accent = isDark ? '#9B5CFF' : '#07BEB8';
  const accentGlow = isDark ? 'rgba(155,92,255,0.30)' : 'rgba(7,190,184,0.25)';

  return (
    <motion.div
      whileHover={{ y:-8, scale:1.025 }}
      transition={{ duration:0.38, ease:[0.16,1,0.3,1] }}
      style={{
        width: '100%',
        maxWidth: 320,
        borderRadius: 18,
        overflow: 'hidden',
        position: 'relative',
        cursor: 'pointer',
        border: '2px solid',
        borderColor: isDark ? 'rgba(255,255,255,0.14)' : 'rgba(255,255,255,0.95)',
        boxShadow: isDark
          ? `0 20px 60px rgba(0,0,0,0.60), 0 0 0 1px rgba(255,255,255,0.08), 0 0 40px ${accentGlow}`
          : `0 20px 60px rgba(0,0,0,0.18), 0 0 0 1px rgba(255,255,255,0.7), 0 0 32px ${accentGlow}`,
        background: '#000',
        aspectRatio: '9 / 7',
        flexShrink: 0,
      }}
      onClick={() => onPreview(cert)}
    >
      <motion.img
        src={cert.image}
        alt={cert.title}
        whileHover={{ scale:1.06 }}
        transition={{ duration:0.55, ease:[0.16,1,0.3,1] }}
        style={{
          position:'absolute', inset:0,
          width:'100%', height:'100%',
          objectFit:'cover',
          display:'block',
        }}
      />

      {/* Uniform backdrop filter overlay (replaces gradient) */}
      <div style={{
        position:'absolute', inset:0,
        backdropFilter:'blur(10px)',
        background: 'rgba(0,0,0,0.55)',
        top:'1.8rem',
        height:'45%',
        zIndex:1,
      }}/>

      <div style={{
        position:'absolute', bottom:0, left:0, right:0,
        padding:'1.4rem 1.4rem 1.3rem',
        zIndex:2,
      }}>
        <h3 style={{
          fontFamily:'Syne, sans-serif', fontWeight:800, color: accent,
          fontSize:'1.25rem', 
          lineHeight:1.22, marginBottom:'0.28rem',
          textShadow:'0 0 5px rgba(0,0,0,0.6)', // Outline effect on title
        }}>
          {cert.title}
        </h3>

        <p style={{
          fontFamily:'DM Sans, sans-serif', fontSize:'0.88rem',
          color:'#9CA3AF', marginBottom:'0.2rem', marginTop:'0rem',
          fontWeight:400, 
        }}>
          {cert.issuer}
        </p>

        <div style={{ display:'flex', alignItems:'center', gap:'1.2rem', marginBottom:'2.5rem' }}>
          <span style={{
            display:'flex', alignItems:'center', gap:'0.38rem',
            fontFamily:'DM Sans, sans-serif', fontSize:'0.82rem',
            color:'rgba(255,255,255,0.82)', fontWeight:500,
          }}>
            {cert.date}
          </span>
        </div>

        <button
          onClick={e => { e.stopPropagation(); onPreview(cert); }}
          style={{
            width:'100%', padding:'0.82rem',
            borderRadius:999, border:'none',
            background:'rgba(255,255,255,0.95)',
            backdropFilter:'blur(12px)',
            color:'#0a0a0a',
            fontFamily:'DM Sans, sans-serif', fontSize:'0.92rem',
            fontWeight:700, cursor:'pointer',
            display:'flex', alignItems:'center', justifyContent:'center',
            gap:'0.5rem',
            boxShadow:'0 4px 20px rgba(0,0,0,0.28)',
            transition:'background 0.2s, transform 0.15s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background='#fff'; e.currentTarget.style.transform='scale(1.02)'; }}
          onMouseLeave={e => { e.currentTarget.style.background='rgba(255,255,255,0.95)'; e.currentTarget.style.transform='scale(1)'; }}
        >
          <FiSearch size={14}/> View Certificate
        </button>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────────────
   CERTIFICATE MODAL
   ───────────────────────────────────────────────────────────────────── */
function CertModal({ cert, isDark, onClose }) {
  const accent = isDark ? '#9B5CFF' : '#07BEB8';
  const accentGlow = isDark ? 'rgba(155,92,255,0.30)' : 'rgba(7,190,184,0.24)';

  return (
    <motion.div
      initial={{ opacity:0 }}
      animate={{ opacity:1 }}
      exit={{ opacity:0 }}
      transition={{ duration:0.22 }}
      onClick={onClose}
      style={{
        position:'fixed', inset:0, zIndex:9999,
        background:'rgba(0,0,0,0.88)',
        backdropFilter:'blur(10px)',
        WebkitBackdropFilter:'blur(10px)',
        display:'flex', alignItems:'flex-start', justifyContent:'center',
        padding:'2rem', overflowY:'auto',
      }}
    >
      <motion.div
        initial={{ scale:0.90, opacity:0, y:32 }}
        animate={{ scale:1, opacity:1, y:0 }}
        exit={{ scale:0.92, opacity:0, y:20 }}
        transition={{ type:'spring', stiffness:320, damping:28 }}
        onClick={e => e.stopPropagation()}
        style={{
          position:'relative', maxWidth:640, width:'100%',
          borderRadius:24, overflow:'hidden',
          background:'#fff',
          boxShadow:`0 32px 100px rgba(0,0,0,0.70), 0 0 0 1px ${accent}33, 0 0 80px ${accentGlow}`,
          marginTop:72,
        }}
      >
        <button
          onClick={onClose}
          style={{
            position:'absolute', top:14, right:14, zIndex:10,
            width:34, height:34, borderRadius:'50%', border:'none',
            background:'rgba(0,0,0,0.80)', color:'#fff',
            display:'flex', alignItems:'center', justifyContent:'center',
            cursor:'pointer', transition:'background 0.2s, transform 0.18s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background=accent; e.currentTarget.style.transform='scale(1.1)'; }}
          onMouseLeave={e => { e.currentTarget.style.background='rgba(0,0,0,0.80)'; e.currentTarget.style.transform='scale(1)'; }}
        >
          <FiX size={17}/>
        </button>

        <motion.img
          src={cert.image}
          alt={cert.title}
          initial={{ scale:1.05 }}
          animate={{ scale:1 }}
          transition={{ duration:0.5, ease:[0.16,1,0.3,1] }}
          style={{ width:'100%', display:'block' }}
        />
      </motion.div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────────────
   ROOT COMPONENT
   ───────────────────────────────────────────────────────────────────── */
export default function Experience() {
  const { isDark } = useTheme();
  const ref = useRef(null);
  const inView = useInView(ref, { once:true, margin:'-60px' });
  const [activeCert, setActiveCert] = useState(null);

  const accent = isDark ? '#9B5CFF' : '#07BEB8';
  const textC = isDark ? '#f5f5f5' : '#0a0a0a';
  const borderC = isDark ? 'rgba(255,255,255,0.09)' : 'rgba(0,0,0,0.09)';

  /* ── Data ── */
  const expItems = [
    { date:'2023', role:'Content Writer', company:'Think India MANIT', desc:'Contributed to content development and editorial tasks for national campaigns and student publications.' },
    { date:'2023', role:'Social Media Manager', company:'Think India MANIT', desc:'Managed social strategies, created campaigns and grew the chapter\'s online presence across platforms.' },
    { date:'2022 – Present', role:'Graphic Designer', company:'Drishtant', desc:'Designed visual identities, posters and promotional material for major college events and publications.' },
    { date:'2022 – Present', role:'Full-Stack Developer', company:'CSE Minor Project', desc:'Built and deployed a student-connect platform — a full-stack web app helping students find project partners and resources.' },
  ];

  const eduItems = [
    { date: '2023 – 2027', role: 'B.Tech — Computer Science & Engineering', company: 'Maulana Azad NIT, Bhopal', desc: 'Pursuing B.Tech focused on software development, algorithms and system design. Active in hackathons and coding clubs.', logo: manit },
    { date: '2021 – 2023', role: 'Higher Secondary — Class XII (PCM)', company: 'Macro Vision Academy', desc: 'Scored 95.2% in Physics, Chemistry & Mathematics. Served as school prefect and participated in science exhibitions.', logo: mva },
    { date: '2011 – 2021', role: 'Secondary Education — Class X', company: 'Jai Gurudev International School', desc: 'Scored 94.6%. Active in debates and the science club. Awarded Best Student in 2019 and 2020.', logo: jgis },
  ];

  const certs = [
    { title:'Google UX Design', issuer:'Google', date:'31 Mar 2024', image:cert1 },
    { title:'Meta Front-End Developer', issuer:'Meta', date:'24 Feb 2024', image:cert2 },
    { title:'AWS Cloud Practitioner', issuer:'Amazon Web Services', date:'17 Dec 2023', image:cert3 },
    { title:'Meta Front-End Developer', issuer:'Meta', date:'19 Feb 2024', image:cert4 },
    { title:'Meta Front-End Developer', issuer:'Meta', date:'23 Feb 2024', image:cert5 },
    { title:'Meta Front-End Developer', issuer:'Meta', date:'21 Feb 2024', image:cert6 }
  ];

  return (
    <>
      <section
        id="experience"
        style={{ padding:'6rem clamp(1.25rem,5vw,4rem)', maxWidth:1280, margin:'0 auto' }}
      >
        <div ref={ref}>
          {/* Experience + Education Grid */}
          <div
            className="exp-top-grid"
            style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'4.5rem', marginBottom:'5.5rem' }}
          >
            {/* Experience */}
            <motion.div variants={stagger(0.1)} initial="hidden" animate={inView?'visible':'hidden'}>
              <motion.div variants={fadeUp} style={{ marginBottom:'2rem' }}>
                <SectionTag isDark={isDark} label="Experience" />
                <h2 style={{ fontFamily:'Syne, sans-serif', fontWeight:800,
                  fontSize:'clamp(1.9rem,4vw,3rem)', lineHeight:1.08,
                  letterSpacing:'-0.02em', color:textC }}>
                  Professional{' '}
                  <span style={{ color:accent }}>Experience</span>
                </h2>
              </motion.div>
              <div style={{ position:'relative', borderLeft:`1.5px solid ${borderC}` }}>
                {expItems.map((item,i) => (
                  <TimelineItem key={i} {...item} isDark={isDark} />
                ))}
              </div>
            </motion.div>

            {/* Education */}
            <motion.div variants={stagger(0.1)} initial="hidden" animate={inView?'visible':'hidden'}>
              <motion.div variants={fadeUp} style={{ marginBottom:'2rem' }}>
                <SectionTag isDark={isDark} label="Education" />
                <h2 style={{ fontFamily:'Syne, sans-serif', fontWeight:800,
                  fontSize:'clamp(1.9rem,4vw,3rem)', lineHeight:1.08,
                  letterSpacing:'-0.02em', color:textC }}>
                  <span style={{ color:accent }}>Education</span>al{' '}
                  Background
                </h2>
              </motion.div>
              <div style={{ position:'relative', borderLeft:`1.5px solid ${borderC}` }}>
                {eduItems.map((item,i) => (
                  <TimelineItem key={i} {...item} isDark={isDark} />
                ))}
              </div>
            </motion.div>
          </div>

          {/* Certificates Section */}
          <motion.div variants={stagger(0.12)} initial="hidden" animate={inView?'visible':'hidden'}>
            <motion.div variants={fadeUp} style={{ marginBottom:'2.8rem' }}>
              <SectionTag isDark={isDark} label="Certifications" />
              <h2 style={{ fontFamily:'Syne, sans-serif', fontWeight:800,
                fontSize:'clamp(1.9rem,4vw,3rem)', lineHeight:1.08,
                letterSpacing:'-0.02em', color:textC }}>
                <span style={{ color:accent }}>Certificates</span>{' '}
                &amp; Achievements
              </h2>
            </motion.div>

            <div style={{
              display:'flex', flexWrap:'wrap',
              gap:'2rem', justifyContent:'center',
            }}>
              {certs.map((cert,i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  style={{ flex:'0 0 auto', width:'min(320px, 90vw)' }}
                >
                  <CertCard cert={cert} isDark={isDark} onPreview={setActiveCert} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {activeCert && (
          <CertModal 
            cert={activeCert} 
            isDark={isDark} 
            onClose={() => setActiveCert(null)} 
          />
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .exp-top-grid { grid-template-columns: 1fr !important; gap: 3.5rem !important; }
        }
      `}</style>
    </>
  );
}