import { NextResponse } from 'next/server'
import { RegistryError, registryCall } from '@/lib/registry/client'
import { MAX_PROOF_BYTES } from '@/lib/membership/config'
import { isAllowedProofType, sniffProofType } from '@/lib/membership/proof'
import { clientIp } from '@/lib/spam'

export const maxDuration = 60
export const dynamic = 'force-dynamic'

const fail = (error: string, status: number) => NextResponse.json({ ok: false, error }, { status })

/**
 * Menerima bukti transfer (isi berkas apa adanya di body) dan meneruskannya ke folder Drive privat.
 * Tipe diperiksa dari ISI berkas, bukan dari header klien.
 */
export async function POST(req: Request) {
  const declared = Number(req.headers.get('content-length') ?? 0)
  if (declared > MAX_PROOF_BYTES + 1024) return fail('file_too_large', 413)

  const bytes = new Uint8Array(await req.arrayBuffer())
  if (bytes.length === 0) return fail('invalid_file', 400)
  if (bytes.length > MAX_PROOF_BYTES) return fail('file_too_large', 413)

  const mime = sniffProofType(bytes)
  const claimed = (req.headers.get('content-type') ?? '').split(';')[0].trim()
  if (!mime || !isAllowedProofType(mime) || (claimed && claimed !== mime && claimed !== 'application/octet-stream')) {
    return fail('invalid_file_type', 415)
  }

  try {
    const r = await registryCall<{ uploadToken: string }>(
      'upload',
      { mime, dataBase64: Buffer.from(bytes).toString('base64') },
      clientIp(req),
    )
    return NextResponse.json({ ok: true, uploadToken: r.uploadToken })
  } catch (err) {
    const e = err instanceof RegistryError ? err : new RegistryError('server_error', 500)
    return fail(e.code, e.httpStatus)
  }
}
