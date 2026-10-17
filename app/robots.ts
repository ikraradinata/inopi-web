import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/api/', '/kemitraan/terima-kasih', '/keanggotaan/terima-kasih', '/kontak/terima-kasih'] },
    sitemap: 'https://www.inopi.id/sitemap.xml',
  }
}
