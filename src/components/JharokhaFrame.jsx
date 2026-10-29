import React, { useId } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function generateCuspedArch(e) {
  const t = (e.L + e.R) / 2;
  const a = Array.from({ length: e.lobes + 1 }, (_, s) => {
    const n = s / e.lobes;
    const i = 1 - n;
    const l = i * i * i;
    const r = 3 * i * i * n;
    const o = 3 * i * n * n;
    const c = n * n * n;
    return [
      l * e.L + r * e.L + o * (t - e.shoulder) + c * t,
      l * e.S + r * (e.S - e.rise) + o * (e.A + e.crown) + c * e.A,
    ];
  });
  const s = a.slice(0, -1).reverse().map(([x, y]) => [2 * t - x, y]);
  const n = [...a, ...s];

  const buildPath = (coordFn, aScale, sScale, close) => {
    const fmt = (pt) => coordFn(pt).map((v) => +v.toFixed(4)).join(' ');
    let pathStr = `M${fmt([e.L, e.B])} L${fmt([e.L, e.S])}`;
    n.forEach((pt, idx) => {
      if (idx === 0) return;
      const prev = n[idx - 1];
      const c = 0.62 * Math.hypot(pt[0] - prev[0], pt[1] - prev[1]);
      pathStr += ` A${(c * aScale).toFixed(4)} ${(c * sScale).toFixed(4)} 0 0 1 ${fmt(pt)}`;
    });
    return `${pathStr} L${fmt([e.R, e.S])} L${fmt([e.R, e.B])}${close ? ' Z' : ''}`;
  };

  const l = e.R - e.L;
  const r = e.B - e.A;
  return {
    opening: buildPath((p) => p, 1, 1, true),
    edge: buildPath((p) => p, 1, 1, false),
    clip: buildPath(([x, y]) => [(x - e.L) / l, (y - e.A) / r], 1 / l, 1 / r, true),
  };
}

export const ARCH_VARIANTS = [
  { top: '#f36b1c', bottom: '#f8c21b', rim: '#c98a00', lotus: '#e8336d', jaali: '#f8c21b' }, // 0: Groom Orange & Yellow
  { top: '#1e9a55', bottom: '#f36b1c', rim: '#b8460a', lotus: '#f9d43a', jaali: '#f36b1c' }, // 1: Green & Orange
  { top: '#2f6fd6', bottom: '#f8c21b', rim: '#c98a00', lotus: '#ef4f7e', jaali: '#f8c21b' }, // 2: Bride Blue & Yellow
  { top: '#e0287d', bottom: '#2bb24c', rim: '#17803a', lotus: '#ff8a1e', jaali: '#2bb24c' }, // 3: Magenta & Green
  { top: '#ff8a1e', bottom: '#d81b60', rim: '#9c0f45', lotus: '#2bb5f2', jaali: '#d81b60' }, // 4: Orange & Magenta
  { top: '#f8c21b', bottom: '#2bb24c', rim: '#17803a', lotus: '#e53935', jaali: '#2bb24c' }, // 5: Yellow & Green
  { top: '#1e4fbf', bottom: '#e53935', rim: '#a61f1c', lotus: '#f9d43a', jaali: '#e53935' }, // 6: Navy & Red
];

export function getVariant(variantIndex = 0) {
  const len = ARCH_VARIANTS.length;
  return ARCH_VARIANTS[((variantIndex % len) + len) % len];
}

const PORTRAIT_DIMS = { W: 100, H: 129.5, L: 17, R: 83, A: 15, S: 47, B: 118 };
const PORTRAIT_PATHS = generateCuspedArch({ ...PORTRAIT_DIMS, lobes: 6, rise: 22, shoulder: 15, crown: 9 });

const COUNTDOWN_DIMS = { W: 100, H: 150, L: 15, R: 85, A: 26, S: 56, B: 116 };
const COUNTDOWN_PATHS = generateCuspedArch({ ...COUNTDOWN_DIMS, lobes: 5, rise: 18, shoulder: 14, crown: 7 });

