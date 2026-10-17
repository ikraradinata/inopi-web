// Konstanta bersama pendaftaran: email asosiasi dan format rupiah.
// Rekening dan harga pendaftaran ada di lib/membership/config.ts.

/** Tujuan notifikasi formulir kontak dan kemitraan. */
export const ASSOCIATION_EMAIL = 'asosiasi.inopi@gmail.com'

export const formatRupiah = (amount: number, locale: string = 'id'): string =>
  locale === 'en'
    ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'IDR', currencyDisplay: 'code', maximumFractionDigits: 0 })
        .format(amount)
        .replace(/\u00a0/g, ' ')
    : new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(amount)
