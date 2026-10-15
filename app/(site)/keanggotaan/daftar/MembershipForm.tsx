'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'sonner'
import { IconCheck, IconCopy, IconBuildingBank, IconMail, IconLoader2 } from '@tabler/icons-react'
import { PLANS, getPlan } from '@/lib/constants/membership'
import { ASSOCIATION_EMAIL, BANK_ACCOUNT, isBankConfigured, formatRupiah } from '@/lib/constants/registration'

// Hanya data diri. Persetujuan syarat & ketentuan divalidasi terpisah di
// langkah 3, sebab checkbox-nya belum ada saat langkah 2 disubmit.
const detailsSchema = z.object({
  nama: z.string().min(2, 'Nama minimal 2 karakter'),
  email: z.string().email('Email tidak valid'),
  hp: z.string().min(8, 'Nomor HP tidak valid'),
  institusi: z.string().min(2, 'Institusi wajib diisi'),
  bidang: z.string().optional(),
})

type FormData = z.infer<typeof detailsSchema>

interface Receipt {
  registrationId: string
  category: string
}

export default function MembershipForm() {
  const [step, setStep] = useState(1)
  const [category, setCategory] = useState('')
  const [sending, setSending] = useState(false)
  const [receipt, setReceipt] = useState<Receipt | null>(null)
  const [copied, setCopied] = useState(false)
  const [agreed, setAgreed] = useState(false)
  const [agreeError, setAgreeError] = useState(false)

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(detailsSchema) })

  const selectedPlan = getPlan(category)

  const onSubmit = async (data: FormData) => {
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
          category,
          nama: data.nama,
          email: data.email,
          hp: data.hp,
          institusi: data.institusi,
          bidang: data.bidang,
        }),
      })
      const json = await res.json()

      if (!res.ok || !json.success) {
        toast.error(json.message ?? 'Pendaftaran gagal dikirim. Silakan coba lagi.')
        return
      }

      setReceipt({ registrationId: json.registrationId, category })
      toast.success('Pendaftaran berhasil dikirim!')
    } catch {
      toast.error('Tidak dapat terhubung ke server. Periksa koneksi Anda dan coba lagi.')
    } finally {
      setSending(false)
    }
  }

  const copyAccount = async () => {
    try {
      await navigator.clipboard.writeText(BANK_ACCOUNT.accountNumber)
      setCopied(true)
      toast.success('Nomor rekening disalin')
      setTimeout(() => setCopied(false), 2000)
    } catch {
      toast.error('Gagal menyalin. Silakan salin manual.')
    }
  }

  /* ---------- Layar akhir: instruksi pembayaran ---------- */
  if (receipt) {
    const plan = getPlan(receipt.category)!
    return (
      <div>
        <div className="text-center mb-8">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
            style={{ background: 'var(--inopi-sand)' }}
          >
            <IconCheck size={28} style={{ color: 'var(--inopi-teal-strong)' }} />
          </div>
          <h2 className="font-display font-bold text-[20px] mb-2" style={{ color: 'var(--inopi-espresso)' }}>
            Pendaftaran Diterima
          </h2>
          <p className="font-body text-[14px] max-w-md mx-auto" style={{ color: 'var(--inopi-taupe-strong)' }}>
            Satu langkah lagi: selesaikan pembayaran iuran keanggotaan agar status Anda dapat diaktifkan.
          </p>
        </div>

        {/* Ringkasan */}
        <div
          className="rounded-[12px] p-5 border mb-4"
          style={{ borderColor: 'var(--inopi-sand)', background: 'var(--inopi-ivory)' }}
        >
          <div className="flex justify-between items-baseline mb-3 pb-3" style={{ borderBottom: '1px solid var(--inopi-sand)' }}>
            <span className="font-body text-[12px] uppercase tracking-wider" style={{ color: 'var(--inopi-sage-strong)' }}>
              Nomor Registrasi
            </span>
            <span className="font-display font-bold text-[15px] tabular-nums" style={{ color: 'var(--inopi-espresso)' }}>
              {receipt.registrationId}
            </span>
          </div>
          <div className="flex justify-between items-baseline">
            <div>
              <p className="font-body text-[12px] uppercase tracking-wider" style={{ color: 'var(--inopi-sage-strong)' }}>
                Kategori
              </p>
              <p className="font-body text-[14px] font-medium" style={{ color: 'var(--inopi-espresso)' }}>
                {plan.name}
                {plan.note ? ` · ${plan.note}` : ''}
              </p>
            </div>
            <span className="font-display font-bold text-[22px]" style={{ color: 'var(--inopi-orange)' }}>
              {formatRupiah(plan.amount)}
            </span>
          </div>
        </div>

        {/* Rekening tujuan */}
        <div className="rounded-[12px] p-5 border mb-4" style={{ borderColor: 'var(--inopi-sand)' }}>
          <div className="flex items-center gap-2 mb-3">
            <IconBuildingBank size={17} style={{ color: 'var(--inopi-orange)' }} />
            <h3 className="font-display font-semibold text-[14px]" style={{ color: 'var(--inopi-espresso)' }}>
              Transfer ke Rekening INOPI
            </h3>
          </div>

          {isBankConfigured() ? (
            <>
              <div className="space-y-2.5">
                <div>
                  <p className="font-body text-[11px] uppercase tracking-wider" style={{ color: 'var(--inopi-sage-strong)' }}>
                    Bank
                  </p>
                  <p className="font-body text-[14px] font-medium" style={{ color: 'var(--inopi-espresso)' }}>
                    {BANK_ACCOUNT.bank}
                  </p>
                </div>
                <div>
                  <p className="font-body text-[11px] uppercase tracking-wider" style={{ color: 'var(--inopi-sage-strong)' }}>
                    Nomor Rekening
                  </p>
                  <div className="flex items-center gap-2">
                    <p
                      className="font-display font-bold text-[20px] tabular-nums tracking-wide"
                      style={{ color: 'var(--inopi-espresso)' }}
                    >
                      {BANK_ACCOUNT.accountNumber}
                    </p>
                    <button
                      type="button"
                      onClick={copyAccount}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-[6px] border font-body text-[12px] transition-colors hover:border-[var(--inopi-teal-strong)]"
                      style={{ borderColor: 'var(--inopi-sand)', color: 'var(--inopi-teal-strong)' }}
                    >
                      {copied ? <IconCheck size={13} /> : <IconCopy size={13} />}
                      {copied ? 'Tersalin' : 'Salin'}
                    </button>
                  </div>
                </div>
                <div>
                  <p className="font-body text-[11px] uppercase tracking-wider" style={{ color: 'var(--inopi-sage-strong)' }}>
                    Atas Nama
                  </p>
                  <p className="font-body text-[14px] font-medium" style={{ color: 'var(--inopi-espresso)' }}>
                    {BANK_ACCOUNT.accountName}
                  </p>
                </div>
                {BANK_ACCOUNT.note && (
                  <p className="font-body text-[12px]" style={{ color: 'var(--inopi-taupe-strong)' }}>
                    {BANK_ACCOUNT.note}
                  </p>
                )}
              </div>

              <p
                className="font-body text-[12px] leading-relaxed mt-4 pt-3"
                style={{ color: 'var(--inopi-taupe-strong)', borderTop: '1px solid var(--inopi-sand)' }}
              >
                Mohon cantumkan nomor registrasi{' '}
                <strong style={{ color: 'var(--inopi-espresso)' }}>{receipt.registrationId}</strong> pada berita transfer,
                lalu kirim bukti transfer ke{' '}
                <a href={`mailto:${ASSOCIATION_EMAIL}`} className="underline" style={{ color: 'var(--inopi-teal-strong)' }}>
                  {ASSOCIATION_EMAIL}
                </a>
                .
              </p>
            </>
          ) : (
            <p className="font-body text-[13px] leading-relaxed" style={{ color: 'var(--inopi-taupe-strong)' }}>
              Instruksi pembayaran beserta nomor rekening akan dikirimkan oleh pengurus ke email{' '}
              <strong style={{ color: 'var(--inopi-espresso)' }}>{getValues('email')}</strong>. Simpan nomor registrasi{' '}
              <strong style={{ color: 'var(--inopi-espresso)' }}>{receipt.registrationId}</strong> sebagai rujukan.
            </p>
          )}
        </div>

        {/* Status notifikasi */}
        <div
          className="flex items-start gap-3 rounded-[12px] p-4"
          style={{ background: 'var(--inopi-sand)' }}
        >
          <IconMail size={17} style={{ color: 'var(--inopi-espresso)' }} className="flex-shrink-0 mt-0.5" />
          <p className="font-body text-[12px] leading-relaxed" style={{ color: 'var(--inopi-espresso)' }}>
            Data pendaftaran Anda sudah diteruskan ke pengurus INOPI. Keanggotaan diaktifkan setelah pembayaran
            diverifikasi, dan pengurus akan menghubungi Anda melalui email atau WhatsApp.
          </p>
        </div>
      </div>
    )
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
                { name: 'hp', label: 'No. HP', type: 'tel', placeholder: '+62 812 3456 7890' },
                { name: 'institusi', label: 'Institusi/Perusahaan', type: 'text', placeholder: 'Universitas / perusahaan Anda' },
                { name: 'bidang', label: 'Bidang Minat (opsional)', type: 'text', placeholder: 'mis. AI in Education' },
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
                  ['No. HP', getValues('hp')],
                  ['Institusi', getValues('institusi')],
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

            <label className="flex items-start gap-3 mb-2 cursor-pointer">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => {
                  setAgreed(e.target.checked)
                  if (e.target.checked) setAgreeError(false)
                }}
                className="mt-0.5"
              />
              <span className="font-body text-[13px]" style={{ color: 'var(--inopi-taupe-strong)' }}>
                Saya menyetujui{' '}
                <a href="/syarat" className="underline" style={{ color: 'var(--inopi-teal-strong)' }}>
                  syarat &amp; ketentuan
                </a>{' '}
                keanggotaan INOPI.
              </span>
            </label>
            <p className="text-[11px] mb-5" style={{ color: 'var(--destructive)', minHeight: 14 }}>
              {agreeError ? 'Anda harus menyetujui syarat & ketentuan' : ''}
            </p>

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
