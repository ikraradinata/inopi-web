// Klien untuk Apps Script "INOPI Registry" (apps-script/registry.js). HANYA kode server:
// APPS_SCRIPT_SECRET tidak boleh sampai ke browser.

export class RegistryError extends Error {
  constructor(
    public code: string,
    public httpStatus = 502,
  ) {
    super(code)
    this.name = 'RegistryError'
  }
}

/** Kode galat dari skrip -> status HTTP untuk browser. */
const STATUS_BY_CODE: Record<string, number> = {
  rate_limited: 429,
  invalid_category: 400,
  invalid_name: 400,
  invalid_email: 400,
  invalid_whatsapp: 400,
  invalid_occupation: 400,
  invalid_institution: 400,
  invalid_position: 400,
  invalid_billing: 400,
  invalid_data: 400,
  invalid_country: 400,
  invalid_file: 400,
  invalid_file_type: 415,
  file_too_large: 413,
  consent_required: 400,
  corporate_flow: 400,
  reservation_not_found: 409,
  reservation_used: 409,
  reservation_mismatch: 409,
  upload_not_found: 409,
  codes_exhausted: 503,
  busy: 503,
  not_found: 404,
}

export async function registryCall<T extends object>(action: string, payload: Record<string, unknown> = {}, ip = 'unknown'): Promise<T> {
  const url = process.env.APPS_SCRIPT_URL
  const secret = process.env.APPS_SCRIPT_SECRET
  if (!url || !secret) throw new RegistryError('not_configured', 503)

  let res: Response
  try {
    res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' }, // "simple request": menghindari preflight
      body: JSON.stringify({ ...payload, action, secret, ip }),
      redirect: 'follow',
      cache: 'no-store',
      signal: AbortSignal.timeout(25_000),
    })
  } catch (err) {
    console.error('[registry] gagal terhubung', err)
    throw new RegistryError('upstream_unreachable', 502)
  }

  let json: { ok?: boolean; error?: string } & Record<string, unknown>
  try {
    json = await res.json()
  } catch {
    // Biasanya halaman HTML Google (izin deploy salah, atau skrip belum di-deploy ulang).
    console.error('[registry] balasan bukan JSON, status', res.status)
    throw new RegistryError('upstream_invalid', 502)
  }
  if (!json.ok) {
    const code = String(json.error ?? 'server_error')
    throw new RegistryError(code, STATUS_BY_CODE[code] ?? 502)
  }
  return json as T
}
