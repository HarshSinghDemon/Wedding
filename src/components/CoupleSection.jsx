import React from 'react';
import { motion } from 'framer-motion';
import { ArchitecturalFrame } from './JharokhaFrame';

export default function CoupleSection({ groom, bride }) {
  return (
    <section className="relative w-full py-16 px-4 md:py-24 overflow-hidden">
      <div className="relative z-10 mx-auto max-w-5xl">
        {/* Section Header matching Screenshot 405 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-14 text-center md:mb-20"
        >
          <p className="font-great-vibes text-4xl text-[#8d5a17] drop-shadow-sm md:text-5xl">
            With the blessings of our elders
          </p>
          <h2 className="mt-2 font-cinzel-decorative text-4xl font-bold tracking-wide text-[#9e141e] drop-shadow-sm md:text-5xl">
            THE ROYAL COUPLE
          </h2>
          <div className="mt-6 flex items-center justify-center gap-3 text-[#dea645]" aria-hidden="true">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-current" />
            <span className="text-xl">❖</span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-current" />
          </div>
        </motion.div>

        {/* 2 Architectural Mughal Frames for Groom and Bride */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-start">
          {/* THE GROOM */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center text-center"
          >
            <motion.div
              className="mx-auto w-full max-w-xs lg:max-w-md"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              whileHover={{ scale: 1.03 }}
            >
              <ArchitecturalFrame variant={0}>
                <div className="h-full w-full overflow-hidden flex items-center justify-center">
                  <motion.img
                    src={groom.portrait}
                    alt={groom.firstName}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover select-none pointer-events-none"
                    style={{
                      objectPosition: groom.portraitFocus || 'center 20%',
                      transformOrigin: groom.portraitFocus || 'center 20%',
                      transform: `scale(${groom.portraitZoom || 1})`,
                    }}
                    animate={{ scale: [groom.portraitZoom || 1, (groom.portraitZoom || 1) * 1.04, groom.portraitZoom || 1] }}
                    transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
                  />
                </div>
              </ArchitecturalFrame>
            </motion.div>

            {/* Groom Typography */}
            <div className="mt-8 space-y-1.5 rgw-text-halo">
              <p className="font-great-vibes text-4xl text-[#8d5a17] md:text-5xl">
                The Groom
              </p>
              <h3 className="font-cinzel-decorative text-3xl font-bold tracking-wide text-[#9e141e] drop-shadow-sm md:text-4xl">
                {groom.firstName} {groom.lastName}
              </h3>
              <p className="font-cormorant text-xl italic text-[#5c3d2e] md:text-2xl">
                Son of {groom.fatherName} &amp; {groom.motherName}
              </p>
            </div>
          </motion.div>

          {/* Interlocking Royal Wedding Symbol on Mobile Devices */}
          <div className="flex md:hidden items-center justify-center gap-3 my-2 text-[#dea645] w-full" aria-hidden="true">
            <span className="h-px w-16 bg-gradient-to-r from-transparent to-[#dea645]" />
            <span className="font-great-vibes text-4xl text-[#9e141e] px-2 drop-shadow-sm">&amp;</span>
            <span className="h-px w-16 bg-gradient-to-l from-transparent to-[#dea645]" />
          </div>

          {/* THE BRIDE */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center text-center"
          >
            <motion.div
              className="mx-auto w-full max-w-xs lg:max-w-md"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
              whileHover={{ scale: 1.03 }}
            >
              <ArchitecturalFrame variant={2}>
                <div className="h-full w-full overflow-hidden flex items-center justify-center">
                  <motion.img
                    src={bride.portrait}
                    alt={bride.firstName}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover select-none pointer-events-none"
                    style={{
                      objectPosition: bride.portraitFocus || 'center 20%',
                      transformOrigin: bride.portraitFocus || 'center 20%',
                      transform: `scale(${bride.portraitZoom || 1})`,
                    }}
                    animate={{ scale: [bride.portraitZoom || 1, (bride.portraitZoom || 1) * 1.04, bride.portraitZoom || 1] }}
                    transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
                  />
                </div>
              </ArchitecturalFrame>
            </motion.div>

            {/* Bride Typography */}
            <div className="mt-8 space-y-1.5 rgw-text-halo">
              <p className="font-great-vibes text-4xl text-[#8d5a17] md:text-5xl">
                The Bride
              </p>
              <h3 className="font-cinzel-decorative text-3xl font-bold tracking-wide text-[#9e141e] drop-shadow-sm md:text-4xl">
                {bride.firstName} {bride.lastName}
              </h3>
              <p className="font-cormorant text-xl italic text-[#5c3d2e] md:text-2xl">
                Daughter of {bride.fatherName} &amp; {bride.motherName}
              </p>
            </div>
          </motion.div>
        </div>

        {/* Traditional Couple Quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-14 text-center"
        >
          <div className="inline-block relative px-8 py-3.5 rounded-full border border-[#dea645]/50 bg-[#fff9eb]/70 backdrop-blur-sm shadow-md">
            <p className="font-cormorant text-xl sm:text-2xl italic font-semibold text-[#7a0c15]">
              &ldquo;Two souls, one royal journey of love, honor, and celebration.&rdquo;
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
