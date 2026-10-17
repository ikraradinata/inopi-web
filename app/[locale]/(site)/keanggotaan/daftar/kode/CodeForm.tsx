'use client'

import { useEffect, useRef, useState } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { IconCheck, IconLoader2, IconAlertCircle } from '@tabler/icons-react'
import { Link, useRouter } from '@/i18n/navigation'
import { Field, Honeypot, PrivacyConsent, inputStyle, readHoneypot } from '@/components/ui/FormField'
import { isSeatCode, normalizeSeatCode } from '@/lib/membership/seatCode'
import { memberSchema, type MemberInput } from '@/lib/schemas/keanggotaan'

type CodeState =
  | { kind: 'idle' }
  | { kind: 'checking' }
  | { kind: 'valid'; organization: string; country: string; seat: number; seats: number }
  | { kind: 'error'; code: string }

// Ukuran 16px mencegah iOS memperbesar layar saat kolom difokuskan.
const inputClass =
  'w-full h-12 px-3.5 text-[16px] rounded-[10px] border outline-none bg-white transition-colors focus:border-[var(--inopi-teal-strong)] focus:ring-2 focus:ring-[color-mix(in_srgb,var(--inopi-teal-strong)_25%,transparent)]'
const sectionClass = 'rounded-[16px] border bg-white p-5 sm:p-6'
const sectionStyle = { borderColor: 'var(--inopi-sand)' }

