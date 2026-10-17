'use client'

import { useRef, useState } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { IconCheck, IconLoader2 } from '@tabler/icons-react'
import { Link, useRouter } from '@/i18n/navigation'
import { Field, Honeypot, PrivacyConsent, inputStyle, readHoneypot } from '@/components/ui/FormField'
import PaymentBox, { type Reservation } from '@/components/membership/PaymentBox'
import ProofPicker, { useProofFile } from '@/components/membership/ProofPicker'
import { formatRupiah } from '@/lib/constants/registration'
import { DEFAULT_COUNTRY } from '@/lib/membership/countries'
import { MEMBERSHIP_PRICES } from '@/lib/membership/config'
import { registrantSchema, type RegistrantInput } from '@/lib/schemas/keanggotaan'

type Category = 'student' | 'professional' | 'corporate'

interface Props {
  countries: { code: string; name: string }[]
}

// Ukuran 16px mencegah iOS memperbesar layar saat kolom difokuskan.
const inputClass =
  'w-full h-12 px-3.5 text-[16px] rounded-[10px] border outline-none bg-white transition-colors focus:border-[var(--inopi-teal-strong)] focus:ring-2 focus:ring-[color-mix(in_srgb,var(--inopi-teal-strong)_25%,transparent)]'
const buttonPrimary =
  'w-full h-12 inline-flex items-center justify-center gap-2 px-5 text-[15px] font-semibold text-white rounded-[10px] transition-all active:translate-y-px disabled:opacity-60 disabled:cursor-not-allowed'
const sectionClass = 'rounded-[16px] border bg-white p-5 sm:p-6 scroll-mt-20'
const sectionStyle = { borderColor: 'var(--inopi-sand)' }

