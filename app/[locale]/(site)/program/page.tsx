import type { Metadata } from 'next'
import Link from 'next/link'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import CtaDark from '@/components/sections/CtaDark'
import PriorityProgramsSection from '@/components/sections/PriorityProgramsSection'
import { IconFlask, IconRocket, IconCertificate, IconNetwork } from '@tabler/icons-react'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Meta.programs' })
  return { title: t('title'), description: t('description') }
}

const programs = [
  { icon: IconFlask, href: '/program/riset-inovasi', team: 'Bobi Kurniawan Soegoto, Nunik Afriliana' },
  { icon: IconRocket, href: '/program/implementasi', team: 'Nita Felia, Yasser Muhammad Syaiful' },
  { icon: IconNetwork, href: '/program/kemitraan', team: 'Victor Osman, Siti Elda Hiererra' },
  { icon: IconCertificate, href: '/program/pelatihan-sertifikasi', team: 'Andy Febrico Bintoro' },
]

export default async function ProgramPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'Program' })
  const items = t.raw('items') as { title: string; desc: string; orientation: string }[]
  const statusLegend = t.raw('statusLegend') as { label: string; meaning: string }[]
  return (
    <>
    <div className="py-14">
      <div className="container">
        <div className="mb-10">
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-semibold uppercase tracking-wider mb-4"
            style={{ background: 'var(--inopi-sand)', color: 'var(--inopi-teal)' }}
          >
            {t('badge')}
          </div>
          <h1 className="font-display font-bold mb-3" style={{ fontSize: 'clamp(24px,4vw,36px)', color: 'var(--inopi-espresso)' }}>
            {t('title')}
          </h1>
          <p className="font-body text-[14px] max-w-xl" style={{ color: 'var(--inopi-taupe-strong)' }}>
            {t('intro')}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {programs.map((p, i) => {
            const Icon = p.icon
            return (
              <Link key={p.href} href={p.href}
                className="block rounded-[12px] p-6 border bg-white transition-all hover:border-[var(--inopi-teal-strong)] hover:shadow-hover"
                style={{ borderColor: 'var(--inopi-sand)' }}>
                <div className="inline-flex items-center justify-center w-11 h-11 rounded-[10px] mb-4" style={{ background: 'var(--inopi-sand)' }}>
                  <Icon size={22} style={{ color: 'var(--inopi-teal-strong)' }} />
                </div>
                <h2 className="font-display font-bold text-[16px] mb-2" style={{ color: 'var(--inopi-espresso)' }}>{items[i].title}</h2>
                <p className="font-body text-[13px] leading-relaxed mb-4" style={{ color: 'var(--inopi-taupe-strong)' }}>{items[i].desc}</p>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-body text-[12px]" style={{ color: 'var(--inopi-sage-strong)' }}>{t('team', { team: p.team })}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full font-medium" style={{ background: 'var(--inopi-sand)', color: 'var(--inopi-teal)' }}>
                    {items[i].orientation}
                  </span>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </div>

    <PriorityProgramsSection showAllLink={false}>
      <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-1.5">
        {statusLegend.map((l) => (
          <div key={l.label} className="font-body text-[12px] leading-relaxed">
            <dt className="inline font-semibold" style={{ color: 'var(--inopi-espresso)' }}>{l.label}: </dt>
            <dd className="inline" style={{ color: 'var(--inopi-taupe-strong)' }}>{l.meaning}</dd>
          </div>
        ))}
      </dl>
    </PriorityProgramsSection>

    <section className="py-14" style={{ background: 'var(--inopi-ivory)' }}>
      <div className="container">
        <CtaDark
          title={t('cta.title')}
          description={t('cta.description')}
          primaryCta={{ label: t('cta.button'), href: '/kemitraan' }}
        />
      </div>
    </section>
    </>
  )
}
