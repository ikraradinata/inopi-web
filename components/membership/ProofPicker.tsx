'use client'

import { useRef, useState } from 'react'
import { useTranslations } from 'next-intl'
import { IconCamera, IconFileUpload, IconX } from '@tabler/icons-react'
import { ProofFileError, prepareProofFile } from '@/lib/client/proofFile'

/**
 * Status berkas bukti transfer + unggahnya ke server. Dipakai jalur A dan Corporate.
 * `upload()` mengunggah sekali; token disimpan agar kirim ulang tidak mengunggah lagi.
 */
export function useProofFile() {
  const t = useTranslations('MembershipForm')
  const [file, setFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [processing, setProcessing] = useState(false)
  const [token, setToken] = useState<string | null>(null)

  const pick = async (input: HTMLInputElement) => {
    const picked = input.files?.[0]
    input.value = ''
    if (!picked) return
    setError(null)
    setProcessing(true)
    try {
      const prepared = await prepareProofFile(picked)
      if (previewUrl) URL.revokeObjectURL(previewUrl)
      setFile(prepared)
      setPreviewUrl(prepared.type.startsWith('image/') ? URL.createObjectURL(prepared) : null)
      setToken(null) // berkas baru: unggah ulang
    } catch (err) {
      setError(t(`proof.errors.${err instanceof ProofFileError ? err.key : 'read'}`))
    } finally {
      setProcessing(false)
    }
  }

  const remove = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl)
    setFile(null)
    setPreviewUrl(null)
    setToken(null)
  }

  /** Mengembalikan token unggahan, atau `{ error }` berisi pesan siap tampil. */
  const upload = async (): Promise<{ token: string } | { error: string }> => {
    if (token) return { token }
    if (!file) return { error: t('proof.errors.required') }
    const res = await fetch('/api/membership/upload', { method: 'POST', headers: { 'Content-Type': file.type }, body: file })
    const json = await res.json().catch(() => null)
    if (!res.ok || !json?.ok) {
      return { error: t.has(`errors.${json?.error}`) ? t(`errors.${json.error}`) : t('errors.upload') }
    }
    setToken(json.uploadToken as string)
    return { token: json.uploadToken as string }
  }

  return { file, previewUrl, error, setError, processing, pick, remove, upload, resetToken: () => setToken(null) }
}

export type ProofFileState = ReturnType<typeof useProofFile>

export default function ProofPicker({ proof, busy }: { proof: ProofFileState; busy: boolean }) {
  const t = useTranslations('MembershipForm')
  const cameraRef = useRef<HTMLInputElement>(null)
  const galleryRef = useRef<HTMLInputElement>(null)
  const { file, previewUrl, error, processing } = proof

  const pickButton =
    'h-12 inline-flex items-center justify-center gap-2 rounded-[10px] border text-[14px] font-medium'
  const pickStyle = { borderColor: 'var(--inopi-espresso)', color: 'var(--inopi-espresso)' }

  return (
    <div>
      <p className="font-body text-[13px] font-medium mb-2" style={{ color: 'var(--inopi-espresso)' }}>
        {t('proof.label')} <span aria-hidden>*</span>
      </p>
      <input ref={cameraRef} type="file" accept="image/*" capture="environment" className="sr-only" tabIndex={-1} onChange={(e) => proof.pick(e.target)} />
      <input ref={galleryRef} type="file" accept="image/jpeg,image/png,application/pdf" className="sr-only" tabIndex={-1} onChange={(e) => proof.pick(e.target)} />

      {file ? (
        <div className="flex items-center gap-3 rounded-[12px] border p-3" style={{ borderColor: 'var(--inopi-sand)' }}>
          {previewUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={previewUrl} alt="" className="w-14 h-14 rounded-[8px] object-cover flex-shrink-0" />
          ) : (
            <span className="w-14 h-14 rounded-[8px] flex items-center justify-center flex-shrink-0" style={{ background: 'var(--inopi-sand)' }}>
              <IconFileUpload size={22} style={{ color: 'var(--inopi-espresso)' }} />
            </span>
          )}
          <span className="min-w-0 flex-1">
            <span className="font-body text-[13px] font-medium block truncate" style={{ color: 'var(--inopi-espresso)' }}>{file.name}</span>
            <span className="font-body text-[12px]" style={{ color: 'var(--inopi-taupe-strong)' }}>{(file.size / 1024).toFixed(0)} KB</span>
          </span>
          <button type="button" onClick={proof.remove} disabled={busy} className="p-2 rounded-full" aria-label={t('proof.remove')} style={{ color: 'var(--inopi-taupe-strong)' }}>
            <IconX size={18} />
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <button type="button" disabled={processing} onClick={() => cameraRef.current?.click()} className={pickButton} style={pickStyle}>
            <IconCamera size={18} /> {t('proof.camera')}
          </button>
          <button type="button" disabled={processing} onClick={() => galleryRef.current?.click()} className={pickButton} style={pickStyle}>
            <IconFileUpload size={18} /> {t('proof.gallery')}
          </button>
        </div>
      )}
      <p className="font-body text-[12px] mt-2" style={{ color: 'var(--inopi-taupe-strong)' }} aria-live="polite">
        {processing ? t('proof.processing') : t('proof.hint')}
      </p>
      {error && (
        <p role="alert" className="text-[12px] mt-1" style={{ color: 'var(--destructive)' }}>
          {error}
        </p>
      )}
    </div>
  )
}
