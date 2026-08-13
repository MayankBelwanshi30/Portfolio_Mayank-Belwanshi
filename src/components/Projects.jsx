// src/components/Projects.jsx
import { useRef, useCallback, useState } from "react";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import {
  FiGithub,
  FiExternalLink,
  FiYoutube,
  FiChevronDown,
} from "react-icons/fi";
import { fadeUp, stagger } from "../animations/variants";

import image1 from "../assets/images/project1.png";
import image2 from "../assets/images/project2.png";
import image3 from "../assets/images/project3.png";
import image4 from "../assets/images/project4.png";
import image5 from "../assets/images/project5.png";
import image6 from "../assets/images/project6.png";
import image7 from "../assets/images/project7.png";
import image8 from "../assets/images/project8.png";
import image9 from "../assets/images/project9.png";
import image10 from "../assets/images/project10.png";
import image11 from "../assets/images/project11.png";

/* ─────────────────────────────────────────────────────────────────────
   PROJECT DATA
   ───────────────────────────────────────────────────────────────────── */

const PROJECTS = [
  {
    id: 1,
    img: image1,
    title: "Credit Card Attrition Prediction",
    tags: ["Python", "Scikit-learn", "XGBoost"],
    desc: "ML pipeline predicting credit card churn using EDA, SMOTE and XGBoost to identify at-risk customers.",
    gh: "https://github.com/MayankBelwanshi30/Credit-Card-Customer-Attrition-Prediction",
    live: "https://colab.research.google.com/drive/1ZlWTLIb-yboDoTH9_MWla9HPnYQS-YDM",
    yt: "https://www.youtube.com/watch?v=i6y8kBpTrsw",
  },
  {
    id: 2,
    img: image2,
    title: "CyberShield — OSINT Tool",
    tags: ["FastAPI", "React", "AI"],
    desc: "AI-powered OSINT dashboard detecting coordinated social media campaigns with real-time sentiment analysis and graph analytics.",
    gh: "https://github.com/MayankBelwanshi30/CyberShield_Hackathon",
    live: "https://cyber-shield-frontend-sandy.vercel.app/",
    yt: "https://www.youtube.com/watch?v=Dj8HAFvf7KA",
  },
  {
    id: 3,
    img: image3,
    title: "Nexus — ML Intrusion Detection",
    tags: ["Python", "Scikit-learn", "XGBoost"],
    desc: "ML-based IDS that classifies network attacks using feature engineering, SMOTE balancing and XGBoost.",
    gh: "https://github.com/MayankBelwanshi30/ML-Based-Intrusion-Detection-System",
    live: "https://colab.research.google.com/drive/1ms4e8GRfu02h2cGLrk44HBQJm5xmtucA",
    yt: "https://www.youtube.com/watch?v=b06eBFB_6eY",
  },
  {
    id: 4,
    img: image4,
    title: "Alien Shooter — Web Game",
    tags: ["JavaScript", "HTML5", "Web Audio"],
    desc: "Top-down browser survival shooter — explore a hospital, find a vaccine, fight aliens and survive the final wave.",
    gh: "https://github.com/MayankBelwanshi30/Alien_Shooter",
    live: "#",
    yt: "https://www.youtube.com/watch?v=8oLqOYoAxrk",
  },
  {
    id: 5,
    img: image5,
    title: "Core Vue — CPU Visualizer",
    tags: ["HTML", "CSS", "JavaScript"],
    desc: "CPU scheduling visualizer with animated Gantt charts for FCFS, SJF, SRTF and Round Robin algorithms.",
    gh: "https://github.com/MayankBelwanshi30/Core_Vue-CPU-Scheduling-Algorithm-Visualizer",
    live: "#",
    yt: "https://www.youtube.com/watch?v=ej5XAKAyk2c",
  },
  {
    id: 6,
    img: image6,
    title: "PULSE — Brand Intelligence",
    tags: ["FastAPI", "React", "WebSockets"],
    desc: "Real-time brand reputation tracker with sentiment analysis, hashtag trends and threshold-based alerts.",
    gh: "https://github.com/MayankBelwanshi30/PULSE",
    live: "https://pulse-one-delta.vercel.app/",
    yt: "https://www.youtube.com/watch?v=V2Pq8Ow3OQU",
  },
  {
    id: 7,
    img: image7,
    title: "LeetHint — Distilled AI",
    tags: ["Python", "T5-small", "Ollama"],
    desc: "Distils a local LLM into a T5-small model that generates non-spoiler DSA hints for LeetCode problems.",
    gh: "https://github.com/MayankBelwanshi30/Dsa-Hint-Distiller",
    live: "#",
    yt: "#",
  },
  {
    id: 8,
    img: image8,
    title: "Disney Clone",
    tags: ["React", "Framer Motion"],
    desc: "Pixel-perfect Disney+ frontend clone with cinematic UI, smooth carousels and dynamic hero banners.",
    gh: "https://github.com/MayankBelwanshi30/Disney-Clone",
    live: "#",
    yt: "https://www.youtube.com/watch?v=kAuMAev6_qY",
  },
  {
    id: 9,
    img: image9,
    title: "Me — Portfolio Website",
    tags: ["React", "Framer Motion", "Three.js"],
    desc: "This portfolio — aurora canvas background, 3D interactions and smooth scroll animations.",
    gh: "https://github.com/MayankBelwanshi30/Portfolio_Mayank-Belwanshi",
    live: "https://portfolio-mayankbelwanshi.vercel.app/",
    yt: "https://www.youtube.com/watch?v=6QscCLouSwM",
  },
  {
    id: 10,
    img: image10,
    title: "Muse — Music Player",
    tags: ["HTML", "CSS", "JavaScript"],
    desc: "Vanilla JS music player with shuffle, loop, keyboard shortcuts and dynamic background visuals.",
    gh: "https://github.com/MayankBelwanshi30/Music-Player",
    live: "#",
    yt: "https://www.youtube.com/watch?v=b7Mh1Q5_3Og",
  },
  {
    id: 11,
    img: image11,
    title: "Foundations — ML Lab",
    tags: ["Python", "Scikit-learn", "PyTorch"],
    desc: "Colab notebooks covering regression, classification, clustering, ensemble methods and neural nets on real datasets.",
    gh: "https://github.com/MayankBelwanshi30/ML-Foundations",
    live: "https://github.com/MayankBelwanshi30/ML-Foundations", 
    yt: "#", 
  }, 
];

