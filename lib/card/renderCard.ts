import { PDFDocument, type PDFFont, type PDFPage, rgb } from 'pdf-lib'
import fontkit from '@pdf-lib/fontkit'
import QRCode from 'qrcode'
import { BARLOW_REGULAR_BASE64, BARLOW_SEMIBOLD_BASE64, BARLOW_SEMI_CONDENSED_BOLD_BASE64 } from './fonts'

// Kartu anggota 85,6 × 54 mm (ukuran kartu kredit), dibuat sebagai PDF vektor.
// Palet mengikuti docs/05 bagian 7: latar Espresso, teks Ivory, label Gold. Nilai hex hanya ada di
// sini karena PDF tidak mengenal variabel CSS; sumber kebenarannya tetap "Palet Warna Resmi INOPI".

const MM = 72 / 25.4
export const CARD_WIDTH = 85.6 * MM
export const CARD_HEIGHT = 54 * MM

const hex = (h: string) => {
  const n = parseInt(h.slice(1), 16)
  return rgb(((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255)
}
const COLOR = {
  espresso: hex('#35292A'),
  ivory: hex('#F6F1EC'),
  sand: hex('#E4D6CC'),
  gold: hex('#C69A55'),
  teal: hex('#397B78'),
  tealStrong: hex('#377673'), // fill berteks putih
}

export type CardStatus = 'pending' | 'active' | 'inactive' | 'expired'
export type CardCategory = 'student' | 'professional' | 'corporate'

export interface CardData {
  name: string
  category: CardCategory
  position: string
  institution: string
  number: string
  status: CardStatus
  /** ISO 8601; kosong bila belum diverifikasi. */
  validUntil: string | null
  locale: 'id' | 'en'
  /** Alamat halaman verifikasi yang dikodekan ke QR. */
  verifyUrl: string
}

const TEXT = {
  id: {
    category: { student: 'MAHASISWA', professional: 'PROFESIONAL', corporate: 'CORPORATE' },
    number: 'NO. ANGGOTA',
    valid: 'BERLAKU S.D.',
    pendingValid: 'Setelah diverifikasi',
    status: { pending: 'MENUNGGU VERIFIKASI', active: 'AKTIF', inactive: 'NONAKTIF', expired: 'KEDALUWARSA' },
    scan: 'Pindai untuk verifikasi',
  },
  en: {
    category: { student: 'STUDENT', professional: 'PROFESSIONAL', corporate: 'CORPORATE' },
    number: 'MEMBER NO.',
    valid: 'VALID UNTIL',
    pendingValid: 'After verification',
    status: { pending: 'PENDING VERIFICATION', active: 'ACTIVE', inactive: 'INACTIVE', expired: 'EXPIRED' },
    scan: 'Scan to verify',
  },
} as const

export const formatCardDate = (iso: string, locale: 'id' | 'en'): string =>
  new Intl.DateTimeFormat(locale === 'en' ? 'en-GB' : 'id-ID', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'Asia/Jakarta' }).format(new Date(iso))

const b64 = (s: string) => Uint8Array.from(Buffer.from(s, 'base64'))

/** Mengganti karakter yang tidak ada di huruf dengan "?" agar penyematan teks tidak gagal. */
function safeText(font: PDFFont, text: string): string {
  const supported = new Set(font.getCharacterSet())
  return Array.from(text.replace(/[\r\n\t]+/g, ' ').trim())
    .map((ch) => (supported.has(ch.codePointAt(0)!) ? ch : '?'))
    .join('')
}

/** Memotong teks dengan "…" agar muat dalam `maxWidth`. */
function fit(font: PDFFont, text: string, size: number, maxWidth: number): string {
  if (font.widthOfTextAtSize(text, size) <= maxWidth) return text
  let out = text
  while (out.length > 1 && font.widthOfTextAtSize(out + '…', size) > maxWidth) out = out.slice(0, -1)
  return out.trimEnd() + '…'
}

/** Memecah teks menjadi paling banyak `maxLines` baris; baris terakhir dipotong dengan "…". */
function wrap(font: PDFFont, text: string, size: number, maxWidth: number, maxLines: number): string[] {
  const words = text.split(' ').filter(Boolean)
  const lines: string[] = []
  let i = 0
  while (i < words.length && lines.length < maxLines) {
    let line = words[i++]
    while (i < words.length && font.widthOfTextAtSize(`${line} ${words[i]}`, size) <= maxWidth) line += ` ${words[i++]}`
    if (lines.length === maxLines - 1 && i < words.length) line += ` ${words.slice(i).join(' ')}`
    lines.push(fit(font, line, size, maxWidth))
  }
  return lines
}

function drawLogo(page: PDFPage, x: number, yTop: number, size: number) {
  const scale = size / 100
  const common = { x, y: yTop, scale, borderColor: COLOR.ivory, borderWidth: 5, borderLineJoin: 1 as const, borderLineCap: 1 as const }
  page.drawSvgPath('M 15 60 L 50 25 L 85 60 L 50 95 Z', common)
  page.drawSvgPath('M 15 60 L 85 60', common)
  page.drawSvgPath('M 40 85 L 85 60', common)
  page.drawSvgPath('M 57 15 A 8 8 0 1 0 73 15 A 8 8 0 1 0 57 15 Z', { ...common, color: COLOR.teal })
}

function drawQr(page: PDFPage, text: string, x: number, y: number, size: number) {
  const qr = QRCode.create(text, { errorCorrectionLevel: 'M' })
  const n = qr.modules.size
  const cell = size / n
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      if (qr.modules.get(c, r)) {
        // Sedikit tumpang-tindih menutup celah tipis antar-modul pada penampil PDF tertentu.
        page.drawRectangle({ x: x + c * cell, y: y + size - (r + 1) * cell, width: cell + 0.15, height: cell + 0.15, color: COLOR.espresso })
      }
    }
  }
}

