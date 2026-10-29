import React from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

const royalGridSvg = `<svg xmlns='http://www.w3.org/2000/svg' width='72' height='72' viewBox='0 0 72 72'><path d='M36 2 L70 36 L36 70 L2 36 Z' fill='none' stroke='#b8862b' stroke-width='1'/><path d='M36 22 Q44 28 36 36 Q28 28 36 22 Z M36 50 Q44 44 36 36 Q28 44 36 50 Z M22 36 Q28 28 36 36 Q28 44 22 36 Z M50 36 Q44 28 36 36 Q44 44 50 36 Z' fill='none' stroke='#b8862b' stroke-width='1'/><circle cx='36' cy='36' r='2' fill='#b8862b'/></svg>`;
const royalGridPattern = `url("data:image/svg+xml,${encodeURIComponent(royalGridSvg)}")`;
const royalGridMask = 'radial-gradient(ellipse 70% 65% at 50% 50%, rgba(0, 0, 0, 0.35), black 90%)';

const sparkleDots = Array.from({ length: 18 }, (_, t) => ({
  left: (37 * t + 11) % 100,
  top: (53 * t + 7) % 100,
  size: 3 + (t % 3) * 2,
  delay: (0.7 * t) % 5,
}));

function CornerMandala({ turn, spin, className, delay = 0 }) {
  return (
    <motion.div style={{ rotate: turn }} className={`absolute pointer-events-none select-none ${className}`}>
      <motion.div
        className="relative h-full w-full"
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.8, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.div
          className="relative h-full w-full"
          animate={{ rotate: spin, scale: [1, 1.04, 1] }}
          transition={{
            rotate: { duration: 90, repeat: Infinity, ease: 'linear' },
            scale: { duration: 7, repeat: Infinity, ease: 'easeInOut', delay },
          }}
        >
          <img
            src="/templates/royal-gateway/blue-mandala.webp"
            alt=""
            aria-hidden="true"
            className="h-full w-full object-contain opacity-[0.38]"
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default function GlobalBackground() {
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 20,
    restDelta: 0.0005,
  });

  const rotClockwise = useTransform(smooth, [0, 1], [0, 360]);
  const rotCounterClockwise = useTransform(smooth, [0, 1], [0, -270]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#fbf1e4]"
    >
      {/* 1. Base Warm Peach & Ivory Luxury Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_75%_65%_at_50%_45%,#fffaf2_0%,#fbeedd_45%,#f3d9c4_80%,#e9c3a6_100%)]" />

      {/* 2. Soft Ambient Blush Pink Light Bubble */}
      <motion.div
        className="absolute -left-[20vmax] -top-[15vmax] h-[60vmax] w-[60vmax] rounded-full bg-[radial-gradient(circle,rgba(244,190,200,0.55),transparent_65%)]"
        animate={{ x: [0, 60, 0], y: [0, 40, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* 3. Soft Ambient Warm Gold Light Bubble */}
      <motion.div
        className="absolute -bottom-[20vmax] -right-[15vmax] h-[60vmax] w-[60vmax] rounded-full bg-[radial-gradient(circle,rgba(240,200,130,0.5),transparent_65%)]"
        animate={{ x: [0, -50, 0], y: [0, -40, 0] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* 4. Delicate Diagonal Diamond & 4-Petal Floral Royal Lattice Grid */}
      <div
        className="absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage: royalGridPattern,
          backgroundSize: '72px 72px',
          maskImage: royalGridMask,
          WebkitMaskImage: royalGridMask,
        }}
      />

      {/* 5. Delicate Gold Pinstripe Viewport Border Framing the Entire Page */}
      <div className="absolute inset-2 rounded-[18px] border border-[#c9973a]/60 md:inset-4" />
      <div className="absolute inset-[13px] rounded-[14px] border border-dashed border-[#c9973a]/40 md:inset-[25px]" />

      {/* 6. Corner Diamond Motifs */}
      {['left-0 top-0', 'right-0 top-0', 'left-0 bottom-0', 'right-0 bottom-0'].map((pos) => (
        <span
          key={pos}
          className={`absolute ${pos} m-[3px] text-lg leading-none text-[#b8862b] select-none md:m-[11px] md:text-2xl`}
        >
          ❖
        </span>
      ))}

      {/* 7. Twinkling Golden Dust Particles */}
      {sparkleDots.map((dot, idx) => (
        <motion.span
          key={idx}
          className="absolute rounded-full bg-[radial-gradient(circle,#fff6d0,#d4a23a_60%,transparent_70%)]"
          style={{
            left: `${dot.left}%`,
            top: `${dot.top}%`,
            width: dot.size,
            height: dot.size,
          }}
          animate={{ opacity: [0, 0.85, 0], scale: [0.6, 1.3, 0.6] }}
          transition={{ duration: 3.2, repeat: Infinity, delay: dot.delay, ease: 'easeInOut' }}
        />
      ))}

      {/* 8. Top-Right Rotating Blue Mandala */}
      <CornerMandala
        turn={rotClockwise}
        spin={360}
        className="-right-[27vmin] -top-[27vmin] h-[58vmin] w-[58vmin] md:-right-[16vmax] md:-top-[16vmax] md:h-[38vmax] md:w-[38vmax]"
      />

      {/* 9. Bottom-Left Rotating Blue Mandala */}
      <CornerMandala
        turn={rotCounterClockwise}
        spin={-360}
        delay={0.8}
        className="-bottom-[27vmin] -left-[27vmin] h-[58vmin] w-[58vmin] md:-bottom-[24vmax] md:-left-[24vmax] md:h-[50vmax] md:w-[50vmax]"
      />
    </div>
  );
}
