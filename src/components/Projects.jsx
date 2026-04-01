// src/components/Projects.jsx
import { useRef, useCallback } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { FiGithub, FiExternalLink, FiYoutube } from 'react-icons/fi';
import { fadeUp, stagger } from '../animations/variants';

import image1  from '../assets/images/p0.jpg';
import image2  from '../assets/images/p1.jpg';
import image3  from '../assets/images/p2.jpg';
import image4  from '../assets/images/p3.jpg';
import image5  from '../assets/images/p4.jpg';
import image6  from '../assets/images/p5.jpg';
import image7  from '../assets/images/p6.jpg';
import image8  from '../assets/images/p7.jpg';
import image9  from '../assets/images/p8.jpg';
import image10 from '../assets/images/p9.jpg';
import image11 from '../assets/images/p10.jpg';
import image12 from '../assets/images/p11.jpg';

/* ─────────────────────────────────────────────────────────────────────
   PROJECT DATA
   ───────────────────────────────────────────────────────────────────── */
const PROJECTS = [
  { id:1,  img:image1,  title:'Cosmos — 3D Universe',       tags:['Three.js','WebGL','React'],     desc:'Real-time galaxy simulation with 100k+ star particles and custom GLSL shaders.',  gh:'#', live:'#', yt:'#' },
  { id:2,  img:image2,  title:'Vaultly — Finance SaaS',     tags:['Next.js','PostgreSQL'],          desc:'Full-stack investment dashboard with real-time data visualisation.',               gh:'#', live:'#', yt:'#' },
  { id:3,  img:image3,  title:'Flora — AI Plant Care',      tags:['React Native','AI'],             desc:'Mobile app identifying plants and diagnosing diseases via computer vision.',       gh:'#', live:'#', yt:'#' },
  { id:4,  img:image4,  title:'Ember — Brand Site',         tags:['GSAP','WebGL'],                  desc:'Award-winning agency site with fluid transitions and a liquid fire GLSL effect.',  gh:'#', live:'#', yt:'#' },
  { id:5,  img:image5,  title:'NeuralDash — ML Platform',   tags:['Python','TypeScript'],           desc:'Visualisation platform for ML training runs and experiment tracking.',             gh:'#', live:'#', yt:'#' },
  { id:6,  img:image6,  title:'Orbit — Design System',      tags:['Figma','React'],                 desc:'Token-driven design system across 8 products and 60+ components.',                gh:'#', live:'#', yt:'#' },
  { id:7,  img:image7,  title:'PulseChat — Realtime App',   tags:['React','Socket.IO','Node.js'],   desc:'End-to-end encrypted messaging app with live presence and typing indicators.',     gh:'#', live:'#', yt:'#' },
  { id:8,  img:image8,  title:'Zenith — Portfolio CMS',     tags:['Next.js','Framer Motion'],       desc:'Drag-and-drop portfolio builder with live preview and one-click publish.',          gh:'#', live:'#', yt:'#' },
  { id:9,  img:image9,  title:'Prism — Data Viz',           tags:['Three.js','TypeScript','D3'],    desc:'Interactive 3D data visualisation tool for large scientific datasets.',             gh:'#', live:'#', yt:'#' },
  { id:10, img:image10, title:'Forge — Backend API',        tags:['Node.js','PostgreSQL','Redis'],  desc:'High-throughput REST/GraphQL API gateway with caching and rate limiting.',          gh:'#', live:'#', yt:'#' },
  { id:11, img:image11, title:'Bloom — E-Commerce',         tags:['AI','React Native','Stripe'],    desc:'AI-personalised shopping app with real-time inventory and payment integration.',    gh:'#', live:'#', yt:'#' },
  { id:12, img:image12, title:'Storm — Creative Agency',    tags:['GSAP','WebGL','Spline'],         desc:'Immersive agency website featuring 3D hero, parallax scenes, and WebGL effects.',   gh:'#', live:'#', yt:'#' },
];

