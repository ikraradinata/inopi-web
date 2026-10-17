import { NextResponse } from 'next/server'
import { RegistryError, registryCall } from '@/lib/registry/client'
import { MEMBERSHIP_BANK_ACCOUNT, MEMBERSHIP_PRICES, isBankAccountConfigured } from '@/lib/membership/config'
import { categoryPickSchema } from '@/lib/schemas/keanggotaan'
import { clientIp } from '@/lib/spam'

export const maxDuration = 30
export const dynamic = 'force-dynamic'

/** Memesan kode unik transfer dan mengembalikan nominal serta rekening tujuan. */
export async function POST(req: Request) {
  let body: { category?: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ ok: false, error: 'bad_request' }, { status: 400 })
  }
  const category = categoryPickSchema.safeParse(body.category)
  if (!category.success) return NextResponse.json({ ok: false, error: 'invalid_category' }, { status: 400 })

  try {
    const r = await registryCall<{ token: string; uniqueCode: number; transferAmount: number; expiresAt: string }>(
      'reserve',
      { category: category.data },
      clientIp(req),
    )
    return NextResponse.json({
      ok: true,
      reservationToken: r.token,
      uniqueCode: r.uniqueCode,
      baseAmount: MEMBERSHIP_PRICES[category.data],
      transferAmount: r.transferAmount,
      expiresAt: r.expiresAt,
      bank: isBankAccountConfigured() ? MEMBERSHIP_BANK_ACCOUNT : null,
    })
  } catch (err) {
    const e = err instanceof RegistryError ? err : new RegistryError('server_error', 500)
    return NextResponse.json({ ok: false, error: e.code }, { status: e.httpStatus })
  }
}
