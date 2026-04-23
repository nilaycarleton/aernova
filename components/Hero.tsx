'use client';

import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
});

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background radial glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[700px] h-[500px] bg-cyan/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[300px] bg-orange/4 blur-[100px] rounded-full" />
      </div>

      {/* Scan line */}
      <motion.div
        className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan/30 to-transparent pointer-events-none"
        animate={{ y: ['-5vh', '105vh'] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'linear', repeatDelay: 1 }}
      />

      <div className="relative z-10 w-full px-8 lg:px-16 grid lg:grid-cols-2 gap-16 items-center">
        {/* Left content */}
        <div>
          <motion.div {...fadeUp(0.1)}>
            <span className="font-mono-dm text-[0.65rem] tracking-[0.25em] uppercase text-cyan border border-cyan/40 px-4 py-2 inline-block mb-10">
              ◈ Toronto, ON — Est. 2023
            </span>
          </motion.div>

          <motion.h1
            {...fadeUp(0.2)}
            className="font-display text-[clamp(4rem,9vw,7.5rem)] leading-[0.92] tracking-wide text-snow mb-8"
          >
            PRECISION<br />
            <span className="text-cyan">3D DRONE</span><br />
            MAPPING
          </motion.h1>

          <motion.p
            {...fadeUp(0.35)}
            className="font-body font-light text-lg text-frost/80 leading-relaxed max-w-xl mb-12"
          >
            We bring construction sites into sharp digital focus by capturing every measurement,
            angle, and surface through precision drone photogrammetry so contractors can plan
            faster and work safer.
          </motion.p>

          <motion.div {...fadeUp(0.5)} className="flex items-center gap-4 flex-wrap">
            <a
              href="#projects"
              className="font-mono-dm text-[0.78rem] tracking-widest uppercase text-ink bg-cyan px-8 py-4 hover:bg-[#33ddff] transition-all duration-200 hover:-translate-y-0.5 inline-block"
            >
              View Projects
            </a>
            <a
              href="#services"
              className="font-mono-dm text-[0.78rem] tracking-widest uppercase text-frost border border-edge px-8 py-4 hover:border-cyan hover:text-cyan transition-all duration-200 inline-block"
            >
              Our Services
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            {...fadeUp(0.65)}
            className="flex gap-12 mt-16 pt-10 border-t border-edge"
          >
            {[
              { num: '100%', label: 'Roof-safe surveys' },
              { num: '±1cm', label: 'Measurement accuracy' },
              { num: '3D', label: 'GLB model exports' },
            ].map((s) => (
              <div key={s.label}>
                <div className="font-display text-4xl text-snow leading-none">
                  {s.num}
                </div>
                <div className="font-mono-dm text-[0.62rem] tracking-widest uppercase text-smoke mt-2">
                  {s.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right — Drone SVG illustration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4, ease: 'easeOut' }}
          className="hidden lg:flex items-center justify-center"
        >
          <DroneIllustration />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="font-mono-dm text-[0.6rem] tracking-widest uppercase text-smoke">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ArrowDown size={14} className="text-smoke" />
        </motion.div>
      </motion.div>
    </section>
  );
}

