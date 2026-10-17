'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { useForm, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { Field, Honeypot, PrivacyConsent, inputClass, inputStyle, readHoneypot } from '@/components/ui/FormField'
import { kemitraanSchema, type KemitraanInput } from '@/lib/schemas/kemitraan'
import { COLLAB_MODELS, ORG_TYPES, START_TIMES, SUMMARY_MAX } from '@/lib/constants/kemitraan'

export default function KemitraanForm() {
  const t = useTranslations('KemitraanForm')
  const tk = useTranslations('Kemitraan')
  const tf = useTranslations('Forms')
  const tv = useTranslations('Validation')
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
        toast.error(json?.code === 'rate_limited' ? tf('rateLimited') : tf('failure'))
        return
      }
      router.push('/kemitraan/terima-kasih')
    } catch {
      toast.error(tf('failure'))
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label={t('name')} required error={errors.nama?.message}>
          <input {...register('nama')} type="text" autoComplete="name" className={inputClass} style={inputStyle} />
        </Field>
        <Field label={t('email')} required error={errors.email?.message}>
          <input {...register('email')} type="email" autoComplete="email" className={inputClass} style={inputStyle} />
        </Field>
        <Field label={t('phone')} error={errors.telepon?.message}>
          <input {...register('telepon')} type="tel" autoComplete="tel" className={inputClass} style={inputStyle} />
        </Field>
        <Field label={t('organization')} required error={errors.organisasi?.message}>
          <input {...register('organisasi')} type="text" autoComplete="organization" className={inputClass} style={inputStyle} />
        </Field>
      </div>

      <Field label={t('orgType')} required error={errors.jenisOrganisasi?.message}>
        <select {...register('jenisOrganisasi')} defaultValue="" className={inputClass} style={inputStyle}>
          <option value="" disabled>
            {t('orgTypePlaceholder')}
          </option>
          {ORG_TYPES.map((ot) => (
            <option key={ot} value={ot}>
              {t(`orgTypes.${ot}`)}
            </option>
          ))}
        </select>
      </Field>

      <fieldset>
        <legend className="font-body text-[13px] font-medium mb-2" style={{ color: 'var(--inopi-espresso)' }}>
          {t('models')} <span aria-hidden>*</span>
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
                {tk(`models.${m.value}.title`)}
              </span>
            </label>
          ))}
        </div>
        {errors.model && (
          <p role="alert" className="text-[11px] mt-1" style={{ color: 'var(--destructive)' }}>
            {tv(errors.model.message as string)}
          </p>
        )}
      </fieldset>

      <Field label={t('summary')} required error={errors.ringkasan?.message}>
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

      <Field label={t('startTime')} error={errors.waktuMulai?.message}>
        <select {...register('waktuMulai')} className={inputClass} style={inputStyle}>
          <option value="">{t('startPlaceholder')}</option>
          {START_TIMES.map((st) => (
            <option key={st} value={st}>
              {t(`startTimes.${st}`)}
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
        {isSubmitting ? t('sending') : t('submit')}
      </button>
    </form>
  )
}
