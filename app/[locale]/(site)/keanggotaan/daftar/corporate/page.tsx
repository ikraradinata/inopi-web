import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { pageAlternates } from '@/lib/i18n/seo'
import { countryOptions } from '@/lib/membership/countries'
import CorporateForm from './CorporateForm'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Meta.membershipCorporate' })
  return {
    alternates: pageAlternates(locale, '/keanggotaan/daftar/corporate'),
    title: { absolute: t('title') },
    description: t('description'),
  }
}

export default async function CorporateDaftarPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'MembershipCorporate' })

  return (
    <div className="py-8 sm:py-14">
      <div className="container max-w-xl">
        <h1 className="font-display font-bold mb-2" style={{ fontSize: 'clamp(24px,5vw,32px)', color: 'var(--inopi-espresso)' }}>
          {t('title')}
        </h1>
        <p className="font-body text-[14px] mb-6" style={{ color: 'var(--inopi-taupe-strong)' }}>
          {t('intro')}
        </p>
        <CorporateForm countries={countryOptions(locale)} />
      </div>
    </div>
  )
}
