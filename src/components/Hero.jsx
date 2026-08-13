// src/components/Hero.jsx
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const ROLES = [
  'Designer',
  'Developer',
  'AI / ML Engineer',
  'Python Developer',
  'Data Analyst',
  'Creative Mind',
];

export default function Hero() {
  const { isDark } = useTheme();

  const accent  = isDark ? '#9B5CFF' : '#007AFF';
  const textC   = isDark ? '#f5f5f5' : '#0a0a0a';
  const subC    = isDark ? 'rgba(245,245,245,0.45)' : 'rgba(10,10,10,0.5)';
  const borderC = isDark ? 'rgba(255,255,255,0.09)' : 'rgba(0,0,0,0.09)';

  const [roleIdx, setRoleIdx] = useState(0);
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = ROLES[roleIdx];
    let speed = isDeleting ? 40 : 80;

    // hold full word for ~10s
    if (!isDeleting && text === current) speed = 10000;

    // pause before next word
    if (isDeleting && text === '') speed = 800;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setText(current.substring(0, text.length + 1));
        if (text === current) setIsDeleting(true);
      } else {
        setText(current.substring(0, text.length - 1));
        if (text === '') {
          setIsDeleting(false);
          setRoleIdx((prev) => (prev + 1) % ROLES.length);
        }
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [text, isDeleting, roleIdx]);

  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col justify-center items-center text-center
        relative px-6 sm:px-12 pt-24 pb-36 overflow-hidden"
    >

      {/* Eyebrow */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-[0.8rem] uppercase tracking-[0.22em] mb-6 flex items-center gap-3"
        style={{ color: subC }}
      >
        <span
          style={{
            width: 26,
            height: 1.5,
            background: accent,
            display: 'inline-block',
          }}
        />
        Hi, I'm
        <span
          className="font-semibold"
          style={{
            color: accent,
            marginLeft: 6,
          }}
        >
          Mayank Belwanshi
        </span>
      </motion.p>

      {/* Headline */}
      <h1
        className="font-syne font-extrabold tracking-[-0.03em]"
        style={{
          fontSize: 'clamp(2.8rem,8vw,8rem)',
          color: textC,
          lineHeight: 1.05,
        }}
      >
        <span className="block pb-2">I'm a</span>

        <span
          className="block pb-2"
          style={{ minHeight: '1.3em', color: accent }}
        >
          {text}
          <span style={{ marginLeft: 4 }}>|</span>
        </span>
      </h1>

      {/* Subtext */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-8 max-w-[520px] text-[1rem] leading-[1.7]"
        style={{ color: subC }}
      >
        I am a Final Year Undergrad at NIT Bhopal (CSE '27), passionate about
        creating innovative and impactful solutions through technology.
      </motion.p>

      {/* Buttons */}
      <div className="mt-10 flex gap-4 flex-wrap justify-center">

        {/* View Work */}
        <a
          href="#projects"
          className="px-7 py-3.5 rounded-full text-white font-semibold
            flex items-center gap-2 transition-all duration-200
            hover:-translate-y-[2px] hover:opacity-90"
          style={{
            background: accent,
            boxShadow: `0 6px 28px ${accent}55`,
          }}
        >
          View Work •
        </a>

        {/* Let's Talk */}
        <a
          href="#contact"
          className="px-7 py-3.5 rounded-full border font-medium
            transition-all duration-300 hover:-translate-y-[2px]"
          style={{
            borderColor: borderC,
            color: textC,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = `0 0 12px ${accent}, 0 0 24px ${accent}55`;
            e.currentTarget.style.borderColor = accent;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = 'none';
            e.currentTarget.style.borderColor = borderC;
          }}
        >
          Let's Talk ✦
        </a>

      </div>
    </section>
  );
}