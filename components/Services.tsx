'use client';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Layers, Ruler, Shield, FileBox, Eye, Zap } from 'lucide-react';

const services = [
  {
    icon: Layers,
    num: '01',
    title: 'Photogrammetry & 3D Modeling',
    desc: 'We capture overlapping aerial imagery and process it into precise, textured 3D models, ready to view, measure, and share in a lightweight web viewer.',
  },
  {
    icon: Ruler,
    num: '02',
    title: 'Aerial Measurement',
    desc: 'Sub-centimeter precision for rooftop dimensions, surface areas, linear distances, and volume calculations without a single person on the roof.',
  },
  {
    icon: Shield,
    num: '03',
    title: 'Roof Inspection',
    desc: 'High-resolution aerial imaging identifies damage, wear patterns, and risk areas for roofers and insurers without requiring direct access.',
  },
  {
    icon: FileBox,
    num: '04',
    title: '3D Model Exports',
    desc: 'Every project can be delivered as an optimized GLB for web viewing, plus source files for teams that need editing in professional 3D software.',
  },
  {
    icon: Eye,
    num: '05',
    title: 'Construction Site Monitoring',
    desc: 'Track project progress over time with repeat drone flights. Compare models across milestones to catch deviations early and keep contractors aligned.',
  },
  {
    icon: Zap,
    num: '06',
    title: 'Rapid Turnaround',
    desc: 'We process and deliver your models fast. Most projects are turned around in 12–24 hours so planning and estimating can begin immediately.',
  },
];

export default function Services() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="services" className="relative py-32 bg-surface border-t border-b border-edge">
      {/* Diagonal accent stripe */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan/40 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan/20 to-transparent" />

      <div className="relative z-10 px-8 lg:px-16" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <span className="font-mono-dm text-[0.65rem] tracking-[0.25em] uppercase text-cyan block mb-4">
            ◈ What We Do
          </span>
          <h2 className="font-display text-[clamp(2.8rem,5vw,5rem)] text-snow tracking-wide leading-none">
            OUR SERVICES
          </h2>
          <p className="font-body font-light text-frost/60 text-lg mt-4 max-w-xl leading-relaxed">
            From raw aerial data collection to polished 3D deliverables which are built for contractors
            who need accuracy, not guesswork.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-edge">
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group bg-panel p-10 relative overflow-hidden hover:bg-[#111828] transition-colors duration-300"
              >
                {/* Top accent line on hover */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Big background number */}
                <span className="font-display text-[6rem] text-cyan/4 absolute -top-2 right-4 leading-none select-none">
                  {s.num}
                </span>

                <Icon
                  size={36}
                  className="text-cyan mb-6 relative z-10"
                  strokeWidth={1.5}
                />

                <h3 className="font-display text-2xl text-snow tracking-wide mb-4 leading-tight relative z-10">
                  {s.title.toUpperCase()}
                </h3>

                <p className="font-body font-light text-[0.9rem] text-smoke leading-relaxed relative z-10">
                  {s.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}