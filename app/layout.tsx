import type { Metadata } from 'next';
import '../styles/globals.css';

export const metadata: Metadata = {
  title: 'Aernova | Precision 3D Drone Mapping Toronto',
  description:
    'Precision-driven drone photogrammetry and aerial measurement for construction and roofing in Toronto, ON. Accurate 3D models, measurements, and visual data.',
  keywords: [
    'drone photogrammetry',
    '3D mapping',
    'construction drone',
    'aerial survey Toronto',
    'roofing inspection drone',
    'GLB 3D model',
  ],
  openGraph: {
    title: 'Aernova',
    description: 'Precision 3D Mapping & Aerial Measurement — Toronto, ON',
    type: 'website',
    images: ['/brand/aernova-logo.jpg'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
