'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { Field, Honeypot, PrivacyConsent, inputClass, inputStyle, readHoneypot } from '@/components/ui/FormField'
import { CONTACT_TOPICS, kontakSchema, type KontakInput } from '@/lib/schemas/kontak'

export default function ContactForm() {
  const t = useTranslations('ContactForm')
  const tf = useTranslations('Forms')
  const router = useRouter()
  // Waktu halaman dibuka; server menolak kiriman yang terlalu cepat untuk manusia.
  const [startedAt] = useState(() => Date.now())
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<KontakInput>({ resolver: zodResolver(kontakSchema) })

  const onSubmit = async (data: KontakInput, event?: React.BaseSyntheticEvent) => {
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, website: readHoneypot(event), startedAt }),
      })
      const json = await res.json().catch(() => null)
      if (!res.ok || !json?.success) {
        toast.error(json?.code === 'rate_limited' ? tf('rateLimited') : tf('failure'))
        return
      }
      router.push('/kontak/terima-kasih')
    } catch {
      toast.error(tf('failure'))
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
      <Field label={t('name')} required error={errors.nama?.message}>
        <input {...register('nama')} type="text" autoComplete="name" placeholder={t('namePlaceholder')} className={inputClass} style={inputStyle} />
      </Field>
      <Field label={t('email')} required error={errors.email?.message}>
        <input {...register('email')} type="email" autoComplete="email" placeholder={t('emailPlaceholder')} className={inputClass} style={inputStyle} />
      </Field>
      <Field label={t('topic')} required error={errors.topik?.message}>
        <select {...register('topik')} defaultValue="" className={inputClass} style={inputStyle}>
          <option value="" disabled>
            {t('topicPlaceholder')}
          </option>
          {CONTACT_TOPICS.map((topic) => (
            <option key={topic} value={topic}>
              {t(`topics.${topic}`)}
            </option>
          ))}
        </select>
      </Field>
      <Field label={t('subject')} required error={errors.subjek?.message}>
        <input {...register('subjek')} type="text" placeholder={t('subjectPlaceholder')} className={inputClass} style={inputStyle} />
      </Field>
      <Field label={t('message')} required error={errors.pesan?.message}>
        <textarea
          {...register('pesan')}
          rows={5}
          placeholder={t('messagePlaceholder')}
          className={`${inputClass} resize-none`}
          style={inputStyle}
        />
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
