import type { MetadataRoute } from 'next'

const BASE_URL = 'https://www.inopi.id'

// Hanya halaman yang sudah ada dan layak diindeks. Halaman terima kasih
// sengaja tidak dimasukkan. Tambahkan /acara, /tentang/tata-kelola, dan
// /privacy saat halamannya selesai.
const paths = [
  '/',
  '/tentang',
  '/tentang/visi-misi',
  '/tentang/sejarah',
  '/tentang/founders',
  '/tentang/struktur-organisasi',
  '/program',
  '/program/riset-inovasi',
  '/program/implementasi',
  '/program/pelatihan-sertifikasi',
  '/program/kemitraan',
  '/kemitraan',
  '/keanggotaan',
  '/keanggotaan/daftar',
  '/event',
  '/event/launching-2026',
  '/riset',
  '/berita',
  '/kontak',
]

export default function sitemap(): MetadataRoute.Sitemap {
  return paths.map((path) => ({ url: `${BASE_URL}${path}`, lastModified: new Date() }))
}
