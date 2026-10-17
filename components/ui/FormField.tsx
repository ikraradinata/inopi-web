import Link from 'next/link'

export const inputClass =
  'w-full px-3 py-2.5 text-[13px] rounded-[8px] border outline-none bg-white focus:border-[var(--inopi-teal-strong)] transition-colors'
export const inputStyle = { borderColor: 'var(--inopi-taupe-strong)', color: 'var(--inopi-espresso)' }

export function Field({
  label,
  required,
  error,
  children,
}: {
  label: string
  required?: boolean
  error?: string
  children: React.ReactNode
}) {
  return (
    <div>
      <label className="font-body text-[13px] font-medium mb-1 block" style={{ color: 'var(--inopi-espresso)' }}>
        {label}
        {required && <span aria-hidden> *</span>}
      </label>
      {children}
      {error && (
        <p role="alert" className="text-[11px] mt-1" style={{ color: 'var(--destructive)' }}>
          {error}
        </p>
      )}
    </div>
  )
}

/** Honeypot: tersembunyi dari pengguna, terisi oleh bot. */
export function Honeypot() {
  return (
    <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
      <label>
        Website
        <input type="text" name="website" tabIndex={-1} autoComplete="off" />
      </label>
    </div>
  )
}

/** Mengambil nilai honeypot dari form yang sedang disubmit. */
export function readHoneypot(event?: React.BaseSyntheticEvent): string {
  const el = (event?.target as HTMLFormElement | undefined)?.elements?.namedItem('website')
  return el instanceof HTMLInputElement ? el.value : ''
}

export const PRIVACY_CONSENT_TEXT =
  'Saya menyetujui pengumpulan dan penggunaan data pribadi saya oleh INOPI untuk keperluan memproses permintaan ini, sesuai dengan'

/** Kotak centang persetujuan privasi (teks dari docs/02_KONTEN_BARU_P0.md, bagian K). */
export function PrivacyConsent({
  inputProps,
  error,
}: {
  inputProps: React.InputHTMLAttributes<HTMLInputElement>
  error?: string
}) {
  return (
    <div>
      <label className="flex items-start gap-3 cursor-pointer">
        <input type="checkbox" {...inputProps} className="mt-0.5" />
        <span className="font-body text-[13px]" style={{ color: 'var(--inopi-taupe-strong)' }}>
          {PRIVACY_CONSENT_TEXT}{' '}
          <Link href="/privacy" className="underline" style={{ color: 'var(--inopi-teal-strong)' }}>
            Kebijakan Privasi
          </Link>
          .
        </span>
      </label>
      {error && (
        <p role="alert" className="text-[11px] mt-1" style={{ color: 'var(--destructive)' }}>
          {error}
        </p>
      )}
    </div>
  )
}
