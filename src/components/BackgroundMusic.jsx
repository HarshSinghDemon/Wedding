import React, { useEffect, useRef, useState, useImperativeHandle, forwardRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Music } from 'lucide-react';

const YOUTUBE_VIDEO_ID = 'lFml8NrHoeo'; // Aaj Sajeya | Official Wedding Song
const START_TIME = 15; // Always start at 15 seconds
const DEFAULT_VOLUME = 38; // Suitable volume, not too loud not too quiet

const BackgroundMusic = forwardRef(function BackgroundMusic(
  { hasStarted = false, onToggleMute },
  ref
) {
  const playerRef = useRef(null);
  const [isReady, setIsReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const pendingPlayRef = useRef(false);

  // Initialize YouTube IFrame Player
  useEffect(() => {
    let isMounted = true;

    const createPlayer = () => {
      if (!window.YT || !window.YT.Player) return;
      if (playerRef.current) return;

      try {
        playerRef.current = new window.YT.Player('youtube-audio-frame', {
          videoId: YOUTUBE_VIDEO_ID,
          playerVars: {
            autoplay: 0,
            controls: 0,
            disablekb: 1,
            fs: 0,
            iv_load_policy: 3,
            loop: 1,
            playlist: YOUTUBE_VIDEO_ID,
            start: START_TIME,
            modestbranding: 1,
            rel: 0,
            showinfo: 0,
            playsinline: 1,
          },
          events: {
            onReady: (event) => {
              if (!isMounted) return;
              setIsReady(true);
              event.target.setVolume(DEFAULT_VOLUME);

              // If playback was already triggered before player was ready
              if (pendingPlayRef.current) {
                try {
                  event.target.unMute();
                  event.target.setVolume(DEFAULT_VOLUME);
                  event.target.seekTo(START_TIME, true);
                  event.target.playVideo();
                  setIsPlaying(true);
                  setIsMuted(false);
                  pendingPlayRef.current = false;
                } catch (e) {
                  console.warn('Playback onReady error:', e);
                }
              }
            },
            onStateChange: (event) => {
              if (!isMounted) return;
              // 1 = PLAYING
              if (event.data === 1) {
                setIsPlaying(true);
                // Guarantee song never plays from before 15s even when YouTube playlist loops
                try {
                  const cur = typeof event.target.getCurrentTime === 'function' ? event.target.getCurrentTime() : 0;
                  if (cur < START_TIME - 1) {
                    event.target.seekTo(START_TIME, true);
                  }
                } catch (e) {
                  // ignore
                }
              }
              // 2 = PAUSED
              else if (event.data === 2) {
                setIsPlaying(false);
              }
              // 0 = ENDED (looping)
              else if (event.data === 0) {
                event.target.seekTo(START_TIME, true);
                event.target.playVideo();
              }
            },
            onError: (err) => {
              console.warn('YouTube Player error:', err);
            },
          },
        });
      } catch (err) {
        console.warn('Error creating YT player:', err);
      }
    };

    if (window.YT && window.YT.Player) {
      createPlayer();
    } else {
      const prevCallback = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        if (prevCallback) prevCallback();
        createPlayer();
      };

      if (!document.getElementById('youtube-iframe-api-tag')) {
        const tag = document.createElement('script');
        tag.id = 'youtube-iframe-api-tag';
        tag.src = 'https://www.youtube.com/iframe_api';
        const firstScript = document.getElementsByTagName('script')[0];
        firstScript?.parentNode?.insertBefore(tag, firstScript);
      }
    }

    return () => {
      isMounted = false;
    };
  }, []);

  // Method to start audio playback upon user tap
  const playAudio = () => {
    setHasInteracted(true);
    if (playerRef.current && typeof playerRef.current.playVideo === 'function') {
      try {
        playerRef.current.unMute();
        playerRef.current.setVolume(DEFAULT_VOLUME);
        const curr = typeof playerRef.current.getCurrentTime === 'function' ? playerRef.current.getCurrentTime() : 0;
        if (curr < START_TIME || curr > 300) {
          playerRef.current.seekTo(START_TIME, true);
        }
        playerRef.current.playVideo();
        setIsPlaying(true);
        setIsMuted(false);
      } catch (e) {
        console.warn('playAudio call failed, pending:', e);
        pendingPlayRef.current = true;
      }
    } else {
      pendingPlayRef.current = true;
    }
  };

  // Toggle Mute / Unmute
  const toggleMute = () => {
    setHasInteracted(true);
    if (!playerRef.current || typeof playerRef.current.mute !== 'function') return;

    try {
      if (isMuted) {
        playerRef.current.unMute();
        playerRef.current.setVolume(DEFAULT_VOLUME);
        setIsMuted(false);
        if (!isPlaying) {
          playerRef.current.playVideo();
          setIsPlaying(true);
        }
      } else {
        playerRef.current.mute();
        setIsMuted(true);
      }
      if (onToggleMute) onToggleMute(!isMuted);
    } catch (e) {
      console.warn('toggleMute error:', e);
    }
  };

  useImperativeHandle(ref, () => ({
    playAudio,
    toggleMute,
    isMuted,
    isPlaying,
  }));

  // Trigger playback when hasStarted becomes true
  useEffect(() => {
    if (hasStarted) {
      playAudio();
    }
  }, [hasStarted]);

  // Show the mute button once user tapped or music started
  const showButton = hasStarted || hasInteracted || isPlaying;

  return (
    <>
      {/* Hidden off-screen YouTube Player container */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed -bottom-10 -right-10 h-2 w-2 overflow-hidden opacity-0 select-none"
        style={{ zIndex: -999 }}
      >
        <div id="youtube-audio-frame" />
      </div>

      {/* Dedicated Royal Mute / Music Button blending with the Royal Gateway environment */}
      <AnimatePresence>
        {showButton && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.85 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-4 right-4 z-40 sm:top-5 sm:right-6"
          >
            <button
              type="button"
              onClick={toggleMute}
              title={
                isMuted
                  ? 'Unmute background music (Aaj Sajeya)'
                  : 'Mute background music (Aaj Sajeya)'
              }
              aria-label={isMuted ? 'Unmute music' : 'Mute music'}
              className="group relative flex items-center gap-2 rounded-full border border-[#dea645] bg-[#7a0c15]/90 px-3.5 py-2 shadow-[0_8px_24px_rgba(122,12,21,0.5),0_0_12px_rgba(222,166,69,0.3)] backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-[#9e141e] hover:border-[#f6d27a] active:scale-95"
            >
              {/* Outer delicate gold pulse ring when playing */}
              {!isMuted && isPlaying && (
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -inset-1 rounded-full border border-[#dea645]/40 animate-ping opacity-35"
                />
              )}

              {/* Icon */}
              <div className="flex h-5 w-5 items-center justify-center text-[#dea645] transition-transform duration-300 group-hover:scale-110">
                {isMuted ? (
                  <VolumeX className="h-4 w-4" />
                ) : (
                  <Volume2 className="h-4 w-4" />
                )}
              </div>

              {/* Animated Equalizer Bars when audio is playing */}
              {!isMuted && isPlaying ? (
                <div aria-hidden="true" className="flex items-end gap-[2px] h-3 px-0.5">
                  <motion.span
                    className="w-[2px] rounded-full bg-[#dea645]"
                    animate={{ height: ['4px', '12px', '6px', '13px', '4px'] }}
                    transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut' }}
                  />
                  <motion.span
                    className="w-[2px] rounded-full bg-[#f6d27a]"
                    animate={{ height: ['8px', '4px', '14px', '7px', '8px'] }}
                    transition={{ duration: 0.85, repeat: Infinity, ease: 'easeInOut', delay: 0.15 }}
                  />
                  <motion.span
                    className="w-[2px] rounded-full bg-[#dea645]"
                    animate={{ height: ['5px', '13px', '4px', '10px', '5px'] }}
                    transition={{ duration: 1.25, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
                  />
                </div>
              ) : (
                <div aria-hidden="true" className="flex items-end gap-[2px] h-3 px-0.5 opacity-40">
                  <span className="w-[2px] h-1 rounded-full bg-[#dea645]" />
                  <span className="w-[2px] h-1.5 rounded-full bg-[#dea645]" />
                  <span className="w-[2px] h-1 rounded-full bg-[#dea645]" />
                </div>
              )}

              {/* Label */}
              <span className="font-cinzel text-[11px] font-bold tracking-[0.2em] text-[#fbedd1] select-none">
                {isMuted ? 'UNMUTE' : 'MUTE'}
              </span>

              {/* Little gold diamond marker */}
              <span aria-hidden="true" className="text-[9px] text-[#dea645] leading-none">
                ❖
              </span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
});

export default BackgroundMusic;
