import { describe, expect, it } from 'vitest'
import sharp from 'sharp'
import jsQR from 'jsqr'
import { buildQrPng, buildQrSvg } from '../../scripts/qr/generate'
import { GET, resolveTarget } from '../../app/daftar/route'

const URL_DAFTAR = 'https://inopi.id/daftar'

async function decode(png: Buffer): Promise<string | null> {
  const { data, info } = await sharp(png).ensureAlpha().raw().toBuffer({ resolveWithObject: true })
  return jsQR(new Uint8ClampedArray(data), info.width, info.height)?.data ?? null
}

describe('QR pendaftaran', () => {
  it('PNG tanpa teks: ≥ 2000 px dan terbaca ke alamat yang benar', async () => {
    const png = await buildQrPng({ url: URL_DAFTAR })
    const meta = await sharp(png).metadata()
    expect(Math.min(meta.width!, meta.height!)).toBeGreaterThanOrEqual(2000)
    expect(await decode(png)).toBe(URL_DAFTAR)
  })

  it('PNG bertulisan "Scan untuk daftar anggota INOPI": ≥ 2000 px dan tetap terbaca', async () => {
    const png = await buildQrPng({ url: URL_DAFTAR, caption: 'Scan untuk daftar anggota INOPI' })
    const meta = await sharp(png).metadata()
    expect(Math.min(meta.width!, meta.height!)).toBeGreaterThanOrEqual(2000)
    expect(await decode(png)).toBe(URL_DAFTAR)
  })

  it('tetap terbaca walau logo tengah ada dan sebagian QR rusak (koreksi galat H)', async () => {
    const png = await buildQrPng({ url: URL_DAFTAR })
    const { width, height } = await sharp(png).metadata()
    // Tutup ±8% area di pojok kanan bawah modul data (di luar penanda posisi).
    const patch = await sharp({ create: { width: Math.round(width! * 0.18), height: Math.round(height! * 0.1), channels: 3, background: '#F6F1EC' } }).png().toBuffer()
    const damaged = await sharp(png).composite([{ input: patch, left: Math.round(width! * 0.45), top: Math.round(height! * 0.68) }]).png().toBuffer()
    expect(await decode(damaged)).toBe(URL_DAFTAR)
  })

  it('SVG: vektor, berisi logo, teks berupa path (tanpa elemen <text> yang bergantung font)', () => {
    const { svg } = buildQrSvg({ url: URL_DAFTAR, caption: 'Scan untuk daftar anggota INOPI' })
    expect(svg.startsWith('<svg')).toBe(true)
    expect(svg).toContain('viewBox=')
    expect(svg).toContain('<circle') // logo
    expect(svg).not.toContain('<text')
    expect(svg).not.toContain('<image')
    expect(svg).toContain('Scan untuk daftar anggota INOPI') // di <title> untuk aksesibilitas
  })
})

describe('tautan pendek /daftar', () => {
  it('bawaan: /keanggotaan/daftar', () => {
    expect(resolveTarget(undefined)).toBe('/keanggotaan/daftar')
    expect(resolveTarget('')).toBe('/keanggotaan/daftar')
  })

  it('tujuan bisa diubah lewat env: jalur situs atau https', () => {
    expect(resolveTarget('/keanggotaan/daftar/corporate')).toBe('/keanggotaan/daftar/corporate')
    expect(resolveTarget('https://www.inopi.id/acara')).toBe('https://www.inopi.id/acara')
  })

  it('nilai berbahaya atau salah diabaikan', () => {
    for (const bad of ['//evil.example', 'javascript:alert(1)', 'http://insecure.example', 'data:text/html,x', '/a b', ' ', '\\\\evil']) {
      expect(resolveTarget(bad)).toBe('/keanggotaan/daftar')
    }
  })

  it('mengalihkan dengan 302 dan meneruskan parameter kampanye', () => {
    const res = GET(new Request('https://www.inopi.id/daftar?utm_source=qr&utm_medium=poster'))
    expect(res.status).toBe(302)
    const loc = new URL(res.headers.get('location')!)
    expect(loc.pathname).toBe('/keanggotaan/daftar')
    expect(loc.searchParams.get('utm_source')).toBe('qr')
    expect(loc.searchParams.get('utm_medium')).toBe('poster')
  })
})
