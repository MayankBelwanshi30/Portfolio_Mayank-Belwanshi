// src/App.jsx
import { useEffect, useRef } from 'react';
import { useTheme } from './context/ThemeContext';

import BeamsBackground from './components/BeamsBackground';
import Navbar          from './components/Navbar';
import Hero            from './components/Hero';
import Marquee         from './components/Marquee';
import About           from './components/About';
import Skills          from './components/Skills';
import Projects        from './components/Projects';
import Experience      from './components/Experience';
import Contact         from './components/Contact';
import Footer          from './components/Footer';

/* Custom cursor */
function Cursor() {
  const { isDark } = useTheme(); // ✅ added
  const dot  = useRef(null);
  const ring = useRef(null);
  const pos  = useRef({ cx:0, cy:0, rx:0, ry:0 });

  useEffect(() => {
    const onMove = (e) => {
      pos.current.cx = e.clientX;
      pos.current.cy = e.clientY;
    };

    window.addEventListener('mousemove', onMove);

    let id;
    const loop = () => {
      const p = pos.current;

      p.rx += (p.cx - p.rx) * 0.12;
      p.ry += (p.cy - p.ry) * 0.12;

      if (dot.current) {
        dot.current.style.left = p.cx + 'px';
        dot.current.style.top  = p.cy + 'px';
      }

      if (ring.current) {
        ring.current.style.left = p.rx + 'px';
        ring.current.style.top  = p.ry + 'px';
      }

      id = requestAnimationFrame(loop);
    };

    id = requestAnimationFrame(loop);

    const grow = () => {
      if (dot.current) {
        dot.current.style.width  = '18px';
        dot.current.style.height = '18px';
      }
      if (ring.current) {
        ring.current.style.width  = '52px';
        ring.current.style.height = '52px';
        ring.current.style.opacity = '0.18';
      }
    };

    const shrink = () => {
      if (dot.current) {
        dot.current.style.width  = '10px';
        dot.current.style.height = '10px';
      }
      if (ring.current) {
        ring.current.style.width  = '34px';
        ring.current.style.height = '34px';
        ring.current.style.opacity = '0.3';
      }
    };

    const interactiveEls = document.querySelectorAll('a,button');

    interactiveEls.forEach(el => {
      el.addEventListener('mouseenter', grow);
      el.addEventListener('mouseleave', shrink);
    });

    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener('mousemove', onMove);

      interactiveEls.forEach(el => {
        el.removeEventListener('mouseenter', grow);
        el.removeEventListener('mouseleave', shrink);
      });
    };
  }, []);

  return (
    <>
      {/* Dot */}
      <div
        ref={dot}
        style={{
          position: 'fixed',
          width: 10,
          height: 10,
          borderRadius: '50%',
          transform: 'translate(-50%,-50%)',
          pointerEvents: 'none',
          zIndex: 9999,
          transition: 'width .2s,height .2s,background .3s',
        }}
        className={`hidden sm:block ${isDark ? 'bg-[#f5f5f5]' : 'bg-[#0a0a0a]'}`} // ✅ dynamic
      />

      {/* Ring */}
      <div
        ref={ring}
        style={{
          position: 'fixed',
          width: 34,
          height: 34,
          borderRadius: '50%',
          border: '1px solid currentColor',
          opacity: 0.3,
          transform: 'translate(-50%,-50%)',
          pointerEvents: 'none',
          zIndex: 9998,
          transition: 'width .3s,height .3s,opacity .3s',
        }}
        className={`hidden sm:block ${isDark ? 'text-[#f5f5f5]' : 'text-[#0a0a0a]'}`} // ✅ dynamic
      />
    </>
  );
}

function AppContent() {
  const { isDark } = useTheme();

  return (
    <div
      className={`min-h-screen overflow-x-hidden font-dm transition-colors duration-500
        ${isDark ? 'bg-[#080808] text-[#f5f5f5]' : 'bg-[#f8f8f8] text-[#0a0a0a]'}`}
      style={{ cursor: 'none' }}
    >
      {/* Background */}
      <BeamsBackground />

      {/* Custom cursor */}
      <Cursor />

      {/* Navbar */}
      <Navbar />

      {/* Main content */}
      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Marquee />
        <Projects />
        <Experience />
        <Contact />
        <Footer />
      </main>

      {/* Grain overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-[9997] opacity-[0.013]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}

export default function App() {
  return <AppContent />;
}