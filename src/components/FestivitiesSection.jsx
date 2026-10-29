import React, { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform, useReducedMotion } from 'framer-motion';
import { Clock, MapPin } from 'lucide-react';

const eO = (px) => `${(px / 1536) * 100}%`;

function ScrollCard({ event, index }) {
  const containerRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 92%', 'start 25%'],
  });

  const smooth = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 20,
    restDelta: 0.001,
  });

  const x = useTransform(smooth, (val) => (shouldReduceMotion ? 1 : Math.min(Math.max(val, 0), 1)));
  const m = useTransform(x, (val) => `${-(115200 * (1 - val)) / 266}%`);
  const h = useTransform(
    x,
    (val) => `inset(0 0 ${100 * Math.max(0, 1 - (118 + 1152 * val + 90 - 180) / 1110)}% 0)`
  );
  const u = useTransform(x, [0.45, 0.85], [0, 1]);
  const f = useTransform(x, [0, 1], [-1.2, 0]);

  return (
    <div
      ref={containerRef}
      className="relative mx-auto aspect-[1024/1536] w-full max-w-[26rem] [container-type:inline-size] filter drop-shadow-[0_15px_30px_rgba(158,20,30,0.35)]"
    >
      {/* Scroll Body with dynamic clipPath as the roller unrolls */}
      <motion.div
        className="absolute inset-x-0"
        style={{
          top: eO(180),
          height: eO(1110),
          clipPath: h,
        }}
      >
        <img
          src="/templates/royal-gateway/scroll/body.webp"
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
          className="h-full w-full object-fill select-none"
        />
        <motion.div
          className="absolute inset-x-[22%] bottom-[10%] top-[13%] flex flex-col items-center justify-center text-center"
          style={{ opacity: u }}
        >
          {/* Event Number */}
          <p className="font-cinzel-decorative text-[3.2cqw] leading-none tracking-[0.35em] text-[#dea645] drop-shadow-sm">
            {event.eventNumber || `EVENT ${index + 1}`}
          </p>

          {/* Animated Floral / Motif Icon */}
          <motion.span
            aria-hidden="true"
            className="mt-[3.5cqw] inline-block text-[9cqw] leading-none drop-shadow-[0_0_10px_rgba(255,200,80,0.6)] select-none"
            animate={{ rotate: [-6, 6, -6], y: [0, -3, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.3 * index }}
          >
            {event.icon || '🌸'}
          </motion.span>

          {/* Event Name */}
          <h3 className="rgw-text-gold-grad mt-[2.5cqw] font-cinzel-decorative text-[9.5cqw] font-bold leading-[1.05] drop-shadow-[0_2px_3px_rgba(40,0,0,0.6)]">
            {event.name}
          </h3>

          {/* Subtitle / Note */}
          {event.subtitle && (
            <p className="mt-[2.2cqw] font-great-vibes text-[6.4cqw] leading-tight text-[#fbe3b4] drop-shadow-sm">
              {event.subtitle}
            </p>
          )}

          {/* Ornate Gold Diamond Divider */}
          <div aria-hidden="true" className="my-[3.8cqw] flex items-center gap-[2cqw] text-[#dea645]">
            <span className="h-px w-[10cqw] bg-gradient-to-r from-transparent to-current" />
            <span className="text-[3.4cqw] leading-none">❖</span>
            <span className="h-px w-[10cqw] bg-gradient-to-l from-transparent to-current" />
          </div>

          {/* Date & Time */}
          {event.date && (
            <p className="inline-flex items-center gap-[1.6cqw] text-[4.2cqw] font-semibold leading-tight text-[#fff1d6]">
              <Clock className="h-[4cqw] w-[4cqw] text-[#dea645] shrink-0" aria-hidden="true" />
              <span>{event.date}</span>
            </p>
          )}

          {event.time && (
            <p className="mt-[1.2cqw] font-cinzel text-[3.8cqw] font-semibold tracking-wider text-[#fff1d6]">
              {event.time}
            </p>
          )}

          {/* Venue Location */}
          {(event.location || event.venue) && (
            <p className="mt-[2.4cqw] inline-flex items-center gap-[1.6cqw] font-cormorant text-[4.2cqw] italic leading-tight text-[#fbe3b4]">
              <MapPin className="h-[4cqw] w-[4cqw] shrink-0 text-[#dea645]" aria-hidden="true" />
              <span>{event.location || event.venue}</span>
            </p>
          )}
        </motion.div>
      </motion.div>

      {/* Top Rod with Tassels (stays fixed at top) */}
      <img
        src="/templates/royal-gateway/scroll/top.webp"
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
        className="pointer-events-none absolute inset-x-0 top-0 z-10 w-full select-none"
        style={{ height: eO(800) }}
      />

      {/* Bottom Rod (rolls down as user scrolls) */}
      <motion.img
        src="/templates/royal-gateway/scroll/bottom.webp"
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
        className="pointer-events-none absolute inset-x-0 z-10 w-full select-none drop-shadow-[0_8px_10px_rgba(60,10,0,0.35)]"
        style={{
          top: eO(1270),
          height: eO(266),
          y: m,
          rotate: f,
        }}
      />
    </div>
  );
}

