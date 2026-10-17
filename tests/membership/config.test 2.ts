import { describe, expect, it } from 'vitest'
import {
  CORPORATE_SEATS,
  MAX_PROOF_BYTES,
  MEMBERSHIP_BANK_ACCOUNT,
  MEMBERSHIP_PRICES,
  PROOF_VIEW_URL_TTL_SECONDS,
  computeValidUntil,
  isBankAccountConfigured,
} from '@/lib/membership/config'

describe('konfigurasi keanggotaan', () => {
  it('harga sesuai docs/05', () => {
    expect(MEMBERSHIP_PRICES).toEqual({ student: 250_000, professional: 500_000, corporate: 5_000_000 })
  })

  it('kursi Corporate 3 dan batas berkas 5 MB', () => {
    expect(CORPORATE_SEATS).toBe(3)
    expect(MAX_PROOF_BYTES).toBe(5 * 1024 * 1024)
  })

  it('tautan lihat bukti tidak lebih dari 5 menit', () => {
    expect(PROOF_VIEW_URL_TTL_SECONDS).toBeLessThanOrEqual(300)
  })

  it('rekening masih placeholder sampai diputuskan pengurus', () => {
    expect(MEMBERSHIP_BANK_ACCOUNT.accountNumber).toMatch(/^\[NO\. REKENING\]$|^\d+$/)
    expect(typeof isBankAccountConfigured()).toBe('boolean')
  })

  it('masa berlaku 1 tahun sejak verifikasi', () => {
    const v = computeValidUntil(new Date('2026-10-30T03:00:00Z'), 'one_year_from_verification')
    expect(v.toISOString()).toBe('2027-10-30T03:00:00.000Z')
  })

  it('masa berlaku tanggal tetap mengabaikan tanggal verifikasi', () => {
    const v = computeValidUntil(new Date('2026-10-30T03:00:00Z'), 'fixed_date', '2027-12-31T23:59:59+07:00')
    expect(v.toISOString()).toBe('2027-12-31T16:59:59.000Z')
  })
})