/* ───────────────────────────────────────────────────────────────────── 
   PINTEREST MASONRY 
   ───────────────────────────────────────────────────────────────────── */ 

const HEIGHTS = [310, 360, 280, 360, 260, 280, 260, 270, 360, 290, 340]; 

function buildColumns(items, count = 4) { 
  const cols = Array.from({ length: count }, () => []); 
  const heights = Array(count).fill(0); 

  items.forEach((item, i) => { 
    const shortest = heights.indexOf(Math.min(...heights)); 

    cols[shortest].push({ 
      ...item, 
      cardH: HEIGHTS[i % HEIGHTS.length], 
    }); 

    heights[shortest] += HEIGHTS[i % HEIGHTS.length] + 16; 
  }); 

  return cols; 
} 

/* ───────────────────────────────────────────────────────────────────── 
   3-D TILT + MAGNETIC PULL 
   ───────────────────────────────────────────────────────────────────── */ 

function useMagneticTilt(strength = 18, magnetStrength = 8) { 
  const ref = useRef(null); 
  const frame = useRef(null); 

  const onMove = useCallback( 
    (e) => { 
      const el = ref.current; 

      if (!el) return; 

      const { left, top, width, height } = el.getBoundingClientRect(); 

      const cx = left + width / 2; 
      const cy = top + height / 2; 

      const dx = (e.clientX - cx) / (width / 2); 
      const dy = (e.clientY - cy) / (height / 2); 

      if (frame.current) { 
        cancelAnimationFrame(frame.current); 
      } 

      frame.current = requestAnimationFrame(() => { 
        if (!ref.current) return; 

        ref.current.style.transform = ` 
          perspective(800px) 
          rotateX(${-dy * strength * 0.55}deg) 
          rotateY(${dx * strength * 0.55}deg) 
          translateX(${dx * magnetStrength}px) 
          translateY(${dy * magnetStrength}px) 
          scale(1.02) 
        `; 
      }); 
    }, 
    [strength, magnetStrength], 
  ); 

  const onLeave = useCallback(() => { 
    if (frame.current) { 
      cancelAnimationFrame(frame.current); 
    } 

    if (ref.current) { 
      ref.current.style.transition = 
        "transform 0.4s cubic-bezier(0.16,1,0.3,1)"; 

      ref.current.style.transform = 
        "perspective(800px) rotateX(0deg) rotateY(0deg) translateX(0) translateY(0) scale(1)"; 

      setTimeout(() => { 
        if (ref.current) { 
          ref.current.style.transition = ""; 
        } 
      }, 400); 
    } 
  }, []); 

  const onEnter = useCallback(() => { 
    if (ref.current) { 
      ref.current.style.transition = "transform 0.05s linear"; 
    } 
  }, []); 

  return { 
    ref, 
    onMouseMove: onMove, 
    onMouseLeave: onLeave, 
    onMouseEnter: onEnter, 
  }; 
} 

/* ───────────────────────────────────────────────────────────────────── 
   PARALLAX IMAGE 
   ───────────────────────────────────────────────────────────────────── */ 

