import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Sparkles, Navigation, Compass, Camera, Map } from 'lucide-react';

function VenueCard({ venue, idx }) {
  const [activeView, setActiveView] = useState('map');

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.9, delay: idx * 0.15 }}
      className="relative overflow-hidden rounded-[2rem] p-[3px] shadow-[0_30px_60px_-20px_rgba(90,10,20,0.6)]"
    >
      {/* Rotating Conic Gold Border Glow */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-[-50%]"
        style={{
          background:
            'conic-gradient(from 0deg, #f6d27a, #8a5a12 20%, #fff1b8 30%, #b98321 50%, #f6d27a 70%, #8a5a12 85%, #f6d27a)',
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      />

      {/* Velvet Burgundy Interior Surface */}
      <div className="relative overflow-hidden rounded-[calc(2rem-3px)] bg-[radial-gradient(ellipse_at_50%_0%,#a3172f_0%,#6d0a1d_50%,#3a0410_100%)]">
        {/* Subtle Palace Watermark & Gold Dot Pattern */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage: 'radial-gradient(circle, #f6d27a 1.2px, transparent 1.6px)',
            backgroundSize: '24px 24px',
          }}
        />

        {/* Four Ornate Gold Corner Jewels */}
        {['left-2 top-2', 'right-2 top-2', 'left-2 bottom-2', 'right-2 bottom-2'].map((pos) => (
          <span
            key={pos}
            aria-hidden="true"
            className={`absolute ${pos} h-4 w-4 rotate-45 border border-[#f6d27a] bg-[radial-gradient(circle_at_35%_30%,#ff8fa3,#b3122e)] md:h-5 md:w-5 shadow-sm`}
          />
        ))}

        {/* Panel Content (2 Columns on Desktop) */}
        <div className="relative grid items-center gap-8 sm:gap-10 px-4 py-8 sm:px-8 md:gap-12 md:px-12 md:py-16 lg:grid-cols-[1fr_1.1fr] lg:px-16 lg:py-18">
          {/* Left: Venue Information */}
          <div className="space-y-6 text-center md:text-left">
            <p className="font-great-vibes text-4xl text-[#f6d27a] lg:text-5xl">
              {venue.kicker || 'Join us at'}
            </p>

            <h3 className="rgw-text-gold-grad font-cinzel-decorative text-4xl font-bold leading-tight drop-shadow-[0_3px_4px_rgba(40,0,0,0.6)] md:text-5xl">
              {venue.name}
            </h3>

            <div className="flex items-center justify-center gap-2 text-[#dea645] md:justify-start" aria-hidden="true">
              <span className="h-px w-10 bg-gradient-to-r from-transparent to-[#dea645]" />
              <span className="text-sm">❖</span>
              <span className="h-px w-10 bg-gradient-to-l from-transparent to-[#dea645]" />
            </div>

            <ul className="space-y-4 text-left">
              {/* Celebrations Row */}
              {venue.celebrations && (
                <li className="flex items-center gap-4 rounded-2xl border border-[#f6d27a]/25 bg-white/5 p-3.5 backdrop-blur-sm">
                  <span className="flex h-13 w-13 shrink-0 items-center justify-center rounded-full bg-[conic-gradient(#f6d27a,#8a5a12,#fff1b8,#b98321,#f6d27a)] p-[2.5px] shadow-md">
                    <span className="flex h-full w-full items-center justify-center rounded-full bg-[radial-gradient(circle_at_35%_30%,#c21a3c,#5c0816)] text-[#f6d27a]">
                      <Sparkles className="h-5 w-5" aria-hidden="true" />
                    </span>
                  </span>
                  <div>
                    <span className="block font-cinzel-decorative text-xs uppercase tracking-[0.25em] text-[#f6d27a]">
                      CELEBRATIONS
                    </span>
                    <span className="block font-cormorant text-xl leading-snug text-[#fff3dc] font-medium lg:text-2xl">
                      {venue.celebrations}
                    </span>
                  </div>
                </li>
              )}

              {/* Address Row */}
              {venue.address && (
                <li className="flex items-center gap-4 rounded-2xl border border-[#f6d27a]/25 bg-white/5 p-3.5 backdrop-blur-sm">
                  <span className="flex h-13 w-13 shrink-0 items-center justify-center rounded-full bg-[conic-gradient(#f6d27a,#8a5a12,#fff1b8,#b98321,#f6d27a)] p-[2.5px] shadow-md">
                    <span className="flex h-full w-full items-center justify-center rounded-full bg-[radial-gradient(circle_at_35%_30%,#c21a3c,#5c0816)] text-[#f6d27a]">
                      <MapPin className="h-5 w-5" aria-hidden="true" />
                    </span>
                  </span>
                  <div>
                    <span className="block font-cinzel-decorative text-xs uppercase tracking-[0.25em] text-[#f6d27a]">
                      ADDRESS
                    </span>
                    <span className="block font-cormorant text-lg leading-snug text-[#fff3dc]/90 lg:text-xl">
                      {venue.address}
                    </span>
                  </div>
                </li>
              )}
            </ul>

            {/* Gold Pill Get Directions Button */}
            <div className="pt-2 text-center md:text-left">
              <motion.a
                href={venue.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="relative inline-flex items-center gap-2.5 overflow-hidden rounded-full bg-[linear-gradient(135deg,#fff1b8,#e3b44c_35%,#b98321_70%,#f2cf6e)] px-8 py-3.5 font-cinzel-decorative text-sm font-bold tracking-[0.2em] text-[#5c0816] shadow-[0_10px_24px_-6px_rgba(0,0,0,0.5)] ring-2 ring-[#fff1b8]/60 transition-transform"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
              >
                <Navigation className="h-4 w-4" aria-hidden="true" />
                <span>GET DIRECTIONS &gt;</span>
              </motion.a>
            </div>
          </div>

          {/* Right: Architectural Map & Photo Window */}
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[1.75rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.6),0_0_0_1px_rgba(246,210,122,0.35),0_0_50px_rgba(246,210,122,0.18)]">
            {/* View Switcher: Map vs Photo */}
            {venue.image && (
              <div className="absolute left-3.5 top-3.5 z-20 flex rounded-full border border-[#f6d27a]/60 bg-[rgba(40,4,12,0.85)] p-0.5 backdrop-blur-md shadow-lg">
                <button
                  type="button"
                  onClick={() => setActiveView('map')}
                  className={`flex items-center gap-1 rounded-full px-3 py-1 font-cinzel text-[10px] font-bold tracking-wider transition-all ${
                    activeView === 'map'
                      ? 'bg-[#dea645] text-[#420a10] shadow-sm'
                      : 'text-[#fbedd1] hover:text-white'
                  }`}
                >
                  <Map className="h-3 w-3" />
                  <span>MAP</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveView('photo')}
                  className={`flex items-center gap-1 rounded-full px-3 py-1 font-cinzel text-[10px] font-bold tracking-wider transition-all ${
                    activeView === 'photo'
                      ? 'bg-[#dea645] text-[#420a10] shadow-sm'
                      : 'text-[#fbedd1] hover:text-white'
                  }`}
                >
                  <Camera className="h-3 w-3" />
                  <span>PHOTO</span>
                </button>
              </div>
            )}

            {activeView === 'photo' && venue.image ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0 h-full w-full"
              >
                <img
                  src={venue.image}
                  alt={venue.name}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover"
                />
              </motion.div>
            ) : (
              <iframe
                title={`Map of ${venue.name}`}
                className="absolute inset-0 h-full w-full border-0"
                style={{ filter: 'sepia(0.28) saturate(1.2) hue-rotate(-10deg) contrast(1.03)' }}
                loading="lazy"
                src={`https://maps.google.com/maps?q=${encodeURIComponent(venue.mapQuery || venue.address)}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
              />
            )}

            {/* Map Vignette Overlay */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 shadow-[inset_0_0_60px_12px_rgba(60,4,16,0.55)]"
            />

            {/* Radar Pulse Effect in Center (only on map view) */}
            {activeView === 'map' && (
              <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2">
                {[0, 1, 2].map((i) => (
                  <motion.span
                    key={i}
                    className="absolute -left-10 -top-10 h-20 w-20 rounded-full border-2 border-[#f6d27a] bg-[radial-gradient(circle,rgba(246,210,122,0.25),transparent_70%)]"
                    initial={{ scale: 0.2, opacity: 0 }}
                    animate={{ scale: [0.2, 3.2], opacity: [0.9, 0] }}
                    transition={{ duration: 3, repeat: Infinity, delay: 1.8 + i, ease: 'easeOut' }}
                  />
                ))}
              </div>
            )}

            {/* Compass Rose Emblem in Corner */}
            <motion.div
              className="absolute right-3.5 top-3.5 h-12 w-12 drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)] md:right-4 md:top-4 md:h-16 md:w-16 pointer-events-none text-[#dea645]"
              animate={{ rotate: [0, 18, -12, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Compass className="h-full w-full" />
            </motion.div>

            {/* Floating Venue Badge at Window Bottom */}
            <div
              className="absolute bottom-5 left-1/2 flex max-w-[calc(100%-2rem)] items-center gap-2.5 whitespace-nowrap rounded-full border border-[#f6d27a]/60 bg-[rgba(40,4,12,0.8)] py-2 pl-3 pr-5 shadow-[0_10px_24px_rgba(0,0,0,0.5)] backdrop-blur-md -translate-x-1/2"
            >
              <MapPin className="h-4 w-4 text-[#f6d27a] shrink-0" />
              <span className="font-cinzel text-xs font-semibold tracking-wider text-[#fff3dc] truncate">
                {venue.name.toUpperCase()} • {venue.address.split(',')[0]}
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function VenuesSection({ venues = [] }) {
  return (
    <section className="relative w-full py-16 px-4 md:py-24 overflow-hidden">
      <div className="relative z-10 mx-auto max-w-5xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-14 md:mb-20"
        >
          <p className="font-great-vibes text-4xl text-[#8d5a17] drop-shadow-sm md:text-5xl">
            Where hearts unite
          </p>
          <h2 className="mt-2 font-cinzel-decorative text-4xl font-bold tracking-wide text-[#9e141e] drop-shadow-sm md:text-5xl">
            {venues.length === 1 ? 'THE WEDDING VENUE' : 'THE VENUES'}
          </h2>
          <div className="mt-6 flex items-center justify-center gap-3 text-[#dea645]" aria-hidden="true">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-current" />
            <span className="text-xl">❖</span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-current" />
          </div>
        </motion.div>

        {/* Rich Velvet Burgundy & Gold Venue Panels */}
        <div className="space-y-16">
          {venues.map((venue, idx) => (
            <VenueCard key={venue.name} venue={venue} idx={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
