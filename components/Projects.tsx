'use client';
import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { MapPin, Calendar, X, Maximize2, RotateCcw } from 'lucide-react';
import dynamic from 'next/dynamic';

// Dynamically import the 3D viewer (no SSR) since Three.js needs browser APIs
const ModelViewer = dynamic(() => import('./ModelViewer'), { ssr: false });

export interface Project {
  id: string;
  title: string;
  category: string;
  location: string;
  date: string;
  description: string;
  tags: string[];
  modelPath: string;
  thumbnailColor: string; // fallback gradient color
  hidden?: boolean;
}

// Add each optimized GLB to /public/models/project-N/model.glb, then update this list.
export const projects: Project[] = [
  {
    id: 'project-1',
    title: 'Residential Rooftop Survey — Ottawa',
    category: 'Roofing Inspection',
    location: 'Ottawa, ON',
    date: '2026-04',
    description:
      'Full photogrammetry capture of a 2-storey residential building rooftop. Delivered a web-optimized GLB model for estimating material replacement and identifying drainage issues.',
    tags: ['Roofing', 'GLB Viewer', 'Area Measurement'],
    modelPath: '/models/project-1/model.glb',
    thumbnailColor: 'from-cyan/20 to-ink',
  },
  {
    id: 'project-2',
    title: 'Residential Rooftop Survey — Scarborough',
    category: 'Roofing Inspection',
    location: 'Scarborough, ON',
    date: '2026-05',
    description:
      'Multi-flight site monitoring. Delivered a web-optimized GLB model for estimating material replacement and identifying drainage issues.',
    tags: ['Roofing', 'GLB Viewer', '3D Model'],
    modelPath: '/models/project-2/model.glb',
    thumbnailColor: 'from-orange/20 to-ink',
  },
  {
    id: 'project-3',
    title: 'Industrial Warehouse Roof — Mississauga',
    category: 'Aerial Measurement',
    location: 'Mississauga, ON',
    date: '2024-07',
    description:
      'Large-scale flat roof survey for a logistics facility. Delivered accurate square footage, slope measurements, and a 3D surface for contractor planning.',
    tags: ['Industrial', 'Flat Roof', 'Measurement'],
    modelPath: '/models/project-3/model.glb',
    thumbnailColor: 'from-cyan/10 to-surface',
    hidden: true,
  },
  {
    id: 'project-4',
    title: 'Townhouse Complex — Etobicoke',
    category: 'Roofing Inspection',
    location: 'Etobicoke, ON',
    date: '2024-09',
    description:
      'Photogrammetry survey of a 14-unit townhouse complex. Models used by the property manager to plan phased re-roofing without disrupting residents.',
    tags: ['Residential', 'Multi-unit', 'Planning'],
    modelPath: '/models/project-4/model.glb',
    thumbnailColor: 'from-orange/10 to-panel',
    hidden: true,
  },
];

// ── Placeholder thumbnail shown before a project is opened ──
function ProjectThumbnail({ project }: { project: Project }) {
  return (
    <div
      className={`w-full h-full bg-gradient-to-br ${project.thumbnailColor} relative overflow-hidden`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(0,212,255,0.14),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(139,92,246,0.14),transparent_35%)]" />

      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-6 left-6 w-24 h-24 border border-cyan/30 rounded-full" />
        <div className="absolute bottom-8 right-8 w-32 h-32 border border-electric/20 rotate-12" />
        <div className="absolute top-1/2 left-1/2 w-40 h-px bg-gradient-to-r from-transparent via-cyan/40 to-transparent -translate-x-1/2" />
        <div className="absolute top-1/2 left-1/2 h-40 w-px bg-gradient-to-b from-transparent via-cyan/30 to-transparent -translate-y-1/2" />
      </div>

      <div className="absolute top-4 left-4">
        <span className="font-mono-dm text-[0.65rem] tracking-widest uppercase text-cyan/70">
          {project.category}
        </span>
      </div>

      <div className="absolute bottom-4 left-4 right-4">
        <div className="h-px w-full bg-gradient-to-r from-cyan/40 via-cyan/10 to-transparent mb-3" />
        <div className="flex items-center justify-between">
          <span className="font-mono-dm text-[0.7rem] tracking-widest uppercase text-slate-300/80">
            Preview
          </span>
          <span className="font-mono-dm text-[0.7rem] tracking-widest uppercase text-cyan/70">
            Aernova
          </span>
        </div>
      </div>
    </div>
  );
}

