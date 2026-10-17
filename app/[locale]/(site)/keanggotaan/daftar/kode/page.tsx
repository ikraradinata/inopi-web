import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { pageAlternates } from '@/lib/i18n/seo'
import { countryOptions } from '@/lib/membership/countries'
import CodeForm from './CodeForm'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Meta.membershipCode' })
  return {
    alternates: pageAlternates(locale, '/keanggotaan/daftar/kode'),
    title: { absolute: t('title') },
    description: t('description'),
    // Halaman berisi isian pribadi dan kode rahasia: tidak untuk diindeks.
    robots: { index: false, follow: false },
  }
}

export default async function KodePage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ kode?: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'MembershipCode' })
  const { kode } = await searchParams

  return (
    <div className="py-8 sm:py-14">
      <div className="container max-w-xl">
        <h1 className="font-display font-bold mb-2" style={{ fontSize: 'clamp(24px,5vw,32px)', color: 'var(--inopi-espresso)' }}>
          {t('title')}
        </h1>
        <p className="font-body text-[14px] mb-6" style={{ color: 'var(--inopi-taupe-strong)' }}>
          {t('intro')}
        </p>
        <CodeForm countries={countryOptions(locale)} initialCode={typeof kode === 'string' ? kode.slice(0, 40) : ''} />
      </div>
    </div>
  )
}