export default function CodeForm({ countries, initialCode = '' }: { countries: { code: string; name: string }[]; initialCode?: string }) {
  const t = useTranslations('MembershipCode')
  const tf = useTranslations('MembershipForm')
  const tg = useTranslations('Forms')
  const locale = useLocale()
  const router = useRouter()
  const [startedAt] = useState(() => Date.now())

  const [codeState, setCodeState] = useState<CodeState>(() => (isSeatCode(initialCode) ? { kind: 'checking' } : { kind: 'idle' }))
  const [agreed, setAgreed] = useState(false)
  const [agreeError, setAgreeError] = useState(false)
  const [sending, setSending] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  // Nomor permintaan: hasil validasi lama (lebih lambat) tidak boleh menimpa yang baru.
  const seq = useRef(0)
  const inFlight = useRef(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MemberInput>({ resolver: zodResolver(memberSchema), defaultValues: { kode: initialCode } })

  const errText = (code: string) => (t.has(`errors.${code}`) ? t(`errors.${code}`) : t('errors.generic'))

  const check = async (raw: string) => {
    const mine = ++seq.current
    setFormError(null)
    const code = normalizeSeatCode(raw)
    if (!isSeatCode(code)) {
      setCodeState({ kind: 'idle' })
      return
    }
    setCodeState({ kind: 'checking' })
    try {
      const res = await fetch('/api/membership/code/check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      })
      const json = await res.json().catch(() => null)
      if (mine !== seq.current) return
      if (res.ok && json?.ok) setCodeState({ kind: 'valid', organization: json.organization, country: json.country, seat: json.seat, seats: json.seats })
      else setCodeState({ kind: 'error', code: json?.error ?? 'generic' })
    } catch {
      if (mine === seq.current) setCodeState({ kind: 'error', code: 'generic' })
    }
  }

  // Kode dari tautan (?kode=...) langsung diperiksa saat halaman dibuka.
  useEffect(() => {
    if (!isSeatCode(initialCode)) return
    const id = setTimeout(() => check(initialCode), 0)
    return () => clearTimeout(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Validasi langsung dengan jeda 450 ms setelah berhenti mengetik.
  const onCodeChange = (value: string) => {
    clearTimeout(timer.current)
    seq.current++
    setCodeState(isSeatCode(value) ? { kind: 'checking' } : { kind: 'idle' })
    timer.current = setTimeout(() => check(value), 450)
  }

  const submit = async (data: MemberInput, event?: React.BaseSyntheticEvent) => {
    if (codeState.kind !== 'valid') return
    setFormError(null)
    if (!agreed) {
      setAgreeError(true)
      return
    }
    if (inFlight.current) return
    inFlight.current = true
    setSending(true)
    try {
      const res = await fetch('/api/membership/code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, kode: normalizeSeatCode(data.kode), persetujuan: true, locale, website: readHoneypot(event), startedAt }),
      })
      const json = await res.json().catch(() => null)
      if (res.ok && json?.ok) {
        router.push({ pathname: '/keanggotaan/terima-kasih', query: { t: json.receiptToken } })
        return
      }
      const code: string = json?.error ?? 'generic'
      if (['code_not_found', 'seat_used', 'seat_disabled', 'org_not_verified'].includes(code)) setCodeState({ kind: 'error', code })
      else setFormError(errText(code))
    } catch {
      setFormError(tg('failure'))
    } finally {
      inFlight.current = false
      setSending(false)
    }
  }

  const countryName = (code: string) => countries.find((c) => c.code === code)?.name ?? code
  const valid = codeState.kind === 'valid' ? codeState : null
  const codeField = register('kode')

  return (
    <form onSubmit={(e) => handleSubmit(submit)(e)} noValidate className="flex flex-col gap-4">
      <section className={sectionClass} style={sectionStyle}>
        <Field label={t('code.label')} required error={errors.kode?.message}>
          <input
            {...codeField}
            onChange={(e) => {
              codeField.onChange(e)
              onCodeChange(e.target.value)
            }}
            type="text"
            autoComplete="off"
            autoCapitalize="characters"
            spellCheck={false}
            inputMode="text"
            placeholder={t('code.placeholder')}
            aria-describedby="kode-status"
            className={`${inputClass} font-display font-semibold tracking-wider uppercase`}
            style={inputStyle}
          />
        </Field>
        <div id="kode-status" aria-live="polite" className="min-h-6 mt-2">
          {codeState.kind === 'idle' && (
            <p className="font-body text-[12px]" style={{ color: 'var(--inopi-taupe-strong)' }}>{t('code.hint')}</p>
          )}
          {codeState.kind === 'checking' && (
            <p className="font-body text-[13px] flex items-center gap-2" style={{ color: 'var(--inopi-taupe-strong)' }}>
              <IconLoader2 size={14} className="animate-spin" /> {t('code.checking')}
            </p>
          )}
          {valid && (
            <p className="font-body text-[14px] font-semibold flex items-start gap-2" style={{ color: 'var(--inopi-teal-strong)' }}>
              <IconCheck size={18} className="flex-shrink-0 mt-0.5" />
              <span>{t('code.valid', { organization: valid.organization, seat: valid.seat, seats: valid.seats })}</span>
            </p>
          )}
          {codeState.kind === 'error' && (
            <p role="alert" className="font-body text-[13px] flex items-start gap-2" style={{ color: 'var(--destructive)' }}>
              <IconAlertCircle size={18} className="flex-shrink-0 mt-0.5" />
              <span>{errText(codeState.code)}</span>
            </p>
          )}
        </div>
      </section>

      {valid && (
        <section className={sectionClass} style={sectionStyle}>
          <h2 className="font-display font-bold text-[20px] mb-1" style={{ color: 'var(--inopi-espresso)' }}>{t('personal.title')}</h2>
          <p className="font-body text-[13px] mb-5" style={{ color: 'var(--inopi-taupe-strong)' }}>{tf('personal.intro')}</p>

          <div className="flex flex-col gap-4">
            <Field label={tf('personal.fields.nama.label')} required error={errors.nama?.message}>
              <input {...register('nama')} type="text" autoComplete="name" placeholder={tf('personal.fields.nama.placeholder')} className={inputClass} style={inputStyle} />
            </Field>
            <Field label={tf('personal.fields.email.label')} required error={errors.email?.message}>
              <input {...register('email')} type="email" autoComplete="email" inputMode="email" placeholder={tf('personal.fields.email.placeholder')} className={inputClass} style={inputStyle} />
            </Field>
            <Field label={tf('personal.fields.hp.label')} required error={errors.hp?.message}>
              <input {...register('hp')} type="tel" autoComplete="tel" inputMode="tel" placeholder={tf('personal.fields.hp.placeholder')} className={inputClass} style={inputStyle} />
            </Field>
            <Field label={tf('personal.fields.pekerjaan.label')} required error={errors.pekerjaan?.message}>
              <input {...register('pekerjaan')} type="text" autoComplete="organization-title" placeholder={tf('personal.fields.pekerjaan.placeholder')} className={inputClass} style={inputStyle} />
            </Field>
            <Field label={tf('personal.fields.jabatan.label')} error={errors.jabatan?.message}>
              <input {...register('jabatan')} type="text" placeholder={tf('personal.fields.jabatan.placeholder')} className={inputClass} style={inputStyle} />
            </Field>

            {/* Institusi dan negara berasal dari kode; ditampilkan tetapi tidak bisa diubah. */}
            <dl className="rounded-[12px] p-4 grid gap-3" style={{ background: 'var(--inopi-ivory)' }}>
              <div>
                <dt className="font-body text-[12px]" style={{ color: 'var(--inopi-taupe-strong)' }}>{t('locked.institution')}</dt>
                <dd className="font-body text-[15px] font-semibold" style={{ color: 'var(--inopi-espresso)' }}>{valid.organization}</dd>
              </div>
              <div>
                <dt className="font-body text-[12px]" style={{ color: 'var(--inopi-taupe-strong)' }}>{t('locked.country')}</dt>
                <dd className="font-body text-[15px] font-semibold" style={{ color: 'var(--inopi-espresso)' }}>{countryName(valid.country)}</dd>
              </div>
              <p className="font-body text-[12px]" style={{ color: 'var(--inopi-taupe-strong)' }}>{t('locked.hint')}</p>
            </dl>
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

          <button
            type="submit"
            disabled={sending}
            className="w-full h-12 inline-flex items-center justify-center gap-2 px-5 mt-5 text-[15px] font-semibold text-white rounded-[10px] transition-all active:translate-y-px disabled:opacity-60 disabled:cursor-not-allowed"
            style={{ background: 'var(--inopi-orange-strong)' }}
          >
            {sending && <IconLoader2 size={16} className="animate-spin" />}
            {sending ? t('submit.sending') : t('submit.button')}
          </button>
        </section>
      )}

      <p className="font-body text-[13px]" style={{ color: 'var(--inopi-espresso)' }}>
        {t('noCode')}{' '}
        <Link href="/keanggotaan/daftar" className="font-semibold underline underline-offset-4" style={{ color: 'var(--inopi-teal-strong)' }}>
          {t('noCodeLink')}
        </Link>
      </p>
    </form>
  )
}