export async function renderCardPdf(data: CardData): Promise<Uint8Array> {
  const L = TEXT[data.locale]
  const doc = await PDFDocument.create()
  doc.registerFontkit(fontkit)
  const display = await doc.embedFont(b64(BARLOW_SEMI_CONDENSED_BOLD_BASE64), { subset: true })
  const body = await doc.embedFont(b64(BARLOW_REGULAR_BASE64), { subset: true })
  const semi = await doc.embedFont(b64(BARLOW_SEMIBOLD_BASE64), { subset: true })
  doc.setTitle(`Kartu Anggota INOPI ${data.number}`)
  doc.setAuthor('Asosiasi Inovasi Pembelajaran Indonesia (INOPI)')
  doc.setCreator('inopi.id')

  const W = CARD_WIDTH
  const H = CARD_HEIGHT
  const page = doc.addPage([W, H])
  const pad = 14
  page.drawRectangle({ x: 0, y: 0, width: W, height: H, color: COLOR.espresso })

  // Kepala: logo + nama, label kategori di kanan
  drawLogo(page, pad, H - pad + 1, 17)
  page.drawText('INOPI', { x: pad + 23, y: H - pad - 11, size: 13, font: display, color: COLOR.ivory })
  const cat = L.category[data.category]
  page.drawText(cat, { x: W - pad - semi.widthOfTextAtSize(cat, 7), y: H - pad - 9, size: 7, font: semi, color: COLOR.gold })

  // Nama, jabatan · institusi
  const leftWidth = 128
  const name = safeText(display, data.name)
  let nameSize = 16
  while (nameSize > 11 && display.widthOfTextAtSize(name, nameSize) > leftWidth) nameSize -= 0.5
  // Nama yang tetap terlalu panjang pada 11 pt dipecah menjadi dua baris.
  const nameLines = display.widthOfTextAtSize(name, nameSize) > leftWidth ? wrap(display, name, nameSize, leftWidth, 2) : [name]
  nameLines.forEach((line, i) => page.drawText(line, { x: pad, y: 93 - i * (nameSize + 1), size: nameSize, font: display, color: COLOR.ivory }))
  const subTop = 81 - (nameLines.length - 1) * (nameSize + 1)

  const sub = safeText(body, [data.position, data.institution].filter(Boolean).join(' · '))
  wrap(body, sub, 7, leftWidth, 2).forEach((line, i) => page.drawText(line, { x: pad, y: subTop - i * 9, size: 7, font: body, color: COLOR.sand }))

  // No. anggota dan masa berlaku
  const labelY = 42
  const valueY = 32
  page.drawText(L.number, { x: pad, y: labelY, size: 5.2, font: semi, color: COLOR.gold })
  page.drawText(safeText(semi, data.number), { x: pad, y: valueY, size: 8.5, font: semi, color: COLOR.ivory })
  const col2 = pad + 80
  page.drawText(L.valid, { x: col2, y: labelY, size: 5.2, font: semi, color: COLOR.gold })
  const validText = data.validUntil ? formatCardDate(data.validUntil, data.locale) : L.pendingValid
  page.drawText(validText, { x: col2, y: valueY, size: data.validUntil ? 8.5 : 7, font: semi, color: COLOR.ivory })

  // QR pada alas ivory agar mudah dipindai
  const qrSize = 58
  const box = qrSize + 8
  const boxX = W - pad - box
  const boxY = 38
  page.drawRectangle({ x: boxX, y: boxY, width: box, height: box, color: COLOR.ivory })
  drawQr(page, data.verifyUrl, boxX + 4, boxY + 4, qrSize)
  const scan = L.scan
  page.drawText(scan, { x: boxX + (box - body.widthOfTextAtSize(scan, 4.8)) / 2, y: boxY - 7, size: 4.8, font: body, color: COLOR.sand })

  // Pita status di dasar kartu
  const bandH = 15
  const band = { pending: COLOR.gold, active: COLOR.tealStrong, inactive: COLOR.sand, expired: COLOR.sand }[data.status]
  const bandText = data.status === 'active' ? hex('#FFFFFF') : COLOR.espresso
  page.drawRectangle({ x: 0, y: 0, width: W, height: bandH, color: band })
  const st = L.status[data.status]
  page.drawText(st, { x: (W - semi.widthOfTextAtSize(st, 7.5)) / 2, y: 4.6, size: 7.5, font: semi, color: bandText })

  return doc.save()
}
