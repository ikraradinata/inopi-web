import type { MetadataRoute } from 'next'
import { routing, type AppPathname } from '@/i18n/routing'
import { absoluteUrl } from '@/lib/i18n/seo'

// Halaman yang diindeks, dalam dua bahasa. Halaman terima kasih dan 404
// sengaja tidak dimasukkan.
const paths: AppPathname[] = [
  '/',
  '/tentang',
  '/tentang/visi-misi',
  '/tentang/sejarah',
  '/tentang/founders',
  '/tentang/struktur-organisasi',
  '/tentang/tata-kelola',
  '/program',
  '/program/riset-inovasi',
  '/program/implementasi',
  '/program/pelatihan-sertifikasi',
  '/program/kemitraan',
  '/kemitraan',
  '/keanggotaan',
  '/keanggotaan/daftar',
  '/acara',
  '/event',
  '/event/launching-2026',
  '/riset',
  '/berita',
  '/kontak',
  '/privacy',
]

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()
  return paths.flatMap((pathname) => {
    const languages = {
      id: absoluteUrl('id', pathname),
      en: absoluteUrl('en', pathname),
    }
    return routing.locales.map((locale) => ({
      url: absoluteUrl(locale, pathname),
      lastModified,
      alternates: { languages },
    }))
  })
}
