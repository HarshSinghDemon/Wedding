import React from 'react';
import { motion } from 'framer-motion';
import { ArchitecturalFrame } from './JharokhaFrame';

export default function StorySection({ story = [] }) {
  return (
    <section className="relative w-full py-16 px-4 md:py-24 overflow-hidden">
      <div className="relative z-10 mx-auto max-w-4xl text-center">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-14 md:mb-20"
        >
          <p className="font-great-vibes text-4xl text-[#8d5a17] drop-shadow-sm md:text-5xl">
            Once upon a time
          </p>
          <h2 className="mt-2 font-cinzel-decorative text-4xl font-bold tracking-wide text-[#9e141e] drop-shadow-sm md:text-5xl">
            OUR LOVE STORY
          </h2>
          <div className="mt-6 flex items-center justify-center gap-3 text-[#dea645]" aria-hidden="true">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-current" />
            <span className="text-xl">❖</span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-current" />
          </div>
        </motion.div>

        {/* Milestone Timeline Entries matching Screenshot 407 */}
        <div className="space-y-16 md:space-y-24">
          {story.map((item, idx) => {
            const isReversed = idx % 2 === 1;
            const variantIndex = idx === 0 ? 1 : idx === 1 ? 2 : 3;

            return (
              <React.Fragment key={item.id || `${item.title || 'milestone'}-${item.date || item.year}-${idx}`}>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.9, delay: 0.1 }}
                  className={`flex flex-col md:flex-row items-center justify-center gap-6 sm:gap-8 md:gap-14 ${
                    isReversed ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Architectural Jharokha Card */}
                  <motion.div
                    className="w-44 sm:w-56 shrink-0"
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 * idx }}
                    whileHover={{ scale: 1.04 }}
                  >
                    <ArchitecturalFrame variant={variantIndex}>
                      <div className="flex h-full w-full flex-col items-center justify-center bg-[radial-gradient(circle_at_50%_40%,#fffaf0,#faeedd_60%,#f1d8b8_100%)] select-none">
                        <span className="font-great-vibes text-5xl text-[#9e141e] italic drop-shadow-sm sm:text-6xl">
                          {item.year}
                        </span>
                      </div>
                    </ArchitecturalFrame>
                  </motion.div>

                  {/* Milestone Text Details */}
                  <div
                    className={`text-center md:text-left max-w-md px-2 ${
                      isReversed ? 'md:text-right' : ''
                    }`}
                  >
                    <p className="font-great-vibes text-3xl sm:text-4xl text-[#b16f23] drop-shadow-sm">
                      {item.date}
                    </p>
                    <h3 className="mt-1.5 font-cinzel-decorative text-2xl sm:text-3xl font-bold tracking-wide text-[#9e141e]">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm text-gray-700 font-cormorant leading-relaxed italic">
                      {item.description || "A beautiful moment in our journey together, marked by love and cherished memories."}
                    </p>
                    <span
                      aria-hidden="true"
                      className={`mx-auto mt-2.5 block h-px w-20 bg-gradient-to-r from-[#dea645] to-transparent ${
                        isReversed ? 'md:ml-auto md:mr-0 md:bg-gradient-to-l' : 'md:mx-0'
                      }`}
                    />
                  </div>
                </motion.div>

                {/* Vertical connecting royal divider between milestones */}
                {idx < story.length - 1 && (
                  <div className="flex flex-col items-center justify-center my-4 md:my-6" aria-hidden="true">
                    <div className="h-6 md:h-10 w-px bg-gradient-to-b from-[#dea645] to-transparent" />
                    <span className="text-sm text-[#dea645] my-1">❖</span>
                    <div className="h-6 md:h-10 w-px bg-gradient-to-t from-[#dea645] to-transparent" />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </section>
  );
}
