import { Instagram, Linkedin, Mail, MapPin, Phone } from 'lucide-react';

const quickLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#projects' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

const legalLinks = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms', href: '/terms' },
  { label: 'Accessibility', href: '/accessibility' },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-edge bg-surface px-8 py-12 lg:px-16">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan/35 to-transparent" />

      <div className="grid gap-10 lg:grid-cols-[1.25fr_0.75fr_0.95fr_0.7fr]">
        <div>
          <a href="#" className="inline-flex items-center min-h-11" aria-label="Aernova Inc. home">
            <img
              src="/brand/Aernova.png"
              alt="Aernova Inc."
              className="w-32 h-auto object-contain opacity-95"
            />
          </a>
          <p className="mt-5 max-w-sm font-body text-sm leading-relaxed text-frost/64">
            Precision drone photogrammetry for construction, roofing, and site
            documentation across the Greater Toronto Area and Ottawa.
          </p>
        </div>

        <div>
          <span className="font-mono-dm text-[0.6rem] tracking-widest uppercase text-cyan block mb-4">
            Navigate
          </span>
          <nav className="flex flex-col gap-2" aria-label="Footer navigation">
            {quickLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-mono-dm text-[0.68rem] tracking-widest uppercase text-smoke min-h-9 inline-flex items-center hover:text-cyan transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <div>
          <span className="font-mono-dm text-[0.6rem] tracking-widest uppercase text-cyan block mb-4">
            Contact
          </span>
          <div className="space-y-3">
            <a
              href="mailto:sales@aernova.ca"
              className="flex items-center gap-3 font-body text-sm text-frost min-h-10 hover:text-cyan transition-colors"
            >
              <Mail size={15} className="text-cyan shrink-0" />
              sales@aernova.ca
            </a>
            <a
              href="tel:+16477108581"
              className="flex items-center gap-3 font-body text-sm text-frost min-h-10 hover:text-cyan transition-colors"
            >
              <Phone size={15} className="text-cyan shrink-0" />
              +1 (647) 710-8581
            </a>
            <div className="flex items-start gap-3 font-body text-sm text-frost/72">
              <MapPin size={15} className="text-cyan shrink-0 mt-0.5" />
              <span>Greater Toronto Area & Ottawa, ON</span>
            </div>
          </div>
        </div>

        <div>
          <span className="font-mono-dm text-[0.6rem] tracking-widest uppercase text-cyan block mb-4">
            Social
          </span>
          <div className="flex gap-3">
            <a
              href="https://www.linkedin.com/company/aernova-inc/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Aernova Inc. on LinkedIn"
              className="w-11 h-11 border border-edge inline-flex items-center justify-center text-smoke hover:text-cyan hover:border-cyan/45 transition-colors"
            >
              <Linkedin size={17} />
            </a>
            <a
              href="https://www.instagram.com/aernova.ca/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Aernova Inc. on Instagram"
              className="w-11 h-11 border border-edge inline-flex items-center justify-center text-smoke hover:text-cyan hover:border-cyan/45 transition-colors"
            >
              <Instagram size={17} />
            </a>
          </div>
          <a
            href="#contact"
            className="mt-6 font-mono-dm text-[0.68rem] tracking-widest uppercase text-ink bg-cyan px-5 py-3 min-h-11 inline-flex items-center hover:bg-[#33ddff] transition-colors"
          >
            Request a Quote
          </a>
        </div>
      </div>

      <div className="mt-12 border-t border-edge pt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <p className="font-mono-dm text-[0.58rem] tracking-widest uppercase text-smoke/70">
          © {new Date().getFullYear()} Aernova Inc.
        </p>
        <nav className="flex flex-wrap gap-x-6 gap-y-2" aria-label="Legal navigation">
          {legalLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-mono-dm text-[0.58rem] tracking-widest uppercase text-smoke/70 hover:text-cyan transition-colors min-h-8 inline-flex items-center"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
