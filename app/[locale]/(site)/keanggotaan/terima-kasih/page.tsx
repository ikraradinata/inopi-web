import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import ThankYou from '@/components/sections/ThankYou'
import CopyButton from '@/components/ui/CopyButton'
import { getPlanMeta } from '@/lib/constants/membership'
import { ASSOCIATION_EMAIL, BANK_ACCOUNT, formatRupiah, isBankConfigured } from '@/lib/constants/registration'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Meta.thanks' })
  return { title: { absolute: t('title') }, robots: { index: false } }
}

const label = 'font-body text-[11px] uppercase tracking-wider'

export default async function KeanggotaanTerimaKasihPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ reg?: string; k?: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'MembershipThanks' })
  const tm = await getTranslations({ locale, namespace: 'Membership' })
  const { reg, k } = await searchParams
  const plan = getPlanMeta(k ?? '')
  // Nomor registrasi hanya ditampilkan bila bentuknya sah (INOPI-2026-XXXXXX).
  const registrationId = reg && /^INOPI-\d{4}-[A-Z0-9]{6}$/.test(reg) ? reg : null

  return (
    <ThankYou
      title={t('title')}
      text={t('text')}
      actions={[
        { label: t('home'), href: '/' },
        { label: t('events'), href: '/acara' },
      ]}
    >
      {registrationId && plan && (
        <div className="text-left mb-8 space-y-4">
          <div className="rounded-[12px] p-5 border" style={{ borderColor: 'var(--inopi-sand)', background: 'var(--inopi-ivory)' }}>
            <div className="flex justify-between items-baseline gap-4 mb-3 pb-3" style={{ borderBottom: '1px solid var(--inopi-sand)' }}>
              <span className={label} style={{ color: 'var(--inopi-taupe-strong)' }}>{t('registrationNumber')}</span>
              <span className="font-display font-bold text-[15px] tabular-nums" style={{ color: 'var(--inopi-espresso)' }}>
                {registrationId}
              </span>
            </div>
            <div className="flex justify-between items-baseline gap-4">
              <div>
                <p className={label} style={{ color: 'var(--inopi-taupe-strong)' }}>{t('category')}</p>
                <p className="font-body text-[14px] font-medium" style={{ color: 'var(--inopi-espresso)' }}>
                  {tm(`plans.${plan.id}.name`)}
                  {plan.id === 'corporate' ? ` · ${tm('plans.corporate.note')}` : ''}
                </p>
              </div>
              <span className="font-display font-bold text-[22px]" style={{ color: 'var(--inopi-orange)' }}>
                {formatRupiah(plan.amount, locale)}
              </span>
            </div>
          </div>

          <div className="rounded-[12px] p-5 border" style={{ borderColor: 'var(--inopi-sand)' }}>
            <h2 className="font-display font-semibold text-[14px] mb-3" style={{ color: 'var(--inopi-espresso)' }}>
              {t('paymentTitle')}
            </h2>
            {isBankConfigured() ? (
              <>
                <p className="font-body text-[14px] font-medium" style={{ color: 'var(--inopi-espresso)' }}>
                  {t('bankLine', { bank: BANK_ACCOUNT.bank, accountName: BANK_ACCOUNT.accountName })}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <p className="font-display font-bold text-[20px] tabular-nums tracking-wide" style={{ color: 'var(--inopi-espresso)' }}>
                    {BANK_ACCOUNT.accountNumber}
                  </p>
                  <CopyButton value={BANK_ACCOUNT.accountNumber} label="Nomor rekening" />
                </div>
                {BANK_ACCOUNT.note && (
                  <p className="font-body text-[12px] mt-2" style={{ color: 'var(--inopi-taupe-strong)' }}>
                    {BANK_ACCOUNT.note}
                  </p>
                )}
                <p
                  className="font-body text-[12px] leading-relaxed mt-4 pt-3"
                  style={{ color: 'var(--inopi-taupe-strong)', borderTop: '1px solid var(--inopi-sand)' }}
                >
                  {t('transferNote', { email: ASSOCIATION_EMAIL })}
                </p>
              </>
            ) : (
              <p className="font-body text-[13px] leading-relaxed" style={{ color: 'var(--inopi-taupe-strong)' }}>
                {t('paymentByEmail')}
              </p>
            )}
          </div>
        </div>
      )}
    </ThankYou>
  )
}
