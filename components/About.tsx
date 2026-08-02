'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Building2, CalendarDays, MapPin, ShieldCheck, Users } from 'lucide-react';
import { cardReveal, sectionReveal, staggerGroup, viewportOnce } from './motionPresets';

const facts = [
  { icon: Building2, label: 'Industry', value: 'Construction & Roofing' },
  { icon: Users, label: 'Team Size', value: '2-10 Employees' },
  { icon: MapPin, label: 'Service Area', value: 'GTA & Ottawa, ON' },
  { icon: CalendarDays, label: 'Founded', value: '2023' },
];

const workflow = [
  'Capture aerial site imagery with safe flight planning.',
  'Process photogrammetry into usable 3D deliverables.',
  'Share practical measurements and model assets with the project team.',
];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, viewportOnce);

  return (
    <section id="about" className="relative py-28 lg:py-32 bg-surface border-t border-b border-edge overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-cyan/4 blur-[120px]" />
      </div>

      <div className="relative z-10 px-8 lg:px-16" ref={ref}>
        <div className="grid lg:grid-cols-[0.95fr_1.05fr] gap-16 xl:gap-20 items-start">
          <motion.div
            variants={sectionReveal}
            initial={false}
            animate="visible"
          >
            <span className="font-mono-dm text-[0.65rem] tracking-[0.25em] uppercase text-cyan block mb-4">
              About Aernova Inc.
            </span>

            <h2 className="font-display text-[clamp(2.7rem,4.5vw,4.7rem)] text-snow tracking-wide leading-none mb-8">
              CLEAN DATA<br />
              FOR FIELD<br />
              <span className="text-cyan">DECISIONS</span>
            </h2>

            <div className="space-y-5 font-body font-light text-frost/72 leading-relaxed max-w-2xl">
              <p>
                Aernova Inc. was founded in Toronto to give construction and roofing
                professionals accurate site data without exposing crews to unnecessary access risk.
              </p>
              <p>
                We use structured drone capture and photogrammetry workflows to turn real
                sites into precise digital assets that can be measured, reviewed, and shared.
              </p>
            </div>

            <div className="mt-10 border border-edge industrial-panel p-6 corner-markers">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 border border-cyan/30 flex items-center justify-center shrink-0">
                  <ShieldCheck size={20} className="text-cyan" strokeWidth={1.5} />
                </div>
                <div>
                  <span className="font-mono-dm text-[0.62rem] tracking-widest uppercase text-cyan block mb-2">
                    Why contractors use us
                  </span>
                  <p className="font-body font-light text-frost/68 text-sm leading-relaxed">
                    The deliverable is built around decisions: estimating, documentation,
                    scope review, safety planning, and stakeholder alignment.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <div>
            <motion.div
              variants={staggerGroup}
              initial={false}
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-edge mb-8"
            >
              {facts.map((fact) => {
                const Icon = fact.icon;

                return (
                  <motion.div
                    key={fact.label}
                    variants={cardReveal}
                    className="industrial-panel p-7 min-h-[160px] flex flex-col justify-between"
                  >
                    <Icon size={24} className="text-cyan" strokeWidth={1.5} />
                    <div>
                      <span className="font-mono-dm text-[0.6rem] tracking-widest uppercase text-smoke block mb-1">
                        {fact.label}
                      </span>
                      <span className="font-body font-semibold text-snow text-sm">
                        {fact.value}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>

            <motion.div
              variants={sectionReveal}
              initial={false}
              animate="visible"
              className="border border-cyan/20 industrial-panel p-7"
            >
              <span className="font-mono-dm text-[0.62rem] tracking-widest uppercase text-cyan block mb-6">
                Standard project flow
              </span>

              <div className="space-y-5">
                {workflow.map((item, index) => (
                  <div key={item} className="grid grid-cols-[2.5rem_1fr] gap-4 items-start">
                    <span className="font-display text-3xl text-cyan/75 leading-none">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <p className="font-body font-light text-frost/70 text-sm leading-relaxed border-b border-edge pb-5 last:border-b-0 last:pb-0">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
