import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { IconCheck } from '@tabler/icons-react'
import { Link } from '@/i18n/navigation'
import { RegistryError, registryCall } from '@/lib/registry/client'
import { VERIFICATION_PROMISE_WORKING_HOURS } from '@/lib/membership/config'
import { formatRupiah } from '@/lib/constants/registration'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: { absolute: 'Terima Kasih — INOPI' },
  robots: { index: false, follow: false },
}

interface Receipt {
  regNumber: string
  category: 'student' | 'professional' | 'corporate'
  status: string
  transferAmount: number
  verifyToken: string
}

const STATUS_KEY: Record<string, 'pending' | 'active' | 'rejected'> = {
  'Menunggu Verifikasi': 'pending',
  Aktif: 'active',
  Ditolak: 'rejected',
}

async function loadReceipt(token: string | undefined): Promise<Receipt | null> {
  if (!token || !/^[0-9a-f]{64}$/.test(token)) return null
  try {
    return await registryCall<Receipt & { ok: true }>('receipt', { receiptToken: token })
  } catch (err) {
    if (!(err instanceof RegistryError) || err.code !== 'not_found') console.error('[terima-kasih] gagal memuat tanda terima', err)
    return null
  }
}

export default async function KeanggotaanTerimaKasihPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ t?: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'MembershipThanks' })
  const tm = await getTranslations({ locale, namespace: 'Membership' })
  const { t: token } = await searchParams
  const receipt = await loadReceipt(token)

  const linkPrimary = 'inline-flex items-center justify-center h-12 px-5 text-[14px] font-semibold text-white rounded-[10px] transition-all hover:-translate-y-px'
  const linkSecondary = 'inline-flex items-center justify-center h-12 px-5 text-[14px] font-medium rounded-[10px] border transition-all hover:border-[var(--inopi-teal-strong)]'

  if (!receipt) {
    return (
      <div className="py-16">
        <div className="container max-w-xl text-center">
          <h1 className="font-display font-bold mb-3" style={{ fontSize: 'clamp(22px,4vw,30px)', color: 'var(--inopi-espresso)' }}>
            {t('notFoundTitle')}
          </h1>
          <p className="font-body text-[14px] mb-8" style={{ color: 'var(--inopi-taupe-strong)' }}>
            {t('notFoundText')}
          </p>
          <Link href="/" className={linkPrimary} style={{ background: 'var(--inopi-espresso)' }}>
            {t('home')}
          </Link>
        </div>
      </div>
    )
  }

  const statusKey = STATUS_KEY[receipt.status] ?? 'pending'
  const rows: [string, string][] = [
    [t('numberLabel'), receipt.regNumber],
    [t('categoryLabel'), tm(`plans.${receipt.category}.name`)],
    [t('statusLabel'), t(`status.${statusKey}`)],
    [t('amountLabel'), formatRupiah(receipt.transferAmount, locale)],
  ]

  return (
    <div className="py-10 sm:py-16">
      <div className="container max-w-xl">
        <div className="text-center mb-6">
          <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'var(--inopi-sand)' }}>
            <IconCheck size={26} style={{ color: 'var(--inopi-teal-strong)' }} />
          </div>
          <h1 className="font-display font-bold mb-2" style={{ fontSize: 'clamp(24px,5vw,32px)', color: 'var(--inopi-espresso)' }}>
            {t('title')}
          </h1>
          <p className="font-body text-[14px]" style={{ color: 'var(--inopi-taupe-strong)' }}>
            {t('intro')}
          </p>
        </div>

        <dl className="rounded-[16px] border bg-white divide-y mb-5" style={{ borderColor: 'var(--inopi-sand)' }}>
          {rows.map(([label, value]) => (
            <div key={label} className="flex items-baseline justify-between gap-4 px-5 py-3.5" style={{ borderColor: 'var(--inopi-sand)' }}>
              <dt className="font-body text-[13px]" style={{ color: 'var(--inopi-taupe-strong)' }}>{label}</dt>
              <dd className="font-display font-semibold text-[15px] text-right tabular-nums" style={{ color: 'var(--inopi-espresso)' }}>
                {label === t('statusLabel') ? (
                  <span className="inline-block px-2.5 py-1 rounded-full text-[12px] font-semibold" style={{ background: 'var(--inopi-gold)', color: 'var(--inopi-espresso)' }}>
                    {value}
                  </span>
                ) : (
                  value
                )}
              </dd>
            </div>
          ))}
        </dl>

        <p className="font-body text-[14px] leading-relaxed text-center mb-6" style={{ color: 'var(--inopi-espresso)' }}>
          {t('whatNext', { hours: VERIFICATION_PROMISE_WORKING_HOURS })}
        </p>

        <div className="rounded-[16px] p-5 mb-6 text-center" style={{ background: 'var(--inopi-sand)' }}>
          {/* Endpoint kartu dibuat di R6; tautan memakai token verifikasi, bukan nomor yang bisa ditebak. */}
          <a href={`/api/membership/card/${receipt.verifyToken}`} className={`${linkPrimary} w-full`} style={{ background: 'var(--inopi-orange-strong)' }}>
            {t('downloadCard')}
          </a>
          <p className="font-body text-[12px] mt-3" style={{ color: 'var(--inopi-espresso)' }}>
            {t('cardNote')}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/" className={linkPrimary} style={{ background: 'var(--inopi-espresso)' }}>
            {t('home')}
          </Link>
          <Link href="/acara" className={linkSecondary} style={{ color: 'var(--inopi-espresso)', borderColor: 'var(--inopi-taupe-strong)' }}>
            {t('events')}
          </Link>
        </div>
      </div>
    </div>
  )
}
