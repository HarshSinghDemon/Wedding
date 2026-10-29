import React from 'react';
import { motion } from 'framer-motion';
import { ArchitecturalFrame } from './JharokhaFrame';

export default function FamilySection({ family }) {
  const groomFamily = family?.groom || [];
  const brideFamily = family?.bride || [];

  return (
    <section className="relative w-full py-16 px-4 md:py-24 overflow-hidden">
      <div className="relative z-10 mx-auto max-w-5xl text-center">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-14 md:mb-20"
        >
          <p className="font-great-vibes text-4xl text-[#8d5a17] drop-shadow-sm md:text-5xl">
            With love and blessings
          </p>
          <h2 className="mt-2 font-cinzel-decorative text-4xl font-bold tracking-wide text-[#9e141e] drop-shadow-sm md:text-5xl">
            OUR FAMILY
          </h2>
          <div className="mt-6 flex items-center justify-center gap-3 text-[#dea645]" aria-hidden="true">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-current" />
            <span className="text-xl">❖</span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-current" />
          </div>
        </motion.div>

        {/* Groom's Family */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-4 mb-10"
          >
            <span className="h-px w-12 bg-gradient-to-r from-transparent to-[#dea645]" />
            <h3 className="font-great-vibes text-4xl text-[#8d5a17] md:text-5xl">
              The Groom's Family
            </h3>
            <span className="h-px w-12 bg-gradient-to-l from-transparent to-[#dea645]" />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {groomFamily.map((member, idx) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: idx * 0.12 }}
                className="flex flex-col items-center text-center"
              >
                {/* Traditional Royal Jharokha Avatar Card matching Invitima Template */}
                <motion.div
                  className="w-48 sm:w-56"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.8 * idx }}
                  whileHover={{ scale: 1.05 }}
                >
                  {member.avatar ? (
                    <div className="relative aspect-[298/388] w-full overflow-hidden rounded-[4px] shadow-[0_12px_24px_rgba(60,20,0,0.35)]">
                      <img
                        src={member.avatar}
                        alt={member.name}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-contain select-none pointer-events-none"
                      />
                    </div>
                  ) : (
                    <ArchitecturalFrame variant={idx + 3}>
                      <div className="flex h-full w-full flex-col items-center justify-center bg-[radial-gradient(circle_at_50%_40%,#fffaf0,#faeedd_60%,#f1d8b8_100%)] p-2">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#9e141e]/15 border border-[#dea645]/40 text-2xl font-cinzel-decorative font-bold text-[#9e141e]">
                          {member.name.charAt(0)}
                        </div>
                      </div>
                    </ArchitecturalFrame>
                  )}
                </motion.div>

                {/* Swallowtail Burgundy Ribbon Banner */}
                <div className="relative -mt-3.5 z-10">
                  <span className="inline-block bg-[#871120] text-[#fff1b8] px-4 py-1 font-cinzel text-[0.68rem] font-bold tracking-[0.2em] shadow-md border-y border-[#dea645] [clip-path:polygon(0_0,100%_0,95%_50%,100%_100%,0_100%,5%_50%)]">
                    {(member.role || member.relation).toUpperCase()}
                  </span>
                </div>

                {/* Member Name */}
                <h4 className="mt-4 font-cinzel-decorative text-xl sm:text-2xl font-bold tracking-wide text-[#8a5a12] drop-shadow-sm">
                  {member.name}
                </h4>
                <p className="font-cormorant text-base italic text-[#5c3d2e] mt-0.5">
                  {member.relation}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Ornate Gold Royal Divider between Families */}
        <div className="my-10 md:my-16 flex items-center justify-center gap-3 text-[#dea645]" aria-hidden="true">
          <div className="h-px w-16 md:w-28 bg-gradient-to-r from-transparent to-[#dea645]" />
          <span className="text-xl">❖</span>
          <div className="h-px w-16 md:w-28 bg-gradient-to-l from-transparent to-[#dea645]" />
        </div>

        {/* Bride's Family */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-4 mb-10"
          >
            <span className="h-px w-12 bg-gradient-to-r from-transparent to-[#dea645]" />
            <h3 className="font-great-vibes text-4xl text-[#8d5a17] md:text-5xl">
              The Bride's Family
            </h3>
            <span className="h-px w-12 bg-gradient-to-l from-transparent to-[#dea645]" />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {brideFamily.map((member, idx) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: idx * 0.12 }}
                className="flex flex-col items-center text-center"
              >
                {/* Traditional Royal Jharokha Avatar Card matching Invitima Template */}
                <motion.div
                  className="w-48 sm:w-56"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.8 * idx + 0.4 }}
                  whileHover={{ scale: 1.05 }}
                >
                  {member.avatar ? (
                    <div className="relative aspect-[298/388] w-full overflow-hidden rounded-[4px] shadow-[0_12px_24px_rgba(60,20,0,0.35)]">
                      <img
                        src={member.avatar}
                        alt={member.name}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-contain select-none pointer-events-none"
                      />
                    </div>
                  ) : (
                    <ArchitecturalFrame variant={idx + 1}>
                      <div className="flex h-full w-full flex-col items-center justify-center bg-[radial-gradient(circle_at_50%_40%,#fffaf0,#faeedd_60%,#f1d8b8_100%)] p-2">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#2f6fd6]/15 border border-[#dea645]/40 text-2xl font-cinzel-decorative font-bold text-[#2f6fd6]">
                          {member.name.charAt(0)}
                        </div>
                      </div>
                    </ArchitecturalFrame>
                  )}
                </motion.div>

                {/* Swallowtail Burgundy Ribbon Banner */}
                <div className="relative -mt-3.5 z-10">
                  <span className="inline-block bg-[#871120] text-[#fff1b8] px-4 py-1 font-cinzel text-[0.68rem] font-bold tracking-[0.2em] shadow-md border-y border-[#dea645] [clip-path:polygon(0_0,100%_0,95%_50%,100%_100%,0_100%,5%_50%)]">
                    {(member.role || member.relation).toUpperCase()}
                  </span>
                </div>

                {/* Member Name */}
                <h4 className="mt-4 font-cinzel-decorative text-xl sm:text-2xl font-bold tracking-wide text-[#8a5a12] drop-shadow-sm">
                  {member.name}
                </h4>
                <p className="font-cormorant text-base italic text-[#5c3d2e] mt-0.5">
                  {member.relation}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
