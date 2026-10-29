import React, { useCallback, useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Pointer } from 'lucide-react';
import confetti from 'canvas-confetti';

const gateConfig = {
  image: "/templates/royal-gateway/gate/peacock.webp",
  aspect: 1672 / 941, // 1.776833
  centre: "50.12% 69.18%",
  opening: "/templates/royal-gateway/gate/peacock-opening.png",
  left: {
    image: "/templates/royal-gateway/gate/peacock-left.webp",
    box: {
      left: "42.105%",
      width: "8.014%",
      top: "46.759%",
      height: "44.846%",
    },
  },
  right: {
    image: "/templates/royal-gateway/gate/peacock-right.webp",
    box: {
      left: "50.12%",
      width: "8.014%",
      top: "46.759%",
      height: "44.846%",
    },
  },
};

const timing = {
  swingAt: 0.9,
  swing: 2.6,
  pushAt: 1.5,
  push: 3,
  floodAt: 3.3,
  done: 4.6,
};

export default function OpeningGate({ coupleNames = "Kartikey & Rupshree", onOpen, onStartAudio }) {
  const [isOpen, setIsOpen] = useState(false);
  const reduceMotion = useReducedMotion();
  const [centreX, centreY] = gateConfig.centre.split(" ");

  const handleOpen = useCallback(() => {
    if (isOpen) return;
    setIsOpen(true);
    if (onStartAudio) {
      onStartAudio();
    }

    const doneMs = reduceMotion ? 700 : timing.done * 1000;

    if (!reduceMotion) {
      setTimeout(() => {
        confetti({
          particleCount: 50,
          spread: 80,
          origin: { y: 0.65 },
          colors: ['#dea645', '#9e141e', '#ffe4b3', '#fff9eb']
        });
      }, 1800);
    }

    setTimeout(() => {
      if (onOpen) onOpen();
    }, doneMs);
  }, [isOpen, onOpen, reduceMotion]);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  const renderDoor = (side) => {
    const isLeft = side === 'left';
    return (
      <motion.img
        src={gateConfig[side].image}
        alt=""
        className="absolute max-w-none pointer-events-none select-none"
        style={{
          ...gateConfig[side].box,
          transformOrigin: isLeft ? "left center" : "right center",
        }}
        initial={{ rotateY: 0, filter: "brightness(1)" }}
        animate={
          isOpen
            ? {
                rotateY: isLeft ? 86 : -86,
                filter: "brightness(0.45)",
              }
            : {
                rotateY: 0,
                filter: "brightness(1)",
              }
        }
        transition={{
          duration: timing.swing,
          delay: timing.swingAt,
          ease: [0.65, 0, 0.35, 1],
        }}
      />
    );
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 overflow-hidden bg-[#080e2c] [container-type:size]"
      exit={{ opacity: 0 }}
      transition={{ duration: 1.1 }}
    >
      {/* 3D Perspective Container */}
      <motion.div
        className="absolute left-1/2 top-1/2"
        style={{
          width: `max(100cqw, calc(100cqh * ${gateConfig.aspect}))`,
          aspectRatio: gateConfig.aspect,
          x: "-50%",
          y: "-50%",
          transformOrigin: gateConfig.centre,
          perspective: 1400,
          perspectiveOrigin: gateConfig.centre,
        }}
        initial={{ scale: 1.12, opacity: 0 }}
        animate={
          isOpen
            ? {
                scale: reduceMotion ? 1.2 : [null, 1.1, 7],
                opacity: 1,
              }
            : reduceMotion
            ? { scale: 1, opacity: 1 }
            : {
                scale: [1.12, 1, 1.05, 1],
                opacity: 1,
              }
        }
        transition={
          isOpen
            ? {
                scale: {
                  duration: reduceMotion ? 0.6 : timing.pushAt + timing.push,
                  times: reduceMotion ? undefined : [0, timing.pushAt / (timing.pushAt + timing.push), 1],
                  ease: reduceMotion ? "easeOut" : ["easeOut", [0.7, 0, 0.3, 1]],
                },
              }
            : {
                opacity: { duration: 1.4 },
                scale: {
                  duration: 14,
                  times: [0, 0.2, 0.6, 1],
                  repeat: Infinity,
                  repeatType: "mirror",
                  ease: "easeInOut",
                },
              }
        }
      >
        {/* Full Palace Gate Frame */}
        <img
          src={gateConfig.image}
          alt="Palace gate"
          className="absolute inset-0 h-full w-full pointer-events-none select-none object-contain"
        />

        {/* Arch Opening Background (revealed behind doors) */}
        <div
          className="absolute pointer-events-none"
          style={{
            left: gateConfig.left.box.left,
            top: gateConfig.left.box.top,
            height: gateConfig.left.box.height,
            width: `calc(${gateConfig.left.box.width} + ${gateConfig.right.box.width})`,
            maskImage: `url(${gateConfig.opening})`,
            WebkitMaskImage: `url(${gateConfig.opening})`,
            maskSize: "100% 100%",
            WebkitMaskSize: "100% 100%",
            background: "radial-gradient(ellipse at 50% 60%, #ffe4b3 55%, #dea645 115%)",
          }}
        />

        {/* 3D Gate Doors */}
        {renderDoor("left")}
        {renderDoor("right")}

        {/* Pulsing Light Seam between the doors when opening */}
        <motion.div
          aria-hidden="true"
          className="absolute w-[0.6%] rounded-full bg-white blur-[2px] pointer-events-none"
          style={{
            left: gateConfig.right.box.left,
            top: gateConfig.left.box.top,
            height: gateConfig.left.box.height,
            x: "-50%",
          }}
          initial={{ opacity: 0, scaleY: 0 }}
          animate={
            isOpen
              ? {
                  opacity: [0, 1, 1, 0],
                  scaleY: [0, 1, 1, 1],
                }
              : { opacity: 0, scaleY: 0 }
          }
          transition={{
            duration: timing.swingAt + 0.9,
            times: [0, 0.45, 0.8, 1],
            ease: "easeOut",
          }}
        />

        {/* "TAP TO OPEN" Button & Finger Pointer */}
        <AnimatePresence>
          {!isOpen && (
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute flex flex-col items-center gap-2"
              style={{
                left: centreX,
                top: centreY,
                x: "-50%",
                y: "-50%",
              }}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{
                opacity: 0,
                scale: 1.6,
                transition: { duration: 0.5 },
              }}
              transition={{ duration: 0.8, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="relative flex h-14 w-14 items-center justify-center">
                {/* Expanding pulse rings */}
                {[0, 0.9].map((delay, idx) => (
                  <motion.span
                    key={idx}
                    className="absolute inset-0 rounded-full border-2 border-[#dea645]"
                    animate={{
                      scale: [1, 2.2],
                      opacity: [0.9, 0],
                    }}
                    transition={{
                      duration: 1.8,
                      repeat: Infinity,
                      delay,
                      ease: "easeOut",
                    }}
                  />
                ))}
                {/* Center Golden Button */}
                <motion.span
                  className="rgw-bg-gold-grad rgw-shadow-royal flex h-12 w-12 items-center justify-center rounded-full text-[#39150f] shadow-lg shadow-amber-500/30"
                  animate={{ scale: [1, 0.92, 1] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Pointer className="h-6 w-6 transform rotate-[-20deg]" />
                </motion.span>
              </div>

              {/* Tag text */}
              <span className="rounded-full bg-[#080e2c]/80 px-4 py-1.5 font-cinzel-decorative text-[0.65rem] font-bold tracking-[0.3em] text-[#fbedd1] backdrop-blur-sm border border-[#dea645]/40 shadow-lg">
                TAP TO OPEN
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Floating Golden Sparks */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        {Array.from({ length: 18 }).map((_, idx) => (
          <motion.span
            key={idx}
            className="absolute bottom-0 h-1.5 w-1.5 rounded-full bg-[#dea645] blur-[1px]"
            style={{
              left: `${(53 * idx + 7) % 100}%`,
            }}
            initial={{ y: 0, opacity: 0 }}
            animate={{
              y: "-95vh",
              opacity: [0, 0.9, 0],
              x: [0, 16, -12, 0],
            }}
            transition={{
              duration: 7 + (idx % 5) * 1.6,
              repeat: Infinity,
              delay: 0.45 * idx,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Subtle Vignette */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at center, transparent 45%, rgba(8, 14, 44, 0.85) 90%)",
        }}
      />

      {/* Warm Golden Flood Flash on breakthrough */}
      <motion.div
        className="pointer-events-none absolute inset-0 bg-[#ffe4b3]"
        initial={{ opacity: 0 }}
        animate={{ opacity: isOpen ? 1 : 0 }}
        transition={{
          duration: 1.2,
          delay: isOpen ? timing.floodAt : 0,
          ease: "easeIn",
        }}
      />

      {/* Full screen click target */}
      {!isOpen && (
        <button
          type="button"
          onClick={handleOpen}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleOpen();
            }
          }}
          aria-label="Open the palace gates"
          className="absolute inset-0 z-30 h-full w-full cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#dea645]"
        />
      )}

      {/* Bottom Title Card on Opening Screen */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-col items-center gap-2 bg-gradient-to-t from-[#080e2c] via-[#080e2c]/70 to-transparent px-6 pb-12 pt-28 text-center text-[#fbedd1] z-20"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{
              opacity: 0,
              y: 40,
              transition: { duration: 0.6 },
            }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            <p className="font-cinzel-decorative text-xs font-semibold tracking-[0.45em] text-[#dea645]">
              THE WEDDING OF
            </p>
            <p className="font-great-vibes text-4xl sm:text-5xl md:text-6xl text-[#fbedd1] drop-shadow-[0_4px_16px_rgba(222,166,69,0.35)] px-2">
              {coupleNames}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
