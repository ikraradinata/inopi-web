import { NextResponse } from 'next/server'
import { RegistryError, registryCall } from '@/lib/registry/client'
import { corporateSubmitSchema, submitSchema } from '@/lib/schemas/keanggotaan'
import { clientIp, looksLikeBot } from '@/lib/spam'

export const maxDuration = 30
export const dynamic = 'force-dynamic'

/** Mengirim pendaftaran: jalur A (Student/Profesional) atau Corporate (PIC). */
export async function POST(req: Request) {
  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ ok: false, error: 'bad_request' }, { status: 400 })
  }

  // Bot dibalas seolah berhasil agar tidak mencoba ulang; tidak ada yang disimpan.
  if (looksLikeBot(body)) return NextResponse.json({ ok: true, receiptToken: '0'.repeat(64) })

  const ip = clientIp(req)

  if (body.category === 'corporate') {
    const parsed = corporateSubmitSchema.safeParse({ ...body, category: undefined })
    if (!parsed.success) return NextResponse.json({ ok: false, error: 'invalid_data' }, { status: 400 })
    const d = parsed.data
    try {
      const r = await registryCall<{ receiptToken: string }>(
        'register',
        {
          category: 'corporate',
          reservationToken: d.reservationToken,
          uploadToken: d.uploadToken,
          organization: d.organisasi,
          country: d.negara,
          name: d.nama,
          position: d.jabatan,
          email: d.email,
          whatsapp: d.hp,
          useSeat1: d.pakaiKursi1,
          needInvoice: d.butuhInvoice,
          billingAddress: d.butuhInvoice ? (d.alamatTagihan ?? '') : '',
          locale: d.locale,
          consent: d.persetujuan,
        },
        ip,
      )
      return NextResponse.json({ ok: true, receiptToken: r.receiptToken })
    } catch (err) {
      const e = err instanceof RegistryError ? err : new RegistryError('server_error', 500)
      return NextResponse.json({ ok: false, error: e.code }, { status: e.httpStatus })
    }
  }

  const parsed = submitSchema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ ok: false, error: 'invalid_data' }, { status: 400 })
  const d = parsed.data

  try {
    const r = await registryCall<{ receiptToken: string; regNumber: string }>(
      'register',
      {
        category: d.category,
        reservationToken: d.reservationToken,
        uploadToken: d.uploadToken,
        name: d.nama,
        email: d.email,
        whatsapp: d.hp,
        occupation: d.pekerjaan,
        position: d.jabatan ?? '',
        institution: d.institusi,
        country: d.negara,
        locale: d.locale,
        consent: d.persetujuan,
      },
      ip,
    )
    return NextResponse.json({ ok: true, receiptToken: r.receiptToken })
  } catch (err) {
    const e = err instanceof RegistryError ? err : new RegistryError('server_error', 500)
    return NextResponse.json({ ok: false, error: e.code }, { status: e.httpStatus })
  }
}
