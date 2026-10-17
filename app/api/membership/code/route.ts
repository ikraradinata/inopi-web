import { NextResponse } from 'next/server'
import { RegistryError, registryCall } from '@/lib/registry/client'
import { memberSubmitSchema } from '@/lib/schemas/keanggotaan'
import { normalizeSeatCode } from '@/lib/membership/seatCode'
import { clientIp, looksLikeBot } from '@/lib/spam'

export const maxDuration = 30
export const dynamic = 'force-dynamic'

/** Mendaftarkan rekan dengan kode kursi Corporate: kursi dipakai dan kartu langsung aktif. */
export async function POST(req: Request) {
  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ ok: false, error: 'bad_request' }, { status: 400 })
  }
  if (looksLikeBot(body)) return NextResponse.json({ ok: true, receiptToken: '0'.repeat(64) })

  const parsed = memberSubmitSchema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ ok: false, error: 'invalid_data' }, { status: 400 })
  const d = parsed.data

  try {
    const r = await registryCall<{ receiptToken: string }>(
      'registerCode',
      {
        code: normalizeSeatCode(d.kode),
        name: d.nama,
        email: d.email,
        whatsapp: d.hp,
        occupation: d.pekerjaan,
        position: d.jabatan ?? '',
        locale: d.locale,
        consent: d.persetujuan,
      },
      clientIp(req),
    )
    return NextResponse.json({ ok: true, receiptToken: r.receiptToken })
  } catch (err) {
    const e = err instanceof RegistryError ? err : new RegistryError('server_error', 500)
    return NextResponse.json({ ok: false, error: e.code }, { status: e.httpStatus })
  }
}