/* ─────────────────────────────────────────────────────────────────────
   PINTEREST MASONRY — 4 columns, each card gets a random-ish height
   We distribute cards into columns keeping column heights balanced.
   ───────────────────────────────────────────────────────────────────── */
const HEIGHTS = [260, 320, 280, 360, 300, 240, 340, 280, 300, 360, 260, 320];

function buildColumns(items, count = 4) {
  const cols    = Array.from({ length: count }, () => []);
  const heights = Array(count).fill(0);
  items.forEach((item, i) => {
    const shortest = heights.indexOf(Math.min(...heights));
    cols[shortest].push({ ...item, cardH: HEIGHTS[i % HEIGHTS.length] });
    heights[shortest] += HEIGHTS[i % HEIGHTS.length] + 16;
  });
  return cols;
}

/* ─────────────────────────────────────────────────────────────────────
   HOOKS
   ───────────────────────────────────────────────────────────────────── */

/* 3-D tilt + magnetic pull on mouse move - optimized for performance */
function useMagneticTilt(strength = 18, magnetStrength = 8) {
  const ref   = useRef(null);
  const frame = useRef(null);

  const onMove = useCallback((e) => {
    const el = ref.current;
    if (!el) return;
    const { left, top, width, height } = el.getBoundingClientRect();
    const cx = left + width  / 2;
    const cy = top  + height / 2;
    const dx = (e.clientX - cx) / (width  / 2);
    const dy = (e.clientY - cy) / (height / 2);

    if (frame.current) cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      if (!ref.current) return;
      ref.current.style.transform =
        `perspective(800px)
         rotateX(${-dy * strength * 0.55}deg)
         rotateY(${dx  * strength * 0.55}deg)
         translateX(${dx * magnetStrength}px)
         translateY(${dy * magnetStrength}px)
         scale(1.02)`;
    });
  }, [strength, magnetStrength]);

  const onLeave = useCallback(() => {
    if (frame.current) cancelAnimationFrame(frame.current);
    if (ref.current) {
      ref.current.style.transition = 'transform 0.4s cubic-bezier(0.16,1,0.3,1)';
      ref.current.style.transform  = 'perspective(800px) rotateX(0deg) rotateY(0deg) translateX(0) translateY(0) scale(1)';
      setTimeout(() => {
        if (ref.current) ref.current.style.transition = '';
      }, 400);
    }
  }, []);

  const onEnter = useCallback(() => {
    if (ref.current) ref.current.style.transition = 'transform 0.05s linear';
  }, []);

  return { ref, onMouseMove: onMove, onMouseLeave: onLeave, onMouseEnter: onEnter };
}

