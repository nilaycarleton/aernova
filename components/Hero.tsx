'use client';

import { motion } from 'framer-motion';
import { ArrowDown, Crosshair, Gauge, MapPinned, Ruler } from 'lucide-react';
import { cardReveal, staggerGroup } from './motionPresets';

const metrics = [
  { icon: Crosshair, num: '100%', label: 'Roof-safe surveys' },
  { icon: Ruler, num: '+/-1cm', label: 'Measurement workflow' },
  { icon: Gauge, num: '12-24h', label: 'Typical turnaround' },
];

const telemetry = [
  ['Sector', 'GTA / Ottawa'],
  ['Capture', 'Aerial + orbital'],
  ['Output', 'GLB + measurements'],
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-20 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-cyan/8 to-transparent" />
        <div className="absolute right-0 top-24 h-[72%] w-px bg-gradient-to-b from-transparent via-cyan/30 to-transparent" />
        <div className="absolute left-8 lg:left-16 top-28 bottom-16 w-px bg-gradient-to-b from-cyan/30 via-edge to-transparent" />
      </div>

      <motion.div
        className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan/35 to-transparent pointer-events-none"
        animate={{ y: ['-5vh', '105vh'] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'linear', repeatDelay: 1.5 }}
      />

      <div className="relative z-10 w-full px-8 lg:px-16 grid lg:grid-cols-[1.05fr_0.95fr] gap-14 xl:gap-20 items-center">
        <motion.div
          variants={staggerGroup}
          initial={false}
          animate="visible"
          className="max-w-3xl"
        >
          <motion.div variants={cardReveal} className="flex flex-wrap items-center gap-3 mb-9">
            <span className="font-mono-dm text-[0.64rem] tracking-[0.24em] uppercase text-cyan border border-cyan/40 px-4 py-2 bg-ink/70">
              Toronto, ON - Est. 2023
            </span>
            <span className="font-mono-dm text-[0.64rem] tracking-[0.24em] uppercase text-smoke border border-edge px-4 py-2 bg-surface/70">
              Construction + Roofing
            </span>
          </motion.div>

          <motion.h1
            variants={cardReveal}
            className="font-display text-[clamp(4rem,9vw,8rem)] leading-[0.9] tracking-wide text-snow mb-8"
          >
            PRECISION<br />
            <span className="text-cyan">DRONE</span><br />
            MAPPING
          </motion.h1>

          <motion.p
            variants={cardReveal}
            className="font-body font-light text-lg md:text-xl text-frost/78 leading-relaxed max-w-2xl mb-11"
          >
            Aernova Inc. captures construction sites and rooftops as accurate 3D assets,
            giving contractors practical measurements, visual records, and shareable models
            without putting crews at height.
          </motion.p>

          <motion.div variants={cardReveal} className="flex items-center gap-4 flex-wrap">
            <a
              href="#contact"
              className="group font-mono-dm text-[0.78rem] tracking-widest uppercase text-ink bg-cyan px-8 py-4 min-h-11 hover:bg-[#33ddff] transition-all duration-200 hover:-translate-y-0.5 inline-flex items-center gap-3"
            >
              Request a Quote
              <span className="h-px w-7 bg-ink/70 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#projects"
              className="font-mono-dm text-[0.78rem] tracking-widest uppercase text-frost border border-edge px-8 py-4 min-h-11 hover:border-cyan hover:text-cyan hover:bg-cyan/5 transition-all duration-200 inline-flex items-center"
            >
              View Projects
            </a>
          </motion.div>

          <motion.div
            variants={staggerGroup}
            className="grid grid-cols-1 sm:grid-cols-3 gap-px mt-14 bg-edge"
          >
            {metrics.map((metric) => {
              const Icon = metric.icon;

              return (
                <motion.div
                  key={metric.label}
                  variants={cardReveal}
                  className="industrial-panel p-5"
                >
                  <Icon size={17} className="text-cyan mb-4" strokeWidth={1.6} />
                  <div className="font-display text-4xl text-snow leading-none">
                    {metric.num}
                  </div>
                  <div className="font-mono-dm text-[0.58rem] tracking-widest uppercase text-smoke mt-2">
                    {metric.label}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>

        <motion.div
          initial={false}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="hidden lg:block"
        >
          <div className="corner-markers industrial-panel border border-edge p-6 xl:p-8">
            <div className="flex items-center justify-between border-b border-edge pb-5 mb-6">
              <div>
                <span className="font-mono-dm text-[0.58rem] tracking-widest uppercase text-smoke block mb-1">
                  Active Survey Interface
                </span>
                <span className="font-display text-2xl tracking-wide text-snow">
                  AERNOVA FIELD OPS
                </span>
              </div>
              <MapPinned size={24} className="text-cyan" strokeWidth={1.4} />
            </div>

            <DroneIllustration />

            <div className="grid grid-cols-3 gap-px bg-edge mt-6">
              {telemetry.map(([label, value]) => (
                <div key={label} className="bg-ink/70 p-4">
                  <span className="font-mono-dm text-[0.55rem] tracking-widest uppercase text-smoke block mb-1">
                    {label}
                  </span>
                  <span className="font-mono-dm text-[0.62rem] tracking-wide uppercase text-frost">
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <motion.a
        href="#services"
        initial={false}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2"
        aria-label="Scroll to services"
      >
        <span className="font-mono-dm text-[0.58rem] tracking-widest uppercase text-smoke">
          Scroll
        </span>
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity }}
        >
          <ArrowDown size={14} className="text-smoke" />
        </motion.span>
      </motion.a>
    </section>
  );
}

function DroneIllustration() {
  const motors = [
    { cx: 145, cy: 195 },
    { cx: 375, cy: 195 },
    { cx: 145, cy: 325 },
    { cx: 375, cy: 325 },
  ];

  return (
    <motion.div
      animate={{ y: [0, -12, 0] }}
      transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      className="relative mx-auto w-full max-w-[500px]"
    >
      <svg viewBox="0 0 520 520" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <motion.circle
          cx="260"
          cy="280"
          r="184"
          stroke="#00D4FF"
          strokeWidth="0.5"
          strokeDasharray="4 9"
          opacity="0.22"
          animate={{ rotate: 360 }}
          transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
          style={{ transformOrigin: '260px 280px' }}
        />
        <circle cx="260" cy="280" r="224" stroke="#00D4FF" strokeWidth="0.3" strokeDasharray="2 13" opacity="0.14" />
        <ellipse cx="260" cy="390" rx="98" ry="14" fill="#00D4FF" opacity="0.07" />

        <rect x="220" y="235" width="80" height="50" rx="4" fill="#0E1525" stroke="#1A2640" strokeWidth="1.5" />
        <rect x="230" y="245" width="60" height="30" rx="2" fill="#0A0E1A" stroke="#00D4FF" strokeWidth="0.8" opacity="0.65" />
        <rect x="244" y="283" width="32" height="20" rx="10" fill="#0E1525" stroke="#1A2640" strokeWidth="1" />
        <circle cx="260" cy="293" r="7" fill="#04080F" stroke="#00D4FF" strokeWidth="1" opacity="0.85" />
        <motion.circle
          cx="260"
          cy="248"
          r="3"
          fill="#FF6B1A"
          animate={{ opacity: [0.35, 1, 0.35] }}
          transition={{ duration: 1.6, repeat: Infinity }}
        />

        {[
          [225, 245, 145, 195],
          [295, 245, 375, 195],
          [225, 275, 145, 325],
          [295, 275, 375, 325],
        ].map(([x1, y1, x2, y2], i) => (
          <g key={i}>
            <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#1A2640" strokeWidth="4" strokeLinecap="round" />
            <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#00D4FF" strokeWidth="1" strokeLinecap="round" opacity="0.32" />
          </g>
        ))}

        {motors.map(({ cx, cy }, i) => (
          <g key={i}>
            <circle cx={cx} cy={cy} r="18" fill="#0E1525" stroke="#1A2640" strokeWidth="1.5" />
            <circle cx={cx} cy={cy} r="10" fill="#0A0E1A" stroke="#00D4FF" strokeWidth="0.8" opacity="0.5" />
            <motion.g
              animate={{ rotate: 360 }}
              transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }}
              style={{ transformOrigin: `${cx}px ${cy}px` }}
              opacity="0.72"
            >
              <ellipse cx={cx} cy={cy} rx="38" ry="4" fill={i > 1 ? '#FF6B1A' : '#00D4FF'} opacity="0.13" />
              <line x1={cx - 36} y1={cy} x2={cx + 36} y2={cy} stroke={i > 1 ? '#FF6B1A' : '#00D4FF'} strokeWidth="1.4" opacity="0.32" strokeLinecap="round" />
            </motion.g>
          </g>
        ))}

        {[...Array(5)].map((_, i) => (
          <motion.line
            key={`beam-${i}`}
            x1="260"
            y1="300"
            x2={210 + i * 20}
            y2="384"
            stroke="#00D4FF"
            strokeWidth="0.6"
            strokeDasharray="3 5"
            animate={{ opacity: [0.05, 0.23, 0.05] }}
            transition={{ duration: 2.2, repeat: Infinity, delay: i * 0.18 }}
          />
        ))}

        {[
          [210, 380], [225, 385], [240, 378], [255, 383], [270, 380],
          [285, 385], [300, 379], [215, 390], [250, 392], [285, 388],
        ].map(([x, y], i) => (
          <motion.circle
            key={`dot-${i}`}
            cx={x}
            cy={y}
            r="1.5"
            fill="#00D4FF"
            animate={{ opacity: [0.15, 0.55, 0.15] }}
            transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.1 }}
          />
        ))}

        <line x1="180" y1="380" x2="340" y2="380" stroke="#00D4FF" strokeWidth="0.5" strokeDasharray="4 6" opacity="0.3" />
        <line x1="180" y1="376" x2="180" y2="384" stroke="#00D4FF" strokeWidth="1" opacity="0.45" />
        <line x1="340" y1="376" x2="340" y2="384" stroke="#00D4FF" strokeWidth="1" opacity="0.45" />
        <text x="251" y="374" fontSize="9" fill="#00D4FF" opacity="0.58" fontFamily="monospace">24.3m</text>
      </svg>
    </motion.div>
  );
}