const GALLERY_DIMS = { W: 100, H: 140, L: 13, R: 87, A: 24, S: 56, B: 126 };
const GALLERY_PATHS = generateCuspedArch({ ...GALLERY_DIMS, lobes: 5, rise: 18, shoulder: 14, crown: 7 });

const easeCurve = [0.65, 0, 0.35, 1];

function getInsetStyles(dims) {
  const { W, H, L, R, A, B } = dims;
  return {
    left: `${(L / W) * 100}%`,
    right: `${((W - R) / W) * 100}%`,
    top: `${(A / H) * 100}%`,
    bottom: `${((H - B) / H) * 100}%`,
  };
}

function DiamondMirror({ x, y, i = 0, fill, size = 1 }) {
  const r = 1.5 * size;
  const o = 2 * size;
  return (
    <path
      d={`M${x} ${y - o} L${x + r} ${y} L${x} ${y + o} L${x - r} ${y} Z`}
      fill={fill}
      stroke="#fff"
      strokeWidth={0.25}
      className="rgw-mirror-glint"
      style={{ animationDelay: `${(0.23 * i) % 2.4}s` }}
    />
  );
}

function LotusFlower({ x, y, gid, delay = 0, scale = 1 }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <motion.g
        style={{ originX: 0.5, originY: 1 }}
        initial={{ scale: 0.2, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, delay, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.g
          style={{ originX: 0.5, originY: 1 }}
          animate={{ rotate: [-5, 5, -5] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay }}
        >
          {/* Green base leaf */}
          <path d="M-7 1 Q 0 -3 7 1 Q 0 3.5 -7 1 Z" fill="#2e8b3a" />
          {/* Lotus Petals */}
          {[-62, 62, -32, 32, 0].map((deg) => (
            <path
              key={deg}
              d="M0 0 C -3.2 -3.5 -2.4 -8.6 0 -11.5 C 2.4 -8.6 3.2 -3.5 0 0 Z"
              transform={`rotate(${deg}) scale(${deg === 0 ? 1 : Math.abs(deg) > 40 ? 0.78 : 0.92})`}
              fill={`url(#${gid})`}
              stroke="#fff"
              strokeWidth={0.35}
            />
          ))}
          {/* Lotus Core */}
          <circle cy={-1.2} r={1.1} fill="#ffd34d" />
        </motion.g>
      </motion.g>
    </g>
  );
}

function FrameGradients({ p, ids, split }) {
  return (
    <>
      <linearGradient id={ids.paint} x1="0" y1="0" x2="0" y2="1">
        <stop offset={split} stopColor={p.top} />
        <stop offset={split} stopColor={p.bottom} />
      </linearGradient>
      <linearGradient id={ids.mirror} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="45%" stopColor="#c9d3dc" />
        <stop offset="55%" stopColor="#8796a3" />
        <stop offset="100%" stopColor="#eef3f7" />
      </linearGradient>
      <linearGradient id={ids.petal} x1="0" y1="1" x2="0" y2="0">
        <stop offset="0%" stopColor={p.lotus} />
        <stop offset="75%" stopColor={p.lotus} />
        <stop offset="100%" stopColor="#fff3f6" />
      </linearGradient>
      <linearGradient id={ids.sheen} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#fff" stopOpacity="0" />
        <stop offset="50%" stopColor="#fff" stopOpacity="0.45" />
        <stop offset="100%" stopColor="#fff" stopOpacity="0" />
      </linearGradient>
    </>
  );
}

// -------------------------------------------------------------
// 1. ARCHITECTURAL PORTRAIT FRAME (For Couple, Family, Stories)
// -------------------------------------------------------------
export function ArchitecturalFrame({ children, variant = 0 }) {
  const rawId = useId().replace(/:/g, '');
  const uid = (name) => `rgw-${name}-${rawId}`;
  const v = getVariant(variant);
  const { W, H, L, R, A, S, B } = PORTRAIT_DIMS;
  const midX = W / 2;

  // Mirror positions along bottom and side panels
  const mirrors = [];
  for (let x = 10; x <= 90; x += 6.15) mirrors.push([x, 122.5]);
  for (let y = S + 4; y <= B - 2; y += 6.2) mirrors.push([8.8, y], [W - 8.8, y]);

  const jaaliStyle = {
    backgroundColor: v.jaali,
    backgroundImage: `radial-gradient(circle at center, rgba(255, 255, 255, 0.92) 0 33%, transparent 35%),
      radial-gradient(circle at center, rgba(255, 255, 255, 0.92) 0 33%, transparent 35%)`,
    backgroundSize: '16px 16px',
    backgroundPosition: '0 0, 8px 8px',
    boxShadow: `inset 0 0 0 2px ${v.rim}`,
  };

  return (
    <div className="relative aspect-[800/1036] w-full">
      {/* Clipped Content Container with Opening Jaali Curtains */}
      <div
        className="absolute overflow-hidden"
        style={{ ...getInsetStyles(PORTRAIT_DIMS), clipPath: `url(#${uid('clip')})` }}
      >
        {children}
        <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_18px_6px_rgba(0,0,0,0.35)]" />
        {/* Animated Jaali Sliding Curtains */}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 w-1/2 z-10"
          style={jaaliStyle}
          initial={{ x: '0%' }}
          whileInView={{ x: '-101%' }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1.6, delay: 0.5, ease: easeCurve }}
        />
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 w-1/2 z-10"
          style={jaaliStyle}
          initial={{ x: '0%' }}
          whileInView={{ x: '101%' }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1.6, delay: 0.5, ease: easeCurve }}
        />
      </div>

      {/* Ornate Frame SVG Overlay */}
      <svg
        aria-hidden="true"
        viewBox={`0 0 ${W} ${H}`}
        className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
        style={{ filter: 'drop-shadow(0 10px 14px rgba(60, 20, 0, 0.35))' }}
      >
        <defs>
          <clipPath id={uid('clip')} clipPathUnits="objectBoundingBox">
            <path d={PORTRAIT_PATHS.clip} />
          </clipPath>
          <clipPath id={uid('body')}>
            <path d={`M0 0 H${W} V${H} H0 Z ${PORTRAIT_PATHS.opening}`} clipRule="evenodd" />
          </clipPath>
          <FrameGradients
            p={v}
            split={S / H}
            ids={{
              paint: uid('paint'),
              mirror: uid('mirror'),
              petal: uid('petal'),
              sheen: uid('sheen'),
            }}
          />
        </defs>

        {/* Outer Frame Solid Body with Opening Hole */}
        <path
          d={`M1 0 H${W - 1} Q${W} 0 ${W} 1 V${H - 1} Q${W} ${H} ${W - 1} ${H} H1 Q0 ${H} 0 ${H - 1} V1 Q0 0 1 0 Z ${PORTRAIT_PATHS.opening}`}
          fillRule="evenodd"
          fill={`url(#${uid('paint')})`}
        />

        {/* Outer Thin White Inset Border */}
        <rect x={4} y={4} width={W - 8} height={H - 8} rx={1} fill="none" stroke="#fff" strokeWidth={0.7} />
        <line x1={4} y1={S} x2={L - 3} y2={S} stroke="#fff" strokeWidth={0.6} />
        <line x1={R + 3} y1={S} x2={W - 4} y2={S} stroke="#fff" strokeWidth={0.6} />

        {/* Inner Arch Gold / Colored Rim */}
        <path d={PORTRAIT_PATHS.opening} fill="none" stroke={v.rim} strokeWidth={3.4} />
        <path d={PORTRAIT_PATHS.opening} fill="none" stroke="#fff" strokeWidth={0.6} />

        {/* Animated Pearl Run Scallop Edge */}
        <g transform={`translate(${midX} ${(A + B) / 2}) scale(1.085 1.06) translate(${-midX} ${-(A + B) / 2})`}>
          <path
            d={PORTRAIT_PATHS.edge}
            fill="none"
            stroke="#fff"
            strokeWidth={1.25}
            strokeLinecap="round"
            strokeDasharray="0 2.4"
            className="rgw-pearl-run"
          />
        </g>

        {/* Decorative Top Garland Lines */}
        {[1, -1].map((dir) => (
          <path
            key={dir}
            d={
              dir > 0
                ? 'M18 9.5 Q 28 4 38 8.5 Q 42 10.5 44 7'
                : `M${W - 18} 9.5 Q ${W - 28} 4 ${W - 38} 8.5 Q ${W - 42} 10.5 ${W - 44} 7`
            }
            fill="none"
            stroke="#fff"
            strokeWidth={0.8}
            strokeLinecap="round"
            strokeDasharray="0 1.8"
          />
        ))}

        {/* Top Center Jewel Boss */}
        <circle cx={midX} cy={7.5} r={1.5} fill="#fff" />
        <circle cx={midX} cy={7.5} r={0.7} fill={v.lotus} />

        {/* Diamond Mirrors */}
        {mirrors.map(([x, y], idx) => (
          <DiamondMirror key={idx} x={x} y={y} i={idx} size={1} fill={`url(#${uid('mirror')})`} />
        ))}

        {/* Swaying Top Lotus Flowers */}
        <LotusFlower x={14} y={23} scale={1.3} gid={uid('petal')} delay={0.2} />
        <LotusFlower x={W - 14} y={23} scale={1.3} gid={uid('petal')} delay={0.45} />

        {/* Light Sheen Sweep Across Frame */}
        <g clipPath={`url(#${uid('body')})`}>
          <motion.rect
            y={-10}
            width={60}
            height={H + 20}
            fill={`url(#${uid('sheen')})`}
            transform="skewX(-15)"
            initial={{ x: -90 }}
            animate={{ x: W + 60 }}
            transition={{ duration: 3.4, repeat: Infinity, repeatDelay: 4, ease: 'easeInOut', delay: 2.5 }}
          />
        </g>
      </svg>
    </div>
  );
}

