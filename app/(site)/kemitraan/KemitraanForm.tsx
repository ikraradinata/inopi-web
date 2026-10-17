'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { Field, Honeypot, PrivacyConsent, inputClass, inputStyle, readHoneypot } from '@/components/ui/FormField'
import { kemitraanSchema, type KemitraanInput } from '@/lib/schemas/kemitraan'
import {
  COLLAB_MODELS,
  FAILURE_MESSAGE,
  ORG_TYPES,
  START_TIMES,
  SUMMARY_MAX,
} from '@/lib/constants/kemitraan'

export default function KemitraanForm() {
  const router = useRouter()
  // Waktu halaman dibuka; server menolak kiriman yang terlalu cepat untuk manusia.
  const [startedAt] = useState(() => Date.now())

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<KemitraanInput>({
    resolver: zodResolver(kemitraanSchema),
    defaultValues: { model: [], waktuMulai: '' },
  })

  const ringkasanLength = useWatch({ control, name: 'ringkasan' })?.length ?? 0

  const onSubmit = async (data: KemitraanInput, event?: React.BaseSyntheticEvent) => {
    try {
      const res = await fetch('/api/kemitraan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          website: readHoneypot(event),
          startedAt,
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

      <Honeypot />

      <PrivacyConsent inputProps={register('persetujuan')} error={errors.persetujuan?.message} />

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
