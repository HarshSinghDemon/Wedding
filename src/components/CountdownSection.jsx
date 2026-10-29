import React, { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { CountdownCardFrame } from './JharokhaFrame';

const LABELS = ['DAYS', 'HOURS', 'MINUTES', 'SECONDS'];
const VARIANTS = [0, 2, 4, 6]; // 0: Orange/Yellow, 2: Blue/Yellow, 4: Orange/Magenta, 6: Navy/Red

function parseTarget(targetDate) {
  const value = targetDate instanceof Date ? targetDate.getTime() : new Date(targetDate).getTime();
  return Number.isFinite(value) ? value : Date.parse('2026-11-24T20:00:00+05:30');
}

function remainingParts(targetMs, nowMs) {
  const diff = Math.max(0, targetMs - nowMs);
  return [
    Math.floor(diff / 86400000),
    Math.floor((diff / 3600000) % 24),
    Math.floor((diff / 60000) % 60),
    Math.floor((diff / 1000) % 60),
  ];
}

export default function CountdownSection({
  targetDate = '2026-11-24T20:00:00+05:30',
  togetherText = 'Together with their families',
  requestText = 'request the honour of your presence to celebrate the union of two souls and the joining of two families.',
}) {
  const reduceMotion = useReducedMotion();
  const [parts, setParts] = useState([0, 0, 0, 0]);
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    const target = parseTarget(targetDate);
    const tick = () => {
      const now = Date.now();
      const next = remainingParts(target, now);
      setParts(next);
      setComplete(target - now <= 0);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  return (
    <section className="relative w-full px-4 pt-10 pb-6 md:pt-16 md:pb-10">
      {/* Central Rotating Jewel Rosette */}
      <motion.div
        aria-hidden="true"
        className="mx-auto mb-6 aspect-square w-28 drop-shadow-[0_10px_20px_rgba(90,40,120,0.35)] md:mb-8 md:w-36"
        initial={{ scale: 0.4, opacity: 0, rotate: -90 }}
        whileInView={{ scale: 1, opacity: 1, rotate: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.img
          src="/templates/royal-gateway/jewel-rosette.webp"
          alt=""
          className="h-full w-full object-contain"
          animate={reduceMotion ? undefined : { rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
        />
      </motion.div>

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        {/* Invitation Text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1 }}
          className="relative isolate mb-8"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-x-6 -inset-y-4 -z-10 rounded-full"
            style={{ background: 'radial-gradient(closest-side, rgba(255, 247, 232, 0.95) 70%, transparent)' }}
          />
          <p className="rgw-text-halo font-great-vibes text-4xl text-[#8d5a17] md:text-5xl lg:text-6xl">
            {togetherText}
          </p>
          <p className="rgw-text-halo mt-3 mx-auto max-w-2xl font-cormorant text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold italic leading-relaxed text-[#7a0c15] px-2">
            {requestText}
          </p>
          <div className="mt-6 flex items-center justify-center gap-3 text-[#dea645]" aria-hidden="true">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-current" />
            <span className="text-xl">❖</span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-current" />
          </div>
        </motion.div>

        {/* Section Kicker */}
        <p className="rgw-text-halo mb-6 font-great-vibes text-3xl text-[#8d5a17] md:text-4xl lg:text-5xl">
          {complete ? 'The celebration has begun' : 'Counting the moments'}
        </p>

        {/* 4 Ornate Architectural Countdown Cards matching Screenshot 404 */}
        <div
          className="mx-auto grid w-full max-w-2xl grid-cols-4 gap-2.5 sm:gap-5 lg:max-w-3xl lg:gap-7"
          aria-live="polite"
          aria-atomic="true"
        >
          {LABELS.map((label, idx) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 40, rotateX: -60 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.3 + 0.12 * idx, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.div
                animate={{ y: [0, -7, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 * idx }}
              >
                <CountdownCardFrame
                  value={parts[idx]}
                  label={label}
                  variant={VARIANTS[idx]}
                  pulse={idx === 3 && !complete}
                />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
