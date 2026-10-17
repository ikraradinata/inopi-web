'use client'

import { useRef, useState } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { useForm, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { IconLoader2 } from '@tabler/icons-react'
import { Link, useRouter } from '@/i18n/navigation'
import { Field, Honeypot, PrivacyConsent, inputStyle, readHoneypot } from '@/components/ui/FormField'
import PaymentBox, { type Reservation } from '@/components/membership/PaymentBox'
import ProofPicker, { useProofFile } from '@/components/membership/ProofPicker'
import { formatRupiah } from '@/lib/constants/registration'
import { CORPORATE_SEATS, MEMBERSHIP_PRICES } from '@/lib/membership/config'
import { DEFAULT_COUNTRY } from '@/lib/membership/countries'
import { corporateSchema, type CorporateInput } from '@/lib/schemas/keanggotaan'

// Ukuran 16px mencegah iOS memperbesar layar saat kolom difokuskan.
const inputClass =
  'w-full h-12 px-3.5 text-[16px] rounded-[10px] border outline-none bg-white transition-colors focus:border-[var(--inopi-teal-strong)] focus:ring-2 focus:ring-[color-mix(in_srgb,var(--inopi-teal-strong)_25%,transparent)]'
const buttonPrimary =
  'w-full h-12 inline-flex items-center justify-center gap-2 px-5 text-[15px] font-semibold text-white rounded-[10px] transition-all active:translate-y-px disabled:opacity-60 disabled:cursor-not-allowed'
const sectionClass = 'rounded-[16px] border bg-white p-5 sm:p-6 scroll-mt-20'
const sectionStyle = { borderColor: 'var(--inopi-sand)' }

export default function CorporateForm({ countries }: { countries: { code: string; name: string }[] }) {
  const t = useTranslations('MembershipCorporate')
  const tf = useTranslations('MembershipForm')
  const tg = useTranslations('Forms')
  const locale = useLocale()
  const router = useRouter()
  const [startedAt] = useState(() => Date.now())

  const [step, setStep] = useState<1 | 2>(1)
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
    setValue,
    control,
    formState: { errors },
  } = useForm<CorporateInput>({
    resolver: zodResolver(corporateSchema),
    defaultValues: { negara: DEFAULT_COUNTRY, pakaiKursi1: true, butuhInvoice: false, alamatTagihan: '' },
  })
  const wantsInvoice = useWatch({ control, name: 'butuhInvoice' })

  const money = (n: number) => formatRupiah(n, locale)
  const busy = phase !== 'idle'
  const scrollTo = (id: string) =>
    requestAnimationFrame(() =>
      document.getElementById(id)?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' }),
    )
  const errorText = (code: string) =>
    t.has(`errors.${code}`) ? t(`errors.${code}`) : tf.has(`errors.${code}`) ? tf(`errors.${code}`) : tf('errors.generic')

  const reserve = async (): Promise<Reservation | null> => {
    const res = await fetch('/api/membership/reserve', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ category: 'corporate' }),
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
    if (!(await trigger(['organisasi', 'negara', 'nama', 'jabatan', 'email', 'hp']))) return
    setReserving(true)
    try {
      if (!(reservation ?? (await reserve()))) return
      setStep(2)
      scrollTo('corp-bayar')
    } catch {
      toast.error(tg('failure'))
    } finally {
      setReserving(false)
    }
  }

  const submit = async (data: CorporateInput, event?: React.BaseSyntheticEvent) => {
    if (step === 1) return goToPayment()
    if (!reservation) return
    setFormError(null)

    let blocked = false
    if (!proof.file) {
      proof.setError(tf('proof.errors.required'))
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

      setPhase('sending')
      const res = await fetch('/api/membership', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          alamatTagihan: data.butuhInvoice ? data.alamatTagihan : '',
          category: 'corporate',
          reservationToken: reservation.token,
          uploadToken: up.token,
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
        const fresh = await reserve()
        if (fresh) setFormError(tf('errors.reservationLost', { amount: money(fresh.transferAmount) }))
        return
      }
      if (code === 'upload_not_found') proof.resetToken()
      setFormError(errorText(code))
    } catch {
      setFormError(tg('failure'))
    } finally {
      inFlight.current = false
      setPhase('idle')
    }
  }

  const stepLabels = t.raw('steps') as string[]
  const h2 = 'font-display font-bold text-[20px] mb-1'
  const intro = 'font-body text-[13px] mb-5'

  return (
    <form onSubmit={(e) => handleSubmit(submit)(e)} noValidate className="flex flex-col gap-4">
      {/* Indikator progres 2 segmen */}
      <div aria-label={t('stepCounter', { current: step })}>
        <div className="grid grid-cols-2 gap-1.5" role="presentation">
          {[1, 2].map((n) => (
            <div key={n} className="h-1.5 rounded-full transition-colors" style={{ background: n <= step ? 'var(--inopi-teal-strong)' : 'var(--inopi-sand)' }} />
          ))}
        </div>
        <div className="grid grid-cols-2 gap-1.5 mt-2">
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

      {/* C1 · Data institusi */}
      <section className={sectionClass} style={sectionStyle}>
        <h2 className={h2} style={{ color: 'var(--inopi-espresso)' }}>{t('institution.title')}</h2>
        <p className={intro} style={{ color: 'var(--inopi-taupe-strong)' }}>{t('institution.intro')}</p>
        <div className="flex flex-col gap-4">
          <Field label={t('institution.fields.organisasi.label')} required error={errors.organisasi?.message}>
            <input {...register('organisasi')} type="text" autoComplete="organization" placeholder={t('institution.fields.organisasi.placeholder')} className={inputClass} style={inputStyle} />
          </Field>
          <Field label={t('institution.fields.negara.label')} required error={errors.negara?.message}>
            <select {...register('negara')} autoComplete="country" className={inputClass} style={inputStyle}>
              {countries.map((c) => (
                <option key={c.code} value={c.code}>{c.name}</option>
              ))}
            </select>
          </Field>
        </div>

        <h2 className={`${h2} mt-8`} style={{ color: 'var(--inopi-espresso)' }}>{t('pic.title')}</h2>
        <p className={intro} style={{ color: 'var(--inopi-taupe-strong)' }}>{t('pic.intro')}</p>
        <div className="flex flex-col gap-4">
          <Field label={t('pic.fields.nama.label')} required error={errors.nama?.message}>
            <input {...register('nama')} type="text" autoComplete="name" placeholder={t('pic.fields.nama.placeholder')} className={inputClass} style={inputStyle} />
          </Field>
          <Field label={t('pic.fields.jabatan.label')} required error={errors.jabatan?.message}>
            <input {...register('jabatan')} type="text" autoComplete="organization-title" placeholder={t('pic.fields.jabatan.placeholder')} className={inputClass} style={inputStyle} />
          </Field>
          <Field label={t('pic.fields.email.label')} required error={errors.email?.message}>
            <input {...register('email')} type="email" autoComplete="email" inputMode="email" placeholder={t('pic.fields.email.placeholder')} className={inputClass} style={inputStyle} />
          </Field>
          <Field label={t('pic.fields.hp.label')} required error={errors.hp?.message}>
            <input {...register('hp')} type="tel" autoComplete="tel" inputMode="tel" placeholder={t('pic.fields.hp.placeholder')} className={inputClass} style={inputStyle} />
          </Field>
        </div>

        <label className="flex items-start gap-3 mt-6 rounded-[12px] p-4 cursor-pointer" style={{ background: 'var(--inopi-ivory)' }}>
          <input {...register('pakaiKursi1')} type="checkbox" role="switch" className="mt-1 w-4 h-4" />
          <span>
            <span className="font-body text-[14px] font-semibold block" style={{ color: 'var(--inopi-espresso)' }}>{t('seat1.label')}</span>
            <span className="font-body text-[12px] leading-relaxed block mt-0.5" style={{ color: 'var(--inopi-taupe-strong)' }}>{t('seat1.hint')}</span>
          </span>
        </label>

        {step === 1 && (
          <>
            <p className="font-body text-[13px] font-medium mt-5" style={{ color: 'var(--inopi-espresso)' }}>
              {t('summary', { seats: CORPORATE_SEATS, amount: money(MEMBERSHIP_PRICES.corporate) })}
            </p>
            <button type="button" disabled={reserving} onClick={goToPayment} className={`${buttonPrimary} mt-3`} style={{ background: 'var(--inopi-orange-strong)' }}>
              {reserving && <IconLoader2 size={16} className="animate-spin" />}
              {reserving ? t('reserving') : t('next')}
            </button>
          </>
        )}
        <Link href="/keanggotaan/daftar" className="inline-block font-body text-[13px] mt-4 underline underline-offset-4" style={{ color: 'var(--inopi-teal-strong)' }}>
          {t('back')}
        </Link>
      </section>

      {/* C2 · Pembayaran */}
      {step === 2 && (
        <section id="corp-bayar" className={sectionClass} style={sectionStyle}>
          <h2 className={h2} style={{ color: 'var(--inopi-espresso)' }}>{tf('pay.title')}</h2>
          <p className={intro} style={{ color: 'var(--inopi-taupe-strong)' }}>{tf('pay.intro')}</p>

          {reservation && <PaymentBox reservation={reservation} />}

          <fieldset className="mb-5">
            <legend className="font-body text-[13px] font-medium mb-2" style={{ color: 'var(--inopi-espresso)' }}>{t('invoice.label')}</legend>
            <div role="radiogroup" aria-label={t('invoice.label')} className="grid grid-cols-2 gap-2">
              {([false, true] as const).map((v) => {
                const selected = wantsInvoice === v
                return (
                  <button
                    key={String(v)}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    onClick={() => setValue('butuhInvoice', v, { shouldValidate: true })}
                    className="min-h-12 px-3 rounded-[10px] border-2 font-body text-[14px] font-medium transition-colors"
                    style={{
                      borderColor: selected ? 'var(--inopi-espresso)' : 'var(--inopi-sand)',
                      background: selected ? 'var(--inopi-ivory)' : 'white',
                      color: 'var(--inopi-espresso)',
                    }}
                  >
                    {v ? t('invoice.yes') : t('invoice.no')}
                  </button>
                )
              })}
            </div>
            {wantsInvoice && (
              <div className="mt-3">
                <Field label={t('invoice.address.label')} required error={errors.alamatTagihan?.message}>
                  <textarea
                    {...register('alamatTagihan')}
                    rows={3}
                    autoComplete="street-address"
                    placeholder={t('invoice.address.placeholder')}
                    className="w-full px-3.5 py-3 text-[16px] rounded-[10px] border outline-none bg-white focus:border-[var(--inopi-teal-strong)]"
                    style={inputStyle}
                  />
                </Field>
                <p className="font-body text-[12px] mt-1.5" style={{ color: 'var(--inopi-taupe-strong)' }}>{t('invoice.hint')}</p>
              </div>
            )}
          </fieldset>

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
            {phase === 'uploading' ? tf('submit.uploading') : phase === 'sending' ? tf('submit.sending') : t('submit.button')}
          </button>
        </section>
      )}
    </form>
  )
}
