import { describe, expect, it } from 'vitest'
import { CORPORATE_SEATS, MAX_PROOF_BYTES, MEMBERSHIP_PRICES, computeValidUntil } from '@/lib/membership/config'
import { sniffProofType } from '@/lib/membership/proof'

describe('konfigurasi keanggotaan', () => {
  it('harga dan kursi sesuai docs/05', () => {
    expect(MEMBERSHIP_PRICES).toEqual({ student: 250_000, professional: 500_000, corporate: 5_000_000 })
    expect(CORPORATE_SEATS).toBe(3)
  })

  it('batas bukti 4 MB (di bawah batas body Vercel 4,5 MB)', () => {
    expect(MAX_PROOF_BYTES).toBe(4 * 1024 * 1024)
    expect(MAX_PROOF_BYTES).toBeLessThan(4.5 * 1024 * 1024)
  })

  it('masa berlaku 1 tahun sejak verifikasi, atau tanggal tetap', () => {
    expect(computeValidUntil(new Date('2026-10-30T03:00:00Z'), 'one_year_from_verification').toISOString()).toBe('2027-10-30T03:00:00.000Z')
    expect(computeValidUntil(new Date('2026-10-30T03:00:00Z'), 'fixed_date', '2027-12-31T23:59:59+07:00').toISOString()).toBe('2027-12-31T16:59:59.000Z')
  })
})

describe('tipe bukti dari isi berkas', () => {
  const bytes = (...n: number[]) => new Uint8Array(n)
  it('mengenali JPEG, PNG, PDF dan menolak sisanya', () => {
    expect(sniffProofType(bytes(0xff, 0xd8, 0xff, 0xe0, 0))).toBe('image/jpeg')
    expect(sniffProofType(bytes(0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a))).toBe('image/png')
    expect(sniffProofType(new TextEncoder().encode('%PDF-1.7'))).toBe('application/pdf')
    expect(sniffProofType(bytes(0x4d, 0x5a, 0x90, 0))).toBeNull()
    expect(sniffProofType(new TextEncoder().encode('<svg xmlns='))).toBeNull()
    expect(sniffProofType(bytes())).toBeNull()
  })
})
