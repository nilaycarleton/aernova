import type { MetadataRoute } from 'next';

const siteUrl = 'https://aernova.ca';
const lastModified = new Date('2026-08-02');

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified,
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${siteUrl}/privacy`,
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.2,
    },
    {
      url: `${siteUrl}/terms`,
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.2,
    },
    {
      url: `${siteUrl}/accessibility`,
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.2,
    },
  ];
}
