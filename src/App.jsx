import React, { useEffect, useState, useRef, lazy, Suspense } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import OpeningGate from './components/OpeningGate';
import HeroSection from './components/HeroSection';
import CountdownSection from './components/CountdownSection';
import GlobalBackground from './components/GlobalBackground';
import BackgroundMusic from './components/BackgroundMusic';
import { weddingConfig } from './data/weddingData';
import { DoorOpen } from 'lucide-react';

// Lazy-load below-the-fold sections to keep initial bundle tiny and initial paint instantaneous
const ScratchCard = lazy(() => import('./components/ScratchCard'));
const CoupleSection = lazy(() => import('./components/CoupleSection'));
const StorySection = lazy(() => import('./components/StorySection'));
const FamilySection = lazy(() => import('./components/FamilySection'));
const FestivitiesSection = lazy(() => import('./components/FestivitiesSection'));
const PhotoGallery3D = lazy(() => import('./components/PhotoGallery3D'));
const VenuesSection = lazy(() => import('./components/VenuesSection'));
const WishesWall = lazy(() => import('./components/WishesWall'));
const ContactSection = lazy(() => import('./components/ContactSection'));
const FooterSection = lazy(() => import('./components/FooterSection'));
const PetalsOverlay = lazy(() => import('./components/PetalsOverlay'));

export default function App() {
  const [gateOpened, setGateOpened] = useState(false);
  const [hasStartedAudio, setHasStartedAudio] = useState(false);
  const musicRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    document.body.style.overflow = gateOpened ? '' : 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [gateOpened]);

  return (
    <main className="rgw-root relative isolate min-h-screen overflow-x-clip font-cormorant bg-[#fbf1e4] text-[#39150f] selection:bg-[#dea645] selection:text-[#39150f]">
      {/* Royal Continuous Background with Mandalas and Diamond-Floral Grid */}
      <GlobalBackground />

      {/* Royal Background Music with dedicated environmental Mute button */}
      <BackgroundMusic
        ref={musicRef}
        hasStarted={hasStartedAudio}
      />

      <AnimatePresence>
        {!gateOpened && (
          <OpeningGate
            coupleNames={weddingConfig.coupleNames}
            onOpen={() => setGateOpened(true)}
            onStartAudio={() => setHasStartedAudio(true)}
          />
        )}
      </AnimatePresence>

      <div className={!gateOpened ? 'pointer-events-none h-screen overflow-hidden opacity-0' : 'opacity-100 transition-opacity duration-1000'}>
        <Suspense fallback={null}>
          {gateOpened && <PetalsOverlay />}
        </Suspense>

        <motion.div
          style={{ scaleX }}
          className="rgw-bg-gold-grad fixed inset-x-0 top-0 z-50 h-1 origin-left shadow-sm will-change-transform"
        />

        <button
          type="button"
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'instant' });
            setGateOpened(false);
          }}
          title="Replay Gate Animation"
          className="fixed bottom-4 right-4 z-40 flex items-center gap-1.5 rounded-full border border-[#dea645] bg-[#7a0c15]/90 px-3.5 py-2 font-cinzel text-xs font-semibold text-[#fbedd1] shadow-2xl backdrop-blur-md transition-all hover:scale-105 hover:bg-[#9e141e] active:scale-95"
        >
          <DoorOpen className="h-4 w-4 text-[#dea645]" />
          <span className="hidden sm:inline">Close Gates</span>
        </button>

        <HeroSection
          coupleNames={weddingConfig.coupleNames}
          dateLabel={weddingConfig.dateFormatted}
          hashtag={weddingConfig.hashtag}
        />

        <CountdownSection
          targetDate={weddingConfig.weddingDate}
          togetherText={weddingConfig.togetherWithFamilies}
          requestText={weddingConfig.requestHonour}
        />

        <Suspense fallback={null}>
          {weddingConfig.scratchSection?.enabled && (
            <ScratchCard
              title={weddingConfig.scratchSection.title}
              hint={weddingConfig.scratchSection.hint}
              revealText={weddingConfig.scratchSection.revealText}
              dateText="24 November 2026"
              timeText={weddingConfig.weddingTime}
              subText={weddingConfig.scratchSection.subText}
            />
          )}

          <CoupleSection groom={weddingConfig.groom} bride={weddingConfig.bride} />
          <StorySection story={weddingConfig.story} />
          <FamilySection family={weddingConfig.family} />
          <FestivitiesSection festivities={weddingConfig.festivities} />
          <PhotoGallery3D gallery={weddingConfig.gallery} />
          <VenuesSection venues={weddingConfig.venues} />
          <WishesWall />
          <ContactSection contacts={weddingConfig.contacts} />
          <FooterSection
            coupleNames={weddingConfig.coupleNames}
            dateLabel={weddingConfig.dateFormatted}
            hashtag={weddingConfig.hashtag}
          />
        </Suspense>
      </div>
    </main>
  );
}
