// Membuat QR "Scan untuk daftar anggota INOPI" (SVG + PNG ≥ 2000 px, koreksi galat H, logo kecil di tengah)
// di public/qr/.
//
//   npm run qr                              → https://inopi.id/daftar
//   npm run qr -- https://inopi.id/daftar   → alamat lain
//
// Alamat QR sebaiknya tetap https://inopi.id/daftar: tujuan akhirnya bisa diubah kapan saja di
// app/daftar/route.ts / env DAFTAR_REDIRECT_URL tanpa mencetak ulang QR.

import fs from 'node:fs'
import path from 'node:path'
import { buildQrPng, buildQrSvg } from './qr/generate'

const url = process.argv[2] || 'https://inopi.id/daftar'
const caption = 'Scan untuk daftar anggota INOPI'
const outDir = path.join(process.cwd(), 'public', 'qr')

async function main() {
  fs.mkdirSync(outDir, { recursive: true })
  const variants = [
    { name: 'inopi-daftar', opts: { url } },
    { name: 'inopi-daftar-teks', opts: { url, caption } },
  ]
  for (const v of variants) {
    fs.writeFileSync(path.join(outDir, `${v.name}.svg`), buildQrSvg(v.opts).svg)
    const png = await buildQrPng(v.opts, 2400)
    fs.writeFileSync(path.join(outDir, `${v.name}.png`), png)
    console.log(`public/qr/${v.name}.svg  +  ${v.name}.png (${Math.round(png.length / 1024)} KB)`)
  }
  console.log(`Tujuan QR: ${url}`)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
