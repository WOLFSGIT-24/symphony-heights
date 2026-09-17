import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface LoaderProps {
  onComplete?: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const timer1 = setTimeout(() => setStage(1), 350);  // Draw decorative line
    const timer2 = setTimeout(() => setStage(2), 900);  // Reveal tagline
    const timer3 = setTimeout(() => setStage(3), 1700); // Begin fade-out
    const timer4 = setTimeout(() => {
      onComplete?.();
    }, 2300); // Complete unmount

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [onComplete]);

  return (
    <motion.div
      key="brand-entrance-loader"
      initial={{ opacity: 1 }}
      animate={{ opacity: stage >= 3 ? 0 : 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-0 z-[9999] bg-[#f4f3ee] flex flex-col items-center justify-center p-6 select-none ${
        stage >= 3 ? 'pointer-events-none' : 'pointer-events-auto'
      }`}
    >
      <div className="flex flex-col items-center max-w-sm w-full">
        {/* Symphony Heights Logo */}
        <motion.div
          initial={{ opacity: 0, y: 15, scale: 0.92 }}
          animate={{
            opacity: stage >= 0 ? 1 : 0,
            y: stage >= 0 ? 0 : 15,
            scale: stage >= 0 ? 1 : 0.92,
          }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-7"
        >
          <img
            src="/combo-logo.webp"
            alt="Symphony Heights by Disha Properties"
            className="h-16 sm:h-20 w-auto object-contain drop-shadow-sm"
          />
        </motion.div>

        {/* Decorative Wave Line */}
        <div className="w-48 h-6 flex items-center justify-center mb-5">
          <svg
            width="180"
            height="24"
            viewBox="0 0 180 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto overflow-visible"
          >
            <motion.path
              d="M 0 12 Q 45 4, 90 12 T 180 12"
              stroke="#4E3D35"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{
                pathLength: stage >= 1 ? 1 : 0,
                opacity: stage >= 1 ? 1 : 0,
              }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            />
          </svg>
        </div>

        {/* Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{
            opacity: stage >= 2 ? 1 : 0,
            y: stage >= 2 ? 0 : 10,
          }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          <p className="font-paragraph text-[11px] sm:text-xs uppercase tracking-[0.28em] text-[#4E3D35]/80 font-bold">
            Boutique Residences • Hennur
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}
