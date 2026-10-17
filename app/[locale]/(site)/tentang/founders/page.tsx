import type { Metadata } from 'next'
import { pageAlternates } from '@/lib/i18n/seo'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import FoundersGrid from './FoundersGrid'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Meta.founders' })
  return {
    alternates: pageAlternates(locale, '/tentang/founders'), title: { absolute: t('title') }, description: t('description') }
}

export default async function FoundersPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'Founders' })
  return (
    <div className="py-14">
      <div className="container">
        <div className="text-center mb-10">
          <p className="font-body text-[11px] font-semibold uppercase tracking-widest mb-3" style={{ color: 'var(--inopi-teal-strong)' }}>
            {t('eyebrow')}
          </p>
          <h1 className="font-display font-bold mb-3" style={{ fontSize: 'clamp(24px,4vw,36px)', color: 'var(--inopi-espresso)' }}>
            {t('title')}
          </h1>
          <p className="font-body text-[14px] max-w-xl mx-auto" style={{ color: 'var(--inopi-taupe-strong)' }}>
            {t('intro')}
          </p>
        </div>
        <FoundersGrid />
      </div>
    </div>
  )
}
