import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import ThankYou from '@/components/sections/ThankYou'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Meta.thanks' })
  return { title: { absolute: t('title') }, robots: { index: false } }
}

export default async function KemitraanTerimaKasihPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'KemitraanThanks' })
  return (
    <ThankYou
      title={t('title')}
      text={t('text')}
      actions={[
        { label: t('home'), href: '/' },
        { label: t('programs'), href: '/program' },
      ]}
    />
  )
}
