import React, { useState, useCallback, useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { Copy, Check, ChevronDown } from 'lucide-react';

const SKY = '/templates/royal-gateway/hero-sky.webp';
const SKY_1920 = '/templates/royal-gateway/hero-sky-1920.webp';
const PALACE = '/templates/royal-gateway/grand-palace.webp';
const PALACE_1000 = '/templates/royal-gateway/grand-palace-1000.webp';
const SKY_MASK = 'linear-gradient(to bottom, black 78%, transparent)';
const RAY_MASK = 'radial-gradient(circle, black 0%, transparent 45%)';
const EASE = [0.16, 1, 0.3, 1];

export default function HeroSection({
  coupleNames = 'Kartikey & Rupshree',
  dateLabel = 'Tuesday, 24 November 2026',
  hashtag = '#KartikeyWedsRupshree',
  onScrollDown,
}) {
  const sectionRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const [copied, setCopied] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const { scrollY } = useScroll();

  const palaceY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const sunY = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);
  const sunOpacity = useTransform(scrollYProgress, [0.15, 0.45], [1, 0]);
  const namesY = useTransform(scrollY, (v) => 0.5 * Math.min(v, 900));
  const namesOpacity = useTransform(scrollY, [120, 520], [1, 0]);
  const skyY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(hashtag);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = hashtag;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  }, [hashtag]);

  const [groomFirst = 'KARTIKEY', brideFirst = 'RUPSHREE'] = coupleNames
    .split('&')
    .map((s) => s.trim().toUpperCase());

  const nameClass =
    'font-cinzel-decorative font-bold leading-none text-[#9e141e] drop-shadow-[0_2px_10px_rgba(255,249,236,0.85)] text-[clamp(2.15rem,7.4vw,5.75rem)] tracking-[0.04em]';

  const scrollToNext = () => {
    if (onScrollDown) onScrollDown();
    else {
      const next = sectionRef.current?.nextElementSibling;
      if (next) next.scrollIntoView({ behavior: 'smooth', block: 'start' });
      else window.scrollTo({ top: window.innerHeight * 0.95, behavior: 'smooth' });
    }
  };

  return (
    <section ref={sectionRef} className="relative flex flex-col items-center overflow-hidden">
      <div className="relative flex min-h-[100svh] w-full flex-col items-center overflow-hidden pt-10 md:pt-14">
        {/* Sunset sky + sunburst */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_45%,#f7b98e_70%,#fbd9a8)]" />
          <motion.div
            className="absolute inset-x-0 top-0 h-[80%] md:h-[72%]"
            style={{
              maskImage: SKY_MASK,
              WebkitMaskImage: SKY_MASK,
              y: reduceMotion ? 0 : skyY,
            }}
          >
            <motion.img
              src={SKY}
              srcSet={`${SKY_1920} 1920w, ${SKY} 3840w`}
              sizes="100vw"
              alt=""
              className="h-full w-full object-cover object-[50%_80%]"
              initial={reduceMotion ? false : { scale: 1.25, filter: 'blur(10px) brightness(0.8)' }}
              animate={
                reduceMotion
                  ? undefined
                  : {
                      scale: [1.25, 1.1, 1.18],
                      x: ['0%', '0%', '-2.5%'],
                      filter: [
                        'blur(10px) brightness(0.8)',
                        'blur(0px) brightness(1)',
                        'blur(0px) brightness(1)',
                      ],
                    }
              }
              transition={{ duration: 40, times: [0, 0.08, 1], ease: 'easeInOut', repeat: Infinity, repeatType: 'mirror' }}
            />
          </motion.div>

          {!reduceMotion && (
            <div className="absolute left-1/2 top-[70%] -translate-x-1/2 -translate-y-1/2">
              <motion.div
                className="h-[220vmax] w-[220vmax] mix-blend-soft-light"
                style={{
                  background:
                    'repeating-conic-gradient(from 0deg, rgba(255, 236, 190, 0.55) 0deg 4deg, transparent 4deg 13deg)',
                  maskImage: RAY_MASK,
                  WebkitMaskImage: RAY_MASK,
                }}
                animate={{ rotate: 360, opacity: [0.5, 0.85, 0.5] }}
                transition={{
                  rotate: { duration: 240, repeat: Infinity, ease: 'linear' },
                  opacity: { duration: 9, repeat: Infinity, ease: 'easeInOut' },
                }}
              />
            </div>
          )}

          <div
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(ellipse 55% 42% at 50% 24%, rgba(255, 228, 179, 0.62), transparent 75%)',
            }}
          />
          <div className="absolute inset-x-0 bottom-0 h-1/6 bg-gradient-to-t from-[#fbf1e4] to-transparent" />
        </div>

        {/* Names overlaid on the palace skyline */}
        <motion.div
          style={{ y: reduceMotion ? 0 : namesY, opacity: reduceMotion ? 1 : namesOpacity }}
          className="relative z-20 px-4 text-center"
        >
          <motion.p
            className="font-great-vibes text-3xl text-[#b16f23] md:text-4xl lg:text-5xl"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1 }}
          >
            Shubh Vivah
          </motion.p>
          <motion.h1
            className={nameClass}
            initial={{ opacity: 0, letterSpacing: '0.4em' }}
            animate={{ opacity: 1, letterSpacing: '0.04em' }}
            transition={{ duration: 1.8, ease: EASE }}
          >
            {groomFirst}
          </motion.h1>
          <motion.p
            className="font-great-vibes text-5xl text-[#b16f23] md:text-7xl"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
          >
            &amp;
          </motion.p>
          <motion.h1
            className={nameClass}
            initial={{ opacity: 0, letterSpacing: '0.4em' }}
            animate={{ opacity: 1, letterSpacing: '0.04em' }}
            transition={{ duration: 1.8, delay: 0.4, ease: EASE }}
          >
            {brideFirst}
          </motion.h1>
        </motion.div>

        {/* Palace rises from the bottom */}
        <motion.div
          style={{ y: reduceMotion ? 0 : palaceY }}
          className="relative z-10 mt-auto flex w-full justify-center"
        >
          <motion.div
            className="relative w-[150%] shrink-0 md:w-[112%]"
            initial={reduceMotion ? false : { y: 300, opacity: 0, scale: 1.06 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            transition={{ duration: 2.6, delay: 0.3, ease: EASE }}
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-[14%] -translate-x-1/2 -translate-y-1/2"
            >
              <motion.div style={{ y: reduceMotion ? 0 : sunY, opacity: reduceMotion ? 1 : sunOpacity }}>
                <motion.div
                  initial={reduceMotion ? false : { y: 200, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 2.4, delay: 0.6, ease: EASE }}
                >
                  <motion.div
                    className="h-[80vw] w-[80vw] md:h-[56vw] md:w-[56vw]"
                    style={{
                      background:
                        'radial-gradient(circle, #ffffff 0 6%, #fff6cc 9%, rgba(255, 222, 130, 0.95) 14%, rgba(255, 190, 95, 0.6) 24%, rgba(255, 160, 75, 0.28) 38%, rgba(255, 150, 70, 0.1) 52%, transparent 70%)',
                    }}
                    animate={reduceMotion ? undefined : { scale: [1, 1.05, 1] }}
                    transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
                  />
                </motion.div>
              </motion.div>
            </div>

            <img
              src={PALACE}
              srcSet={`${PALACE_1000} 1000w, ${PALACE} 1734w`}
              sizes="(min-width: 768px) 112vw, 150vw"
              alt="Grand Rajasthani palace"
              width={1734}
              height={899}
              className="relative block h-auto w-full select-none"
            />

            {!reduceMotion && (
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 overflow-hidden"
                style={{
                  maskImage: `url(${PALACE_1000})`,
                  maskSize: '100% 100%',
                  WebkitMaskImage: `url(${PALACE_1000})`,
                  WebkitMaskSize: '100% 100%',
                }}
              >
                <motion.div
                  className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/25 to-transparent"
                  style={{ skewX: -12 }}
                  animate={{ x: ['-150%', '450%'] }}
                  transition={{ duration: 5, repeat: Infinity, repeatDelay: 4, delay: 3, ease: 'easeInOut' }}
                />
              </div>
            )}
          </motion.div>
        </motion.div>
      </div>

      {/* Date plaque, hashtag, scroll cue — below the palace, matching the reference */}
      <motion.div
        style={{ y: reduceMotion ? 0 : palaceY }}
        className="relative z-20 flex w-full flex-col items-center px-6 pb-10 pt-6"
      >
        <div className="flex items-center justify-center gap-3 text-[#dea645]" aria-hidden="true">
          <span className="h-px w-16 bg-gradient-to-r from-transparent to-current" />
          <span className="text-xl">❖</span>
          <span className="h-px w-16 bg-gradient-to-l from-transparent to-current" />
        </div>

        <motion.div
          className="mt-5 w-[min(92vw,38rem)]"
          initial={{ opacity: 0, scale: 0.88, y: 40 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ type: 'spring', stiffness: 120, damping: 14 }}
        >
          <motion.div
            animate={reduceMotion ? undefined : { y: [0, -6, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="relative overflow-hidden rounded-[0.35rem] border-[6px] border-[#d4a23a] bg-[#7a0c15] px-4 py-5 text-center shadow-[0_12px_28px_-10px_rgba(90,10,20,0.45)]"
            style={{
              boxShadow: 'inset 0 0 0 2px #f6d27a, 0 12px 28px -10px rgba(90,10,20,0.45)',
            }}
          >
            <p className="font-cinzel-decorative text-[clamp(1.05rem,5.2vw,1.85rem)] font-bold leading-tight tracking-[0.12em] text-[#fef4df]">
              {dateLabel.toUpperCase()}
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          className="mt-5 flex flex-wrap items-center justify-center gap-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.7 }}
        >
          <span className="font-great-vibes text-2xl text-[#9e141e] sm:text-3xl">{hashtag}</span>
          <button
            type="button"
            onClick={handleCopy}
            title={copied ? 'Copied!' : 'Copy hashtag'}
            aria-label={copied ? 'Hashtag copied' : `Copy ${hashtag}`}
            className="relative flex h-8 w-8 items-center justify-center rounded-full border border-[#dea645]/70 bg-[#fff9eb] text-[#9e141e] shadow-sm transition-all hover:scale-110 hover:bg-[#ffe4b3] active:scale-95"
          >
            {copied ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-3.5 w-3.5" />}
          </button>
          {copied && (
            <span className="rounded-full bg-green-100/80 px-2 py-0.5 font-cinzel text-xs font-semibold tracking-wider text-green-700">
              Copied!
            </span>
          )}
        </motion.div>

        <motion.button
          type="button"
          onClick={scrollToNext}
          className="mt-6 group flex items-center gap-1.5 rounded-full border border-[#dea645]/60 bg-[#080e2c]/75 px-5 py-2 font-cinzel text-xs font-semibold tracking-[0.25em] text-[#fbedd1] shadow-xl backdrop-blur-md transition-all hover:scale-105 hover:border-[#dea645] hover:bg-[#080e2c] active:scale-95"
          animate={reduceMotion ? undefined : { y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span>SCROLL NOW</span>
          <ChevronDown className="h-4 w-4 text-[#dea645]" />
        </motion.button>
      </motion.div>
    </section>
  );
}
