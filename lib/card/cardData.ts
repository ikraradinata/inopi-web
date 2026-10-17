import { SITE_URL } from '@/lib/i18n/seo'
import type { CardCategory, CardData, CardStatus } from './renderCard'

/** Data kartu seperti dikembalikan registry (aksi "card"). */
export interface RegistryCard {
  name: string
  category: CardCategory
  position: string
  institution: string
  number: string
  /** Teks status di Sheet: Menunggu Verifikasi | Aktif | Ditolak | Nonaktif. */
  status: string
  validUntil: string
  locale: string
  verifyToken: string
}

/** Status tampilan; "Aktif" yang sudah lewat masa berlaku menjadi expired. null = tidak ada kartu (ditolak). */
export function toCardStatus(sheetStatus: string, validUntil: string | null, now = new Date()): CardStatus | null {
  switch (sheetStatus) {
    case 'Menunggu Verifikasi':
      return 'pending'
    case 'Aktif':
      return validUntil && new Date(validUntil) < now ? 'expired' : 'active'
    case 'Nonaktif':
      return 'inactive'
    default:
      return null
  }
}

/** Tautan verifikasi yang dikodekan ke QR (nama jalur mengikuti bahasa kartu). */
export const verifyUrlFor = (locale: 'id' | 'en', verifyToken: string): string =>
  locale === 'en' ? `${SITE_URL}/en/verify/${verifyToken}` : `${SITE_URL}/verifikasi/${verifyToken}`

export function buildCardData(c: RegistryCard, now = new Date()): CardData | null {
  const locale = c.locale === 'en' ? 'en' : 'id'
  const status = toCardStatus(c.status, c.validUntil || null, now)
  if (!status) return null
  return {
    name: c.name,
    category: c.category,
    position: c.position,
    institution: c.institution,
    number: c.number,
    status,
    validUntil: c.validUntil || null,
    locale,
    verifyUrl: verifyUrlFor(locale, c.verifyToken),
  }
}
