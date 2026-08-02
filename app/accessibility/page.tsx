import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Accessibility',
  description:
    'Accessibility statement for Aernova Inc. and its drone photogrammetry website.',
  alternates: {
    canonical: '/accessibility',
  },
  robots: {
    index: false,
    follow: true,
  },
};

const effectiveDate = 'August 2, 2026';

const sections = [
  {
    title: 'Commitment',
    body: [
      'Aernova Inc. is committed to providing a website experience that is usable by as many people as reasonably possible, including people who use assistive technologies.',
      'We aim to improve accessibility over time and to respond promptly when barriers are identified.',
    ],
  },
  {
    title: 'Standards We Consider',
    body: [
      "Ontario's accessibility framework references the Accessibility for Ontarians with Disabilities Act, 2005 (AODA) and the Web Content Accessibility Guidelines (WCAG).",
      'Although requirements vary by organization type and size, our goal is to align public website content with WCAG Level AA principles where practical: perceivable, operable, understandable, and robust.',
    ],
  },
  {
    title: 'Current Measures',
    body: [
      'This website includes semantic landmarks, a skip link, keyboard-accessible navigation, visible focus states, labeled form fields, descriptive link text, responsive layouts, and reduced-motion support.',
      'We test key pages on desktop and mobile viewports and review important interactions such as navigation, contact links, and project viewer access.',
    ],
  },
  {
    title: 'Known Limitations',
    body: [
      'Some interactive 3D model content may be difficult to use with certain assistive technologies. Where a 3D model is not usable, contact us and we will provide project information in a reasonable alternative format where available.',
      'Third-party components, including captcha or anti-spam services, may have accessibility characteristics outside our direct control.',
    ],
  },
  {
    title: 'Feedback and Alternate Formats',
    body: [
      'If you experience an accessibility barrier or need information in another format, contact sales@aernova.ca.',
      'Please include the page URL, the barrier you encountered, your browser or device if relevant, and the format or accommodation you are requesting. We will review accessibility feedback and respond as soon as reasonably possible.',
    ],
  },
  {
    title: 'Updates',
    body: [
      'We may update this Accessibility Statement as the website changes or as accessibility practices improve.',
    ],
  },
];

export default function AccessibilityPage() {
  return (
    <main id="main" className="min-h-screen px-8 py-24 lg:px-16">
      <a href="/" className="font-mono-dm text-[0.65rem] tracking-widest uppercase text-cyan">
        Back to Aernova
      </a>
      <div className="max-w-3xl mt-14">
        <span className="font-mono-dm text-[0.65rem] tracking-[0.25em] uppercase text-cyan block mb-4">
          Accessibility
        </span>
        <h1 className="font-display text-[clamp(3rem,7vw,6rem)] text-snow tracking-wide leading-none mb-4">
          ACCESSIBILITY
        </h1>
        <p className="font-mono-dm text-[0.65rem] tracking-widest uppercase text-smoke mb-10">
          Effective {effectiveDate}
        </p>
        <div className="space-y-8">
          {sections.map((section) => (
            <section key={section.title} className="border-t border-edge pt-6">
              <h2 className="font-display text-3xl text-snow tracking-wide mb-3">
                {section.title.toUpperCase()}
              </h2>
              <div className="space-y-3">
                {section.body.map((paragraph) => (
                  <p key={paragraph} className="font-body font-light text-frost/72 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
