import { RegistryError, registryCall } from '@/lib/registry/client'
import { buildCardData, type RegistryCard } from '@/lib/card/cardData'
import { renderCardPdf } from '@/lib/card/renderCard'
import { clientIp } from '@/lib/spam'

export const maxDuration = 30
export const dynamic = 'force-dynamic'

const text = (status: number, body: string) =>
  new Response(body, { status, headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'no-store', 'X-Robots-Tag': 'noindex' } })

/**
 * Mengunduh kartu anggota (PDF). [token] adalah token tanda terima pribadi pemilik kartu
 * (bukan nomor berurutan dan bukan token QR), sehingga kartu orang lain tidak bisa ditebak.
 */
export async function GET(req: Request, ctx: { params: Promise<{ token: string }> }) {
  const { token } = await ctx.params
  if (!/^[0-9a-f]{64}$/.test(token)) return text(404, 'Kartu tidak ditemukan.')

  let card: RegistryCard
  try {
    card = await registryCall<RegistryCard & { ok: true }>('card', { receiptToken: token }, clientIp(req))
  } catch (err) {
    if (err instanceof RegistryError && err.code === 'not_found') return text(404, 'Kartu tidak ditemukan.')
    if (err instanceof RegistryError && err.code === 'rate_limited') return text(429, 'Terlalu banyak permintaan. Coba lagi beberapa menit lagi.')
    console.error('[card] gagal memuat data kartu', err)
    return text(502, 'Kartu belum dapat dibuat. Silakan coba lagi.')
  }

  const data = buildCardData(card)
  if (!data) return text(410, 'Pendaftaran ini tidak memiliki kartu aktif.')

  try {
    const pdf = await renderCardPdf(data)
    const filename = `kartu-inopi-${data.number.replace(/[^A-Za-z0-9-]/g, '')}.pdf`
    return new Response(Buffer.from(pdf), {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Cache-Control': 'private, no-store',
        'X-Robots-Tag': 'noindex',
      },
    })
  } catch (err) {
    console.error('[card] gagal membuat PDF', err)
    return text(500, 'Kartu belum dapat dibuat. Silakan coba lagi.')
  }
}
