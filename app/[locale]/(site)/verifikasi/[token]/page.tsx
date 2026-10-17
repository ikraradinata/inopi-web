import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { IconRosetteDiscountCheck } from '@tabler/icons-react'
import { Link } from '@/i18n/navigation'
import { RegistryError, registryCall } from '@/lib/registry/client'
import { toCardStatus } from '@/lib/card/cardData'
import { formatCardDate } from '@/lib/card/renderCard'
import { headers } from 'next/headers'

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'MembershipVerify' })
  // Alamat berisi token pribadi: jangan diindeks atau diikuti mesin pencari.
  return { title: { absolute: t('metaTitle') }, robots: { index: false, follow: false } }
}

interface Verified {
  name: string
  category: 'student' | 'professional' | 'corporate'
  institution: string
  status: string
  validUntil: string
}

export default async function VerifyPage({ params }: { params: Promise<{ locale: string; token: string }> }) {
  const { locale, token } = await params
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'MembershipVerify' })
  const tm = await getTranslations({ locale, namespace: 'Membership' })
  if (!/^[0-9a-f]{64}$/.test(token)) notFound()

  let v: Verified
  try {
    const h = await headers()
    const ip = h.get('x-forwarded-for')?.split(',')[0]?.trim() || h.get('x-real-ip') || 'unknown'
    v = await registryCall<Verified & { ok: true }>('verify', { verifyToken: token }, ip)
  } catch (err) {
    if (err instanceof RegistryError && err.code === 'not_found') notFound()
    throw err
  }

  // Pendaftaran yang ditolak tidak punya kartu: tampil sebagai tidak aktif.
  const status = toCardStatus(v.status, v.validUntil || null) ?? 'inactive'
  const lang = locale === 'en' ? 'en' : 'id'
  const rows: [string, string][] = [
    [t('name'), v.name],
    [t('category'), tm(`plans.${v.category}.name`)],
    [t('institution'), v.institution],
    [t('validUntil'), v.validUntil ? formatCardDate(v.validUntil, lang) : t('notYet')],
  ]
  const good = status === 'active'

  return (
    <div className="py-10 sm:py-16">
      <div className="container max-w-xl">
        <div className="text-center mb-6">
          <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'var(--inopi-sand)' }}>
            <IconRosetteDiscountCheck size={28} style={{ color: good ? 'var(--inopi-teal-strong)' : 'var(--inopi-taupe-strong)' }} />
          </div>
          <h1 className="font-display font-bold mb-2" style={{ fontSize: 'clamp(24px,5vw,32px)', color: 'var(--inopi-espresso)' }}>
            {t('title')}
          </h1>
          <p className="font-body text-[14px]" style={{ color: 'var(--inopi-taupe-strong)' }}>{t('intro')}</p>
        </div>

        <dl className="rounded-[16px] border bg-white divide-y mb-5" style={{ borderColor: 'var(--inopi-sand)' }}>
          {rows.map(([label, value]) => (
            <div key={label} className="flex items-baseline justify-between gap-4 px-5 py-3.5" style={{ borderColor: 'var(--inopi-sand)' }}>
              <dt className="font-body text-[13px] flex-shrink-0" style={{ color: 'var(--inopi-taupe-strong)' }}>{label}</dt>
              <dd className="font-display font-semibold text-[15px] text-right break-words min-w-0" style={{ color: 'var(--inopi-espresso)' }}>{value}</dd>
            </div>
          ))}
          <div className="flex items-center justify-between gap-4 px-5 py-3.5" style={{ borderColor: 'var(--inopi-sand)' }}>
            <dt className="font-body text-[13px]" style={{ color: 'var(--inopi-taupe-strong)' }}>{t('status')}</dt>
            <dd>
              <span
                className="inline-block px-3 py-1 rounded-full text-[12px] font-semibold"
                style={{ background: good ? 'var(--inopi-teal-strong)' : status === 'pending' ? 'var(--inopi-gold)' : 'var(--inopi-sand)', color: good ? 'white' : 'var(--inopi-espresso)' }}
              >
                {t(`statuses.${status}`)}
              </span>
            </dd>
          </div>
        </dl>

        <p className="font-body text-[12px] text-center mb-6" style={{ color: 'var(--inopi-taupe-strong)' }}>{t('privacy')}</p>
        <div className="text-center">
          <Link href="/" className="inline-flex items-center justify-center h-12 px-5 text-[14px] font-semibold text-white rounded-[10px]" style={{ background: 'var(--inopi-espresso)' }}>
            {t('home')}
          </Link>
        </div>
      </div>
    </div>
  )
}
