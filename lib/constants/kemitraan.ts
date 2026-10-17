// Konten halaman Kemitraan.
// Sumber: docs/02_KONTEN_BARU_P0.md, bagian D.

export const WHY_PARTNER = [
  {
    title: 'Jejaring lintas sektor dalam satu wadah.',
    desc: 'Founder INOPI berasal dari akademisi, industri, dan pemerintah.',
  },
  {
    title: 'Keahlian yang sudah teruji.',
    desc: '69% founder telah menjalankan program pelatihan sebelum INOPI berdiri (Insight Brief No. 01, survei Juni 2026, n=26).',
  },
  {
    title: 'Fokus pada dampak.',
    desc: 'Setiap kolaborasi dirancang dengan tujuan, indikator, dan dokumentasi yang jelas.',
  },
] as const

export const PARTNER_TYPES = [
  {
    title: 'Perguruan Tinggi & Lembaga Riset',
    desc: 'Riset bersama, publikasi, pengembangan kurikulum, pilot di program studi.',
  },
  {
    title: 'Industri & EdTech',
    desc: 'Uji coba solusi, pengembangan kompetensi karyawan, link and match talenta.',
  },
  {
    title: 'Pemerintah & Lembaga Publik',
    desc: 'Kajian kebijakan, peningkatan kapasitas pendidik dan ASN, program percontohan daerah.',
  },
  {
    title: 'Organisasi Internasional',
    desc: 'Pertukaran pengetahuan, forum regional, kolaborasi riset lintas negara.',
  },
] as const

export const COLLAB_MODELS = [
  { value: 'riset', title: 'Riset Kolaboratif', desc: 'Kajian dan eksperimen inovasi pembelajaran bersama.' },
  {
    value: 'pilot',
    title: 'Proyek Percontohan & Implementasi',
    desc: 'Uji coba skala kecil yang terdokumentasi, lalu direplikasi.',
  },
  {
    value: 'pelatihan',
    title: 'Pelatihan & Pengembangan Kompetensi',
    desc: 'Program peningkatan keterampilan sesuai kebutuhan mitra.',
  },
  { value: 'acara', title: 'Acara & Pertukaran Pengetahuan', desc: 'Seminar, webinar, dan forum bersama.' },
  {
    value: 'publikasi',
    title: 'Publikasi & Studi Dampak',
    desc: 'Dokumentasi hasil kolaborasi untuk publik.',
  },
] as const

export const ORG_TYPES = [
  'Perguruan Tinggi',
  'Lembaga Riset',
  'Industri',
  'Startup EdTech',
  'Pemerintah',
  'Organisasi Internasional',
  'Lainnya',
] as const

export const START_TIMES = ['Dalam 3 bulan', '3–6 bulan', 'Lebih dari 6 bulan', 'Belum ditentukan'] as const

export const SUMMARY_MAX = 1000

export const FAILURE_MESSAGE =
  'Maaf, pesan Anda belum terkirim. Silakan coba lagi, atau hubungi kami langsung di asosiasi.inopi@gmail.com.'
