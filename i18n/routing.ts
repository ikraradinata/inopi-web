import { defineRouting } from 'next-intl/routing'

// Kunci `pathnames` adalah URL Bahasa Indonesia yang berlaku sekarang (tanpa
// awalan), sehingga semua tautan lama tetap benar. Nilai `en` adalah URL
// English di bawah /en (docs/03_RENCANA_BILINGUAL.md, bagian 3).
export const routing = defineRouting({
  locales: ['id', 'en'],
  defaultLocale: 'id',
  localePrefix: 'as-needed',
  localeDetection: false,
  pathnames: {
    '/': '/',

    '/tentang': { id: '/tentang', en: '/about' },
    '/tentang/visi-misi': { id: '/tentang/visi-misi', en: '/about/vision-mission' },
    '/tentang/sejarah': { id: '/tentang/sejarah', en: '/about/history' },
    '/tentang/founders': { id: '/tentang/founders', en: '/about/founders' },
    '/tentang/struktur-organisasi': { id: '/tentang/struktur-organisasi', en: '/about/organization-structure' },
    '/tentang/tata-kelola': { id: '/tentang/tata-kelola', en: '/about/governance' },

    '/program': { id: '/program', en: '/programs' },
    '/program/riset-inovasi': { id: '/program/riset-inovasi', en: '/programs/research-innovation' },
    '/program/implementasi': { id: '/program/implementasi', en: '/programs/implementation' },
    '/program/kemitraan': { id: '/program/kemitraan', en: '/programs/partnerships-collaboration' },
    '/program/pelatihan-sertifikasi': { id: '/program/pelatihan-sertifikasi', en: '/programs/training-certification' },

    '/keanggotaan': { id: '/keanggotaan', en: '/membership' },
    '/keanggotaan/daftar': { id: '/keanggotaan/daftar', en: '/membership/apply' },
    '/keanggotaan/daftar/kode': { id: '/keanggotaan/daftar/kode', en: '/membership/apply/code' },
    '/keanggotaan/daftar/corporate': { id: '/keanggotaan/daftar/corporate', en: '/membership/apply/corporate' },
    '/keanggotaan/terima-kasih': { id: '/keanggotaan/terima-kasih', en: '/membership/thank-you' },
    '/verifikasi/[token]': { id: '/verifikasi/[token]', en: '/verify/[token]' },

    '/kemitraan': { id: '/kemitraan', en: '/partnerships' },
    '/kemitraan/terima-kasih': { id: '/kemitraan/terima-kasih', en: '/partnerships/thank-you' },

    '/acara': { id: '/acara', en: '/events' },
    // Daftar acara lama; direncanakan diarahkan ke /acara (menunggu keputusan).
    '/event': { id: '/event', en: '/events/all' },
    '/event/launching-2026': { id: '/event/launching-2026', en: '/events/launching-2026' },

    // Belum punya konten English (P1): halaman English sementara menampilkan
    // konten Indonesia dan menautkan ke versi Indonesia.
    '/riset': { id: '/riset', en: '/research' },
    '/berita': { id: '/berita', en: '/news' },

    '/kontak': { id: '/kontak', en: '/contact' },
    '/kontak/terima-kasih': { id: '/kontak/terima-kasih', en: '/contact/thank-you' },
    '/privacy': '/privacy',
  },
})

export type Locale = (typeof routing.locales)[number]
/** Kunci URL internal (URL Bahasa Indonesia). Dipakai untuk mengetik href tautan. */
/** Rute statis (tanpa parameter). Rute dinamis seperti '/verifikasi/[token]' tidak termasuk. */
export type AppPathname = Exclude<keyof typeof routing.pathnames, `${string}[${string}`>
