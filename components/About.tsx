'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Building2, Users, MapPin, CalendarDays } from 'lucide-react';

const facts = [
  { icon: Building2, label: 'Industry', value: 'Construction & Roofing' },
  { icon: Users, label: 'Team Size', value: '2–10 Employees' },
  { icon: MapPin, label: 'Headquarters', value: 'Toronto, ON' },
  { icon: CalendarDays, label: 'Founded', value: '2023' },
];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="about" className="relative py-32 bg-surface border-t border-b border-edge overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-cyan/4 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 px-8 lg:px-16" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Left */}
          <div>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="font-mono-dm text-[0.65rem] tracking-[0.25em] uppercase text-cyan block mb-4"
            >
              ◈ About Us
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display text-[clamp(2.5rem,4.5vw,4.5rem)] text-snow tracking-wide leading-none mb-8"
            >
              PRECISION-<br />DRIVEN<br />
              <span className="text-cyan">RESULTS</span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-5 font-body font-light text-frost/70 leading-relaxed"
            >
              <p>
                Aernova was founded in Toronto with a single focus:
                giving construction and roofing professionals the accurate data they need to
                work smarter and safer.
              </p>
              <p>
                We use industry-leading drone hardware and structured photogrammetry workflows
                to turn real-world sites into precise 3D digital assets by using optimized GLB models
                that can be opened quickly in the browser, measured, annotated, and shared with your team.
              </p>
              <p>
                No ladders. No scaffolding. No risk. Just actionable data, delivered fast.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="mt-10"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-edge border border-edge/80 flex items-center justify-center overflow-hidden">
                  <span className="font-display text-xl text-cyan">A</span>
                </div>
                <div>
                  <span className="font-body font-semibold text-snow text-sm block">Aernova Team</span>
                  <span className="font-mono-dm text-[0.62rem] tracking-widest uppercase text-smoke">
                    Drone Mapping Specialists
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right — Fact cards */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="grid grid-cols-2 gap-4"
          >
            {facts.map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div
                  key={f.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.25 + i * 0.08 }}
                  className="bg-panel border border-edge p-7 flex flex-col gap-4 hover:border-cyan/40 transition-colors duration-300"
                >
                  <Icon size={24} className="text-cyan" strokeWidth={1.5} />
                  <div>
                    <span className="font-mono-dm text-[0.6rem] tracking-widest uppercase text-smoke block mb-1">
                      {f.label}
                    </span>
                    <span className="font-body font-semibold text-snow text-sm">
                      {f.value}
                    </span>
                  </div>
                </motion.div>
              );
            })}

            {/* Full-width "why choose us" card */}
            <div className="col-span-2 bg-panel border border-cyan/20 p-7 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan/0 via-cyan/60 to-cyan/0" />
              <p className="font-mono-dm text-[0.65rem] tracking-widest uppercase text-cyan mb-3">
                Why contractors trust us
              </p>
              <p className="font-body font-light text-frost/70 text-sm leading-relaxed">
                We don't just fly a drone and hand you files, we work with you to make sure the
                data is practical and directly supports your planning, estimating, and safety workflow.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}