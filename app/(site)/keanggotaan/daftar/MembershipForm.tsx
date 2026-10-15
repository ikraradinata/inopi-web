'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'sonner'
import { IconCheck } from '@tabler/icons-react'

const categories = [
  { id: 'individu', label: 'Individu', desc: 'Peneliti, dosen, dan pelajar — Rp 500k/tahun' },
  { id: 'institusi', label: 'Institusi', desc: 'Universitas dan lab riset — Rp 5.5jt/tahun' },
  { id: 'korporat', label: 'Korporat', desc: 'Perusahaan skala besar — Custom pricing' },
]

const step2Schema = z.object({
  nama: z.string().min(2, 'Nama minimal 2 karakter'),
  email: z.string().email('Email tidak valid'),
  hp: z.string().min(8, 'Nomor HP tidak valid'),
  institusi: z.string().min(2, 'Institusi wajib diisi'),
  bidang: z.string().optional(),
  agree: z.literal(true, { message: 'Anda harus menyetujui syarat & ketentuan' }),
})

type FormData = z.infer<typeof step2Schema>

export default function MembershipForm() {
  const [step, setStep] = useState(1)
  const [category, setCategory] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const { register, handleSubmit, getValues, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(step2Schema),
  })

  const onSubmit = async (data: FormData) => {
    if (step === 2) { setStep(3); return }
    if (step === 3) {
      try {
        await fetch('/api/membership', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ category, ...data }),
        })
      } catch {}
      setSubmitted(true)
      toast.success('Pendaftaran berhasil dikirim!')
    }
  }

  if (submitted) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'var(--inopi-sand)' }}>
          <IconCheck size={28} style={{ color: 'var(--inopi-teal-strong)' }} />
        </div>
        <h2 className="font-display font-bold text-[20px] mb-2" style={{ color: 'var(--inopi-espresso)' }}>Terima Kasih!</h2>
        <p className="font-body text-[14px]" style={{ color: 'var(--inopi-taupe-strong)' }}>
          Pendaftaran Anda telah diterima. Tim kami akan menghubungi Anda dalam 1×24 jam untuk proses verifikasi.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Progress bar */}
      <div className="flex items-center gap-2 mb-8">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center gap-2 flex-1">
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center text-[12px] font-bold flex-shrink-0"
              style={{
                background: s <= step ? 'var(--inopi-espresso)' : 'var(--inopi-sand)',
                color: s <= step ? 'var(--inopi-ivory)' : 'var(--inopi-sage-strong)',
              }}
            >
              {s < step ? <IconCheck size={13} /> : s}
            </div>
            {s < 3 && (
              <div className="flex-1 h-0.5" style={{ background: s < step ? 'var(--inopi-teal-strong)' : 'var(--inopi-sand)' }} />
            )}
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <h2 className="font-display font-bold text-[18px] mb-5" style={{ color: 'var(--inopi-espresso)' }}>Pilih Kategori</h2>
            <div className="flex flex-col gap-3 mb-6">
              {categories.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setCategory(c.id)}
                  className="text-left p-4 rounded-[12px] border-2 transition-all"
                  style={{
                    borderColor: category === c.id ? 'var(--inopi-espresso)' : 'var(--inopi-sand)',
                    background: category === c.id ? 'var(--inopi-sand)' : 'var(--inopi-ivory)',
                  }}
                >
                  <p className="font-display font-semibold text-[14px]" style={{ color: 'var(--inopi-espresso)' }}>{c.label}</p>
                  <p className="font-body text-[12px]" style={{ color: 'var(--inopi-taupe-strong)' }}>{c.desc}</p>
                </button>
              ))}
            </div>
            <button
              type="button"
              disabled={!category}
              onClick={() => setStep(2)}
              className="w-full py-2.5 text-[14px] font-semibold text-white rounded-[8px] disabled:opacity-50 transition-all hover:-translate-y-px"
              style={{ background: 'var(--inopi-espresso)' }}
            >
              Lanjut →
            </button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <h2 className="font-display font-bold text-[18px] mb-5" style={{ color: 'var(--inopi-espresso)' }}>Data Diri</h2>
            <div className="flex flex-col gap-4 mb-6">
              {[
                { name: 'nama', label: 'Nama Lengkap', type: 'text', placeholder: 'Nama lengkap Anda' },
                { name: 'email', label: 'Email', type: 'email', placeholder: 'email@institusi.ac.id' },
                { name: 'hp', label: 'No. HP', type: 'tel', placeholder: '+62 812 3456 7890' },
                { name: 'institusi', label: 'Institusi/Universitas', type: 'text', placeholder: 'Universitas / perusahaan Anda' },
                { name: 'bidang', label: 'Bidang Riset (opsional)', type: 'text', placeholder: 'mis. AI in Education' },
              ].map((f) => (
                <div key={f.name}>
                  <label className="font-body text-[13px] font-medium mb-1 block" style={{ color: 'var(--inopi-espresso)' }}>
                    {f.label}
                  </label>
                  <input
                    {...register(f.name as keyof FormData)}
                    type={f.type}
                    placeholder={f.placeholder}
                    className="w-full px-3 py-2.5 text-[13px] rounded-[8px] border outline-none transition-colors focus:border-[var(--inopi-teal-strong)]"
                    style={{ borderColor: 'var(--inopi-sand)', background: 'var(--inopi-ivory)', color: 'var(--inopi-espresso)' }}
                  />
                  {errors[f.name as keyof FormData] && (
                    <p className="text-[11px] mt-1" style={{ color: 'var(--destructive)' }}>
                      {errors[f.name as keyof FormData]?.message}
                    </p>
                  )}
                </div>
              ))}
            </div>
            <div className="flex gap-3">
              <button type="button" onClick={() => setStep(1)}
                className="flex-1 py-2.5 text-[14px] font-medium rounded-[8px] border transition-colors hover:border-[var(--inopi-teal-strong)]"
                style={{ color: 'var(--inopi-espresso)', borderColor: 'var(--inopi-sand)' }}>
                ← Kembali
              </button>
              <button type="submit"
                className="flex-1 py-2.5 text-[14px] font-semibold text-white rounded-[8px] transition-all hover:-translate-y-px"
                style={{ background: 'var(--inopi-espresso)' }}>
                Lanjut →
              </button>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <h2 className="font-display font-bold text-[18px] mb-5" style={{ color: 'var(--inopi-espresso)' }}>Konfirmasi</h2>
            <div className="rounded-[12px] p-4 border mb-5" style={{ borderColor: 'var(--inopi-sand)', background: 'var(--inopi-ivory)' }}>
              <div className="space-y-2">
                <div className="flex justify-between text-[13px]">
                  <span style={{ color: 'var(--inopi-taupe-strong)' }}>Kategori</span>
                  <span className="font-medium capitalize" style={{ color: 'var(--inopi-espresso)' }}>{category}</span>
                </div>
                <div className="flex justify-between text-[13px]">
                  <span style={{ color: 'var(--inopi-taupe-strong)' }}>Nama</span>
                  <span className="font-medium" style={{ color: 'var(--inopi-espresso)' }}>{getValues('nama')}</span>
                </div>
                <div className="flex justify-between text-[13px]">
                  <span style={{ color: 'var(--inopi-taupe-strong)' }}>Email</span>
                  <span className="font-medium" style={{ color: 'var(--inopi-espresso)' }}>{getValues('email')}</span>
                </div>
                <div className="flex justify-between text-[13px]">
                  <span style={{ color: 'var(--inopi-taupe-strong)' }}>Institusi</span>
                  <span className="font-medium" style={{ color: 'var(--inopi-espresso)' }}>{getValues('institusi')}</span>
                </div>
              </div>
            </div>
            <label className="flex items-start gap-3 mb-6 cursor-pointer">
              <input type="checkbox" {...register('agree')} className="mt-0.5" />
              <span className="font-body text-[13px]" style={{ color: 'var(--inopi-taupe-strong)' }}>
                Saya menyetujui <a href="/syarat" className="underline" style={{ color: 'var(--inopi-teal-strong)' }}>syarat & ketentuan</a> keanggotaan INOPI.
              </span>
            </label>
            {errors.agree && <p className="text-[11px] mb-3" style={{ color: 'var(--destructive)' }}>{errors.agree.message}</p>}
            <div className="flex gap-3">
              <button type="button" onClick={() => setStep(2)}
                className="flex-1 py-2.5 text-[14px] font-medium rounded-[8px] border transition-colors hover:border-[var(--inopi-teal-strong)]"
                style={{ color: 'var(--inopi-espresso)', borderColor: 'var(--inopi-sand)' }}>
                ← Kembali
              </button>
              <button type="submit"
                className="flex-1 py-2.5 text-[14px] font-semibold text-white rounded-[8px] transition-all hover:-translate-y-px"
                style={{ background: 'var(--inopi-espresso)' }}>
                Kirim Pendaftaran
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  )
}