/* Scroll-based parallax for the image inside a card - optimized */
function ParallaxImage({ src, alt }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target:  ref,
    offset:  ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);

  return (
    <div ref={ref} style={{ width:'100%', height:'100%', overflow:'hidden' }}>
      <motion.img
        src={src}
        alt={alt}
        style={{ y, width:'100%', height:'115%', objectFit:'cover',
          objectPosition:'center', marginTop:'-7.5%', willChange: 'transform' }}
      />
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────
   PROJECT CARD
   ───────────────────────────────────────────────────────────────────── */
function ProjectCard({ project, isDark, delay = 0 }) {
  const accent     = isDark ? '#9B5CFF' : '#07BEB8';
  const accentGlow = isDark ? 'rgba(155,92,255,0.28)' : 'rgba(7,190,184,0.22)';
  const { ref, onMouseMove, onMouseLeave, onMouseEnter } = useMagneticTilt(12, 5);

  const sectionRef = useRef(null);
  const inView   = useInView(sectionRef, { once: true, margin: '-80px' });

  const glassBg  = isDark ? 'rgba(20,18,30,0.62)' : 'rgba(255,255,255,0.62)';
  const border   = isDark ? '1px solid rgba(200,195,220,0.18)' : '1px solid rgba(80,80,110,0.18)';

  return (
    <motion.div
      ref={sectionRef}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: delay * 0.5, ease: [0.16, 1, 0.3, 1] }}
      style={{ willChange: 'transform, opacity' }}
    >
      <div
        ref={ref}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        onMouseEnter={onMouseEnter}
        style={{
          willChange:           'transform',
          transformStyle:       'preserve-3d',
          borderRadius:         20,
          overflow:             'hidden',
          cursor:               'pointer',
          height:               project.cardH,
          background:           glassBg,
          border,
          backdropFilter:       'blur(18px) saturate(150%)',
          WebkitBackdropFilter: 'blur(18px) saturate(150%)',
          boxShadow:            isDark
            ? '0 6px 32px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.06)'
            : '0 6px 28px rgba(0,0,0,0.10), inset 0 1px 0 rgba(255,255,255,0.88)',
          position:             'relative',
        }}
      >
        <ParallaxImage src={project.img} alt={project.title} />

        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.68) 0%, rgba(0,0,0,0.15) 50%, transparent 100%)',
          pointerEvents: 'none',
        }} />

        <div
          className="project-overlay"
          style={{
            position:   'absolute', inset: 0,
            display:    'flex', flexDirection: 'column', justifyContent: 'flex-end',
            padding:    '1.2rem',
            background: 'linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.35) 55%, transparent 100%)',
            opacity:    0,
            transition: 'opacity 0.3s ease',
            pointerEvents: 'none',
          }}
        >
          <div style={{ display:'flex', gap:'0.35rem', flexWrap:'wrap', marginBottom:'0.6rem' }}>
            {project.tags.map(t => (
              <span key={t} style={{
                padding:       '0.18rem 0.6rem',
                borderRadius:  999,
                fontSize:      '0.62rem',
                fontFamily:    'DM Sans, sans-serif',
                fontWeight:    600,
                color:         '#fff',
                background:    'rgba(0,0,0,0.5)',
                border:        '1px solid rgba(255,255,255,0.2)',
              }}>{t}</span>
            ))}
          </div>

          <h3 style={{ fontFamily:'Syne, sans-serif', fontWeight:700,
            fontSize:'0.95rem', color:'#fff', marginBottom:'0.4rem', lineHeight:1.3 }}>
            {project.title}
          </h3>
          <p style={{ fontFamily:'DM Sans, sans-serif', fontSize:'0.78rem',
            color:'rgba(255,255,255,0.72)', lineHeight:1.5, marginBottom:'0.9rem',
            display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical', overflow:'hidden' }}>
            {project.desc}
          </p>

          <div style={{ display:'flex', gap:'0.5rem', pointerEvents: 'auto' }}>
            <a href={project.gh} target="_blank" rel="noopener noreferrer"
              style={{
                padding:'0.5rem', borderRadius:10,
                background:'rgba(255,255,255,0.12)', border:'1px solid rgba(255,255,255,0.22)',
                color:'#fff', display:'flex', alignItems:'center', justifyContent:'center',
                transition:'background 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.background='rgba(255,255,255,0.22)'}
              onMouseLeave={e => e.currentTarget.style.background='rgba(255,255,255,0.12)'}
            >
              <FiGithub size={15}/>
            </a>
            <a href={project.live} target="_blank" rel="noopener noreferrer"
              style={{
                flex:1, display:'flex', alignItems:'center', justifyContent:'center',
                gap:'0.35rem', padding:'0.5rem 1rem', borderRadius:10,
                background: accent, color:'#fff',
                fontFamily:'DM Sans, sans-serif', fontSize:'0.75rem', fontWeight:700,
                boxShadow: `0 4px 16px ${accentGlow}`,
                transition:'opacity 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.opacity='0.85'}
              onMouseLeave={e => e.currentTarget.style.opacity='1'}
            >
              Live Demo <FiExternalLink size={12}/>
            </a>
            <a href={project.yt} target="_blank" rel="noopener noreferrer"
              style={{
                padding:'0.5rem', borderRadius:10,
                background:'rgba(255,255,255,0.12)', border:'1px solid rgba(255,255,255,0.22)',
                color:'#fff', display:'flex', alignItems:'center', justifyContent:'center',
                transition:'background 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.background='rgba(255,255,255,0.22)'}
              onMouseLeave={e => e.currentTarget.style.background='rgba(255,255,255,0.12)'}
            >
              <FiYoutube size={15}/>
            </a>
          </div>
        </div>

        <div
          className="project-title-strip"
          style={{
            position:'absolute', bottom:0, left:0, right:0,
            padding:'1rem 1.1rem',
            background:'linear-gradient(to top, rgba(0,0,0,0.60), transparent)',
            transition:'opacity 0.3s ease',
          }}
        >
          <p style={{ fontFamily:'Syne, sans-serif', fontWeight:600,
            fontSize:'0.85rem', color:'#fff',
            overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>
            {project.title}
          </p>
        </div>

        <div style={{
          position:'absolute', inset:0, pointerEvents:'none',
          background:'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 60%)',
          borderRadius:20, transform:'translateZ(1px)',
        }}/>
      </div>

      <style>{`
        div:hover > .project-overlay   { opacity: 1 !important; }
        div:hover > .project-title-strip{ opacity: 0 !important; }
      `}</style>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────────────
   STATS CARD — "15+ Projects Done"
   ───────────────────────────────────────────────────────────────────── */
function StatsCard({ isDark, delay = 0 }) {
  const accent     = isDark ? '#9B5CFF' : '#07BEB8';
  const accentSoft = isDark ? 'rgba(155,92,255,0.14)' : 'rgba(7,190,184,0.12)';
  const accentGlow = isDark ? 'rgba(155,92,255,0.30)' : 'rgba(7,190,184,0.24)';
  const glassBg    = isDark ? 'rgba(20,18,30,0.62)' : 'rgba(255,255,255,0.62)';
  const border     = isDark ? '1px solid rgba(200,195,220,0.18)' : '1px solid rgba(80,80,110,0.18)';
  const { ref, onMouseMove, onMouseLeave, onMouseEnter } = useMagneticTilt(10, 4);

  const sectionRef = useRef(null);
  const inView     = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={sectionRef}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: delay * 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <div
        ref={ref}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        onMouseEnter={onMouseEnter}
        style={{
          willChange:           'transform',
          transformStyle:       'preserve-3d',
          height:               280,
          borderRadius:         20,
          border,
          background:           glassBg,
          backdropFilter:       'blur(22px) saturate(160%)',
          WebkitBackdropFilter: 'blur(22px) saturate(160%)',
          boxShadow:            isDark
            ? `0 8px 40px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.04) inset, 0 0 40px ${accentGlow}`
            : `0 8px 32px rgba(0,0,0,0.10), 0 0 40px ${accentGlow}, inset 0 1px 0 rgba(255,255,255,0.9)`,
          display:              'flex',
          flexDirection:        'column',
          alignItems:           'center',
          justifyContent:       'center',
          textAlign:            'center',
          padding:              '1.5rem',
          position:             'relative',
          overflow:             'hidden',
          cursor:               'default',
        }}
      >
        <div style={{
          position:'absolute', inset:0, pointerEvents:'none',
          background:`radial-gradient(ellipse at 50% 40%, ${accentSoft} 0%, transparent 70%)`,
        }}/>

        <div style={{
          fontFamily:'Syne, sans-serif', fontWeight:800,
          fontSize:'5rem', lineHeight:1,
          color: accent,
          textShadow:`0 0 40px ${accentGlow}`,
          letterSpacing:'-0.04em',
          transform:'translateZ(12px)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.1rem'
        }}>
          15<span style={{ fontSize:'3rem' }}>+</span>
        </div>

        <p style={{
          fontFamily:'Syne, sans-serif', fontWeight:700,
          fontSize:'1.05rem', lineHeight:1.3,
          color: isDark ? '#f5f5f5' : '#0a0a0a',
          marginBottom:'0.75rem',
          transform:'translateZ(8px)',
        }}>
          Projects Delivered
        </p>

        <p style={{
          fontFamily:'DM Sans, sans-serif', fontSize:'0.8rem',
          lineHeight:1.65, color: isDark ? 'rgba(245,245,245,0.52)' : 'rgba(10,10,10,0.52)',
          maxWidth:160,
        }}>
          Across web, mobile &amp; creative tech — built with care.
        </p>

        <div style={{
          position:'absolute', inset:0, pointerEvents:'none',
          background:'linear-gradient(135deg, rgba(255,255,255,0.07) 0%, transparent 55%)',
          borderRadius:20,
        }}/>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────────────
   SECTION TAG
   ───────────────────────────────────────────────────────────────────── */
function SectionTag({ isDark }) {
  const accent = isDark ? '#9B5CFF' : '#07BEB8';
  return (
    <div style={{ display:'flex', alignItems:'center', gap:'0.5rem',
      fontFamily:'DM Sans, sans-serif', fontSize:'0.7rem', fontWeight:600,
      letterSpacing:'0.22em', textTransform:'uppercase', marginBottom:'0.75rem',
      color: isDark ? 'rgba(245,245,245,0.42)' : 'rgba(10,10,10,0.42)' }}>
      <span style={{ display:'block', width:16, height:1.5,
        borderRadius:9, background: accent }} />
      Projects
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────
   MAIN
   ───────────────────────────────────────────────────────────────────── */
export default function Projects() {
  const { isDark } = useTheme();
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  const accent     = isDark ? '#9B5CFF' : '#07BEB8';
  const accentGlow = isDark ? 'rgba(155,92,255,0.22)' : 'rgba(7,190,184,0.18)';

  const columns = buildColumns(PROJECTS, 4);
  const STATS_COL = 3;

  return (
    <section
      id="projects"
      style={{ padding:'6rem clamp(1.25rem,5vw,4rem)', maxWidth:1400, margin:'0 auto' }}
    >
      <motion.div
        ref={ref}
        variants={stagger(0.1)}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        style={{ marginBottom:'2.5rem' }}
      >
        <motion.div variants={fadeUp}>
          <SectionTag isDark={isDark}/>
          <h2 style={{
            fontFamily:'Syne, sans-serif', fontWeight:800,
            fontSize:'clamp(1.9rem,4vw,3rem)', color: isDark?'#f5f5f5':'#0a0a0a',
            lineHeight:1.08, letterSpacing:'-0.02em',
          }}>
            <span style={{ color: accent }}>Projects</span> I'm proud of
          </h2>
        </motion.div>
        <motion.p variants={fadeUp} style={{
          marginTop:'0.75rem', fontFamily:'DM Sans, sans-serif',
          fontSize:'0.92rem', color: isDark?'rgba(245,245,245,0.45)':'rgba(10,10,10,0.45)',
        }}>
          Hover any card — tilt, pull, and explore ↓
        </motion.p>
      </motion.div>

      <div style={{
        display:             'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap:                 '1rem',
        alignItems:          'start',
      }}
      className="projects-masonry"
      >
        {columns.map((col, ci) => (
          <div key={ci} style={{ display:'flex', flexDirection:'column', gap:'1rem' }}>
            {col.map((project, pi) => (
              <ProjectCard
                key={project.id}
                project={project}
                isDark={isDark}
                delay={(ci * 0.06 + pi * 0.04)}
              />
            ))}

            {ci === STATS_COL && (
              <StatsCard isDark={isDark} delay={0.5} />
            )}
          </div>
        ))}
      </div>

      <div style={{ marginTop:'4rem' }}>
        <div style={{
          height:1, width:'100%',
          background:`linear-gradient(to right, transparent, ${accent}, transparent)`,
          opacity:0.45,
        }}/>

        
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .projects-masonry { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 600px) {
          .projects-masonry { grid-template-columns: 1fr !important; }
        }

        .projects-masonry div div:hover .project-overlay       { opacity: 1 !important; }
        .projects-masonry div div:hover .project-title-strip   { opacity: 0 !important; }
      `}</style>
    </section>
  );
}