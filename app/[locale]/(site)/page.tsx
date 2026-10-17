import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { pageAlternates } from '@/lib/i18n/seo'
import HeroSection from '@/components/sections/HeroSection'
import StatsBar from '@/components/sections/StatsBar'
import EkosistemSection from '@/components/sections/EkosistemSection'
import ProgramHighlights from '@/components/sections/ProgramHighlights'
import EventList from '@/components/sections/EventList'
import CtaDark from '@/components/sections/CtaDark'
import WhyInopiSection from '@/components/sections/WhyInopiSection'
import PriorityProgramsSection from '@/components/sections/PriorityProgramsSection'
import CollabEcosystemSection from '@/components/sections/CollabEcosystemSection'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  return { alternates: pageAlternates(locale, '/') }
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'Home.cta' })

  return (
    <>
      <HeroSection />
      <StatsBar />
      <WhyInopiSection />
      <EkosistemSection />
      <ProgramHighlights />
      <PriorityProgramsSection />
      <CollabEcosystemSection />
      <EventList />
      <section className="py-14 bg-white">
        <div className="container">
          <CtaDark
            eyebrow={t('eyebrow')}
            title={t('title')}
            description={t('description')}
            primaryCta={{ label: t('register'), href: '/keanggotaan/daftar' }}
            extraCta={{ label: t('partnership'), href: '/kemitraan' }}
            secondaryCta={{ label: t('talk'), href: '/kontak' }}
          />
        </div>
      </section>
    </>
  )
}
