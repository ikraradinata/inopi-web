'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { Field, Honeypot, PrivacyConsent, inputClass, inputStyle, readHoneypot } from '@/components/ui/FormField'
import { CONTACT_TOPICS, kontakSchema, type KontakInput } from '@/lib/schemas/kontak'
import { FAILURE_MESSAGE } from '@/lib/constants/kemitraan'

export default function ContactForm() {
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
        toast.error(json?.message ?? FAILURE_MESSAGE)
        return
      }
      router.push('/kontak/terima-kasih')
    } catch {
      toast.error(FAILURE_MESSAGE)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
      <Field label="Nama" required error={errors.nama?.message}>
        <input {...register('nama')} type="text" autoComplete="name" placeholder="Nama lengkap Anda" className={inputClass} style={inputStyle} />
      </Field>
      <Field label="Email" required error={errors.email?.message}>
        <input {...register('email')} type="email" autoComplete="email" placeholder="email@domain.com" className={inputClass} style={inputStyle} />
      </Field>
      <Field label="Topik" required error={errors.topik?.message}>
        <select {...register('topik')} defaultValue="" className={inputClass} style={inputStyle}>
          <option value="" disabled>
            Pilih topik
          </option>
          {CONTACT_TOPICS.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </Field>
      <Field label="Subjek" required error={errors.subjek?.message}>
        <input {...register('subjek')} type="text" placeholder="Perihal pesan" className={inputClass} style={inputStyle} />
      </Field>
      <Field label="Pesan" required error={errors.pesan?.message}>
        <textarea
          {...register('pesan')}
          rows={5}
          placeholder="Tuliskan pesan Anda..."
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
        {isSubmitting ? 'Mengirim...' : 'Kirim Pesan'}
      </button>
    </form>
  )
}
