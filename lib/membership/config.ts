// Konfigurasi keanggotaan INOPI: satu tempat untuk harga, kursi, rekening, masa
// berlaku, dan batas berkas. Spesifikasi: docs/05_ALUR_PENDAFTARAN_ANGGOTA.md.
//
// Harga di sini harus sama dengan CFG.PRICES di apps-script/registry.js
// (dijaga oleh tes tests/registry). Berkas ini tidak berisi rahasia.

export type MembershipCategory = 'student' | 'professional' | 'corporate'

export const MEMBERSHIP_CATEGORIES: readonly MembershipCategory[] = ['student', 'professional', 'corporate']

/** Iuran per tahun dalam rupiah (sebelum kode unik transfer). */
export const MEMBERSHIP_PRICES: Record<MembershipCategory, number> = {
  student: 250_000,
  professional: 500_000,
  corporate: 5_000_000,
}

/** Jumlah kursi Corporate, termasuk kursi PIC (keputusan terbuka #5 di docs/05). */
export const CORPORATE_SEATS = 3

/** Kode unik transfer 1–999 ditambahkan ke iuran agar mutasi mudah dicocokkan. */
export const UNIQUE_CODE_MIN = 1
export const UNIQUE_CODE_MAX = 999

/**
 * Rekening tujuan. Nilai bawaan adalah PLACEHOLDER sampai pengurus memutuskan
 * (docs/05 bagian 10): docs/05 menyebut BCA, sedangkan rekening yang diberikan
 * pengurus adalah Mandiri. Bisa diisi tanpa mengubah kode lewat environment
 * variable MEMBERSHIP_BANK_NAME / MEMBERSHIP_BANK_NUMBER / MEMBERSHIP_BANK_OWNER.
 */
export const MEMBERSHIP_BANK_ACCOUNT = {
  bank: process.env.MEMBERSHIP_BANK_NAME || '[NAMA BANK]',
  accountNumber: process.env.MEMBERSHIP_BANK_NUMBER || '[NO. REKENING]',
  accountName: process.env.MEMBERSHIP_BANK_OWNER || '[NAMA REKENING]',
}

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

/**
 * Bukti transfer. Batas 4 MB (bukan 5 MB seperti di docs/05): body permintaan fungsi
 * Vercel dibatasi 4,5 MB. Foto dikompres otomatis di browser; PDF besar ditolak.
 * Nilai yang sama ada di CFG.MAX_PROOF_BYTES pada apps-script/registry.js.
 */
export const MAX_PROOF_BYTES = 4 * 1024 * 1024
export const PROOF_ALLOWED_TYPES = ['image/jpeg', 'image/png', 'application/pdf'] as const
export type ProofMime = (typeof PROOF_ALLOWED_TYPES)[number]

/** Janji waktu verifikasi yang ditampilkan ke pendaftar (usulan; keputusan terbuka #3). */
export const VERIFICATION_PROMISE_WORKING_HOURS = 24
