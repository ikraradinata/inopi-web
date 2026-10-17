// Data tetap halaman Kemitraan. Teks (judul, deskripsi, label) ada di messages,
// namespace "Kemitraan" dan "KemitraanForm". Sumber isi: docs/02_KONTEN_BARU_P0.md, bagian D.

/** Nilai `value` dipakai sebagai kunci di "Kemitraan.models" dan disimpan di formulir. */
export const COLLAB_MODELS = [
  { value: 'riset' },
  { value: 'pilot' },
  { value: 'pelatihan' },
  { value: 'acara' },
  { value: 'publikasi' },
] as const

/** Nilai ini disimpan apa adanya; label tampil lewat "KemitraanForm.orgTypes". */
export const ORG_TYPES = [
  'Perguruan Tinggi',
  'Lembaga Riset',
  'Industri',
  'Startup EdTech',
  'Pemerintah',
  'Organisasi Internasional',
  'Lainnya',
] as const

/** Nilai ini disimpan apa adanya; label tampil lewat "KemitraanForm.startTimes". */
export const START_TIMES = ['Dalam 3 bulan', '3–6 bulan', 'Lebih dari 6 bulan', 'Belum ditentukan'] as const

export const SUMMARY_MAX = 1000
