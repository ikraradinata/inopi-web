'use client'

import { useRef, useState } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { IconCamera, IconCheck, IconFileUpload, IconLoader2, IconX } from '@tabler/icons-react'
import { Link, useRouter } from '@/i18n/navigation'
import { Field, Honeypot, PrivacyConsent, inputStyle, readHoneypot } from '@/components/ui/FormField'
import CopyButton from '@/components/ui/CopyButton'
import { formatRupiah } from '@/lib/constants/registration'
import { DEFAULT_COUNTRY } from '@/lib/membership/countries'
import { MEMBERSHIP_PRICES } from '@/lib/membership/config'
import { registrantSchema, type RegistrantInput } from '@/lib/schemas/keanggotaan'
import { ProofFileError, prepareProofFile } from '@/lib/client/proofFile'

type Category = 'student' | 'professional' | 'corporate'

interface Reservation {
  token: string
  uniqueCode: number
  baseAmount: number
  transferAmount: number
  bank: { bank: string; accountNumber: string; accountName: string } | null
}

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

  const [file, setFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [fileError, setFileError] = useState<string | null>(null)
  const [processing, setProcessing] = useState(false)

  const [agreed, setAgreed] = useState(false)
  const [agreeError, setAgreeError] = useState(false)
  const [phase, setPhase] = useState<'idle' | 'uploading' | 'sending'>('idle')
  const [uploadToken, setUploadToken] = useState<string | null>(null)
  const [formError, setFormError] = useState<string | null>(null)

  const cameraRef = useRef<HTMLInputElement>(null)
  const galleryRef = useRef<HTMLInputElement>(null)
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

  /* ---------- Bagian 3: berkas bukti ---------- */
  const onPickFile = async (input: HTMLInputElement) => {
    const picked = input.files?.[0]
    input.value = ''
    if (!picked) return
    setFileError(null)
    setProcessing(true)
    try {
      const prepared = await prepareProofFile(picked)
      if (previewUrl) URL.revokeObjectURL(previewUrl)
      setFile(prepared)
      setPreviewUrl(prepared.type.startsWith('image/') ? URL.createObjectURL(prepared) : null)
      setUploadToken(null) // berkas baru: unggah ulang
    } catch (err) {
      setFileError(t(`proof.errors.${err instanceof ProofFileError ? err.key : 'read'}`))
    } finally {
      setProcessing(false)
    }
  }

  const removeFile = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl)
    setFile(null)
    setPreviewUrl(null)
    setUploadToken(null)
  }

  /* ---------- Kirim ---------- */
  const submit = async (data: RegistrantInput, event?: React.BaseSyntheticEvent) => {
    if (step === 1) return goToPlan()
    if (step !== 3 || !reservation || !category || category === 'corporate') return
    setFormError(null)

    let blocked = false
    if (!file) {
      setFileError(t('proof.errors.required'))
      blocked = true
    }
    if (!agreed) {
      setAgreeError(true)
      blocked = true
    }
    if (blocked || inFlight.current) return
    inFlight.current = true

    try {
      let token = uploadToken
      if (!token) {
        setPhase('uploading')
        const up = await fetch('/api/membership/upload', { method: 'POST', headers: { 'Content-Type': file!.type }, body: file })
        const upJson = await up.json().catch(() => null)
        if (!up.ok || !upJson?.ok) {
          setFormError(t.has(`errors.${upJson?.error}`) ? t(`errors.${upJson.error}`) : t('errors.upload'))
          return
        }
        token = upJson.uploadToken as string
        setUploadToken(token)
      }

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
      if (code === 'upload_not_found') setUploadToken(null)
      setFormError(errorText(code))
    } catch {
      setFormError(tf('failure'))
    } finally {
      inFlight.current = false
      setPhase('idle')
    }
  }

  const price = (c: Category) => MEMBERSHIP_PRICES[c]
  const splitAmount = (n: number) => {
    const s = money(n)
    return { head: s.slice(0, -3), tail: s.slice(-3) }
  }

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

          {reservation && (
            <div className="rounded-[14px] p-4 sm:p-5 mb-5" style={{ background: 'var(--inopi-espresso)', color: 'var(--inopi-ivory)' }}>
              <p className="font-body text-[11px] font-semibold uppercase tracking-widest mb-3" style={{ color: 'var(--inopi-gold)' }}>
                {t('pay.transferTo')}
              </p>
              {reservation.bank ? (
                <dl className="flex flex-col gap-3">
                  <div>
                    <dt className="font-body text-[11px]" style={{ color: 'var(--inopi-sand)' }}>{t('pay.bank')}</dt>
                    <dd className="font-body text-[15px] font-medium">{reservation.bank.bank}</dd>
                  </div>
                  <div>
                    <dt className="font-body text-[11px]" style={{ color: 'var(--inopi-sand)' }}>{t('pay.accountNumber')}</dt>
                    <dd className="flex items-center gap-3 flex-wrap">
                      <span className="font-display font-bold text-[22px] tabular-nums tracking-wide">{reservation.bank.accountNumber}</span>
                      <CopyButton onDark value={reservation.bank.accountNumber.replace(/\s/g, '')} label={t('pay.accountNumber')} />
                    </dd>
                  </div>
                  <div>
                    <dt className="font-body text-[11px]" style={{ color: 'var(--inopi-sand)' }}>{t('pay.accountName')}</dt>
                    <dd className="font-body text-[15px] font-medium">{reservation.bank.accountName}</dd>
                  </div>
                </dl>
              ) : (
                <p className="font-body text-[13px]" style={{ color: 'var(--inopi-sand)' }}>{t('pay.bankMissing')}</p>
              )}

              <div className="mt-4 pt-4" style={{ borderTop: '1px solid color-mix(in srgb, var(--inopi-ivory) 25%, transparent)' }}>
                <p className="font-body text-[11px]" style={{ color: 'var(--inopi-sand)' }}>{t('pay.amount')}</p>
                <div className="flex items-center gap-3 flex-wrap mt-0.5">
                  <span className="font-display font-bold text-[28px] tabular-nums leading-tight" aria-label={money(reservation.transferAmount)}>
                    {splitAmount(reservation.transferAmount).head}
                    <mark className="rounded px-1 ml-0.5" style={{ background: 'var(--inopi-gold)', color: 'var(--inopi-espresso)' }}>
                      {splitAmount(reservation.transferAmount).tail}
                    </mark>
                  </span>
                  <CopyButton onDark value={String(reservation.transferAmount)} label={t('pay.amount')} />
                </div>
                <p className="font-body text-[12px] mt-2" style={{ color: 'var(--inopi-sand)' }}>
                  {t('pay.breakdown', { base: money(reservation.baseAmount), code: String(reservation.uniqueCode).padStart(3, '0') })}
                </p>
                <p className="font-body text-[12px] mt-1 leading-relaxed" style={{ color: 'var(--inopi-sand)' }}>
                  {t('pay.uniqueHint')}
                </p>
              </div>
            </div>
          )}

          {/* Bukti transfer */}
          <div>
            <p className="font-body text-[13px] font-medium mb-2" style={{ color: 'var(--inopi-espresso)' }}>
              {t('proof.label')} <span aria-hidden>*</span>
            </p>
            <input ref={cameraRef} type="file" accept="image/*" capture="environment" className="sr-only" tabIndex={-1} onChange={(e) => onPickFile(e.target)} />
            <input ref={galleryRef} type="file" accept="image/jpeg,image/png,application/pdf" className="sr-only" tabIndex={-1} onChange={(e) => onPickFile(e.target)} />

            {file ? (
              <div className="flex items-center gap-3 rounded-[12px] border p-3" style={{ borderColor: 'var(--inopi-sand)' }}>
                {previewUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={previewUrl} alt="" className="w-14 h-14 rounded-[8px] object-cover flex-shrink-0" />
                ) : (
                  <span className="w-14 h-14 rounded-[8px] flex items-center justify-center flex-shrink-0" style={{ background: 'var(--inopi-sand)' }}>
                    <IconFileUpload size={22} style={{ color: 'var(--inopi-espresso)' }} />
                  </span>
                )}
                <span className="min-w-0 flex-1">
                  <span className="font-body text-[13px] font-medium block truncate" style={{ color: 'var(--inopi-espresso)' }}>{file.name}</span>
                  <span className="font-body text-[12px]" style={{ color: 'var(--inopi-taupe-strong)' }}>{(file.size / 1024).toFixed(0)} KB</span>
                </span>
                <button type="button" onClick={removeFile} disabled={busy} className="p-2 rounded-full" aria-label={t('proof.remove')} style={{ color: 'var(--inopi-taupe-strong)' }}>
                  <IconX size={18} />
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <button
                  type="button"
                  disabled={processing}
                  onClick={() => cameraRef.current?.click()}
                  className="h-12 inline-flex items-center justify-center gap-2 rounded-[10px] border text-[14px] font-medium"
                  style={{ borderColor: 'var(--inopi-espresso)', color: 'var(--inopi-espresso)' }}
                >
                  <IconCamera size={18} /> {t('proof.camera')}
                </button>
                <button
                  type="button"
                  disabled={processing}
                  onClick={() => galleryRef.current?.click()}
                  className="h-12 inline-flex items-center justify-center gap-2 rounded-[10px] border text-[14px] font-medium"
                  style={{ borderColor: 'var(--inopi-espresso)', color: 'var(--inopi-espresso)' }}
                >
                  <IconFileUpload size={18} /> {t('proof.gallery')}
                </button>
              </div>
            )}
            <p className="font-body text-[12px] mt-2" style={{ color: 'var(--inopi-taupe-strong)' }} aria-live="polite">
              {processing ? t('proof.processing') : t('proof.hint')}
            </p>
            {fileError && (
              <p role="alert" className="text-[12px] mt-1" style={{ color: 'var(--destructive)' }}>
                {fileError}
              </p>
            )}
          </div>

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

          <button type="submit" disabled={busy || processing || !reservation} className={`${buttonPrimary} mt-5`} style={{ background: 'var(--inopi-orange-strong)' }}>
            {busy && <IconLoader2 size={16} className="animate-spin" />}
            {phase === 'uploading' ? t('submit.uploading') : phase === 'sending' ? t('submit.sending') : t('submit.button')}
          </button>
        </section>
      )}
    </form>
  )
}