function ParallaxImage({ src, alt }) { 
  const ref = useRef(null); 

  const { scrollYProgress } = useScroll({ 
    target: ref, 
    offset: ["start end", "end start"], 
  }); 

  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]); 

  return ( 
    <div 
      ref={ref} 
      style={{ 
        width: "100%", 
        height: "100%", 
        overflow: "hidden", 
      }} 
    > 
      <motion.img 
        src={src} 
        alt={alt} 
        style={{ 
          y, 
          width: "100%", 
          height: "115%", 
          objectFit: "cover", 
          objectPosition: "center", 
          marginTop: "-7.5%", 
          willChange: "transform", 
        }} 
      /> 
    </div> 
  ); 
} 

/* ───────────────────────────────────────────────────────────────────── 
   PROJECT CARD 
   ───────────────────────────────────────────────────────────────────── */ 

function ProjectCard({ project, isDark, delay = 0 }) { 
  const accent = isDark ? "#9B5CFF" : "#007AFF"; 

  const accentGlow = isDark ? "rgba(155,92,255,0.28)" : "rgba(0,122,255,0.22)"; 

  const { ref, onMouseMove, onMouseLeave, onMouseEnter } = useMagneticTilt( 
    12, 
    5, 
  ); 

  const sectionRef = useRef(null); 

  const inView = useInView(sectionRef, { 
    once: true, 
    margin: "-80px", 
  }); 

  const glassBg = isDark ? "rgba(20,18,30,0.62)" : "rgba(255,255,255,0.62)"; 

  const border = isDark 
    ? "1px solid rgba(200,195,220,0.18)" 
    : "1px solid rgba(80,80,110,0.18)"; 

  // Helper to check if link is unavailable
  const isUnavailable = (link) => link === "#";

  return ( 
    <motion.div 
      ref={sectionRef} 
      initial={{ opacity: 0, y: 30 }} 
      animate={inView ? { opacity: 1, y: 0 } : {}} 
      transition={{ 
        duration: 0.5, 
        delay: delay * 0.5, 
        ease: [0.16, 1, 0.3, 1], 
      }} 
      style={{ 
        willChange: "transform, opacity", 
      }} 
    > 
      <div 
        className="project-card"
        ref={ref} 
        onMouseMove={onMouseMove} 
        onMouseLeave={onMouseLeave} 
        onMouseEnter={onMouseEnter} 
        style={{ 
          willChange: "transform", 
          transformStyle: "preserve-3d", 
          borderRadius: 20, 
          overflow: "hidden", 
          cursor: "pointer", 

          /* Full description is allowed to occupy all available space */ 
          height: project.cardH, 

          background: glassBg, 
          border, 

          backdropFilter: "blur(18px) saturate(150%)", 
          WebkitBackdropFilter: "blur(18px) saturate(150%)", 

          boxShadow: isDark 
            ? "0 6px 32px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.06)" 
            : "0 6px 28px rgba(0,0,0,0.10), inset 0 1px 0 rgba(255,255,255,0.88)", 

          position: "relative", 
        }} 
      > 
        <ParallaxImage src={project.img} alt={project.title} /> 

        <div 
          style={{ 
            position: "absolute", 
            inset: 0, 
            background: 
              "linear-gradient(to top, rgba(0,0,0,0.68) 0%, rgba(0,0,0,0.15) 50%, transparent 100%)", 
            pointerEvents: "none", 
          }} 
        /> 

        {/* Overlay */} 
        <div 
          className="project-overlay" 
          style={{ 
            position: "absolute", 
            inset: 0, 
            display: "flex", 
            flexDirection: "column", 
            justifyContent: "flex-end", 
            padding: "1.2rem", 

            background: 
              "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.35) 55%, transparent 100%)", 

            opacity: 0, 
            transition: "opacity 0.3s ease", 
            pointerEvents: "none", 
          }} 
        > 
          {/* Tags */} 
          <div 
            style={{ 
              display: "flex", 
              gap: "0.35rem", 
              flexWrap: "wrap", 
              marginBottom: "0.6rem", 
            }} 
          > 
            {project.tags.map((t) => ( 
              <span 
                key={t} 
                style={{ 
                  padding: "0.18rem 0.6rem", 
                  borderRadius: 999, 
                  fontSize: "0.62rem", 
                  fontFamily: "DM Sans, sans-serif", 
                  fontWeight: 600, 
                  color: "#fff", 
                  background: "rgba(0,0,0,0.5)", 
                  border: "1px solid rgba(255,255,255,0.2)", 
                }} 
              > 
                {t} 
              </span> 
            ))} 
          </div> 

          {/* Title */} 
          <h3 
            style={{ 
              fontFamily: "Syne, sans-serif", 
              fontWeight: 700, 
              fontSize: "0.95rem", 
              color: "#fff", 
              marginBottom: "0.4rem", 
              lineHeight: 1.3, 
            }} 
          > 
            {project.title} 
          </h3> 

          {/* FULL DESCRIPTION — NO LINE CLAMP */} 
          <p 
            style={{ 
              fontFamily: "DM Sans, sans-serif", 
              fontSize: "0.78rem", 
              color: "rgba(255,255,255,0.72)", 
              lineHeight: 1.5, 
              marginBottom: "0.9rem", 
              overflow: "visible", 
            }} 
          > 
            {project.desc} 
          </p> 

          {/* Buttons - All buttons visible, with proper href attributes */} 
          <div 
            style={{ 
              display: "flex", 
              gap: "0.5rem", 
              pointerEvents: "auto", 
            }} 
          > 
            {/* GitHub Button */} 
            <a 
              href={isUnavailable(project.gh) ? "javascript:void(0)" : project.gh}
              target={isUnavailable(project.gh) ? undefined : "_blank"}
              rel={isUnavailable(project.gh) ? undefined : "noopener noreferrer"}
              onClick={(e) => {
                if (isUnavailable(project.gh)) {
                  e.preventDefault();
                }
              }}
              style={{ 
                padding: "0.5rem", 
                borderRadius: 10, 
                background: "rgba(255,255,255,0.12)", 
                border: "1px solid rgba(255,255,255,0.22)", 
                color: "#fff", 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "center", 
                transition: "background 0.2s, opacity 0.2s", 
                opacity: isUnavailable(project.gh) ? 0.4 : 1, 
                cursor: isUnavailable(project.gh) ? "not-allowed" : "pointer", 
              }} 
              onMouseEnter={(e) => { 
                if (!isUnavailable(project.gh)) { 
                  e.currentTarget.style.background = "rgba(255,255,255,0.22)"; 
                } 
              }} 
              onMouseLeave={(e) => { 
                if (!isUnavailable(project.gh)) { 
                  e.currentTarget.style.background = "rgba(255,255,255,0.12)"; 
                } 
              }} 
            > 
              <FiGithub size={15} /> 
            </a> 

            {/* Live Demo Button */} 
            <a 
              href={isUnavailable(project.live) ? "javascript:void(0)" : project.live}
              target={isUnavailable(project.live) ? undefined : "_blank"}
              rel={isUnavailable(project.live) ? undefined : "noopener noreferrer"}
              onClick={(e) => {
                if (isUnavailable(project.live)) {
                  e.preventDefault();
                }
              }}
              style={{ 
                flex: 1, 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "center", 
                gap: "0.35rem", 
                padding: "0.5rem 1rem", 
                borderRadius: 10, 
                background: isUnavailable(project.live) ? "rgba(128,128,128,0.3)" : accent, 
                color: isUnavailable(project.live) ? "rgba(255,255,255,0.5)" : "#fff", 
                fontFamily: "DM Sans, sans-serif", 
                fontSize: "0.75rem", 
                fontWeight: 700, 
                boxShadow: !isUnavailable(project.live) ? `0 4px 16px ${accentGlow}` : "none", 
                transition: "opacity 0.2s, background 0.2s", 
                opacity: isUnavailable(project.live) ? 0.5 : 1, 
                cursor: isUnavailable(project.live) ? "not-allowed" : "pointer", 
              }} 
              onMouseEnter={(e) => { 
                if (!isUnavailable(project.live)) { 
                  e.currentTarget.style.opacity = "0.85"; 
                } 
              }} 
              onMouseLeave={(e) => { 
                if (!isUnavailable(project.live)) { 
                  e.currentTarget.style.opacity = "1"; 
                } 
              }} 
            > 
              Live Demo 
              <FiExternalLink size={12} /> 
            </a> 

            {/* YouTube Button */} 
            <a 
              href={isUnavailable(project.yt) ? "javascript:void(0)" : project.yt}
              target={isUnavailable(project.yt) ? undefined : "_blank"}
              rel={isUnavailable(project.yt) ? undefined : "noopener noreferrer"}
              onClick={(e) => {
                if (isUnavailable(project.yt)) {
                  e.preventDefault();
                }
              }}
              style={{ 
                padding: "0.5rem", 
                borderRadius: 10, 
                background: "rgba(255,255,255,0.12)", 
                border: "1px solid rgba(255,255,255,0.22)", 
                color: "#fff", 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "center", 
                transition: "background 0.2s, opacity 0.2s", 
                opacity: isUnavailable(project.yt) ? 0.4 : 1, 
                cursor: isUnavailable(project.yt) ? "not-allowed" : "pointer", 
              }} 
              onMouseEnter={(e) => { 
                if (!isUnavailable(project.yt)) { 
                  e.currentTarget.style.background = "rgba(255,255,255,0.22)"; 
                } 
              }} 
              onMouseLeave={(e) => { 
                if (!isUnavailable(project.yt)) { 
                  e.currentTarget.style.background = "rgba(255,255,255,0.12)"; 
                } 
              }} 
            > 
              <FiYoutube size={15} /> 
            </a> 
          </div> 
        </div> 

        {/* Title strip */} 
        <div 
          className="project-title-strip" 
          style={{ 
            position: "absolute", 
            bottom: 0, 
            left: 0, 
            right: 0, 
            padding: "1rem 1.1rem", 
            background: 
              "linear-gradient(to top, rgba(0,0,0,0.60), transparent)", 
            transition: "opacity 0.3s ease", 
            /* FIX: without this, the title strip (which sits above the
               overlay in DOM order) kept intercepting clicks on the
               GitHub / Live Demo / YouTube buttons even while invisible. */ 
            pointerEvents: "none", 
          }} 
        > 
          <p 
            style={{ 
              fontFamily: "Syne, sans-serif", 
              fontWeight: 600, 
              fontSize: "0.85rem", 
              color: "#fff", 
              overflow: "hidden", 
              textOverflow: "ellipsis", 
              whiteSpace: "nowrap", 
            }} 
          > 
            {project.title} 
          </p> 
        </div> 

        {/* Glass highlight */} 
        <div 
          style={{ 
            position: "absolute", 
            inset: 0, 
            pointerEvents: "none", 
            background: 
              "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 60%)", 
            borderRadius: 20, 
            transform: "translateZ(1px)", 
          }} 
        /> 
      </div> 

      {/* Scoped hover rules */} 
      <style>{` 
        .project-card:hover .project-overlay { 
          opacity: 1 !important; 
          pointer-events: auto !important; 
        } 

        .project-card:hover .project-title-strip { 
          opacity: 0 !important; 
        } 
      `}</style> 
    </motion.div> 
  ); 
} 