// ── Full-screen modal with live 3D viewer ──
function ModelModal({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-ink/95 backdrop-blur-2xl flex flex-col"
    >
      {/* Modal header */}
      <div className="flex items-center justify-between px-8 py-5 border-b border-edge shrink-0">
        <div>
          <span className="font-mono-dm text-[0.65rem] tracking-widest uppercase text-cyan block mb-1">
            {project.category}
          </span>
          <h3 className="font-display text-2xl text-snow tracking-wide">
            {project.title.toUpperCase()}
          </h3>
        </div>
        <button
          onClick={onClose}
          className="text-smoke hover:text-frost transition-colors p-2"
          aria-label="Close"
        >
          <X size={22} />
        </button>
      </div>

      {/* Viewer + info */}
      <div className="flex flex-col lg:flex-row flex-1 overflow-hidden">
        {/* 3D canvas */}
        <div className="flex-1 min-h-[300px] relative">
          <ModelViewer modelPath={project.modelPath} className="w-full h-full" />
        </div>

        {/* Sidebar info */}
        <div className="lg:w-80 p-8 border-t lg:border-t-0 lg:border-l border-edge overflow-y-auto shrink-0">
          <p className="font-body font-light text-frost/70 leading-relaxed text-sm mb-8">
            {project.description}
          </p>

          <div className="space-y-5">
            <div>
              <span className="font-mono-dm text-[0.6rem] tracking-widest uppercase text-smoke block mb-1">
                Location
              </span>
              <span className="font-body text-sm text-frost flex items-center gap-1.5">
                <MapPin size={12} className="text-cyan" />
                {project.location}
              </span>
            </div>
            <div>
              <span className="font-mono-dm text-[0.6rem] tracking-widest uppercase text-smoke block mb-1">
                Captured
              </span>
              <span className="font-body text-sm text-frost flex items-center gap-1.5">
                <Calendar size={12} className="text-cyan" />
                {new Date(project.date).toLocaleDateString('en-CA', { year: 'numeric', month: 'long' })}
              </span>
            </div>
            <div>
              <span className="font-mono-dm text-[0.6rem] tracking-widest uppercase text-smoke block mb-2">
                Tags
              </span>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((t) => (
                  <span
                    key={t}
                    className="font-mono-dm text-[0.6rem] tracking-wider uppercase text-cyan border border-cyan/30 px-2 py-1"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <span className="font-mono-dm text-[0.6rem] tracking-widest uppercase text-smoke block mb-2">
                File Formats
              </span>
              <div className="flex gap-2">
                {['.GLB', '.WEBP', '.KTX2'].map((f) => (
                  <span
                    key={f}
                    className="font-mono-dm text-[0.6rem] tracking-wider uppercase text-orange border border-orange/30 px-2 py-1"
                  >
                    {f}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <a
            href="#contact"
            onClick={onClose}
            className="font-mono-dm text-[0.72rem] tracking-widest uppercase text-ink bg-cyan px-6 py-3 mt-10 inline-block hover:bg-[#33ddff] transition-colors"
          >
            Request Similar Project
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="projects" className="relative py-32 px-8 lg:px-16">
      <div ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <span className="font-mono-dm text-[0.65rem] tracking-[0.25em] uppercase text-cyan block mb-4">
            ◈ Our Work
          </span>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <h2 className="font-display text-[clamp(2.8rem,5vw,5rem)] text-snow tracking-wide leading-none">
              PROJECT<br />PORTFOLIO
            </h2>
            <p className="font-body font-light text-frost/60 text-base max-w-sm leading-relaxed">
              Interactive 3D models from real drone captures. Click any project to
              explore the full model.
            </p>
          </div>
        </motion.div>

        {/* Project grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.filter(p => !p.hidden).map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group cursor-pointer border border-edge hover:border-cyan/50 transition-all duration-300 bg-panel overflow-hidden"
              onClick={() => setActiveProject(project)}
              onMouseEnter={() => {
                void import('./ModelViewer');
              }}
            >
              {/* Thumbnail */}
              <div className="relative h-64 overflow-hidden">
                <ProjectThumbnail project={project} />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-cyan/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="flex items-center gap-2 bg-ink/80 border border-cyan/40 px-4 py-2">
                    <Maximize2 size={14} className="text-cyan" />
                    <span className="font-mono-dm text-[0.65rem] tracking-widest uppercase text-cyan">
                      Open 3D Viewer
                    </span>
                  </div>
                </div>
              </div>

              {/* Card info */}
              <div className="p-7">
                <div className="flex items-start justify-between mb-3">
                  <span className="font-mono-dm text-[0.62rem] tracking-widest uppercase text-orange">
                    {project.category}
                  </span>
                  <span className="font-mono-dm text-[0.62rem] tracking-widest uppercase text-smoke">
                    {new Date(project.date).toLocaleDateString('en-CA', { year: 'numeric', month: 'short' })}
                  </span>
                </div>
                <h3 className="font-display text-xl text-snow tracking-wide leading-tight mb-3">
                  {project.title.toUpperCase()}
                </h3>
                <p className="font-body font-light text-[0.85rem] text-smoke leading-relaxed line-clamp-2">
                  {project.description}
                </p>
                <div className="flex items-center gap-1.5 mt-4 text-smoke">
                  <MapPin size={11} className="text-cyan shrink-0" />
                  <span className="font-mono-dm text-[0.62rem] tracking-wide">{project.location}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Add project CTA for Aernova */}
        {/* <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="mt-6 border border-dashed border-edge p-8 flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <div>
            <span className="font-mono-dm text-[0.62rem] tracking-widest uppercase text-smoke block mb-1">
              For Aernova
            </span>
            <p className="font-body text-frost/70 text-sm">
              Add your optimized DroneDeploy GLB exports to{' '}
              <code className="text-cyan font-mono-dm text-xs bg-edge px-1.5 py-0.5">
                /public/models/project-N/model.glb
              </code>{' '}
              and update the projects array in{' '}
              <code className="text-cyan font-mono-dm text-xs bg-edge px-1.5 py-0.5">
                components/Projects.tsx
              </code>
            </p>
          </div>
          <RotateCcw size={20} className="text-smoke shrink-0" />
        </motion.div> */}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {activeProject && (
          <ModelModal project={activeProject} onClose={() => setActiveProject(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}