// Pembuat kode QR "Scan untuk daftar" untuk materi cetak (poster, banner, kartu).
// Murni fungsi: tidak menulis berkas. CLI-nya ada di scripts/generate-qr.ts.
//
// - Koreksi galat tingkat H (hingga ±30% area boleh rusak/tertutup).
// - Logo INOPI kecil (±4% area) di tengah, di atas alas ivory.
// - Teks pada versi bertulisan diubah menjadi path vektor dari font Barlow Semi Condensed
//   sehingga SVG tampil identik di perangkat apa pun tanpa memasang font.
//
// Warna memakai palet resmi INOPI (docs/05 bagian 7); nilai hex hanya ada di berkas ini
// karena SVG/PNG cetak tidak mengenal variabel CSS.

import QRCode from 'qrcode'
import fontkit from '@pdf-lib/fontkit'
import sharp from 'sharp'
import { BARLOW_SEMI_CONDENSED_BOLD_BASE64 } from '../../lib/card/fonts'

const COLOR = { espresso: '#35292A', ivory: '#F6F1EC', teal: '#397B78' }
const QUIET = 4 // zona tenang (modul) di sekeliling QR, sesuai standar

interface GlyphLike {
  path: { toSVG(): string }
}
interface FontLike {
  unitsPerEm: number
  layout(text: string): { glyphs: GlyphLike[]; positions: { xAdvance: number }[] }
}

let cachedFont: FontLike | null = null
function font(): FontLike {
  cachedFont ??= (fontkit as unknown as { create(b: Uint8Array): FontLike }).create(Buffer.from(BARLOW_SEMI_CONDENSED_BOLD_BASE64, 'base64'))
  return cachedFont
}

/** Teks sebagai path SVG (satuan modul QR). Mengembalikan lebar teks untuk pemusatan. */
function textPath(text: string, size: number): { width: number; build: (x: number, baseline: number) => string } {
  const f = font()
  const run = f.layout(text)
  const scale = size / f.unitsPerEm
  const width = run.positions.reduce((sum, p) => sum + p.xAdvance, 0) * scale
  return {
    width,
    build: (x, baseline) => {
      let cursor = 0
      const parts = run.glyphs.map((g, i) => {
        const d = g.path.toSVG()
        const out = d ? `<path transform="translate(${(x + cursor * scale).toFixed(3)} ${baseline.toFixed(3)}) scale(${scale.toFixed(6)} ${(-scale).toFixed(6)})" d="${d}"/>` : ''
        cursor += run.positions[i].xAdvance
        return out
      })
      return `<g fill="${COLOR.espresso}">${parts.join('')}</g>`
    },
  }
}

/** Logo INOPI (ikon berlian) pada kotak `box` modul di (x, y). Jalur yang sama dengan components/ui/Logo.tsx. */
function logo(x: number, y: number, box: number): string {
  const pad = box * 0.12
  const s = (box - pad * 2) / 100
  return (
    `<rect x="${x}" y="${y}" width="${box}" height="${box}" rx="${(box * 0.18).toFixed(2)}" fill="${COLOR.ivory}"/>` +
    `<g transform="translate(${x + pad} ${y + pad}) scale(${s.toFixed(5)})" fill="none" stroke="${COLOR.espresso}" stroke-width="6" stroke-linejoin="round" stroke-linecap="round">` +
    `<path d="M 15 60 L 50 25 L 85 60 L 50 95 Z"/><line x1="15" y1="60" x2="85" y2="60"/><line x1="40" y1="85" x2="85" y2="60"/>` +
    `<circle cx="65" cy="15" r="8" fill="${COLOR.teal}"/></g>`
  )
}

export interface QrOptions {
  url: string
  /** Teks di bawah QR (kosong = tanpa teks). */
  caption?: string
}

/** SVG dalam satuan "modul"; viewBox menyesuaikan sehingga dapat diperbesar tanpa batas. */
export function buildQrSvg({ url, caption }: QrOptions): { svg: string; width: number; height: number } {
  const qr = QRCode.create(url, { errorCorrectionLevel: 'H' })
  const n = qr.modules.size
  const side = n + QUIET * 2
  let height = side

  let captionSvg = ''
  if (caption) {
    // Ukuran huruf mengikuti lebar: teks maksimal 86% sisi QR agar ada ruang putih di kiri-kanan.
    const unit = textPath(caption, 1).width
    const size = Math.min(side * 0.075, (side * 0.86) / unit)
    const t = textPath(caption, size)
    const sub = textPath(url.replace(/^https?:\/\//, ''), size * 0.62)
    const top = side - QUIET * 0.3
    captionSvg = t.build((side - t.width) / 2, top + size) + sub.build((side - sub.width) / 2, top + size + size * 0.95)
    height = side + size * 2.6
  }

  // Satu path gabungan untuk semua modul gelap: berkas kecil dan tidak ada celah antar-modul.
  let d = ''
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      if (qr.modules.get(c, r)) d += `M${c + QUIET} ${r + QUIET}h1v1h-1z`
    }
  }
  const box = Math.round(n * 0.2)
  const lx = QUIET + (n - box) / 2
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${side} ${height.toFixed(3)}" width="${side * 10}" height="${(height * 10).toFixed(0)}" shape-rendering="crispEdges">` +
    `<title>${caption ? caption : 'QR ' + url}</title>` +
    `<rect width="100%" height="100%" fill="${COLOR.ivory}"/>` +
    `<path d="${d}" fill="${COLOR.espresso}"/>` +
    logo(lx, lx, box) +
    captionSvg +
    `</svg>`
  return { svg, width: side, height }
}

/** PNG resolusi cetak: sisi terpanjang ≥ `minPixels` (bilangan bulat kelipatan modul agar tepi tajam). */
export async function buildQrPng(opts: QrOptions, minPixels = 2400): Promise<Buffer> {
  const { svg, width, height } = buildQrSvg(opts)
  const scale = Math.ceil(minPixels / Math.max(width, height))
  const px = (v: number) => Math.round(v * scale)
  const sized = svg.replace(/ width="[^"]+" height="[^"]+"/, ` width="${px(width)}" height="${px(height)}"`)
  return sharp(Buffer.from(sized), { density: 72 }).png({ compressionLevel: 9 }).toBuffer()
}
