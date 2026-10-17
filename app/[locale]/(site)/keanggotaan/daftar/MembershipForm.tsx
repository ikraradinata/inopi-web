'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'sonner'
import { IconCheck, IconLoader2 } from '@tabler/icons-react'
import { PLANS, getPlan } from '@/lib/constants/membership'
import { formatRupiah } from '@/lib/constants/registration'
import { FAILURE_MESSAGE } from '@/lib/constants/kemitraan'
import { Honeypot, PrivacyConsent, readHoneypot } from '@/components/ui/FormField'
import { INTEREST_AREAS, keanggotaanDetailsSchema, type KeanggotaanDetails } from '@/lib/schemas/keanggotaan'

// Persetujuan privasi divalidasi terpisah di langkah 3, sebab checkbox-nya
// belum ada saat langkah 2 disubmit.
type FormData = KeanggotaanDetails

export default function MembershipForm() {
  const [step, setStep] = useState(1)
  const [category, setCategory] = useState('')
  const [sending, setSending] = useState(false)
  const router = useRouter()
  // Waktu halaman dibuka; server menolak kiriman yang terlalu cepat untuk manusia.
  const [startedAt] = useState(() => Date.now())
  const [agreed, setAgreed] = useState(false)
  const [agreeError, setAgreeError] = useState(false)
  const [wantsInfo, setWantsInfo] = useState(false)

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(keanggotaanDetailsSchema), defaultValues: { bidang: [] } })

  const selectedPlan = getPlan(category)

  const onSubmit = async (data: FormData, event?: React.BaseSyntheticEvent) => {
    if (step === 2) {
      setStep(3)
      return
    }
    if (step !== 3) return

    if (!agreed) {
      setAgreeError(true)
      return
    }

    setSending(true)
    try {
      const res = await fetch('/api/membership', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          category,
          persetujuan: true,
          infoKegiatan: wantsInfo,
          website: readHoneypot(event),
          startedAt,
        }),
      })
      const json = await res.json().catch(() => null)

      if (!res.ok || !json?.success) {
        toast.error(json?.message ?? FAILURE_MESSAGE)
        return
      }

      const params = new URLSearchParams({ reg: json.registrationId, k: json.category })
      router.push(`/keanggotaan/terima-kasih?${params.toString()}`)
    } catch {
      toast.error(FAILURE_MESSAGE)
    } finally {
      setSending(false)
    }
  }

  /* ---------- Formulir ---------- */
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
              <div
                className="flex-1 h-0.5"
                style={{ background: s < step ? 'var(--inopi-teal-strong)' : 'var(--inopi-sand)' }}
              />
            )}
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <h2 className="font-display font-bold text-[18px] mb-5" style={{ color: 'var(--inopi-espresso)' }}>
              Pilih Kategori
            </h2>
            <div className="flex flex-col gap-3 mb-6">
              {PLANS.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setCategory(p.id)}
                  className="text-left p-4 rounded-[12px] border-2 transition-all flex items-center justify-between gap-4"
                  style={{
                    borderColor: category === p.id ? 'var(--inopi-espresso)' : 'var(--inopi-sand)',
                    background: category === p.id ? 'var(--inopi-sand)' : 'var(--inopi-ivory)',
                  }}
                >
                  <span className="min-w-0">
                    <span className="font-display font-semibold text-[14px] block" style={{ color: 'var(--inopi-espresso)' }}>
                      {p.name}
                    </span>
                    <span className="font-body text-[12px] block" style={{ color: 'var(--inopi-taupe-strong)' }}>
                      {p.desc}
                      {p.note ? ` ${p.note}.` : ''}
                    </span>
                  </span>
                  <span
                    className="font-display font-bold text-[15px] flex-shrink-0 whitespace-nowrap"
                    style={{ color: 'var(--inopi-orange)' }}
                  >
                    {p.price}
                    <span className="font-body text-[11px] font-normal block text-right" style={{ color: 'var(--inopi-sage-strong)' }}>
                      per tahun
                    </span>
                  </span>
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
            <h2 className="font-display font-bold text-[18px] mb-5" style={{ color: 'var(--inopi-espresso)' }}>
              Data Diri
            </h2>
            <div className="flex flex-col gap-4 mb-6">
              {[
                { name: 'nama', label: 'Nama Lengkap', type: 'text', placeholder: 'Nama lengkap Anda' },
                { name: 'email', label: 'Email', type: 'email', placeholder: 'email@institusi.ac.id' },
                { name: 'hp', label: 'Nomor WhatsApp', type: 'tel', placeholder: '+62 812 3456 7890' },
                { name: 'institusi', label: 'Institusi/Organisasi', type: 'text', placeholder: 'Universitas / perusahaan Anda' },
                { name: 'jabatan', label: 'Jabatan/Peran (opsional)', type: 'text', placeholder: 'mis. Dosen, Manajer L&D' },
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
                      {errors[f.name as keyof FormData]?.message as string}
                    </p>
                  )}
                </div>
              ))}

              <fieldset>
                <legend className="font-body text-[13px] font-medium mb-2" style={{ color: 'var(--inopi-espresso)' }}>
                  Bidang Minat (opsional)
                </legend>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {INTEREST_AREAS.map((b) => (
                    <label
                      key={b}
                      className="flex items-start gap-3 rounded-[8px] border p-3 cursor-pointer"
                      style={{ borderColor: 'var(--inopi-sand)', background: 'var(--inopi-ivory)' }}
                    >
                      <input type="checkbox" value={b} {...register('bidang')} className="mt-0.5" />
                      <span className="font-body text-[13px]" style={{ color: 'var(--inopi-espresso)' }}>
                        {b}
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <div>
                <label className="font-body text-[13px] font-medium mb-1 block" style={{ color: 'var(--inopi-espresso)' }}>
                  Alasan Bergabung (opsional)
                </label>
                <textarea
                  {...register('alasan')}
                  rows={3}
                  maxLength={1000}
                  className="w-full px-3 py-2.5 text-[13px] rounded-[8px] border outline-none transition-colors focus:border-[var(--inopi-teal-strong)] resize-none"
                  style={{ borderColor: 'var(--inopi-sand)', background: 'var(--inopi-ivory)', color: 'var(--inopi-espresso)' }}
                />
                {errors.alasan && (
                  <p className="text-[11px] mt-1" style={{ color: 'var(--destructive)' }}>
                    {errors.alasan.message}
                  </p>
                )}
              </div>
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="flex-1 py-2.5 text-[14px] font-medium rounded-[8px] border transition-colors hover:border-[var(--inopi-teal-strong)]"
                style={{ color: 'var(--inopi-espresso)', borderColor: 'var(--inopi-sand)' }}
              >
                ← Kembali
              </button>
              <button
                type="submit"
                className="flex-1 py-2.5 text-[14px] font-semibold text-white rounded-[8px] transition-all hover:-translate-y-px"
                style={{ background: 'var(--inopi-espresso)' }}
              >
                Lanjut →
              </button>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <h2 className="font-display font-bold text-[18px] mb-5" style={{ color: 'var(--inopi-espresso)' }}>
              Konfirmasi
            </h2>
            <div
              className="rounded-[12px] p-4 border mb-5"
              style={{ borderColor: 'var(--inopi-sand)', background: 'var(--inopi-ivory)' }}
            >
              <div className="space-y-2">
                {[
                  ['Kategori', selectedPlan?.name ?? '-'],
                  ['Nama', getValues('nama')],
                  ['Email', getValues('email')],
                  ['WhatsApp', getValues('hp')],
                  ['Institusi', getValues('institusi')],
                  ['Jabatan/Peran', getValues('jabatan') || '-'],
                  ['Bidang Minat', getValues('bidang')?.join(', ') || '-'],
                ].map(([label, value]) => (
                  <div key={label} className="flex justify-between gap-4 text-[13px]">
                    <span style={{ color: 'var(--inopi-taupe-strong)' }}>{label}</span>
                    <span className="font-medium text-right" style={{ color: 'var(--inopi-espresso)' }}>
                      {value}
                    </span>
                  </div>
                ))}
                {selectedPlan && (
                  <div
                    className="flex justify-between gap-4 text-[13px] pt-2 mt-2"
                    style={{ borderTop: '1px solid var(--inopi-sand)' }}
                  >
                    <span style={{ color: 'var(--inopi-taupe-strong)' }}>Iuran per tahun</span>
                    <span className="font-display font-bold text-[16px]" style={{ color: 'var(--inopi-orange)' }}>
                      {formatRupiah(selectedPlan.amount)}
                    </span>
                  </div>
                )}
              </div>
            </div>

            <p className="font-body text-[12px] leading-relaxed mb-5" style={{ color: 'var(--inopi-sage-strong)' }}>
              Setelah dikirim, Anda akan menerima nomor registrasi dan instruksi pembayaran.
            </p>

            <Honeypot />

            <div className="mb-5 flex flex-col gap-3">
              <PrivacyConsent
                inputProps={{
                  checked: agreed,
                  onChange: (e) => {
                    setAgreed(e.target.checked)
                    if (e.target.checked) setAgreeError(false)
                  },
                }}
                error={agreeError ? 'Anda harus menyetujui kebijakan privasi' : undefined}
              />
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={wantsInfo}
                  onChange={(e) => setWantsInfo(e.target.checked)}
                  className="mt-0.5"
                />
                <span className="font-body text-[13px]" style={{ color: 'var(--inopi-taupe-strong)' }}>
                  Saya bersedia menerima informasi kegiatan dan program INOPI melalui email atau WhatsApp.
                </span>
              </label>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setStep(2)}
                disabled={sending}
                className="flex-1 py-2.5 text-[14px] font-medium rounded-[8px] border transition-colors hover:border-[var(--inopi-teal-strong)] disabled:opacity-50"
                style={{ color: 'var(--inopi-espresso)', borderColor: 'var(--inopi-sand)' }}
              >
                ← Kembali
              </button>
              <button
                type="submit"
                disabled={sending}
                className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 text-[14px] font-semibold text-white rounded-[8px] transition-all hover:-translate-y-px disabled:opacity-60"
                style={{ background: 'var(--inopi-espresso)' }}
              >
                {sending && <IconLoader2 size={15} className="animate-spin" />}
                {sending ? 'Mengirim…' : 'Kirim Pendaftaran'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  )
}
