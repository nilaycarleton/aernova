'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const links = [
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#projects' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 lg:px-16 py-3 transition-all duration-300 ${
          scrolled
            ? 'bg-ink/90 backdrop-blur-xl border-b border-edge'
            : 'bg-transparent'
        }`}
      >
        {/* Logo */}
        <a href="#" className="flex items-center gap-3">
          <img
            src="/brand/Aernova.png"
            alt="Aernova"
            className="w-28 h-auto object-contain"
          />
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-10">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="font-mono-dm text-[0.7rem] tracking-widest uppercase text-smoke hover:text-cyan transition-colors duration-200"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href="#contact"
          className="hidden md:inline-block font-mono-dm text-[0.72rem] tracking-widest uppercase text-ink bg-cyan px-6 py-5 hover:bg-[#33ddff] transition-colors duration-200"
        >
          Get a Quote
        </a>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-frost"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-ink/97 backdrop-blur-xl flex flex-col items-center justify-center gap-10 md:hidden"
          >
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="font-display text-4xl text-snow tracking-wider hover:text-cyan transition-colors"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="font-mono-dm text-sm tracking-widest uppercase text-ink bg-cyan px-10 py-4 mt-4"
            >
              Get a Quote
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

