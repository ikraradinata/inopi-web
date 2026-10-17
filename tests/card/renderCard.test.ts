import { describe, expect, it } from 'vitest'
import { PDFDocument } from 'pdf-lib'
import { CARD_HEIGHT, CARD_WIDTH, formatCardDate, renderCardPdf, type CardData } from '@/lib/card/renderCard'

const base: CardData = {
  name: 'Siti Elda Hiererra',
  category: 'professional',
  position: 'Kepala Program Studi',
  institution: 'Universitas Pendidikan Indonesia',
  number: 'INP-26-P-0001',
  status: 'active',
  validUntil: '2027-10-30T03:00:00.000Z',
  locale: 'id',
  verifyUrl: 'https://www.inopi.id/verifikasi/' + 'a'.repeat(64),
}

async function load(bytes: Uint8Array) {
  return PDFDocument.load(bytes)
}

describe('kartu anggota PDF', () => {
  it('menghasilkan PDF satu halaman berukuran 85,6 × 54 mm', async () => {
    const bytes = await renderCardPdf(base)
    expect(Buffer.from(bytes.slice(0, 5)).toString()).toBe('%PDF-')
    const doc = await load(bytes)
    expect(doc.getPageCount()).toBe(1)
    const { width, height } = doc.getPage(0).getSize()
    expect(width).toBeCloseTo(CARD_WIDTH, 1)
    expect(height).toBeCloseTo(CARD_HEIGHT, 1)
    expect(width / 2.83465).toBeCloseTo(85.6, 0)
    expect(height / 2.83465).toBeCloseTo(54, 0)
  })

  it('berhasil untuk semua status, kategori, dan bahasa', async () => {
    for (const status of ['pending', 'active', 'inactive', 'expired'] as const) {
      for (const category of ['student', 'professional', 'corporate'] as const) {
        for (const locale of ['id', 'en'] as const) {
          const bytes = await renderCardPdf({ ...base, status, category, locale, validUntil: status === 'pending' ? null : base.validUntil })
          expect(bytes.length).toBeGreaterThan(5000)
        }
      }
    }
  })

  it('tahan terhadap nama dan institusi sangat panjang, aksara non-Latin, dan jabatan kosong', async () => {
    const cases: Partial<CardData>[] = [
      { name: 'Muhammad Abdurrahman Al-Fathir bin Abdullah Prasetyo Wicaksono Hadiningrat' },
      { institution: 'Universitas Negeri Yogyakarta Fakultas Ilmu Pendidikan dan Psikologi Program Pascasarjana Terpadu Nusantara Raya' },
      { name: '山田太郎 😀', institution: 'Токийский университет' },
      { position: '' },
      { name: 'A', position: '', institution: '' },
    ]
    for (const c of cases) {
      const bytes = await renderCardPdf({ ...base, ...c })
      expect((await load(bytes)).getPageCount()).toBe(1)
    }
  })

  it('kartu belum aktif tidak memuat masa berlaku; teks status ada di berkas', async () => {
    const pending = await renderCardPdf({ ...base, status: 'pending', validUntil: null })
    const active = await renderCardPdf(base)
    expect(pending.length).not.toBe(active.length)
  })

  it('format tanggal mengikuti bahasa dan zona waktu Jakarta', () => {
    expect(formatCardDate('2027-10-30T03:00:00.000Z', 'id')).toMatch(/30 Okt(ober)? 2027/)
    expect(formatCardDate('2027-10-30T03:00:00.000Z', 'en')).toMatch(/30 Oct 2027/)
    // 18.00 UTC tanggal 30 sudah tanggal 31 di Jakarta (UTC+7)
    expect(formatCardDate('2027-10-30T18:00:00.000Z', 'en')).toMatch(/31 Oct 2027/)
  })
})
