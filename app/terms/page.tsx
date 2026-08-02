import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms',
  description:
    'Website terms for Aernova Inc., a drone photogrammetry and aerial measurement service provider in Ontario.',
  alternates: {
    canonical: '/terms',
  },
  robots: {
    index: false,
    follow: true,
  },
};

const effectiveDate = 'August 2, 2026';

const sections = [
  {
    title: 'Acceptance of Terms',
    body: [
      'These Terms apply to your use of the Aernova Inc. website. By using this website, you agree to these Terms. If you do not agree, do not use the website.',
      'Separate written proposals, statements of work, invoices, or service agreements may apply to paid services. If there is a conflict, the signed service agreement controls for that project.',
    ],
  },
  {
    title: 'Website Information',
    body: [
      'Website content is provided for general information about Aernova Inc. services. It is not engineering, architectural, legal, insurance, safety, or construction advice.',
      'Project examples, descriptions, and visuals are illustrative and may not represent the exact scope, conditions, accuracy, deliverables, or timing of a future project.',
    ],
  },
  {
    title: 'Quotes and Project Requests',
    body: [
      'Submitting a form, email, or phone inquiry does not create a client relationship or binding obligation for Aernova Inc. to provide services.',
      'Quotes and timelines depend on project scope, location, weather, site access, regulatory requirements, flight safety, data quality, and other operational factors.',
    ],
  },
  {
    title: 'Drone Operations and Site Access',
    body: [
      'Drone services may require appropriate site permissions, safe operating conditions, and compliance with applicable aviation, privacy, property, and safety requirements.',
      'You are responsible for providing accurate project information and confirming that you have authority to request work for the relevant property or site.',
    ],
  },
  {
    title: 'Acceptable Use',
    body: [
      'You may not misuse this website, attempt unauthorized access, interfere with its operation, submit malicious code, scrape content at unreasonable volume, or use the website for unlawful purposes.',
    ],
  },
  {
    title: 'Intellectual Property',
    body: [
      'The Aernova name, branding, website design, copy, images, graphics, models, and other materials are owned by Aernova Inc. or used with permission, unless otherwise stated.',
      'You may view the website for personal or internal business evaluation. You may not copy, modify, publish, sell, or redistribute website materials without written permission.',
    ],
  },
  {
    title: 'Third-Party Services and Links',
    body: [
      'This website may link to third-party websites or use third-party services for forms, anti-spam checks, hosting, or communications. Aernova Inc. is not responsible for third-party websites, policies, or services.',
    ],
  },
  {
    title: 'No Warranties',
    body: [
      'This website is provided on an "as is" and "as available" basis. We do not warrant that the website will be uninterrupted, error-free, secure, or free of harmful components.',
    ],
  },
  {
    title: 'Limitation of Liability',
    body: [
      'To the maximum extent permitted by law, Aernova Inc. will not be liable for indirect, incidental, consequential, special, punitive, or similar damages arising from use of this website.',
      'Nothing in these Terms limits liability that cannot be limited under applicable law.',
    ],
  },
  {
    title: 'Governing Law',
    body: [
      'These Terms are governed by the laws of Ontario and the applicable federal laws of Canada, without regard to conflict of law rules.',
    ],
  },
  {
    title: 'Changes and Contact',
    body: [
      'We may update these Terms from time to time. The updated version will be posted on this page with a new effective date.',
      'Questions about these Terms can be sent to sales@aernova.ca.',
    ],
  },
];

export default function TermsPage() {
  return (
    <main id="main" className="min-h-screen px-8 py-24 lg:px-16">
      <a href="/" className="font-mono-dm text-[0.65rem] tracking-widest uppercase text-cyan">
        Back to Aernova
      </a>
      <div className="max-w-3xl mt-14">
        <span className="font-mono-dm text-[0.65rem] tracking-[0.25em] uppercase text-cyan block mb-4">
          Terms
        </span>
        <h1 className="font-display text-[clamp(3rem,7vw,6rem)] text-snow tracking-wide leading-none mb-4">
          TERMS
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
