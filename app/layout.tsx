import type { Metadata } from 'next';
import '../styles/globals.css';

const siteUrl = 'https://aernova.ca';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Aernova Inc. | Drone Photogrammetry & 3D Mapping in Ontario',
    template: '%s | Aernova Inc.',
  },
  description:
    'Aernova Inc. provides drone photogrammetry, roof inspection, aerial measurement, and 3D site modeling for construction and roofing teams across the Greater Toronto Area and Ottawa.',
  keywords: [
    'Aernova Inc',
    'drone photogrammetry',
    'drone photogrammetry Toronto',
    'drone photogrammetry Ottawa',
    '3D drone mapping',
    'construction drone',
    'construction drone survey',
    'roofing inspection drone',
    'aerial measurement',
    'roof measurement Ontario',
    'GLB 3D model',
  ],
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  openGraph: {
    title: 'Aernova Inc. | Drone Photogrammetry & 3D Mapping',
    description:
      'Precision drone photogrammetry, aerial measurement, roof inspection, and 3D modeling across the GTA and Ottawa.',
    url: siteUrl,
    siteName: 'Aernova Inc.',
    type: 'website',
    locale: 'en_CA',
    images: ['/brand/Aernova.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aernova Inc. | Drone Photogrammetry & 3D Mapping',
    description:
      'Drone photogrammetry, aerial measurement, and 3D site modeling for construction and roofing teams across the GTA and Ottawa.',
    images: ['/brand/Aernova.png'],
  },
};

const structuredData = [
  {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'ProfessionalService'],
    '@id': `${siteUrl}/#business`,
    name: 'Aernova Inc.',
    url: siteUrl,
    logo: `${siteUrl}/brand/Aernova.png`,
    image: `${siteUrl}/brand/Aernova.png`,
    description:
      'Drone photogrammetry, aerial measurement, roof inspection, and 3D site modeling for construction and roofing teams across the Greater Toronto Area and Ottawa.',
    email: 'sales@aernova.ca',
    telephone: '+1-647-710-8581',
    priceRange: '$$',
    foundingDate: '2023',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Toronto',
      addressRegion: 'ON',
      addressCountry: 'CA',
    },
    areaServed: [
      { '@type': 'City', name: 'Toronto' },
      { '@type': 'AdministrativeArea', name: 'Greater Toronto Area' },
      { '@type': 'City', name: 'Ottawa' },
      { '@type': 'AdministrativeArea', name: 'Ontario' },
    ],
    sameAs: [
      'https://www.linkedin.com/company/aernova-inc/',
      'https://www.instagram.com/aernova.ca/',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'sales',
      email: 'sales@aernova.ca',
      telephone: '+1-647-710-8581',
      areaServed: 'CA-ON',
      availableLanguage: ['English'],
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Drone Photogrammetry Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Photogrammetry & 3D Modeling',
            serviceType: 'Drone photogrammetry and optimized GLB model delivery',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Aerial Measurement',
            serviceType: 'Roof and construction site measurement',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Roof Inspection',
            serviceType: 'Drone roof inspection and visual documentation',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Construction Site Monitoring',
            serviceType: 'Repeat drone capture for construction progress documentation',
          },
        },
      ],
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteUrl}/#website`,
    name: 'Aernova Inc.',
    url: siteUrl,
    publisher: { '@id': `${siteUrl}/#business` },
    inLanguage: 'en-CA',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${siteUrl}/#webpage`,
    url: siteUrl,
    name: 'Aernova Inc. | Drone Photogrammetry & 3D Mapping in Ontario',
    description:
      'Landing page for Aernova Inc., a drone photogrammetry and aerial measurement company serving construction and roofing teams in the GTA and Ottawa.',
    isPartOf: { '@id': `${siteUrl}/#website` },
    about: { '@id': `${siteUrl}/#business` },
    primaryImageOfPage: `${siteUrl}/brand/Aernova.png`,
    inLanguage: 'en-CA',
  },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-cyan focus:px-4 focus:py-3 focus:font-mono-dm focus:text-[0.72rem] focus:tracking-widest focus:text-ink focus:uppercase"
        >
          Skip to content
        </a>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </body>
    </html>
  );
}
