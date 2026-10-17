// Perlindungan spam sederhana untuk route formulir: honeypot, waktu isi minimum,
// dan pembatasan laju per IP.
//
// Catatan: pembatasan laju disimpan di memori instance. Di Vercel (serverless)
// tiap instance punya hitungan sendiri, jadi ini hanya meredam penyalahgunaan
// ringan, bukan batas yang ketat.

const hits = new Map<string, number[]>()

export function clientIp(req: Request): string {
  const fwd = req.headers.get('x-forwarded-for')
  return fwd?.split(',')[0]?.trim() || req.headers.get('x-real-ip') || 'unknown'
}

/** true bila `key` sudah melewati `max` permintaan dalam `windowMs`. */
export function isRateLimited(key: string, max: number, windowMs: number): boolean {
  const now = Date.now()
  const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs)
  if (recent.length >= max) {
    hits.set(key, recent)
    return true
  }
  recent.push(now)
  hits.set(key, recent)

  if (hits.size > 500) {
    for (const [k, v] of hits) {
      if (v.every((t) => now - t >= windowMs)) hits.delete(k)
    }
  }
  return false
}

/** Honeypot terisi, atau formulir terkirim terlalu cepat untuk manusia. */
export function looksLikeBot(body: { website?: unknown; startedAt?: unknown }, minMs = 3000): boolean {
  if (typeof body.website === 'string' && body.website.trim() !== '') return true
  const started = Number(body.startedAt)
  if (!Number.isFinite(started)) return true
  const elapsed = Date.now() - started
  return elapsed < minMs || elapsed > 24 * 60 * 60 * 1000
}

/** Hapus pemisah baris agar nilai dari pengguna aman dipakai di subjek email. */
export const oneLine = (s: string): string => s.replace(/[\r\n]+/g, ' ').trim()
