import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, User, Check, Send } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function RsvpSection({ coupleNames = "Kartikey & Rupshree" }) {
  const [name, setName] = useState('');
  const [attendance, setAttendance] = useState('accept');
  const [guestCount, setGuestCount] = useState(2);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    setSubmitted(true);
    if (attendance === 'accept') {
      confetti({
        particleCount: 80,
        spread: 85,
        origin: { y: 0.6 },
        colors: ['#dea645', '#9e141e', '#fff9eb'],
      });
    }
  };

  return (
    <section className="relative w-full py-16 px-4 md:py-24 overflow-hidden">
      <div className="relative z-10 mx-auto max-w-2xl text-center">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-14"
        >
          <p className="font-great-vibes text-4xl md:text-5xl text-[#8d5a17] drop-shadow-sm">
            Kindly respond
          </p>
          <h2 className="mt-2 font-cinzel-decorative text-4xl md:text-5xl font-bold tracking-wide text-[#9e141e] drop-shadow-sm">
            RSVP
          </h2>
          <div className="mt-6 flex items-center justify-center gap-3 text-[#dea645]" aria-hidden="true">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-current" />
            <span className="text-xl">❖</span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-current" />
          </div>
        </motion.div>

        {/* RSVP Royal Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative rounded-3xl border-2 border-[#dea645] bg-gradient-to-b from-[#7a0c15] via-[#5c0910] to-[#3a060a] p-6 sm:p-10 shadow-2xl text-[#fbedd1] overflow-hidden"
          style={{
            boxShadow: '0 25px 60px -15px rgba(158, 20, 30, 0.5)',
          }}
        >
          {/* Jewel Corner Accents */}
          <span className="absolute top-3 left-3 h-3 w-3 rotate-45 bg-[#dea645]" />
          <span className="absolute top-3 right-3 h-3 w-3 rotate-45 bg-[#dea645]" />
          <span className="absolute bottom-3 left-3 h-3 w-3 rotate-45 bg-[#dea645]" />
          <span className="absolute bottom-3 right-3 h-3 w-3 rotate-45 bg-[#dea645]" />

          {/* Gold Medallion Crest "K&R" */}
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full border-2 border-[#dea645] bg-gradient-to-br from-[#dea645] via-[#f3d489] to-[#8a5a12] p-1 shadow-lg shadow-amber-500/20">
            <div className="flex h-full w-full items-center justify-center rounded-full border border-white/50 bg-[#7a0c15]">
              <span className="font-great-vibes text-3xl font-bold text-[#fbedd1]">
                K&amp;R
              </span>
            </div>
          </div>

          <h3 className="font-great-vibes text-3xl sm:text-4xl text-[#fbedd1] drop-shadow-sm">
            Will you join us?
          </h3>
          <p className="font-cinzel text-xs tracking-[0.3em] text-[#dea645] uppercase mt-1">
            {coupleNames}
          </p>

          <div className="my-6 flex items-center justify-center gap-2 text-[#dea645]">
            <span className="h-[1px] w-12 bg-[#dea645]/50" />
            <span className="rotate-45 h-1.5 w-1.5 bg-[#dea645]" />
            <span className="h-[1px] w-12 bg-[#dea645]/50" />
          </div>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="py-8 px-4 text-center space-y-3"
            >
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#dea645] text-[#39150f]">
                <Check className="h-8 w-8 stroke-[3]" />
              </div>
              <h4 className="font-cinzel-decorative text-2xl font-bold text-[#fff5e0]">
                Thank You, {name}!
              </h4>
              <p className="font-cormorant text-lg text-[#fbedd1]/90">
                {attendance === 'accept'
                  ? `Your RSVP for ${guestCount} guest(s) has been joyfully recorded!`
                  : 'Your response has been received. You will be warmly remembered in our prayers.'}
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="mt-4 font-cinzel text-xs tracking-wider text-[#dea645] underline hover:text-[#fff]"
              >
                Submit another response
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 text-left">
              {/* Full Name */}
              <div>
                <label className="block font-cinzel text-xs font-semibold tracking-wider text-[#dea645] mb-2 uppercase">
                  YOUR NAME
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#dea645]" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Full name"
                    className="w-full rounded-xl border border-[#dea645]/60 bg-[#420a10]/80 py-3.5 pl-12 pr-4 font-cormorant text-lg text-[#fbedd1] placeholder:text-[#fbedd1]/40 focus:border-[#dea645] focus:outline-none focus:ring-1 focus:ring-[#dea645]"
                  />
                </div>
              </div>

              {/* Attendance Choice */}
              <div>
                <label className="block font-cinzel text-xs font-semibold tracking-wider text-[#dea645] mb-2 uppercase">
                  WILL YOU ATTEND?
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setAttendance('accept')}
                    className={`flex items-center justify-center gap-2 rounded-xl py-3 px-4 font-cinzel text-xs sm:text-sm font-bold tracking-wider transition-all ${
                      attendance === 'accept'
                        ? 'bg-gradient-to-r from-[#dea645] to-[#f3d489] text-[#39150f] shadow-lg scale-102 border-2 border-white/60'
                        : 'bg-[#420a10]/70 text-[#fbedd1] border border-[#dea645]/40 hover:bg-[#420a10]'
                    }`}
                  >
                    <Heart className={`h-4 w-4 ${attendance === 'accept' ? 'fill-current text-[#9e141e]' : ''}`} />
                    <span>JOYFULLY ACCEPT</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setAttendance('decline')}
                    className={`flex items-center justify-center gap-2 rounded-xl py-3 px-4 font-cinzel text-xs sm:text-sm font-bold tracking-wider transition-all ${
                      attendance === 'decline'
                        ? 'bg-[#9e141e] text-[#fbedd1] shadow-lg scale-102 border-2 border-[#dea645]'
                        : 'bg-[#420a10]/70 text-[#fbedd1]/70 border border-[#dea645]/40 hover:bg-[#420a10]'
                    }`}
                  >
                    <Heart className="h-4 w-4" />
                    <span>REGRETFULLY DECLINE</span>
                  </button>
                </div>
              </div>

              {/* Number of Guests */}
              {attendance === 'accept' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="space-y-2"
                >
                  <label className="block font-cinzel text-xs font-semibold tracking-wider text-[#dea645] uppercase">
                    NUMBER OF GUESTS
                  </label>
                  <div className="flex items-center gap-4">
                    <button
                      type="button"
                      onClick={() => setGuestCount(Math.max(1, guestCount - 1))}
                      className="h-10 w-10 rounded-lg border border-[#dea645] bg-[#420a10] text-[#dea645] font-bold text-lg flex items-center justify-center hover:bg-[#9e141e]"
                    >
                      -
                    </button>
                    <span className="font-cinzel text-xl font-bold text-[#fbedd1] w-8 text-center">
                      {guestCount}
                    </span>
                    <button
                      type="button"
                      onClick={() => setGuestCount(Math.min(10, guestCount + 1))}
                      className="h-10 w-10 rounded-lg border border-[#dea645] bg-[#420a10] text-[#dea645] font-bold text-lg flex items-center justify-center hover:bg-[#9e141e]"
                    >
                      +
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full rounded-xl bg-gradient-to-r from-[#dea645] via-[#f3d489] to-[#dea645] py-4 font-cinzel text-sm font-bold tracking-[0.25em] text-[#39150f] shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
                >
                  <Send className="h-4 w-4" />
                  <span>CONFIRM RSVP</span>
                </button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
