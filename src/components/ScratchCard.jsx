import React, { useRef, useEffect, useState } from 'react';
import confetti from 'canvas-confetti';

export default function ScratchCard({
  title = "SAVE THE DATE",
  hint = "Scratch the card below to reveal it",
  revealText = "We're Getting Married!",
  dateText = "12 December 2026",
  timeText = "7:00 PM onwards",
  subText = "Save the date and join us in celebration"
}) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isScratching, setIsScratching] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.offsetWidth;
    const height = canvas.offsetHeight;
    canvas.width = width * 2;
    canvas.height = height * 2;
    ctx.scale(2, 2);

    // Luxury Brushed Gold Foil Texture
    const grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, '#dea645');
    grad.addColorStop(0.25, '#fff0bd');
    grad.addColorStop(0.5, '#c9973a');
    grad.addColorStop(0.75, '#ffe9a8');
    grad.addColorStop(1, '#9b6319');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // Subtle fine metallic lines
    ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
    for (let i = 0; i < width; i += 6) {
      ctx.fillRect(i, 0, 1.5, height);
    }

    // Outer gold border on scratch foil
    ctx.strokeStyle = '#7a4a0f';
    ctx.lineWidth = 2.5;
    ctx.strokeRect(8, 8, width - 16, height - 16);

    // Inner dashed gold/white border
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1.2;
    ctx.setLineDash([6, 4]);
    ctx.strokeRect(14, 14, width - 28, height - 28);
    ctx.setLineDash([]);

    // Call to action typography on scratch surface
    ctx.fillStyle = '#39150f';
    ctx.font = 'bold 15px "Cinzel Decorative", serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('✨ SCRATCH TO REVEAL ✨', width / 2, height / 2 - 12);

    ctx.font = '13px "Inter", sans-serif';
    ctx.fillStyle = '#5c2c16';
    ctx.fillText('Swipe with finger or mouse', width / 2, height / 2 + 14);
  }, []);

  const scratchCountRef = useRef(0);
  const checkRafRef = useRef(null);

  const scratch = (clientX, clientY) => {
    if (isRevealed) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 28, 0, Math.PI * 2);
    ctx.fill();

    scratchCountRef.current++;
    if (scratchCountRef.current % 6 === 0) {
      if (checkRafRef.current) cancelAnimationFrame(checkRafRef.current);
      checkRafRef.current = requestAnimationFrame(checkPercentScratched);
    }
  };

  const checkPercentScratched = () => {
    if (isRevealed) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    try {
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      let clearPixels = 0;
      const totalPixels = data.length / 4;

      for (let i = 3; i < data.length; i += 32 * 4) {
        if (data[i] === 0) {
          clearPixels++;
        }
      }

      const percent = clearPixels / (totalPixels / 32);
      if (percent > 0.38) {
        setIsRevealed(true);
        confetti({
          particleCount: 65,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#dea645', '#9e141e', '#fff9eb'],
        });
      }
    } catch {
      // ignore
    }
  };

  const handlePointerDown = (e) => {
    e.currentTarget.setPointerCapture?.(e.pointerId);
    setIsScratching(true);
    scratch(e.clientX, e.clientY);
  };

  const handlePointerMove = (e) => {
    if (!isScratching) return;
    scratch(e.clientX, e.clientY);
  };

  const handlePointerUp = (e) => {
    try {
      e.currentTarget.releasePointerCapture?.(e.pointerId);
    } catch {
      /* already released */
    }
    setIsScratching(false);
  };

  return (
    <section className="relative px-4 pb-12 pt-4">
      {/* Outer Warm Ivory Panel matching Screenshot 404 */}
      <div className="mx-auto max-w-2xl rounded-t-[2rem] sm:rounded-t-[2.5rem] rounded-b-[1.75rem] sm:rounded-b-[2rem] border border-[#dea645]/60 bg-[#fff9eb]/95 px-4 py-8 sm:p-8 md:p-10 text-center shadow-[0_20px_50px_-15px_rgba(158,20,30,0.2)] relative overflow-hidden backdrop-blur-sm">
        <h3 className="font-cinzel text-2xl font-bold tracking-[0.25em] text-[#39150f] mb-1">
          {title}
        </h3>
        <p className="font-cormorant text-base italic text-[#8a5a12] mb-6">
          {hint}
        </p>

        {/* Scratch Card Interactive Container */}
        <div
          ref={containerRef}
          className="relative mx-auto h-56 w-full max-w-md rounded-2xl border border-[#dea645]/50 bg-white p-6 shadow-sm flex flex-col items-center justify-center overflow-hidden select-none"
        >
          {/* Secret Revealed Content Underneath */}
          <div className="flex flex-col items-center justify-center text-center space-y-2 select-text">
            <h4 className="font-cinzel text-2xl sm:text-3xl font-bold text-[#1f2937]">
              {revealText}
            </h4>

            <p className="font-cinzel text-xl sm:text-2xl font-semibold text-[#39150f]">
              {dateText}
            </p>

            <p className="font-inter text-xs font-semibold tracking-wider text-[#7a0c15]">
              {timeText}
            </p>

            <p className="font-cormorant text-sm text-[#5c3d2e] pt-1">
              {subText}
            </p>
          </div>

          {/* Interactive Scratchable Canvas */}
          {!isRevealed && (
            <canvas
              ref={canvasRef}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerLeave={handlePointerUp}
              className="absolute inset-0 h-full w-full cursor-pointer touch-none scratch-card-container z-20 rounded-2xl"
            />
          )}
        </div>

        {/* Quick reveal button helper */}
        {!isRevealed && (
          <button
            type="button"
            onClick={() => {
              setIsRevealed(true);
              confetti({
                particleCount: 65,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#dea645', '#9e141e', '#fff9eb'],
              });
            }}
            className="mt-4 font-cinzel text-xs tracking-wider text-[#8a5a12] underline hover:text-[#9e141e] transition-colors"
          >
            Click to auto-reveal date
          </button>
        )}
      </div>
    </section>
  );
}
