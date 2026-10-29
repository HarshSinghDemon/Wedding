import React, { useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export default function PetalsOverlay() {
  const reduceMotion = useReducedMotion();
  const count = reduceMotion ? 0 : 12;

  const petals = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      left: `${(37 * i) % 100}%`,
      size: 20 + (i % 4) * 4,
      delay: 0.9 * i,
      duration: 12 + (i % 5) * 2,
    }));
  }, [count]);

  if (!count) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-30 overflow-hidden transform-gpu">
      {/* Shared SVG definition */}
      <svg className="absolute h-0 w-0" aria-hidden="true">
        <defs>
          <linearGradient id="royal-petal-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f48fb1" />
            <stop offset="55%" stopColor="#c2185b" />
            <stop offset="100%" stopColor="#880e4f" />
          </linearGradient>
        </defs>
      </svg>

      {petals.map((petal) => (
        <motion.span
          key={petal.id}
          className="absolute -top-8 block will-change-transform"
          style={{ left: petal.left, perspective: 400 }}
          initial={{ y: '0vh', rotate: 0 }}
          animate={{
            y: '110vh',
            rotate: petal.id % 2 ? 300 : -300,
            x: [0, 35, -20, 8],
          }}
          transition={{
            duration: petal.duration,
            repeat: Infinity,
            delay: petal.delay,
            ease: 'linear',
          }}
        >
          <motion.span
            className="block will-change-transform"
            animate={{ rotateX: [0, 180, 360], rotateY: [0, 90, 0] }}
            transition={{ duration: 3.5 + (petal.id % 3), repeat: Infinity, ease: 'linear' }}
          >
            <svg width={petal.size} height={petal.size} viewBox="0 0 24 24">
              <path
                d="M12 2 C18 7, 21 13, 16 20 C13 23, 9 22, 5 18 C1 13, 5 6, 12 2 Z"
                fill="url(#royal-petal-grad)"
              />
            </svg>
          </motion.span>
        </motion.span>
      ))}
    </div>
  );
}
