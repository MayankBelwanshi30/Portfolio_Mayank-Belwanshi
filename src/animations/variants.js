// src/animations/variants.js

export const fadeUp = {
  hidden:  { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0,
    transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] } },
};

export const fadeIn = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1,
    transition: { duration: 0.6, ease: 'easeOut' } },
};

export const scaleIn = {
  hidden:  { opacity: 0, scale: 0.93 },
  visible: { opacity: 1, scale: 1,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
};

export const stagger = (delay = 0.08) => ({
  hidden:  {},
  visible: { transition: { staggerChildren: delay } },
});

export const slideRight = {
  hidden:  { opacity: 0, x: -28 },
  visible: { opacity: 1, x: 0,
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } },
};

export const slideLeft = {
  hidden:  { opacity: 0, x: 28 },
  visible: { opacity: 1, x: 0,
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } },
};