import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import ThankYou from '@/components/sections/ThankYou'

export const metadata: Metadata = {
  title: { absolute: 'Terima Kasih — INOPI' },
  robots: { index: false },
}

export default async function KontakTerimaKasihPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'KontakThanks' })
  return <ThankYou title={t('title')} text={t('text')} actions={[{ label: t('home'), href: '/' }]} />
}
