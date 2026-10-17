// Konfigurasi pendaftaran keanggotaan INOPI.

/** Tujuan notifikasi setiap kali ada pendaftaran baru. */
export const ASSOCIATION_EMAIL = 'asosiasi.inopi@gmail.com'

/**
 * Rekening resmi INOPI untuk pembayaran iuran keanggotaan.
 *
 * Rekening atas nama Bendahara Umum (diberikan pengurus). Bila ketiga kolom
 * dikosongkan, situs TIDAK menampilkan nomor rekening dan hanya memberitahu
 * pendaftar bahwa instruksi pembayaran dikirim via email.
 */
export const BANK_ACCOUNT = {
  bank: 'Bank Mandiri',
  accountNumber: '1650004326881',
  accountName: 'Ikrar Adinata Arin (Bendahara Umum)',
  /** Opsional, mis. cabang atau kode bank. */
  note: '',
}

export const isBankConfigured = (): boolean =>
  Boolean(BANK_ACCOUNT.bank && BANK_ACCOUNT.accountNumber && BANK_ACCOUNT.accountName)

/** Membuat nomor registrasi, mis. INOPI-2026-7F3K9A. */
export function generateRegistrationId(date = new Date()): string {
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789' // tanpa karakter yang mudah tertukar
  let suffix = ''
  for (let i = 0; i < 6; i++) {
    suffix += alphabet[Math.floor(Math.random() * alphabet.length)]
  }
  return `INOPI-${date.getFullYear()}-${suffix}`
}

/**
 * Format rupiah per bahasa: "Rp 250.000" (id) dan "IDR 250,000" (en).
 * Bahasa Indonesia tetap menjadi default, dipakai juga oleh email ke pengurus.
 */
export const formatRupiah = (amount: number, locale: string = 'id'): string =>
  locale === 'en'
    ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'IDR', currencyDisplay: 'code', maximumFractionDigits: 0 })
        .format(amount)
        .replace(/\u00a0/g, ' ')
    : new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(amount)
