import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { pageAlternates } from '@/lib/i18n/seo'
import { countryOptions } from '@/lib/membership/countries'
import RegistrationForm from './RegistrationForm'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Meta.membershipApply' })
  return {
    alternates: pageAlternates(locale, '/keanggotaan/daftar'),
    title: { absolute: t('title') },
    description: t('description'),
  }
}

export default async function DaftarPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'MembershipApply' })
  const countries = countryOptions(locale)

  return (
    <div className="py-8 sm:py-14">
      <div className="container max-w-xl">
        <h1 className="font-display font-bold mb-2" style={{ fontSize: 'clamp(24px,5vw,32px)', color: 'var(--inopi-espresso)' }}>
          {t('title')}
        </h1>
        <p className="font-body text-[14px] mb-3" style={{ color: 'var(--inopi-taupe-strong)' }}>
          {t('intro')}
        </p>
        <p className="font-body text-[14px] mb-6" style={{ color: 'var(--inopi-espresso)' }}>
          {t('corporateQuestion')}{' '}
          <Link href="/keanggotaan/daftar/kode" className="font-semibold underline underline-offset-4" style={{ color: 'var(--inopi-teal-strong)' }}>
            {t('corporateLink')}
          </Link>
        </p>
        <RegistrationForm countries={countries} />
      </div>
    </div>
  )
}
