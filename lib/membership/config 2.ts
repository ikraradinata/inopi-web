// Konfigurasi keanggotaan INOPI: satu tempat untuk harga, kursi, rekening, masa
// berlaku, dan batas berkas. Spesifikasi: docs/05_ALUR_PENDAFTARAN_ANGGOTA.md.
//
// Berkas ini tidak membaca rahasia dan aman diimpor dari mana saja.

export type MembershipCategory = 'student' | 'professional' | 'corporate'

export const MEMBERSHIP_CATEGORIES: readonly MembershipCategory[] = ['student', 'professional', 'corporate']

/** Iuran per tahun dalam rupiah (sebelum kode unik transfer). */
export const MEMBERSHIP_PRICES: Record<MembershipCategory, number> = {
  student: 250_000,
  professional: 500_000,
  corporate: 5_000_000,
}

/** Huruf kategori pada nomor pendaftaran, mis. INP-26-P-0123. */
export const CATEGORY_LETTER: Record<MembershipCategory, 'S' | 'P' | 'C'> = {
  student: 'S',
  professional: 'P',
  corporate: 'C',
}

/** Jumlah kursi Corporate, termasuk kursi PIC (keputusan terbuka #5 di docs/05). */
export const CORPORATE_SEATS = 3

/** Kode unik transfer: 1–999, ditambahkan ke iuran agar mutasi mudah dicocokkan. */
export const UNIQUE_CODE_MIN = 1
export const UNIQUE_CODE_MAX = 999

/**
 * Rekening tujuan. PLACEHOLDER sampai pengurus memutuskan (docs/05 bagian 10):
 * docs/05 menyebut BCA, sedangkan rekening yang diberikan pengurus adalah Mandiri.
 * Nilai di bawah sengaja belum diisi agar tidak ada nomor salah yang tampil.
 */
export const MEMBERSHIP_BANK_ACCOUNT = {
  bank: '[NAMA BANK]',
  accountNumber: '[NO. REKENING]',
  accountName: '[NAMA REKENING]',
} as const

export const isBankAccountConfigured = (): boolean =>
  Object.values(MEMBERSHIP_BANK_ACCOUNT).every((v) => !/^\[.*\]$/.test(v))

/**
 * Cara menghitung masa berlaku (keputusan terbuka #2 di docs/05).
 * - 'one_year_from_verification': 1 tahun sejak diverifikasi Bendahara
 * - 'fixed_date': sampai tanggal tetap `MEMBERSHIP_FIXED_VALID_UNTIL`
 */
export type ValidityMode = 'one_year_from_verification' | 'fixed_date'
export const MEMBERSHIP_VALIDITY_MODE: ValidityMode = 'one_year_from_verification'
export const MEMBERSHIP_FIXED_VALID_UNTIL = '2027-12-31T23:59:59+07:00'

export function computeValidUntil(
  verifiedAt: Date,
  mode: ValidityMode = MEMBERSHIP_VALIDITY_MODE,
  fixedDate: string = MEMBERSHIP_FIXED_VALID_UNTIL,
): Date {
  if (mode === 'fixed_date') return new Date(fixedDate)
  const d = new Date(verifiedAt)
  d.setUTCFullYear(d.getUTCFullYear() + 1)
  return d
}

/** Bukti transfer: batas ukuran dan tipe yang diizinkan. */
export const MAX_PROOF_BYTES = 5 * 1024 * 1024
export const PROOF_ALLOWED_TYPES = ['image/jpeg', 'image/png', 'application/pdf'] as const
export type ProofMime = (typeof PROOF_ALLOWED_TYPES)[number]
export const PROOF_EXTENSION: Record<ProofMime, string> = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'application/pdf': 'pdf',
}

/** Nama bucket storage privat bukti transfer. */
export const PROOF_BUCKET = process.env.SUPABASE_PROOFS_BUCKET || 'payment-proofs'

/** Masa berlaku tautan lihat bukti untuk admin (detik). Maksimum 5 menit. */
export const PROOF_VIEW_URL_TTL_SECONDS = 300

/** Panjang minimal token acak dalam byte (16 byte = 128 bit). */
export const MIN_TOKEN_BYTES = 16
