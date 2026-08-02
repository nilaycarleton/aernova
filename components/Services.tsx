'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Eye, FileBox, Layers, Ruler, Shield, Zap } from 'lucide-react';
import { cardReveal, sectionReveal, staggerGroup, viewportOnce } from './motionPresets';

const services = [
  {
    icon: Layers,
    num: '01',
    title: 'Photogrammetry & 3D Modeling',
    meta: 'Capture to optimized GLB',
    desc: 'Overlapping aerial imagery is processed into precise textured models that can be viewed, measured, annotated, and shared in-browser.',
  },
  {
    icon: Ruler,
    num: '02',
    title: 'Aerial Measurement',
    meta: 'Lengths, areas, slopes',
    desc: 'Roof dimensions, surface areas, linear distances, and volume calculations without sending a crew onto an unsafe surface.',
  },
  {
    icon: Shield,
    num: '03',
    title: 'Roof Inspection',
    meta: 'Safer site evidence',
    desc: 'High-resolution aerial imaging helps roofers, estimators, and insurers identify damage, drainage, wear patterns, and access risks.',
  },
  {
    icon: FileBox,
    num: '04',
    title: '3D Model Exports',
    meta: 'Web + source deliverables',
    desc: 'Projects can be delivered as optimized GLB files for web viewing plus source-ready assets for professional 3D and estimating workflows.',
  },
  {
    icon: Eye,
    num: '05',
    title: 'Construction Monitoring',
    meta: 'Progress over time',
    desc: 'Repeat flights create comparable visual records across milestones so contractors can spot deviations and keep teams aligned.',
  },
  {
    icon: Zap,
    num: '06',
    title: 'Rapid Turnaround',
    meta: 'Typical 12-24h delivery',
    desc: 'Structured field capture and processing workflows help get usable site data back to your team while decisions are still active.',
  },
];

export default function Services() {
  const ref = useRef(null);
  const inView = useInView(ref, viewportOnce);

  return (
    <section id="services" className="relative py-28 lg:py-32 bg-surface border-t border-b border-edge overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan/45 to-transparent" />
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(90deg,transparent_0,transparent_calc(100%-1px),rgba(0,212,255,0.08)_calc(100%-1px))] bg-[length:25%_100%]" />

      <div className="relative z-10 px-8 lg:px-16" ref={ref}>
        <motion.div
          variants={sectionReveal}
          initial={false}
          animate="visible"
          className="mb-16 lg:mb-20 grid lg:grid-cols-[0.8fr_1fr] gap-8 items-end"
        >
          <div>
            <span className="font-mono-dm text-[0.65rem] tracking-[0.25em] uppercase text-cyan block mb-4">
              What We Do
            </span>
            <h2 className="font-display text-[clamp(2.8rem,5vw,5rem)] text-snow tracking-wide leading-none">
              TECHNICAL<br />CAPABILITIES
            </h2>
          </div>
          <p className="font-body font-light text-frost/64 text-lg max-w-2xl leading-relaxed lg:justify-self-end">
            Practical drone data for contractors who need measurements, documentation,
            and shareable 3D assets without slowing down the site.
          </p>
        </motion.div>

        <motion.div
          variants={staggerGroup}
          initial={false}
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-px bg-edge"
        >
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <motion.article
                key={service.title}
                variants={cardReveal}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className="group industrial-panel p-8 lg:p-9 relative overflow-hidden min-h-[300px]"
              >
                <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-cyan/0 via-cyan/55 to-cyan/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="font-display text-[6rem] text-cyan/5 absolute -top-3 right-5 leading-none select-none">
                  {service.num}
                </span>

                <div className="relative z-10 flex h-full flex-col">
                  <div className="mb-7 flex items-center justify-between">
                    <div className="w-12 h-12 border border-edge bg-ink/50 flex items-center justify-center group-hover:border-cyan/45 transition-colors">
                      <Icon size={24} className="text-cyan" strokeWidth={1.45} />
                    </div>
                    <span className="font-mono-dm text-[0.58rem] tracking-widest uppercase text-smoke">
                      {service.meta}
                    </span>
                  </div>

                  <h3 className="font-display text-3xl text-snow tracking-wide leading-tight mb-5">
                    {service.title.toUpperCase()}
                  </h3>

                  <p className="font-body font-light text-[0.94rem] text-smoke leading-relaxed">
                    {service.desc}
                  </p>

                  <div className="mt-auto pt-8">
                    <div className="h-px w-full bg-edge mb-3" />
                    <span className="font-mono-dm text-[0.58rem] tracking-widest uppercase text-cyan/75">
                      Aernova field workflow
                    </span>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