// -------------------------------------------------------------
// 2. ORNATE COUNTDOWN CARD (For CountdownSection)
// -------------------------------------------------------------
export function CountdownCardFrame({ value = 0, label = 'DAYS', variant = 0, pulse = false }) {
  const rawId = useId().replace(/:/g, '');
  const uid = (name) => `rgw-count-${name}-${rawId}`;
  const v = getVariant(variant);
  const { W, H, A, S, B } = COUNTDOWN_DIMS;
  const midX = W / 2;

  const mirrors = [];
  for (let y = S + 6; y <= B - 2; y += 9) {
    mirrors.push([7.5, y], [W - 7.5, y]);
  }

  return (
    <div className="relative aspect-[100/150] w-full [container-type:inline-size]">
      {/* Clipped Inner Deep Burgundy Arch for Flip Numbers */}
      <div
        className="absolute overflow-hidden"
        style={{ ...getInsetStyles(COUNTDOWN_DIMS), clipPath: `url(#${uid('clip')})` }}
      >
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at 50% 35%, #7a0c15 0%, #3a040b 100%)',
          }}
        />
        {pulse && (
          <motion.div
            aria-hidden="true"
            className="absolute inset-0"
            animate={{
              boxShadow: [
                'inset 0 0 0 0 rgba(255, 205, 110, 0)',
                'inset 0 0 26px 4px rgba(255, 205, 110, 0.6)',
                'inset 0 0 0 0 rgba(255, 205, 110, 0)',
              ],
            }}
            transition={{ duration: 1, repeat: Infinity, ease: 'easeOut' }}
          />
        )}
        <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_14px_3px_rgba(0,0,0,0.45)]" />

        {/* Centered Golden Flip Number */}
        <div className="absolute inset-x-0 bottom-[8%] top-[34%] flex items-center justify-center overflow-hidden [perspective:400px]">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={value}
              className="rgw-text-gold-grad font-cinzel-decorative text-[34cqw] font-bold leading-none drop-shadow-[0_2px_3px_rgba(40,0,0,0.7)] select-none"
              initial={{ rotateX: -90, opacity: 0, y: '30%' }}
              animate={{ rotateX: 0, opacity: 1, y: 0 }}
              exit={{ rotateX: 90, opacity: 0, y: '-30%' }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            >
              {String(value).padStart(2, '0')}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>

      {/* SVG Outline and Architectural Embellishments */}
      <svg
        aria-hidden="true"
        viewBox={`0 0 ${W} ${H}`}
        className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
        style={{ filter: 'drop-shadow(0 8px 10px rgba(60, 20, 0, 0.35))' }}
      >
        <defs>
          <clipPath id={uid('clip')} clipPathUnits="objectBoundingBox">
            <path d={COUNTDOWN_PATHS.clip} />
          </clipPath>
          <clipPath id={uid('body')}>
            <path d={`M0 0 H${W} V${H} H0 Z ${COUNTDOWN_PATHS.opening}`} clipRule="evenodd" />
          </clipPath>
          <FrameGradients
            p={v}
            split={S / H}
            ids={{
              paint: uid('paint'),
              mirror: uid('mirror'),
              petal: uid('petal'),
              sheen: uid('sheen'),
            }}
          />
        </defs>

        {/* Outer Architectural Silhouette */}
        <path
          d={`M0 ${H - 3} V34 Q0 4 ${midX} 2 Q${W} 4 ${W} 34 V${H - 3} Q${W} ${H} ${W - 3} ${H} H3 Q0 ${H} 0 ${H - 3} Z ${COUNTDOWN_PATHS.opening}`}
          fillRule="evenodd"
          fill={`url(#${uid('paint')})`}
        />

        {/* White Inner Border */}
        <path
          d={`M4 ${H - 5} V35 Q4 8 ${midX} 6 Q${W - 4} 8 ${W - 4} 35 V${H - 5} Z`}
          fill="none"
          stroke="#fff"
          strokeWidth={0.9}
        />

        {/* Inner Arch Borders */}
        <path d={COUNTDOWN_PATHS.opening} fill="none" stroke={v.rim} strokeWidth={3.6} />
        <path d={COUNTDOWN_PATHS.opening} fill="none" stroke="#fff" strokeWidth={0.7} />

        {/* Pearl Run Around Arch */}
        <g transform={`translate(${midX} ${(A + B) / 2}) scale(1.1 1.075) translate(${-midX} ${-(A + B) / 2})`}>
          <path
            d={COUNTDOWN_PATHS.edge}
            fill="none"
            stroke="#fff"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeDasharray="0 3"
            className="rgw-pearl-run"
          />
        </g>

        {/* Side Diamond Mirrors */}
        {mirrors.map(([x, y], idx) => (
          <DiamondMirror key={idx} x={x} y={y} i={idx + variant} fill={`url(#${uid('mirror')})`} />
        ))}

        {/* Bottom Label Divider & Label */}
        <line x1={10} y1={123} x2={W - 10} y2={123} stroke="#fff" strokeWidth={0.6} />
        <text
          x={midX}
          y={137}
          textAnchor="middle"
          fill="#fff"
          className="font-cinzel-decorative"
          style={{ fontSize: 10.5, letterSpacing: '0.12em', textTransform: 'uppercase' }}
        >
          {label}
        </text>

        {/* Bottom Corner Accent Dots */}
        {[11, W - 11].map((dotX) => (
          <g key={dotX}>
            <circle cx={dotX} cy={134} r={2.2} fill="#fff" />
            <circle cx={dotX} cy={134} r={1} fill={v.lotus} />
          </g>
        ))}

        {/* Top Centered Lotus Emblem */}
        <LotusFlower x={midX} y={22} scale={1.05} gid={uid('petal')} delay={0.3 + 0.15 * variant} />

        {/* Light Sheen */}
        <g clipPath={`url(#${uid('body')})`}>
          <motion.rect
            y={-10}
            width={30}
            height={H + 20}
            fill={`url(#${uid('sheen')})`}
            transform="skewX(-15)"
            initial={{ x: -50 }}
            animate={{ x: W + 40 }}
            transition={{ duration: 2.6, repeat: Infinity, repeatDelay: 4, ease: 'easeInOut', delay: 0.7 * variant }}
          />
        </g>
      </svg>
    </div>
  );
}

