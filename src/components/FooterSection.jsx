import React, { useCallback, useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check } from 'lucide-react';

export default function FooterSection({
  coupleNames = "Kartikey & Rupshree",
  dateLabel = "Saturday, 12 December 2026",
  hashtag = "#KartikeyWedsRupshree"
}) {
  const [copied, setCopied] = useState(false);
  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(hashtag);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = hashtag;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  }, [hashtag]);

  return (
    <footer className="relative w-full overflow-hidden pt-16">
      {/* Footer Closing Invitation Text matching Screenshot 411 */}
      <div className="relative z-10 mx-auto max-w-4xl text-center px-4 mb-14">
        {/* Rotating Jewel Rosette */}
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
            loading="lazy"
            decoding="async"
            className="h-full w-full object-contain"
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="font-great-vibes text-4xl sm:text-5xl lg:text-6xl text-[#b16f23] drop-shadow-sm"
        >
          We await your gracious presence
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mt-2 font-cormorant text-xl sm:text-2xl md:text-3xl italic text-[#7a0c15]"
        >
          Kartikey &amp; Rupshree cordially invite you to celebrate the sacred union of their wedding
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mt-3 font-cinzel-decorative text-4xl sm:text-6xl md:text-7xl font-bold tracking-wider text-[#9e141e] drop-shadow-md"
        >
          {coupleNames.toUpperCase()}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4 }}
          className="mt-4 font-cinzel text-sm sm:text-base md:text-lg tracking-[0.25em] text-[#8a5a12] font-semibold uppercase"
        >
          {dateLabel}
        </motion.p>

        {hashtag && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-3 flex items-center justify-center gap-2"
          >
            <p className="font-great-vibes text-3xl sm:text-4xl text-[#9e141e] drop-shadow-sm">
              {hashtag}
            </p>
            <button
              type="button"
              onClick={handleCopy}
              aria-label={copied ? 'Hashtag copied' : `Copy ${hashtag}`}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-[#dea645]/70 bg-[#fff9eb] text-[#9e141e] hover:scale-105 active:scale-95 transition-transform"
            >
              {copied ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-3.5 w-3.5" />}
            </button>
            {copied && (
              <span className="rounded-full bg-green-100/90 px-2 py-0.5 font-cinzel text-xs font-semibold text-green-800">
                Copied!
              </span>
            )}
          </motion.div>
        )}
      </div>

      {/* The Majestic Desert Folk Illustration */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full"
      >
        <img
          src="/templates/royal-gateway/desert-folk.webp"
          srcSet="/templates/royal-gateway/desert-folk-800.webp 800w, /templates/royal-gateway/desert-folk-1536.webp 1536w, /templates/royal-gateway/desert-folk.webp 2400w"
          alt="Traditional Rajasthani Desert Wedding"
          loading="lazy"
          decoding="async"
          className="w-full h-auto object-cover object-bottom select-none pointer-events-none drop-shadow-[0_-10px_25px_rgba(158,20,30,0.15)]"
        />
      </motion.div>

      {/* Subtle Bottom Credit */}
      <div className="w-full bg-[#fbeedd] py-4 text-center border-t border-[#dea645]/30 text-[#39150f] text-xs font-inter flex flex-wrap items-center justify-center gap-2 select-none px-4">
        <span className="font-medium tracking-wide">Website designed by Harsh Singh</span>
        <span className="text-[#dea645]">•</span>
        <span className="text-[#8a5a12]">Celebrating {coupleNames}</span>
      </div>
    </footer>
  );
}
