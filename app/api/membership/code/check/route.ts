import { NextResponse } from 'next/server'
import { RegistryError, registryCall } from '@/lib/registry/client'
import { isSeatCode, normalizeSeatCode } from '@/lib/membership/seatCode'
import { clientIp } from '@/lib/spam'

export const maxDuration = 30
export const dynamic = 'force-dynamic'

/** Memeriksa kode kursi (validasi langsung). Dibatasi 10 percobaan / 10 menit / IP di registry. */
export async function POST(req: Request) {
  let body: { code?: unknown }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ ok: false, error: 'bad_request' }, { status: 400 })
  }
  const code = typeof body.code === 'string' ? normalizeSeatCode(body.code) : ''
  // Format salah ditolak di sini agar tidak menghabiskan jatah percobaan.
  if (!isSeatCode(code)) return NextResponse.json({ ok: false, error: 'code_not_found' }, { status: 404 })

  try {
    const r = await registryCall<{ organization: string; country: string; seat: number; seats: number }>('validateCode', { code }, clientIp(req))
    return NextResponse.json({ ok: true, organization: r.organization, country: r.country, seat: r.seat, seats: r.seats })
  } catch (err) {
    const e = err instanceof RegistryError ? err : new RegistryError('server_error', 500)
    return NextResponse.json({ ok: false, error: e.code }, { status: e.httpStatus })
  }
}
