import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import {
  FiGithub,
  FiTwitter,
  FiInstagram,
  FiLinkedin,
  FiFileText,
  FiMail,
} from "react-icons/fi";
import { SiLeetcode } from "react-icons/si";
import { fadeUp, stagger, scaleIn } from "../animations/variants";

import fallbackImg from "../assets/images/desk.jpg";
import fallbackImg2 from "../assets/images/desk1.jpg";
import fallbackImg3 from "../assets/images/desk2.jpg";

const RESUME_URL = "#";

const SOCIALS = [
  { Icon: FiGithub, url: "#", label: "GitHub" },
  { Icon: FiTwitter, url: "#", label: "Twitter" },
  { Icon: FiLinkedin, url: "#", label: "LinkedIn" },
  { Icon: SiLeetcode, url: "#", label: "LeetCode" },
  { Icon: FiInstagram, url: "#", label: "Instagram" },
  { Icon: FiFileText, url: RESUME_URL, label: "Resume" },
];

const IMAGES = [
  { src: fallbackImg, alt: "Mayank Belwanshi - Profile 1" },
  { src: fallbackImg2, alt: "Mayank Belwanshi - Profile 2" },
  { src: fallbackImg3, alt: "Mayank Belwanshi - Profile 3" },
];

function SectionTag({ label, isDark }) {
  const accent = isDark ? "#9B5CFF" : "#07BEB8";
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
      {label}
    </div>
  );
}

function SocialBtn({ Icon, url, label, isDark, surfBg, borderC, accent }) {
  const [hov, setHov] = useState(false);

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        width: "auto",
        height: 40,
        padding: "0 1rem",
        borderRadius: 999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "0.5rem",
        background: hov ? (isDark ? "#f5f5f5" : "#0a0a0a") : surfBg,
        border: `1px solid ${hov ? (isDark ? "#f5f5f5" : "#0a0a0a") : borderC}`,
        color: hov
          ? accent
          : isDark
          ? "rgba(245,245,245,0.45)"
          : "rgba(10,10,10,0.45)",
        transform: hov ? "translateY(-2px)" : "translateY(0)",
        transition: "all 0.2s ease",
        textDecoration: "none",
        cursor: "pointer",
        fontFamily: "DM Sans, sans-serif",
        fontSize: "0.8rem",
        fontWeight: 500,
        whiteSpace: "nowrap",
      }}
    >
      <Icon size={16} style={{ flexShrink: 0 }} />
      <span style={{ lineHeight: 1 }}>{label}</span>
    </a>
  );
}

