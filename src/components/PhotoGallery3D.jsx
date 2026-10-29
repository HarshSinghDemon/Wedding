import React, { useCallback, useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X, ZoomIn, Maximize2 } from 'lucide-react';
import { GildedJharokhaFrame } from './JharokhaFrame';

export default function PhotoGallery3D({ gallery = [] }) {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [enlargedIndex, setEnlargedIndex] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef(null);

  const total = gallery.length;

  const prev = useCallback(() => {
    setCurrentIndex((idx) => (idx === 0 ? total - 1 : idx - 1));
  }, [total]);

  const next = useCallback(() => {
    setCurrentIndex((idx) => (idx === total - 1 ? 0 : idx + 1));
  }, [total]);

  const openLightbox = (idx) => {
    setEnlargedIndex(idx);
    setIsPaused(true);
  };

  const closeLightbox = () => {
    setEnlargedIndex(null);
    setIsPaused(false);
  };

  const prevEnlarged = useCallback(() => {
    setEnlargedIndex((idx) => (idx === null ? null : idx === 0 ? total - 1 : idx - 1));
  }, [total]);

  const nextEnlarged = useCallback(() => {
    setEnlargedIndex((idx) => (idx === null ? null : (idx + 1) % total));
  }, [total]);

  // Auto advance every 4.5 seconds when not paused or enlarged
  useEffect(() => {
    if (isPaused || reduceMotion || total < 2 || enlargedIndex !== null) return;
    const timer = setTimeout(() => {
      next();
    }, 4500);
    return () => clearTimeout(timer);
  }, [currentIndex, isPaused, reduceMotion, total, next, enlargedIndex]);

  // Keyboard navigation & body scroll lock for lightbox and carousel
  useEffect(() => {
    const onKey = (e) => {
      if (enlargedIndex !== null) {
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') prevEnlarged();
        if (e.key === 'ArrowRight') nextEnlarged();
        return;
      }

      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const inView = rect.top < window.innerHeight && rect.bottom > 0;
      if (!inView) return;
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };

    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [prev, next, enlargedIndex, prevEnlarged, nextEnlarged]);

  // Lock body scroll when lightbox is open
  useEffect(() => {
    if (enlargedIndex === null) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [enlargedIndex]);

  if (!total) return null;

  const currentItem = gallery[currentIndex];

  return (
    <section ref={sectionRef} className="relative w-full overflow-hidden px-4 py-16 md:py-28">
      <div className="relative z-10 mx-auto max-w-5xl text-center">
        {/* Section Heading matching Screenshot 406 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-8 md:mb-12"
        >
          <p className="font-great-vibes text-4xl text-[#8d5a17] drop-shadow-sm md:text-5xl">
            Moments to treasure
          </p>
          <h2 className="mt-2 font-cinzel-decorative text-4xl font-bold tracking-wide text-[#9e141e] drop-shadow-sm md:text-5xl">
            ROYAL GALLERY
          </h2>
          <div className="mt-6 flex items-center justify-center gap-3 text-[#dea645]" aria-hidden="true">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-current" />
            <span className="text-xl">❖</span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-current" />
          </div>
        </motion.div>

        {/* 3D Jharokha Carousel Stage */}
        <div
          role="region"
          aria-roledescription="carousel"
          aria-label="Wedding gallery"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocus={() => setIsPaused(true)}
          onBlur={() => setIsPaused(false)}
          className="relative"
        >
          {/* Golden Ambient Glow behind Center Card */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-[42%] h-[70%] w-[min(90vw,44rem)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(255,214,130,0.55),transparent_70%)] blur-2xl"
          />

          <div
            className="relative flex min-h-[420px] items-center justify-center sm:min-h-[480px] md:min-h-[540px] select-none py-6"
            style={{ perspective: '1100px' }}
          >
            {gallery.map((item, idx) => {
              let offset = idx - currentIndex;
              const half = total / 2;
              if (offset > half) offset -= total;
              if (offset < -half) offset += total;
              const abs = Math.abs(offset);
              if (abs > 2.5) return null;

              const isCenter = offset === 0;

              return (
                <motion.div
                  key={item.id || `${item.url}-${idx}`}
                  className="absolute left-1/2 top-4 w-[72%] px-2 sm:w-[46%] lg:w-[32%]"
                  style={{
                    zIndex: 10 - Math.round(3 * abs),
                    pointerEvents: abs > 2 ? 'none' : 'auto',
                  }}
                  animate={{ x: `${(offset - 0.5) * 100}%` }}
                  transition={{ duration: reduceMotion ? 0 : 0.7, ease: [0.16, 1, 0.3, 1] }}
                  onClick={() => {
                    setCurrentIndex(idx);
                    openLightbox(idx);
                  }}
                >
                  <motion.div
                    className="group cursor-pointer [transform-style:preserve-3d] relative"
                    animate={
                      reduceMotion
                        ? { scale: 1 - 0.15 * Math.min(abs, 1), opacity: Math.max(0, Math.min(1, 2.6 - abs)) }
                        : {
                            rotateY: -32 * offset,
                            z: -(140 * abs),
                            scale: 1 - 0.12 * Math.min(abs, 1.5),
                            opacity: Math.max(0, Math.min(1, 2.6 - abs)),
                            filter: `brightness(${1 - 0.3 * Math.min(abs, 1.5)}) saturate(${1 - 0.3 * Math.min(abs, 1)})`,
                          }
                    }
                    transition={{ duration: reduceMotion ? 0 : 0.7, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <GildedJharokhaFrame>
                      <div className="relative h-full w-full overflow-hidden">
                        <motion.img
                          src={item.url}
                          alt={item.caption || `Wedding photo ${idx + 1}`}
                          draggable={false}
                          loading="lazy"
                          decoding="async"
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          animate={isCenter && !reduceMotion ? { scale: [1, 1.08] } : { scale: 1 }}
                          transition={{ duration: 5.5, ease: 'easeOut' }}
                        />

                        {/* Hover Overlay with Zoom Badge */}
                        <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <span className="flex items-center gap-1.5 rounded-full border border-[#f6d27a] bg-[#800d14]/90 px-3.5 py-1.5 font-cinzel text-xs font-bold text-[#fbedd1] shadow-xl backdrop-blur-sm transform scale-90 group-hover:scale-100 transition-transform duration-300">
                            <ZoomIn className="h-4 w-4 text-[#f6d27a]" />
                            <span>ENLARGE</span>
                          </span>
                        </div>
                      </div>
                    </GildedJharokhaFrame>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>

          {/* Ribbon Caption Banner matching Screenshot 406 */}
          <div className="relative mx-auto mt-2 flex w-[min(88vw,26rem)] flex-col items-center z-20">
            <button
              type="button"
              onClick={() => openLightbox(currentIndex)}
              title="Click to view full screen"
              className="rgw-shadow-royal relative w-full rounded-md bg-[radial-gradient(ellipse_at_50%_30%,#a3172f,#5c0816)] px-6 py-3 text-center ring-1 ring-[#f6d27a]/70 [clip-path:polygon(0_0,100%_0,96%_50%,100%_100%,0_100%,4%_50%)] transition-transform hover:scale-102 active:scale-98 cursor-pointer group"
            >
              <div className="pointer-events-none absolute inset-[5px] rounded-sm border border-dashed border-[#f6d27a]/50" />
              <AnimatePresence mode="wait" initial={false}>
                <motion.p
                  key={`${currentIndex}-${currentItem?.caption}`}
                  className="rgw-text-gold-grad font-great-vibes text-3xl leading-tight md:text-4xl flex items-center justify-center gap-2"
                  initial={{ opacity: 0, y: 12, filter: 'blur(4px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -12, filter: 'blur(4px)' }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                >
                  <span>{currentItem?.caption || 'Moments to treasure'}</span>
                  <Maximize2 className="h-4 w-4 text-[#f6d27a] opacity-80 group-hover:opacity-100 transition-opacity" />
                </motion.p>
              </AnimatePresence>
              <p className="mt-0.5 font-cinzel-decorative text-[0.65rem] tracking-[0.35em] text-[#f6d27a]/90">
                {String(currentIndex + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
              </p>
            </button>

            {/* Subtle Progress Bar */}
            {total > 1 && (
              <div className="mt-3 h-[3px] w-40 overflow-hidden rounded-full bg-[#dea645]/25">
                <motion.div
                  key={currentIndex}
                  className="rgw-bg-gold-grad h-full origin-left"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: isPaused || reduceMotion ? 0 : 1 }}
                  transition={{ duration: isPaused ? 0.2 : 4.5, ease: 'linear' }}
                />
              </div>
            )}
          </div>

          {/* Navigation Arrows */}
          <div className="mt-6 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={prev}
              aria-label="Previous photo"
              className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-[#dea645] bg-[#800d14] text-[#dea645] shadow-lg transition-transform hover:scale-110 active:scale-95"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Next photo"
              className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-[#dea645] bg-[#800d14] text-[#dea645] shadow-lg transition-transform hover:scale-110 active:scale-95"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Smooth Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {enlargedIndex !== null && gallery[enlargedIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#080e2c]/90 backdrop-blur-xl p-3 sm:p-6 select-none"
            onClick={closeLightbox}
          >
            {/* Ambient Background Radial Glow */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-1/2 h-[80%] w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(255,214,130,0.25),transparent_70%)] blur-3xl"
            />

            {/* Modal Content Box */}
            <motion.div
              initial={{ scale: 0.88, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.88, opacity: 0, y: 15 }}
              transition={{ type: 'spring', stiffness: 320, damping: 26 }}
              className="relative z-10 flex flex-col items-center max-w-4xl w-full max-h-[92vh] rounded-2xl border-2 border-[#dea645] bg-[radial-gradient(ellipse_at_50%_0%,#4a0614,#2b030b)] p-4 sm:p-6 shadow-[0_0_60px_rgba(222,166,69,0.35)] backdrop-blur-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Top Bar */}
              <div className="w-full flex items-center justify-between pb-3 mb-2 border-b border-[#dea645]/30">
                <div className="flex items-center gap-2">
                  <span className="text-[#dea645] text-sm">❖</span>
                  <span className="font-cinzel-decorative text-xs sm:text-sm font-bold tracking-[0.2em] text-[#fbedd1]">
                    ROYAL GALLERY
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="font-cinzel text-xs font-bold tracking-widest text-[#dea645]">
                    {String(enlargedIndex + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
                  </span>
                  <button
                    type="button"
                    onClick={closeLightbox}
                    aria-label="Close enlarged view"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-[#dea645] bg-[#7a0c15] text-[#fbedd1] shadow-md transition-transform hover:scale-110 active:scale-95 hover:bg-[#9e141e]"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Main Photo Stage */}
              <div className="relative flex items-center justify-center w-full flex-1 min-h-0 overflow-hidden my-auto py-2">
                {/* Previous Button */}
                {total > 1 && (
                  <button
                    type="button"
                    onClick={prevEnlarged}
                    aria-label="Previous photo"
                    className="absolute left-1 sm:left-3 z-20 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-[#dea645] bg-[#080e2c]/80 text-[#dea645] shadow-xl backdrop-blur-md transition-transform hover:scale-110 active:scale-95"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                )}

                {/* Enlarged Photo Container */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={enlargedIndex}
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                    className="relative max-h-[68vh] sm:max-h-[72vh] w-auto max-w-full overflow-hidden rounded-xl border border-[#f6d27a]/60 shadow-[0_20px_50px_rgba(0,0,0,0.7)]"
                  >
                    <img
                      src={gallery[enlargedIndex].url}
                      alt={gallery[enlargedIndex].caption || `Wedding photo ${enlargedIndex + 1}`}
                      className="max-h-[68vh] sm:max-h-[72vh] w-auto max-w-full object-contain rounded-xl"
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Next Button */}
                {total > 1 && (
                  <button
                    type="button"
                    onClick={nextEnlarged}
                    aria-label="Next photo"
                    className="absolute right-1 sm:right-3 z-20 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-[#dea645] bg-[#080e2c]/80 text-[#dea645] shadow-xl backdrop-blur-md transition-transform hover:scale-110 active:scale-95"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>
                )}
              </div>

              {/* Bottom Caption Banner */}
              <div className="w-full text-center pt-3 mt-1 border-t border-[#dea645]/30">
                <p className="rgw-text-gold-grad font-great-vibes text-2xl sm:text-3xl lg:text-4xl leading-tight">
                  {gallery[enlargedIndex].caption || 'Moments to treasure'}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