export default function RegistrationForm({ countries }: Props) {
  const t = useTranslations('MembershipForm')
  const tm = useTranslations('Membership')
  const tf = useTranslations('Forms')
  const locale = useLocale()
  const router = useRouter()
  // Waktu halaman dibuka; server menolak kiriman yang terlalu cepat untuk manusia.
  const [startedAt] = useState(() => Date.now())

  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [category, setCategory] = useState<Category | null>(null)
  const [reservation, setReservation] = useState<Reservation | null>(null)
  const [reserving, setReserving] = useState(false)
  const proof = useProofFile()

  const [agreed, setAgreed] = useState(false)
  const [agreeError, setAgreeError] = useState(false)
  const [phase, setPhase] = useState<'idle' | 'uploading' | 'sending'>('idle')
  const [formError, setFormError] = useState<string | null>(null)

  // Mencegah kiriman ganda saat tombol diketuk dua kali sebelum tampilan sempat diperbarui.
  const inFlight = useRef(false)

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<RegistrantInput>({ resolver: zodResolver(registrantSchema), defaultValues: { negara: DEFAULT_COUNTRY } })

  const scrollTo = (id: string) =>
    requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' }))

  const money = (n: number) => formatRupiah(n, locale)
  const busy = phase !== 'idle'

  /* ---------- Bagian 1 → 2 ---------- */
  const goToPlan = async () => {
    if (!(await trigger())) return
    setStep((s) => (s < 2 ? 2 : s))
    scrollTo('daftar-pilih')
  }

  /* ---------- Bagian 2: pilih kategori ---------- */
  const pickCategory = (c: Category) => {
    if (c !== category) {
      setCategory(c)
      setReservation(null) // kode unik dipesan ulang untuk kategori baru
      setStep(2)
      setFormError(null)
    }
  }

  const errorText = (code: string, extra?: Record<string, string>) =>
    t.has(`errors.${code}`) ? t(`errors.${code}`, extra) : t('errors.generic')

  const reserve = async (c: Exclude<Category, 'corporate'>): Promise<Reservation | null> => {
    const res = await fetch('/api/membership/reserve', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ category: c }),
    })
    const json = await res.json().catch(() => null)
    if (!res.ok || !json?.ok) {
      toast.error(errorText(json?.error ?? 'generic'))
      return null
    }
    const r: Reservation = {
      token: json.reservationToken,
      uniqueCode: json.uniqueCode,
      baseAmount: json.baseAmount,
      transferAmount: json.transferAmount,
      bank: json.bank,
    }
    setReservation(r)
    return r
  }

  const goToPayment = async () => {
    if (!category || category === 'corporate') return
    setReserving(true)
    try {
      const r = reservation ?? (await reserve(category))
      if (!r) return
      setStep(3)
      scrollTo('daftar-bayar')
    } catch {
      toast.error(tf('failure'))
    } finally {
      setReserving(false)
    }
  }

  /* ---------- Kirim ---------- */
  const submit = async (data: RegistrantInput, event?: React.BaseSyntheticEvent) => {
    if (step === 1) return goToPlan()
    if (step !== 3 || !reservation || !category || category === 'corporate') return
    setFormError(null)

    let blocked = false
    if (!proof.file) {
      proof.setError(t('proof.errors.required'))
      blocked = true
    }
    if (!agreed) {
      setAgreeError(true)
      blocked = true
    }
    if (blocked || inFlight.current) return
    inFlight.current = true

    try {
      setPhase('uploading')
      const up = await proof.upload()
      if ('error' in up) {
        setFormError(up.error)
        return
      }
      const token = up.token

      setPhase('sending')
      const res = await fetch('/api/membership', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          category,
          reservationToken: reservation.token,
          uploadToken: token,
          persetujuan: true,
          locale,
          website: readHoneypot(event),
          startedAt,
        }),
      })
      const json = await res.json().catch(() => null)

      if (res.ok && json?.ok) {
        router.push({ pathname: '/keanggotaan/terima-kasih', query: { t: json.receiptToken } })
        return
      }
      const code: string = json?.error ?? 'generic'
      if (code === 'reservation_not_found' || code === 'reservation_mismatch') {
        // Pesanan kode unik hilang: pesan ulang dan beri tahu jumlah transfer yang benar.
        const fresh = await reserve(category)
        if (fresh) setFormError(t('errors.reservationLost', { amount: money(fresh.transferAmount) }))
        return
      }
      if (code === 'upload_not_found') proof.resetToken()
      setFormError(errorText(code))
    } catch {
      setFormError(tf('failure'))
    } finally {
      inFlight.current = false
      setPhase('idle')
    }
  }

  const price = (c: Category) => MEMBERSHIP_PRICES[c]
  const stepLabels = t.raw('steps') as string[]

  return (
    <form onSubmit={(e) => handleSubmit(submit)(e)} noValidate className="flex flex-col gap-4">
      {/* Indikator progres 3 segmen */}
      <div aria-label={t('stepCounter', { current: step })}>
        <div className="grid grid-cols-3 gap-1.5" role="presentation">
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className="h-1.5 rounded-full transition-colors"
              style={{ background: n <= step ? 'var(--inopi-teal-strong)' : 'var(--inopi-sand)' }}
            />
          ))}
        </div>
        <div className="grid grid-cols-3 gap-1.5 mt-2">
          {stepLabels.map((label, i) => (
            <span
              key={label}
              className="font-body text-[11px] sm:text-[12px] leading-tight"
              style={{ color: i + 1 === step ? 'var(--inopi-espresso)' : 'var(--inopi-taupe-strong)', fontWeight: i + 1 === step ? 600 : 400 }}
            >
              {i + 1}. {label}
            </span>
          ))}
        </div>
      </div>

      {/* 1. Data diri */}
      <section className={sectionClass} style={sectionStyle}>
        <h2 className="font-display font-bold text-[20px] mb-1" style={{ color: 'var(--inopi-espresso)' }}>
          {t('personal.title')}
        </h2>
        <p className="font-body text-[13px] mb-5" style={{ color: 'var(--inopi-taupe-strong)' }}>
          {t('personal.intro')}
        </p>
        <div className="flex flex-col gap-4">
          <Field label={t('personal.fields.nama.label')} required error={errors.nama?.message}>
            <input {...register('nama')} type="text" autoComplete="name" placeholder={t('personal.fields.nama.placeholder')} className={inputClass} style={inputStyle} />
          </Field>
          <Field label={t('personal.fields.email.label')} required error={errors.email?.message}>
            <input {...register('email')} type="email" autoComplete="email" inputMode="email" placeholder={t('personal.fields.email.placeholder')} className={inputClass} style={inputStyle} />
          </Field>
          <Field label={t('personal.fields.hp.label')} required error={errors.hp?.message}>
            <input {...register('hp')} type="tel" autoComplete="tel" inputMode="tel" placeholder={t('personal.fields.hp.placeholder')} className={inputClass} style={inputStyle} />
          </Field>
          <Field label={t('personal.fields.pekerjaan.label')} required error={errors.pekerjaan?.message}>
            <input {...register('pekerjaan')} type="text" autoComplete="organization-title" placeholder={t('personal.fields.pekerjaan.placeholder')} className={inputClass} style={inputStyle} />
          </Field>
          <Field label={t('personal.fields.jabatan.label')} error={errors.jabatan?.message}>
            <input {...register('jabatan')} type="text" placeholder={t('personal.fields.jabatan.placeholder')} className={inputClass} style={inputStyle} />
          </Field>
          <Field label={t('personal.fields.institusi.label')} required error={errors.institusi?.message}>
            <input {...register('institusi')} type="text" autoComplete="organization" placeholder={t('personal.fields.institusi.placeholder')} className={inputClass} style={inputStyle} />
          </Field>
          <Field label={t('personal.fields.negara.label')} required error={errors.negara?.message}>
            <select {...register('negara')} autoComplete="country" className={inputClass} style={inputStyle}>
              {countries.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.name}
                </option>
              ))}
            </select>
          </Field>
        </div>
        {step === 1 && (
          <button type="button" onClick={goToPlan} className={`${buttonPrimary} mt-6`} style={{ background: 'var(--inopi-orange-strong)' }}>
            {t('personal.next')}
          </button>
        )}
      </section>

      {/* 2. Pilih keanggotaan */}
      {step >= 2 && (
        <section id="daftar-pilih" className={sectionClass} style={sectionStyle}>
          <h2 className="font-display font-bold text-[20px] mb-4" style={{ color: 'var(--inopi-espresso)' }}>
            {t('plan.title')}
          </h2>
          <div role="radiogroup" aria-label={t('plan.title')} className="flex flex-col gap-3">
            {(['student', 'professional', 'corporate'] as const).map((c) => {
              const selected = category === c
              return (
                <button
                  key={c}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  onClick={() => pickCategory(c)}
                  className="text-left rounded-[12px] border-2 p-4 flex items-center justify-between gap-4 transition-colors min-h-[72px]"
                  style={{
                    borderColor: selected ? 'var(--inopi-espresso)' : 'var(--inopi-sand)',
                    background: selected ? 'var(--inopi-ivory)' : 'white',
                  }}
                >
                  <span className="min-w-0">
                    <span className="font-display font-semibold text-[16px] block" style={{ color: 'var(--inopi-espresso)' }}>
                      {tm(`plans.${c}.name`)}
                    </span>
                    <span className="font-body text-[13px] block" style={{ color: 'var(--inopi-taupe-strong)' }}>
                      {tm(`plans.${c}.desc`)}
                      {c === 'corporate' ? ` ${tm('plans.corporate.note')}.` : ''}
                    </span>
                  </span>
                  <span className="flex items-center gap-3 flex-shrink-0">
                    <span className="text-right">
                      <span className="font-display font-bold text-[16px] block whitespace-nowrap" style={{ color: 'var(--inopi-orange-strong)' }}>
                        {money(price(c))}
                      </span>
                      <span className="font-body text-[11px]" style={{ color: 'var(--inopi-taupe-strong)' }}>
                        {t('plan.perYear')}
                      </span>
                    </span>
                    <span
                      aria-hidden
                      className="w-5 h-5 rounded-full border-2 flex items-center justify-center"
                      style={{ borderColor: selected ? 'var(--inopi-espresso)' : 'var(--inopi-taupe-strong)', background: selected ? 'var(--inopi-espresso)' : 'white' }}
                    >
                      {selected && <IconCheck size={12} color="white" stroke={3} />}
                    </span>
                  </span>
                </button>
              )
            })}
          </div>

          {category === 'corporate' && (
            <div className="mt-4 rounded-[12px] p-4" style={{ background: 'var(--inopi-sand)' }}>
              <p className="font-body text-[13px] leading-relaxed mb-3" style={{ color: 'var(--inopi-espresso)' }}>
                {t('plan.corporateInfo')}
              </p>
              <Link
                href="/keanggotaan/daftar/corporate"
                className={`${buttonPrimary}`}
                style={{ background: 'var(--inopi-orange-strong)' }}
              >
                {t('plan.corporateGo')}
              </Link>
            </div>
          )}

          {category && category !== 'corporate' && step === 2 && (
            <>
              <p className="font-body text-[13px] mt-4" style={{ color: 'var(--inopi-taupe-strong)' }}>
                {t('plan.summary', { amount: money(price(category)) })}
              </p>
              <button type="button" disabled={reserving} onClick={goToPayment} className={`${buttonPrimary} mt-4`} style={{ background: 'var(--inopi-orange-strong)' }}>
                {reserving && <IconLoader2 size={16} className="animate-spin" />}
                {reserving ? t('plan.reserving') : t('plan.payNext')}
              </button>
            </>
          )}
        </section>
      )}

      {/* 3. Pembayaran */}
      {step >= 3 && category && category !== 'corporate' && (
        <section id="daftar-bayar" className={sectionClass} style={sectionStyle}>
          <h2 className="font-display font-bold text-[20px] mb-1" style={{ color: 'var(--inopi-espresso)' }}>
            {t('pay.title')}
          </h2>
          <p className="font-body text-[13px] mb-5" style={{ color: 'var(--inopi-taupe-strong)' }}>
            {t('pay.intro')}
          </p>

          {reservation && <PaymentBox reservation={reservation} />}

          <ProofPicker proof={proof} busy={busy} />

          <Honeypot />

          <div className="mt-5">
            <PrivacyConsent
              inputProps={{
                checked: agreed,
                onChange: (e) => {
                  setAgreed(e.target.checked)
                  if (e.target.checked) setAgreeError(false)
                },
              }}
              error={agreeError ? 'privacyRequired' : undefined}
            />
          </div>

          {formError && (
            <p role="alert" className="font-body text-[13px] rounded-[10px] p-3 mt-4" style={{ background: 'color-mix(in srgb, var(--destructive) 10%, white)', color: 'var(--destructive)' }}>
              {formError}
            </p>
          )}

          <button type="submit" disabled={busy || proof.processing || !reservation} className={`${buttonPrimary} mt-5`} style={{ background: 'var(--inopi-orange-strong)' }}>
            {busy && <IconLoader2 size={16} className="animate-spin" />}
            {phase === 'uploading' ? t('submit.uploading') : phase === 'sending' ? t('submit.sending') : t('submit.button')}
          </button>
        </section>
      )}
    </form>
  )
}
