'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { kemitraanSchema, type KemitraanInput } from '@/lib/schemas/kemitraan'
import {
  COLLAB_MODELS,
  FAILURE_MESSAGE,
  ORG_TYPES,
  PRIVACY_CONSENT_TEXT,
  START_TIMES,
  SUMMARY_MAX,
} from '@/lib/constants/kemitraan'

const inputClass =
  'w-full px-3 py-2.5 text-[13px] rounded-[8px] border outline-none bg-white focus:border-[var(--inopi-teal-strong)] transition-colors'
const inputStyle = { borderColor: 'var(--inopi-taupe-strong)', color: 'var(--inopi-espresso)' }

function Field({
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

export default function KemitraanForm() {
  const router = useRouter()
  // Waktu halaman dibuka; server menolak kiriman yang terlalu cepat untuk manusia.
  const startedAt = useRef(Date.now())
  const honeypot = useRef<HTMLInputElement>(null)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<KemitraanInput>({
    resolver: zodResolver(kemitraanSchema),
    defaultValues: { model: [], waktuMulai: '' },
  })

  const ringkasanLength = watch('ringkasan')?.length ?? 0

  const onSubmit = async (data: KemitraanInput) => {
    try {
      const res = await fetch('/api/kemitraan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          website: honeypot.current?.value ?? '',
          startedAt: startedAt.current,
        }),
      })
      const json = await res.json().catch(() => null)
      if (!res.ok || !json?.success) {
        toast.error(json?.message ?? FAILURE_MESSAGE)
        return
      }
      router.push('/kemitraan/terima-kasih')
    } catch {
      toast.error(FAILURE_MESSAGE)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="Nama lengkap" required error={errors.nama?.message}>
          <input {...register('nama')} type="text" autoComplete="name" className={inputClass} style={inputStyle} />
        </Field>
        <Field label="Email" required error={errors.email?.message}>
          <input {...register('email')} type="email" autoComplete="email" className={inputClass} style={inputStyle} />
        </Field>
        <Field label="Nomor telepon/WhatsApp" error={errors.telepon?.message}>
          <input {...register('telepon')} type="tel" autoComplete="tel" className={inputClass} style={inputStyle} />
        </Field>
        <Field label="Nama organisasi" required error={errors.organisasi?.message}>
          <input {...register('organisasi')} type="text" autoComplete="organization" className={inputClass} style={inputStyle} />
        </Field>
      </div>

      <Field label="Jenis organisasi" required error={errors.jenisOrganisasi?.message}>
        <select {...register('jenisOrganisasi')} defaultValue="" className={inputClass} style={inputStyle}>
          <option value="" disabled>
            Pilih jenis organisasi
          </option>
          {ORG_TYPES.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </Field>

      <fieldset>
        <legend className="font-body text-[13px] font-medium mb-2" style={{ color: 'var(--inopi-espresso)' }}>
          Model kolaborasi yang diminati <span aria-hidden>*</span>
        </legend>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {COLLAB_MODELS.map((m) => (
            <label
              key={m.value}
              className="flex items-start gap-3 rounded-[8px] border p-3 cursor-pointer bg-white"
              style={{ borderColor: 'var(--inopi-sand)' }}
            >
              <input type="checkbox" value={m.value} {...register('model')} className="mt-0.5" />
              <span className="font-body text-[13px]" style={{ color: 'var(--inopi-espresso)' }}>
                {m.title}
              </span>
            </label>
          ))}
        </div>
        {errors.model && (
          <p role="alert" className="text-[11px] mt-1" style={{ color: 'var(--destructive)' }}>
            {errors.model.message}
          </p>
        )}
      </fieldset>

      <Field label="Ringkasan gagasan atau kebutuhan" required error={errors.ringkasan?.message}>
        <textarea
          {...register('ringkasan')}
          rows={5}
          maxLength={SUMMARY_MAX}
          className={`${inputClass} resize-none`}
          style={inputStyle}
        />
        <p className="text-[11px] mt-1 text-right" style={{ color: 'var(--inopi-taupe-strong)' }}>
          {ringkasanLength}/{SUMMARY_MAX}
        </p>
      </Field>

      <Field label="Perkiraan waktu mulai" error={errors.waktuMulai?.message}>
        <select {...register('waktuMulai')} className={inputClass} style={inputStyle}>
          <option value="">Pilih perkiraan waktu</option>
          {START_TIMES.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </Field>

      {/* Honeypot: tersembunyi dari pengguna, terisi oleh bot. */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Website
          <input ref={honeypot} type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div>
        <label className="flex items-start gap-3 cursor-pointer">
          <input type="checkbox" {...register('persetujuan')} className="mt-0.5" />
          <span className="font-body text-[13px]" style={{ color: 'var(--inopi-taupe-strong)' }}>
            {PRIVACY_CONSENT_TEXT}{' '}
            <Link href="/privacy" className="underline" style={{ color: 'var(--inopi-teal-strong)' }}>
              Kebijakan Privasi
            </Link>
            .
          </span>
        </label>
        {errors.persetujuan && (
          <p role="alert" className="text-[11px] mt-1" style={{ color: 'var(--destructive)' }}>
            {errors.persetujuan.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="py-3 text-[14px] font-semibold text-white rounded-[8px] transition-all hover:-translate-y-px disabled:opacity-60"
        style={{ background: 'var(--inopi-espresso)' }}
      >
        {isSubmitting ? 'Mengirim...' : 'Kirim Pengajuan'}
      </button>
    </form>
  )
}
