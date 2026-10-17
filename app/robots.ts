import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/api/', '/kemitraan/terima-kasih', '/keanggotaan/terima-kasih', '/kontak/terima-kasih', '/verifikasi/', '/en/verify/', '/en/membership/thank-you', '/keanggotaan/daftar/kode', '/en/membership/apply/code'] },
    sitemap: 'https://www.inopi.id/sitemap.xml',
  }
}
