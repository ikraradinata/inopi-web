'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'
import { IconCheck } from '@tabler/icons-react'

const schema = z.object({
  nama: z.string().min(2, 'Nama minimal 2 karakter'),
  email: z.string().email('Email tidak valid'),
  subjek: z.string().min(3, 'Subjek wajib diisi'),
  pesan: z.string().min(10, 'Pesan minimal 10 karakter'),
})

type FormData = z.infer<typeof schema>

export default function ContactForm() {
  const [sent, setSent] = useState(false)
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: FormData) => {
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
    } catch {}
    setSent(true)
    toast.success('Pesan Anda berhasil terkirim!')
  }

  if (sent) {
    return (
      <div className="text-center py-12">
        <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: '#e0f7f5' }}>
          <IconCheck size={24} style={{ color: '#0d9488' }} />
        </div>
        <h3 className="font-display font-bold text-[18px] mb-2" style={{ color: '#071422' }}>Pesan Terkirim!</h3>
        <p className="font-body text-[14px]" style={{ color: '#4a6070' }}>
          Pesan Anda berhasil terkirim. Tim kami akan merespons dalam 1×24 jam.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      {[
        { name: 'nama', label: 'Nama', type: 'text', placeholder: 'Nama lengkap Anda' },
        { name: 'email', label: 'Email', type: 'email', placeholder: 'email@domain.com' },
        { name: 'subjek', label: 'Subjek', type: 'text', placeholder: 'Perihal pesan' },
      ].map((f) => (
        <div key={f.name}>
          <label className="font-body text-[13px] font-medium mb-1 block" style={{ color: '#071422' }}>{f.label}</label>
          <input
            {...register(f.name as keyof FormData)}
            type={f.type}
            placeholder={f.placeholder}
            className="w-full px-3 py-2.5 text-[13px] rounded-[8px] border outline-none focus:border-[#0d9488] transition-colors"
            style={{ borderColor: '#e0e8ef', color: '#0d1e2e' }}
          />
          {errors[f.name as keyof FormData] && (
            <p className="text-[11px] mt-1" style={{ color: '#ef4444' }}>
              {errors[f.name as keyof FormData]?.message}
            </p>
          )}
        </div>
      ))}
      <div>
        <label className="font-body text-[13px] font-medium mb-1 block" style={{ color: '#071422' }}>Pesan</label>
        <textarea
          {...register('pesan')}
          rows={5}
          placeholder="Tuliskan pesan Anda..."
          className="w-full px-3 py-2.5 text-[13px] rounded-[8px] border outline-none focus:border-[#0d9488] transition-colors resize-none"
          style={{ borderColor: '#e0e8ef', color: '#0d1e2e' }}
        />
        {errors.pesan && <p className="text-[11px] mt-1" style={{ color: '#ef4444' }}>{errors.pesan.message}</p>}
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="py-3 text-[14px] font-semibold text-white rounded-[8px] transition-all hover:-translate-y-px disabled:opacity-60"
        style={{ background: '#083344' }}
      >
        {isSubmitting ? 'Mengirim...' : 'Kirim Pesan'}
      </button>
    </form>
  )
}
