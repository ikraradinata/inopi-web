import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

const DEFAULT_TARGET = '/keanggotaan/daftar'

/**
 * Tujuan pengalihan. Bisa diubah lewat env DAFTAR_REDIRECT_URL (jalur di situs ini, mis.
 * "/keanggotaan/daftar/corporate", atau alamat https lengkap) tanpa mengubah kode; cukup
 * ubah variabel di Vercel lalu Redeploy (±1 menit). Nilai yang tidak sah diabaikan.
 */
export function resolveTarget(raw = process.env.DAFTAR_REDIRECT_URL): string {
  const value = (raw ?? '').trim()
  if (/^\/(?!\/)[^\s\\]*$/.test(value)) return value // jalur relatif di situs ini
  if (/^https:\/\/[^\s]+$/.test(value)) return value
  return DEFAULT_TARGET
}

/**
 * Tautan pendek untuk QR cetak: inopi.id/daftar. Pakai 302 (sementara) karena tujuannya
 * boleh berubah; QR yang sudah tercetak tetap berlaku. Parameter (mis. utm_source) diteruskan.
 */
export function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const target = new URL(resolveTarget(), req.url)
  searchParams.forEach((v, k) => target.searchParams.set(k, v))
  return NextResponse.redirect(target, 302)
}

export const HEAD = GET