function DroneIllustration() {
  return (
    <motion.div
      animate={{ y: [0, -18, 0], rotate: [-0.5, 0.5, -0.5] }}
      transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      className="relative w-full max-w-[520px]"
    >
      <svg viewBox="0 0 520 520" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Glow rings */}
        <circle cx="260" cy="280" r="180" stroke="#00D4FF" strokeWidth="0.5" strokeDasharray="4 8" opacity="0.2" />
        <circle cx="260" cy="280" r="220" stroke="#00D4FF" strokeWidth="0.3" strokeDasharray="2 12" opacity="0.12" />

        {/* Shadow ellipse below drone */}
        <ellipse cx="260" cy="390" rx="90" ry="14" fill="#00D4FF" opacity="0.06" />

        {/* === DRONE BODY === */}
        {/* Central body */}
        <rect x="220" y="235" width="80" height="50" rx="8" fill="#0E1525" stroke="#1A2640" strokeWidth="1.5" />
        <rect x="230" y="245" width="60" height="30" rx="4" fill="#0A0E1A" stroke="#00D4FF" strokeWidth="0.8" opacity="0.6" />
        {/* Camera pod */}
        <rect x="244" y="283" width="32" height="20" rx="10" fill="#0E1525" stroke="#1A2640" strokeWidth="1" />
        <circle cx="260" cy="293" r="7" fill="#04080F" stroke="#00D4FF" strokeWidth="1" opacity="0.8" />
        <circle cx="260" cy="293" r="3.5" fill="#00D4FF" opacity="0.4" />

        {/* Status LED */}
        <circle cx="260" cy="248" r="3" fill="#FF6B1A" opacity="0.9" />

        {/* === ARMS === */}
        {/* Front-left arm */}
        <line x1="225" y1="245" x2="145" y2="195" stroke="#1A2640" strokeWidth="4" strokeLinecap="round" />
        <line x1="225" y1="245" x2="145" y2="195" stroke="#00D4FF" strokeWidth="1" strokeLinecap="round" opacity="0.3" />
        {/* Front-right arm */}
        <line x1="295" y1="245" x2="375" y2="195" stroke="#1A2640" strokeWidth="4" strokeLinecap="round" />
        <line x1="295" y1="245" x2="375" y2="195" stroke="#00D4FF" strokeWidth="1" strokeLinecap="round" opacity="0.3" />
        {/* Rear-left arm */}
        <line x1="225" y1="275" x2="145" y2="325" stroke="#1A2640" strokeWidth="4" strokeLinecap="round" />
        <line x1="225" y1="275" x2="145" y2="325" stroke="#00D4FF" strokeWidth="1" strokeLinecap="round" opacity="0.3" />
        {/* Rear-right arm */}
        <line x1="295" y1="275" x2="375" y2="325" stroke="#1A2640" strokeWidth="4" strokeLinecap="round" />
        <line x1="295" y1="275" x2="375" y2="325" stroke="#00D4FF" strokeWidth="1" strokeLinecap="round" opacity="0.3" />

        {/* === MOTOR MOUNTS === */}
        {[
          { cx: 145, cy: 195 },
          { cx: 375, cy: 195 },
          { cx: 145, cy: 325 },
          { cx: 375, cy: 325 },
        ].map(({ cx, cy }, i) => (
          <g key={i}>
            <circle cx={cx} cy={cy} r="18" fill="#0E1525" stroke="#1A2640" strokeWidth="1.5" />
            <circle cx={cx} cy={cy} r="10" fill="#0A0E1A" stroke="#00D4FF" strokeWidth="0.8" opacity="0.5" />
          </g>
        ))}

        {/* === PROPELLERS (spinning look with offset lines) === */}
        {[
          { cx: 145, cy: 195, color: '#00D4FF' },
          { cx: 375, cy: 195, color: '#00D4FF' },
          { cx: 145, cy: 325, color: '#FF6B1A' },
          { cx: 375, cy: 325, color: '#FF6B1A' },
        ].map(({ cx, cy, color }, i) => (
          <g key={`prop-${i}`} opacity="0.7">
            <ellipse cx={cx} cy={cy} rx="36" ry="4" fill={color} opacity="0.12" />
            <line x1={cx - 36} y1={cy} x2={cx + 36} y2={cy} stroke={color} strokeWidth="1.5" opacity="0.35" strokeLinecap="round" />
            <line x1={cx - 30} y1={cy - 3} x2={cx + 30} y2={cy + 3} stroke={color} strokeWidth="1" opacity="0.2" strokeLinecap="round" />
          </g>
        ))}

        {/* === LANDING GEAR === */}
        <line x1="238" y1="303" x2="225" y2="330" stroke="#1A2640" strokeWidth="2" />
        <line x1="282" y1="303" x2="295" y2="330" stroke="#1A2640" strokeWidth="2" />
        <line x1="215" y1="330" x2="305" y2="330" stroke="#1A2640" strokeWidth="2.5" strokeLinecap="round" />

        {/* === TERRAIN/SCAN BEAMS below === */}
        {[...Array(5)].map((_, i) => (
          <line
            key={`beam-${i}`}
            x1="260"
            y1="300"
            x2={210 + i * 20}
            y2="380"
            stroke="#00D4FF"
            strokeWidth="0.5"
            opacity={0.06 + i * 0.015}
            strokeDasharray="3 5"
          />
        ))}

        {/* Terrain scan dots */}
        {[
          [210, 380], [225, 385], [240, 378], [255, 383], [270, 380],
          [285, 385], [300, 379], [215, 390], [250, 392], [285, 388],
        ].map(([x, y], i) => (
          <circle key={`dot-${i}`} cx={x} cy={y} r="1.5" fill="#00D4FF" opacity="0.35" />
        ))}

        {/* Measurement lines */}
        <line x1="180" y1="380" x2="340" y2="380" stroke="#00D4FF" strokeWidth="0.5" strokeDasharray="4 6" opacity="0.25" />
        <line x1="180" y1="376" x2="180" y2="384" stroke="#00D4FF" strokeWidth="1" opacity="0.4" />
        <line x1="340" y1="376" x2="340" y2="384" stroke="#00D4FF" strokeWidth="1" opacity="0.4" />
        <text x="252" y="374" fontSize="9" fill="#00D4FF" opacity="0.5" fontFamily="monospace">24.3m</text>
      </svg>
    </motion.div>
  );
}
