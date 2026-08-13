// src/components/Marquee.jsx
import { useTheme } from '../context/ThemeContext';

const ITEMS = [
  'Python',
  'C++',
  'C',
  'JavaScript',
  'React',
  'HTML',
  'CSS',
  'SQL',
  'Pandas',
  'NumPy',
  'Scikit-learn',
  'Machine Learning',
  'Data Analytics',
  'Tableau',
  'Power BI',
  'Matplotlib',
  'Seaborn',
  'MySQL',
  'Neo4j',
  'Docker',
  'AWS',
  'Azure',
  'Git',
  'GitHub',
  'Postman',
];

export default function Marquee() {
  const { isDark } = useTheme();

  const accent = isDark ? '#9B5CFF' : '#007AFF';

  return (
    <div className="relative my-12 group">

      {/* 🔥 Gradient fade edges */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-20 z-20"
        style={{
          background: isDark
            ? 'linear-gradient(to right, #0a0a0a, transparent)'
            : 'linear-gradient(to right, #ffffff, transparent)',
        }}
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-20 z-20"
        style={{
          background: isDark
            ? 'linear-gradient(to left, #0a0a0a, transparent)'
            : 'linear-gradient(to left, #ffffff, transparent)',
        }}
      />

      {/* 🧊 Glass container */}
      <div
        className="overflow-hidden rounded-full border backdrop-blur-xl px-6 py-4"
        style={{
          background: isDark
            ? 'rgba(255,255,255,0.04)'
            : 'rgba(255,255,255,0.75)',

          borderColor: isDark
            ? 'rgba(255,255,255,0.15)'
            : 'rgba(0,0,0,0.08)',

          boxShadow: isDark
            ? '0 10px 40px rgba(0,0,0,0.6)'
            : '0 8px 30px rgba(0,0,0,0.08)',
        }}
      >
        {/* 🌀 Track */}
        <div className="marquee-track flex gap-16 w-max items-center">
          {[...ITEMS, ...ITEMS].map((item, i) => (
            <span
              key={i}
              className="marquee-item font-syne text-[1rem] font-semibold tracking-[0.14em]
                uppercase whitespace-nowrap flex items-center gap-3
                transition-all duration-300 hover:scale-110"
              style={{
                color: accent, // ✅ stable color (no bug)
              }}
            >
              {item}

              {/* ✨ glowing dot */}
              <span
                className="inline-block w-[6px] h-[6px] rounded-full"
                style={{
                  background: accent,
                  boxShadow: `0 0 12px ${accent}`,
                  opacity: 0.9,
                }}
              />
            </span>
          ))}
        </div>
      </div>

      {/* ✅ CLEAN CSS */}
      <style>{`
        .marquee-track {
          animation: marqueeScroll 28s linear infinite;
        }

        .group:hover .marquee-track {
          animation-play-state: paused;
        }

        /* 🔥 Gradient only on hover (fixes theme bug) */
        .marquee-item:hover {
          background: linear-gradient(90deg, ${accent}, ${accent}aa);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        @keyframes marqueeScroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}