/* ───────────────────────────────────────────────────────────────────── 
   STATS CARD 
   ───────────────────────────────────────────────────────────────────── */ 

function StatsCard({ isDark, delay = 0 }) { 
  const accent = isDark ? "#9B5CFF" : "#007AFF"; 

  const accentSoft = isDark ? "rgba(155,92,255,0.14)" : "rgba(0,122,255,0.12)"; 

  const accentGlow = isDark ? "rgba(155,92,255,0.30)" : "rgba(0,122,255,0.24)"; 

  const glassBg = isDark ? "rgba(20,18,30,0.62)" : "rgba(255,255,255,0.62)"; 

  const border = isDark 
    ? "1px solid rgba(200,195,220,0.18)" 
    : "1px solid rgba(80,80,110,0.18)"; 

  const { ref, onMouseMove, onMouseLeave, onMouseEnter } = useMagneticTilt( 
    10, 
    4, 
  ); 

  const sectionRef = useRef(null); 

  const inView = useInView(sectionRef, { 
    once: true, 
    margin: "-80px", 
  }); 

  return ( 
    <motion.div 
      ref={sectionRef} 
      initial={{ opacity: 0, y: 30 }} 
      animate={inView ? { opacity: 1, y: 0 } : {}} 
      transition={{ 
        duration: 0.5, 
        delay: delay * 0.5, 
        ease: [0.16, 1, 0.3, 1], 
      }} 
    > 
      <div 
        ref={ref} 
        onMouseMove={onMouseMove} 
        onMouseLeave={onMouseLeave} 
        onMouseEnter={onMouseEnter} 
        style={{ 
          willChange: "transform", 
          transformStyle: "preserve-3d", 
          height: 280, 
          borderRadius: 20, 
          border, 
          background: glassBg, 

          backdropFilter: "blur(22px) saturate(160%)", 
          WebkitBackdropFilter: "blur(22px) saturate(160%)", 

          boxShadow: isDark 
            ? `0 8px 40px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.04) inset, 0 0 40px ${accentGlow}` 
            : `0 8px 32px rgba(0,0,0,0.10), 0 0 40px ${accentGlow}, inset 0 1px 0 rgba(255,255,255,0.9)`, 

          display: "flex", 
          flexDirection: "column", 
          alignItems: "center", 
          justifyContent: "center", 
          textAlign: "center", 
          padding: "1.5rem", 
          position: "relative", 
          overflow: "hidden", 
          cursor: "default", 
        }} 
      > 
        <div 
          style={{ 
            position: "absolute", 
            inset: 0, 
            pointerEvents: "none", 
            background: `radial-gradient(ellipse at 50% 40%, ${accentSoft} 0%, transparent 70%)`, 
          }} 
        /> 

        <div 
          style={{ 
            fontFamily: "Syne, sans-serif", 
            fontWeight: 800, 
            fontSize: "5rem", 
            lineHeight: 1, 
            color: accent, 
            textShadow: `0 0 40px ${accentGlow}`, 
            letterSpacing: "-0.04em", 
            transform: "translateZ(12px)", 
            display: "flex", 
            alignItems: "center", 
            gap: "0.1rem", 
          }} 
        > 
          10 
          <span style={{ fontSize: "3rem" }}>+</span> 
        </div> 

        <p 
          style={{ 
            fontFamily: "Syne, sans-serif", 
            fontWeight: 700, 
            fontSize: "1.05rem", 
            lineHeight: 1.3, 
            color: isDark ? "#f5f5f5" : "#0a0a0a", 
            marginBottom: "0.75rem", 
            transform: "translateZ(8px)", 
          }} 
        > 
          Projects Delivered 
        </p> 

        <p 
          style={{ 
            fontFamily: "DM Sans, sans-serif", 
            fontSize: "0.8rem", 
            lineHeight: 1.65, 
            color: isDark ? "rgba(245,245,245,0.52)" : "rgba(10,10,10,0.52)", 
            maxWidth: 160, 
          }} 
        > 
          Across web, mobile &amp; creative tech — built with care. 
        </p> 

        <div 
          style={{ 
            position: "absolute", 
            inset: 0, 
            pointerEvents: "none", 
            background: 
              "linear-gradient(135deg, rgba(255,255,255,0.07) 0%, transparent 55%)", 
            borderRadius: 20, 
          }} 
        /> 
      </div> 
    </motion.div> 
  ); 
} 