export default function FestivitiesSection({ festivities = [] }) {
  const trackRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start 70%', 'end 60%'],
  });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    restDelta: 0.001,
  });
  const carTop = useTransform(smoothProgress, (v) => `${v * 100}%`);

  return (
    <section className="relative w-full overflow-hidden px-4 py-16 md:px-6 md:py-28 bg-transparent">


      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-14 text-center md:mb-20"
        >
          <p className="font-great-vibes text-4xl text-[#8d5a17] drop-shadow-sm md:text-5xl">
            2 days of joyous celebration
          </p>
          <h2 className="mt-2 font-cinzel-decorative text-4xl font-bold tracking-wide text-[#9e141e] drop-shadow-sm md:text-5xl">
            THE ROYAL FESTIVITIES
          </h2>
          <div className="mt-6 flex items-center justify-center gap-3 text-[#dea645]" aria-hidden="true">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-current" />
            <span className="text-xl">❖</span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-current" />
          </div>
        </motion.div>

        {/* Central Timeline Track with Moving Decorated Wedding Car */}
        <div ref={trackRef} className="relative">
          {/* Vertical Golden Line */}
          <div
            aria-hidden="true"
            className="absolute inset-y-0 left-5 w-px -translate-x-1/2 bg-[#dea645]/40 md:left-1/2"
          >
            <motion.div
              style={{ scaleY: smoothProgress, x: -1 }}
              className="rgw-bg-gold-grad h-full w-[3px] origin-top rounded-full"
            />
          </div>

          {/* Animated Indian Wedding Car riding the timeline */}
          <motion.div
            aria-hidden="true"
            style={{ top: carTop, x: '-50%', y: '-12%' }}
            className="pointer-events-none absolute left-5 z-20 w-12 md:left-1/2 md:w-24"
          >
            <motion.img
              src="/templates/royal-gateway/timeline-car.webp"
              alt=""
              className="block h-auto w-full drop-shadow-[0_12px_12px_rgba(60,30,0,0.4)] select-none"
              animate={{ rotate: [-1.5, 1.5, -1.5], y: [0, -2, 0] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.div>

          {/* Timeline Events List */}
          <ul className="space-y-12 md:space-y-20">
            {festivities.map((event, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <li
                  key={`${event.name}-${idx}`}
                  className="relative grid grid-cols-[2.5rem_1fr] items-center gap-2 md:grid-cols-[1fr_5rem_1fr] md:gap-8"
                >
                  {/* Timeline Gold Node Dot */}
                  <motion.div
                    aria-hidden="true"
                    className="col-start-1 row-start-1 h-3.5 w-3.5 justify-self-center rounded-full bg-[#dea645] ring-4 ring-[#ffe4b3] shadow-md md:col-start-2"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ type: 'spring', stiffness: 140, damping: 14 }}
                  />

                  {/* Scroll Card Column */}
                  <motion.div
                    className={`col-start-2 row-start-1 ${isEven ? 'md:col-start-1' : 'md:col-start-3'}`}
                    initial={{ opacity: 0, y: 40, x: isEven ? -40 : 40 }}
                    whileInView={{ opacity: 1, y: 0, x: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <ScrollCard event={event} index={idx} />
                  </motion.div>

                  {/* Big Elegant Cursive Date Display on the opposite side */}
                  <motion.p
                    className={`row-start-1 hidden font-great-vibes text-5xl text-[#9a5b13] lg:text-6xl drop-shadow-sm md:block ${
                      isEven ? 'md:col-start-3 pl-8' : 'md:col-start-1 md:text-right pr-8'
                    }`}
                    initial={{ opacity: 0, x: isEven ? 40 : -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.35 }}
                    transition={{ duration: 0.7, delay: 0.15 }}
                  >
                    {event.date}
                  </motion.p>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
