import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function Loader() {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const timer1 = setTimeout(() => setStage(1), 600);
    const timer2 = setTimeout(() => setStage(2), 1400);
    const timer3 = setTimeout(() => setStage(3), 2200);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  return (
    <motion.div
      className="fixed inset-0 bg-marble z-[100] flex flex-col items-center justify-center p-6"
      initial={{ opacity: 1 }}
      animate={{ opacity: stage >= 3 ? 0 : 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      {/* Symphony Heights Logo */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: stage >= 0 ? 1 : 0, scale: stage >= 0 ? 1 : 0.85 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <img
          src="/combo-logo.webp"
          alt="Symphony Heights by Disha Properties"
          className="h-16 sm:h-20 w-auto object-contain drop-shadow-md"
        />
      </motion.div>

      {/* Decorative Line */}
      <motion.svg
        width="180"
        height="24"
        viewBox="0 0 180 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="mb-6"
      >
        <motion.path
          d="M 0 12 Q 45 4, 90 12 T 180 12"
          stroke="#584236"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: stage >= 1 ? 1 : 0 }}
          transition={{ duration: 1, ease: 'easeInOut' }}
        />
      </motion.svg>

      {/* Tagline */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: stage >= 2 ? 1 : 0, y: stage >= 2 ? 0 : 10 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <p className="font-display text-xs sm:text-sm uppercase tracking-[0.25em] text-navy-primary/70 font-semibold">
          Boutique Residences • Hennur
        </p>
      </motion.div>
    </motion.div>
  );
}