/* ───────────────────────────────────────────────────────────────────── 
   SECTION TAG 
   ───────────────────────────────────────────────────────────────────── */ 

function SectionTag({ isDark }) { 
  const accent = isDark ? "#9B5CFF" : "#007AFF"; 

  return ( 
    <div 
      style={{ 
        display: "flex", 
        alignItems: "center", 
        gap: "0.5rem", 
        fontFamily: "DM Sans, sans-serif", 
        fontSize: "0.7rem", 
        fontWeight: 600, 
        letterSpacing: "0.22em", 
        textTransform: "uppercase", 
        marginBottom: "0.75rem", 
        color: isDark ? "rgba(245,245,245,0.42)" : "rgba(10,10,10,0.42)", 
      }} 
    > 
      <span 
        style={{ 
          display: "block", 
          width: 16, 
          height: 1.5, 
          borderRadius: 9, 
          background: accent, 
        }} 
      /> 
      Projects 
    </div> 
  ); 
} 

/* ───────────────────────────────────────────────────────────────────── 
   MOBILE PROJECT CARD 
   Same card design as the original ProjectCard 
   ───────────────────────────────────────────────────────────────────── */ 

function MobileProjectCard({ project, isDark, delay = 0 }) { 
  return ( 
    <ProjectCard 
      project={{ 
        ...project, 
        cardH: project.cardH || 320, 
      }} 
      isDark={isDark} 
      delay={delay} 
    /> 
  ); 
} 