export default function Contact() {
  const { isDark } = useTheme();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [currentIndex, setCurrentIndex] = useState(0);

  const accent = isDark ? "#9B5CFF" : "#07BEB8";
  const textC = isDark ? "#f5f5f5" : "#0a0a0a";
  const subC = isDark ? "rgba(245,245,245,0.45)" : "rgba(10,10,10,0.5)";
  const borderC = isDark ? "rgba(255,255,255,0.09)" : "rgba(0,0,0,0.09)";
  const surfBg = isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)";

  const glassBg = isDark ? "rgba(20,18,32,0.75)" : "rgba(255,255,255,0.75)";

  const cardBorder = isDark
    ? "1px solid rgba(155,92,255,0.22)"
    : "1px solid rgba(7,190,184,0.20)";

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % IMAGES.length);

  // Auto slide every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="contact"
      style={{
        padding: "6rem clamp(1.25rem,5vw,4rem)",
        maxWidth: 1200,
        margin: "0 auto",
      }}
    >
      {/* Header */}
      <motion.div
        ref={ref}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={stagger(0.1)}
        style={{ marginBottom: "3rem", textAlign: "center" }}
      >
        <motion.div variants={fadeUp}>
          <SectionTag label="Get In Touch" isDark={isDark} />
          <h2
            style={{
              fontFamily: "Syne, sans-serif",
              fontWeight: 800,
              fontSize: "clamp(1.9rem,4vw,3rem)",
              lineHeight: 1.08,
              letterSpacing: "-0.02em",
              color: textC,
            }}
          >
            Let's build something <span style={{ color: accent }}>great</span>
          </h2>
        </motion.div>
      </motion.div>

      {/* Split Card */}
      <motion.div
        variants={scaleIn}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          borderRadius: 28,
          overflow: "hidden",
          border: cardBorder,
          background: glassBg,
          backdropFilter: "blur(28px) saturate(160%)",
          WebkitBackdropFilter: "blur(28px) saturate(160%)",
          boxShadow: isDark
            ? `0 14px 56px rgba(0,0,0,0.60), inset 0 1px 0 rgba(255,255,255,0.06)`
            : `0 14px 48px rgba(0,0,0,0.10), inset 0 1px 0 rgba(255,255,255,0.9)`,
          position: "relative",
        }}
        className="contact-grid"
      >
        {/* LEFT — Image Slider */}
        <div
          style={{ position: "relative", overflow: "hidden", minHeight: 480 }}
        >
          <AnimatePresence mode="wait">
            <motion.img
              key={currentIndex}
              src={IMAGES[currentIndex].src}
              alt={IMAGES[currentIndex].alt}
              initial={{ opacity: 0, scale: 1.08 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center top",
              }}
            />
          </AnimatePresence>

          {/* Clean gradient overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: isDark
                ? "linear-gradient(to right, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.15) 50%, transparent 80%)"
                : "linear-gradient(to right, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.08) 50%, transparent 80%)",
              pointerEvents: "none",
            }}
          />

          {/* Dots */}
          <div
            style={{
              position: "absolute",
              bottom: "1.2rem",
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 10,
              display: "flex",
              gap: "0.5rem",
            }}
          >
            {IMAGES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                style={{
                  width: idx === currentIndex ? 24 : 8,
                  height: 8,
                  borderRadius: 4,
                  background:
                    idx === currentIndex ? accent : "rgba(255,255,255,0.6)",
                  border: "none",
                  cursor: "pointer",
                }}
              />
            ))}
          </div>
        </div>

        {/* RIGHT — Contact Info */}
        <div
          style={{
            padding: "clamp(2rem,4vw,3.5rem)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: "1.6rem",
            position: "relative",
            zIndex: 1,
          }}
        >
          <p
            style={{
              fontFamily: "DM Sans, sans-serif",
              fontSize: "0.95rem",
              lineHeight: 1.7,
              color: subC,
            }}
          >
            Have a project in mind? I'd love to hear about it. Let's create
            something extraordinary together.
          </p>

          {/* Centered Email with Hover Effect */}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <a
              href="mailto:mynkbelwanshi@gmail.com"
              style={{
                display: "inline-block",
                fontFamily: "Syne, sans-serif",
                fontWeight: 700,
                fontSize: "1.35rem",
                color: textC,
                textDecoration: "none",
                borderBottom: `1px solid ${borderC}`,
                paddingBottom: "0.2rem",
                transition: "all 0.3s ease",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderBottomColor = accent;
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.color = accent;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderBottomColor = borderC;
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.color = textC;
              }}
            >
              mynkbelwanshi@gmail.com
            </a>
          </div>

          {/* Centered Start Conversation Button - Icon and text turn accent on hover */}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=mynkbelwanshi@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5rem",
                padding: "0.85rem 2rem",
                borderRadius: 999,
                background: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)",
                color: textC,
                fontFamily: "DM Sans, sans-serif",
                fontSize: "0.92rem",
                fontWeight: 600,
                border: `1px solid ${borderC}`,
                transition: "all 0.3s ease",
                textDecoration: "none",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = accent;
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = textC;
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <FiMail size={17} style={{ flexShrink: 0 }} />
              Start a Conversation
            </a>
          </div>

          {/* Thin separator */}
          <div
            style={{
              height: 1,
              width: "100%",
              background: `linear-gradient(to right, ${accent}44, transparent)`,
            }}
          />

          {/* Social Buttons - Text and icon turn accent on hover */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: "0.9rem",
            }}
          >
            {SOCIALS.map(({ Icon, url, label }) => (
              <SocialBtn
                key={label}
                Icon={Icon}
                url={url}
                label={label}
                isDark={isDark}
                surfBg={surfBg}
                borderC={borderC}
                accent={accent}
              />
            ))}
          </div>
        </div>
      </motion.div>

      <style>{`
        @media (max-width: 720px) {
          .contact-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}