// -------------------------------------------------------------
// 3. GILDED ROYAL JHAROKHA GALLERY FRAME (For PhotoGallery3D)
// -------------------------------------------------------------
function GemCabochon({ x, y, r = 1.7, color = 'ruby' }) {
  const isRuby = color === 'ruby';
  return (
    <g>
      <circle cx={x} cy={y} r={r} fill={isRuby ? '#9e0d2c' : '#116b32'} stroke="#f6d27a" strokeWidth={0.35} />
      <circle cx={x - r * 0.3} cy={y - r * 0.3} r={r * 0.4} fill="#fff" opacity={0.75} />
    </g>
  );
}

export function GildedJharokhaFrame({ children }) {
  const rawId = useId().replace(/:/g, '');
  const uid = (name) => `rgw-jharokha-${name}-${rawId}`;
  const { W, H, L, R, A, B } = GALLERY_DIMS;
  const midX = W / 2;
  const goldFill = `url(#${uid('gold')})`;
  const outerBorder = `M3 14 Q3 10 7 10 H${W - 7} Q${W - 3} 10 ${W - 3} 14 V${H - 2} Q${W - 3} ${H + 1} ${W - 6} ${H + 1} H6 Q3 ${H + 1} 3 ${H - 2} Z ${GALLERY_PATHS.opening}`;

  return (
    <div className="relative aspect-[100/140] w-full">
      {/* Clipped Photograph Window */}
      <div
        className="absolute overflow-hidden bg-[#080e2c]"
        style={{ ...getInsetStyles(GALLERY_DIMS), clipPath: `url(#${uid('clip')})` }}
      >
        {children}
        <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_22px_6px_rgba(40,15,0,0.55)]" />
      </div>

      {/* SVG Royal Gilded Jharokha Architecture */}
      <svg
        aria-hidden="true"
        viewBox={`-2 -6 ${W + 4} ${H + 14}`}
        className="pointer-events-none absolute -left-[2%] -top-[4.3%] h-[110%] w-[104%] overflow-visible"
        style={{ filter: 'drop-shadow(0 14px 18px rgba(60, 25, 0, 0.45))' }}
      >
        <defs>
          <clipPath id={uid('clip')} clipPathUnits="objectBoundingBox">
            <path d={GALLERY_PATHS.clip} />
          </clipPath>
          <clipPath id={uid('body')}>
            <path d={`M-10 -10 H${W + 10} V${H + 10} H-10 Z ${GALLERY_PATHS.opening}`} clipRule="evenodd" />
          </clipPath>
          <linearGradient id={uid('gold')} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#fff1b8" />
            <stop offset="22%" stopColor="#e3b44c" />
            <stop offset="45%" stopColor="#9c6a17" />
            <stop offset="62%" stopColor="#f2cf6e" />
            <stop offset="80%" stopColor="#b98321" />
            <stop offset="100%" stopColor="#6e4a0e" />
          </linearGradient>
          <linearGradient id={uid('rim')} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#7a0f22" />
            <stop offset="100%" stopColor="#3d0610" />
          </linearGradient>
          <linearGradient id={uid('sheen')} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#fff" stopOpacity="0" />
            <stop offset="50%" stopColor="#fff" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
          <pattern id={uid('carve')} width="6" height="6" patternUnits="userSpaceOnUse">
            <path
              d="M3 0.6 Q4.2 3 3 5.4 Q1.8 3 3 0.6 Z M0.6 3 Q3 1.8 5.4 3 Q3 4.2 0.6 3 Z"
              fill="#6e4a0e"
              opacity="0.35"
            />
          </pattern>
        </defs>

        {/* Crowned Domed Pavilion / Chhatri Peak */}
        <path
          d={`M${midX - 22} 12 Q${midX - 22} -2 ${midX} -3 Q${midX + 22} -2 ${midX + 22} 12 Z`}
          fill={goldFill}
          stroke="#6e4a0e"
          strokeWidth={0.6}
        />
        <path
          d={`M${midX - 16} 11 Q${midX - 16} 1 ${midX} 0.5 Q${midX + 16} 1 ${midX + 16} 11`}
          fill="none"
          stroke="#fff3c4"
          strokeWidth={0.5}
          strokeDasharray="0 1.6"
          strokeLinecap="round"
        />
        <ellipse cx={midX} cy={-5} rx={3.2} ry={2.6} fill={goldFill} stroke="#6e4a0e" strokeWidth={0.4} />
        <path d={`M${midX} -11 L${midX + 1.4} -7.5 L${midX - 1.4} -7.5 Z`} fill={goldFill} />

        {/* Main Gilded Frame Body */}
        <path d={outerBorder} fillRule="evenodd" fill={goldFill} stroke="#6e4a0e" strokeWidth={0.6} />
        <path d={outerBorder} fillRule="evenodd" fill={`url(#${uid('carve')})`} />

        {/* Inset Gold Beaded Rectangles */}
        <rect x={6.5} y={13.5} width={W - 13} height={H - 15} rx={1.5} fill="none" stroke="#fff3c4" strokeWidth={0.5} opacity={0.8} />
        <rect x={7.5} y={14.5} width={W - 15} height={H - 17} rx={1.2} fill="none" stroke="#6e4a0e" strokeWidth={0.4} />

        {/* Inner Scalloped Cusped Arch with Velvet Rim */}
        <path d={GALLERY_PATHS.opening} fill="none" stroke={`url(#${uid('rim')})`} strokeWidth={4.2} />
        <path d={GALLERY_PATHS.opening} fill="none" stroke="#f6d27a" strokeWidth={0.8} />

        {/* Pearl Run Around Opening */}
        <g transform={`translate(${midX} ${(A + B) / 2}) scale(1.085 1.055) translate(${-midX} ${-(A + B) / 2})`}>
          <path
            d={GALLERY_PATHS.edge}
            fill="none"
            stroke="#fffaf0"
            strokeWidth={1.35}
            strokeLinecap="round"
            strokeDasharray="0 2.3"
            className="rgw-pearl-run"
          />
        </g>

        {/* Top Header Gem Cabochons (Ruby & Emerald) */}
        {[0.12, 0.3, 0.5, 0.7, 0.88].map((ratio, idx) => (
          <GemCabochon
            key={idx}
            x={L - 1 + ratio * (R - L + 2)}
            y={17}
            r={idx === 2 ? 2.4 : 1.7}
            color={idx % 2 ? 'emerald' : 'ruby'}
          />
        ))}

        {/* Side Panel Gem Cabochons */}
        {[66, 84, 102, 120].map((y, idx) => (
          <g key={y}>
            <GemCabochon x={7.6} y={y} r={1.5} color={idx % 2 ? 'ruby' : 'emerald'} />
            <GemCabochon x={W - 7.6} y={y} r={1.5} color={idx % 2 ? 'ruby' : 'emerald'} />
          </g>
        ))}

        {/* Crown Peak Ruby Jewel */}
        <GemCabochon x={midX} y={4} r={2.6} color="ruby" />

        {/* Bottom Hanging Swaying Pearls & Ruby Tassels */}
        {[8, midX, W - 8].map((x, idx) => (
          <motion.g
            key={x}
            style={{ originX: 0.5, originY: 0 }}
            animate={{ rotate: [-6, 6, -6] }}
            transition={{ duration: 3.4 + 0.4 * idx, repeat: Infinity, ease: 'easeInOut' }}
          >
            <line x1={x} y1={H + 1} x2={x} y2={H + 5} stroke="#d4a23a" strokeWidth={0.5} />
            <circle cx={x} cy={H + 5.6} r={0.9} fill="#fffaf0" />
            <path
              d={`M${x} ${H + 6.4} l1.6 2.6 l-1.6 2.6 l-1.6 -2.6 z`}
              fill="#d4123a"
              stroke="#8a5a12"
              strokeWidth={0.3}
            />
          </motion.g>
        ))}

        {/* Gilded Sheen Sweep */}
        <g clipPath={`url(#${uid('body')})`}>
          <motion.rect
            y={-20}
            width={22}
            height={H + 40}
            fill={`url(#${uid('sheen')})`}
            transform="skewX(-18)"
            initial={{ x: -60 }}
            animate={{ x: W + 50 }}
            transition={{ duration: 2.8, repeat: Infinity, repeatDelay: 5, ease: 'easeInOut', delay: 1.5 }}
          />
        </g>
      </svg>
    </div>
  );
}