/* ───────────────────────────────────────────────────────────────────── 
   MAIN 
   ───────────────────────────────────────────────────────────────────── */ 

export default function Projects() { 
  const { isDark } = useTheme(); 

  const ref = useRef(null); 

  const inView = useInView(ref, { 
    once: true, 
    margin: "-50px", 
  }); 

  const [mobileExpanded, setMobileExpanded] = useState(false); 

  const accent = isDark ? "#9B5CFF" : "#007AFF"; 

  const columns = buildColumns(PROJECTS, 4); 

  const STATS_COL = 3; 

  /* Exactly 3 projects initially */ 
  const mobilePrimary = PROJECTS.slice(0, 3); 

  /* Remaining projects after clicking button */ 
  const mobileRest = PROJECTS.slice(3); 

  return ( 
    <section 
      id="projects" 
      style={{ 
        padding: "6rem clamp(1.25rem,5vw,4rem)", 
        maxWidth: 1400, 
        margin: "0 auto", 
      }} 
    > 
      {/* ───────────────────────────────────────────── 
          HEADER 
          ───────────────────────────────────────────── */} 

      <motion.div 
        ref={ref} 
        variants={stagger(0.1)} 
        initial="hidden" 
        animate={inView ? "visible" : "hidden"} 
        style={{ 
          marginBottom: "2.5rem", 
        }} 
      > 
        <motion.div variants={fadeUp}> 
          <SectionTag isDark={isDark} /> 

          <h2 
            style={{ 
              fontFamily: "Syne, sans-serif", 
              fontWeight: 800, 
              fontSize: "clamp(1.9rem,4vw,3rem)", 
              color: isDark ? "#f5f5f5" : "#0a0a0a", 
              lineHeight: 1.08, 
              letterSpacing: "-0.02em", 
            }} 
          > 
            <span 
              style={{ 
                color: accent, 
              }} 
            > 
              Projects 
            </span>{" "} 
            I'm proud of 
          </h2> 
        </motion.div> 

        {/*  
          The original "Hover any card..." text has been removed, 
          BUT its exact vertical space is preserved. 
        */} 
        <motion.div 
          variants={fadeUp} 
          style={{ 
            marginTop: "0.75rem", 
            height: "1.3rem", 
          }} 
        /> 
      </motion.div> 

      {/* ═════════════════════════════════════════════ 
          DESKTOP / TABLET — ORIGINAL MASONRY 
          ═════════════════════════════════════════════ */} 

      <div 
        className="projects-masonry" 
        style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(4, 1fr)", 
          gap: "1rem", 
          alignItems: "start", 
        }} 
      > 
        {columns.map((col, ci) => ( 
          <div 
            key={ci} 
            style={{ 
              display: "flex", 
              flexDirection: "column", 
              gap: "1rem", 
            }} 
          > 
            {col.map((project, pi) => ( 
              <ProjectCard 
                key={project.id} 
                project={project} 
                isDark={isDark} 
                delay={ci * 0.06 + pi * 0.04} 
              /> 
            ))} 

            {/* Stats card stays on desktop/tablet */} 
            {ci === STATS_COL && <StatsCard isDark={isDark} delay={0.5} />} 
          </div> 
        ))} 
      </div> 

      {/* ═════════════════════════════════════════════ 
          MOBILE 
           
          Initially: 
          1. Project 
          2. Project 
          3. Project 
          4. Minimal icon button 

          Stats card is NOT rendered. 
          ═════════════════════════════════════════════ */} 

      <div 
        className="projects-mobile" 
        style={{ 
          display: "none", 
          flexDirection: "column", 
          gap: "1rem", 
        }} 
      > 
        {/* First 3 projects */} 
        {mobilePrimary.map((project, index) => ( 
          <MobileProjectCard 
            key={project.id} 
            project={{ 
              ...project, 
              cardH: HEIGHTS[index % HEIGHTS.length], 
            }} 
            isDark={isDark} 
            delay={index * 0.05} 
          /> 
        ))} 

        {/* Remaining projects */} 
        <AnimatePresence> 
          {mobileExpanded && 
            mobileRest.map((project, index) => ( 
              <MobileProjectCard 
                key={project.id} 
                project={{ 
                  ...project, 
                  cardH: HEIGHTS[(index + 3) % HEIGHTS.length], 
                }} 
                isDark={isDark} 
                delay={index * 0.04} 
              /> 
            ))} 
        </AnimatePresence> 

        {/* ───────────────────────────────────────── 
            MINIMAL SHOW ALL BUTTON 
            No text — icon only 
            ───────────────────────────────────────── */} 

        <motion.button 
          aria-label={ 
            mobileExpanded ? "Show fewer projects" : "Show all projects" 
          } 
          title={mobileExpanded ? "Show Less" : "Show All Projects"} 
          onClick={() => setMobileExpanded((value) => !value)} 
          whileTap={{ scale: 0.92 }} 
          style={{ 
            alignSelf: "center", 
            marginTop: "0.25rem", 

            width: 42, 
            height: 42, 
            padding: 0, 
            borderRadius: "50%", 

            border: isDark 
              ? "1px solid rgba(255,255,255,0.16)" 
              : "1px solid rgba(0,0,0,0.10)", 

            background: isDark 
              ? "rgba(255,255,255,0.07)" 
              : "rgba(255,255,255,0.55)", 

            backdropFilter: "blur(18px) saturate(160%)", 
            WebkitBackdropFilter: "blur(18px) saturate(160%)", 

            /* FIX: native <button> chrome (esp. Safari/iOS) paints its
               own opaque background/appearance on top of our translucent
               rgba background, which fights with backdrop-filter and
               flattens the glass effect. Removing default appearance
               lets the blur + translucency actually show through. */ 
            appearance: "none", 
            WebkitAppearance: "none", 
            outline: "none", 

            boxShadow: isDark 
              ? ` 
        inset 0 1px 0 rgba(255,255,255,0.12), 
        inset 0 -1px 0 rgba(0,0,0,0.18), 
        0 6px 20px rgba(0,0,0,0.25) 
      ` 
              : ` 
        inset 0 1px 0 rgba(255,255,255,0.9), 
        inset 0 -1px 0 rgba(0,0,0,0.06), 
        0 6px 20px rgba(0,0,0,0.10) 
      `, 

            color: isDark ? "rgba(245,245,245,0.78)" : "rgba(10,10,10,0.65)", 

            display: "flex", 
            alignItems: "center", 
            justifyContent: "center", 

            cursor: "pointer", 
            position: "relative", 
            overflow: "hidden", 

            transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)", 
          }} 
          onMouseEnter={(e) => { 
            e.currentTarget.style.background = isDark 
              ? `linear-gradient( 
          135deg, 
          rgba(155,92,255,0.32), 
          rgba(155,92,255,0.12) 
        )` 
              : `linear-gradient( 
          135deg, 
          rgba(0,122,255,0.22), 
          rgba(0,122,255,0.08) 
        )`; 

            e.currentTarget.style.border = isDark 
              ? "1px solid rgba(155,92,255,0.45)" 
              : "1px solid rgba(0,122,255,0.35)"; 

            e.currentTarget.style.color = accent; 

            e.currentTarget.style.boxShadow = isDark 
              ? ` 
        inset 0 1px 0 rgba(255,255,255,0.16), 
        0 0 20px rgba(155,92,255,0.18), 
        0 8px 24px rgba(0,0,0,0.30) 
      ` 
              : ` 
        inset 0 1px 0 rgba(255,255,255,0.9), 
        0 0 20px rgba(0,122,255,0.14), 
        0 8px 24px rgba(0,0,0,0.12) 
      `; 

            e.currentTarget.style.transform = "translateY(-2px)"; 
          }} 
          onMouseLeave={(e) => { 
            e.currentTarget.style.background = isDark 
              ? "rgba(255,255,255,0.07)" 
              : "rgba(255,255,255,0.55)"; 

            e.currentTarget.style.border = isDark 
              ? "1px solid rgba(255,255,255,0.16)" 
              : "1px solid rgba(0,0,0,0.10)"; 

            e.currentTarget.style.color = isDark 
              ? "rgba(245,245,245,0.78)" 
              : "rgba(10,10,10,0.65)"; 

            e.currentTarget.style.boxShadow = isDark 
              ? ` 
        inset 0 1px 0 rgba(255,255,255,0.12), 
        inset 0 -1px 0 rgba(0,0,0,0.18), 
        0 6px 20px rgba(0,0,0,0.25) 
      ` 
              : ` 
        inset 0 1px 0 rgba(255,255,255,0.9), 
        inset 0 -1px 0 rgba(0,0,0,0.06), 
        0 6px 20px rgba(0,0,0,0.10) 
      `; 

            e.currentTarget.style.transform = "translateY(0)"; 
          }} 
        > 
          {/* Glass highlight */} 
          <span 
            style={{ 
              position: "absolute", 
              inset: 0, 
              borderRadius: "inherit", 
              pointerEvents: "none", 
              background: 
                "linear-gradient(135deg, rgba(255,255,255,0.10), transparent 55%)", 
            }} 
          /> 

          {/* Accent glow */} 
          <span 
            style={{ 
              position: "absolute", 
              width: 28, 
              height: 28, 
              borderRadius: "50%", 
              background: accent, 
              opacity: 0.08, 
              filter: "blur(12px)", 
              pointerEvents: "none", 
            }} 
          /> 

          <motion.span 
            animate={{ 
              rotate: mobileExpanded ? 180 : 0, 
            }} 
            transition={{ 
              duration: 0.3, 
              ease: [0.16, 1, 0.3, 1], 
            }} 
            style={{ 
              display: "flex", 
              position: "relative", 
              zIndex: 2, 
            }} 
          > 
            <FiChevronDown size={18} /> 
          </motion.span> 
        </motion.button> 
      </div> 

      {/* ───────────────────────────────────────────── 
          BOTTOM SEPARATOR 
          ───────────────────────────────────────────── */} 

      <div 
        style={{ 
          marginTop: "4rem", 
        }} 
      > 
        <div 
          style={{ 
            height: 1, 
            width: "100%", 
            background: `linear-gradient(to right, transparent, ${accent}, transparent)`, 
            opacity: 0.45, 
          }} 
        /> 
      </div> 

      {/* ───────────────────────────────────────────── 
          RESPONSIVE CSS 
          ───────────────────────────────────────────── */} 

      <style>{` 
        /* Tablet */ 
        @media (min-width: 601px) and (max-width: 1024px) { 
          .projects-masonry { 
            grid-template-columns: repeat(2, 1fr) !important; 
          } 
        } 

        /* Mobile */ 
        @media (max-width: 600px) { 
          .projects-masonry { 
            display: none !important; 
          } 

          .projects-mobile { 
            display: flex !important; 
          } 
        } 
      `}</style> 
    </section> 
  ); 
}