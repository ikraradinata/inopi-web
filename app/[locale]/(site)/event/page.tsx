import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { IconCalendarEvent, IconClock, IconMapPin } from '@tabler/icons-react'
import { LAUNCH } from '@/lib/constants/launch'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Meta.event' })
  const tl = await getTranslations({ locale, namespace: 'Launch' })
  return {
    title: t('title'),
    description: t('description', { eyebrow: tl('eyebrow'), dateLabel: tl('dateLabel'), venue: tl('venue') }),
  }
}

export default async function EventPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'EventPage' })
  const tl = await getTranslations({ locale, namespace: 'Launch' })
  return (
    <div className="py-14">
      <div className="container max-w-4xl">
        <p className="inopi-eyebrow mb-3">{t('eyebrow')}</p>
        <h1
          className="font-display font-bold mb-3"
          style={{ fontSize: 'clamp(24px,4vw,36px)', color: 'var(--inopi-espresso)' }}
        >
          {t('title')}
        </h1>
        <p className="font-body text-[14px] mb-10 max-w-2xl" style={{ color: 'var(--inopi-taupe-strong)' }}>
          {t('intro')}
        </p>

        {/* Agenda terdekat */}
        <p className="inopi-eyebrow mb-4">{t('nearest')}</p>
        <Link
          href={LAUNCH.href}
          className="group flex flex-col sm:flex-row gap-6 rounded-[16px] p-6 border transition-all hover:border-[var(--inopi-teal-strong)] hover:shadow-hover"
          style={{ borderColor: 'var(--inopi-sand)', background: 'var(--inopi-ivory)' }}
        >
          <Image
            src={LAUNCH.poster}
            alt={t('posterAlt', { eyebrow: tl('eyebrow') })}
            width={1092}
            height={1440}
            className="w-full sm:w-[180px] h-auto flex-shrink-0 rounded-[10px]"
          />
          <div className="flex-1 min-w-0">
            <p
              className="font-body text-[11px] font-semibold uppercase tracking-wider mb-2"
              style={{ color: 'var(--inopi-orange-strong)' }}
            >
              {tl('eyebrow')}
            </p>
            <h2
              className="font-display font-bold text-[20px] leading-snug mb-2"
              style={{ color: 'var(--inopi-espresso)' }}
            >
              {tl('title')}
            </h2>
            <p className="font-body text-[13px] leading-relaxed mb-4" style={{ color: 'var(--inopi-taupe-strong)' }}>
              {tl('tagline')} — {tl('positioning')}.
            </p>

            <div className="flex flex-col gap-1.5">
              <span className="inline-flex items-center gap-2 font-body text-[13px]" style={{ color: 'var(--inopi-espresso)' }}>
                <IconCalendarEvent size={14} style={{ color: 'var(--inopi-orange)' }} />
                {tl('dateLabel')}
              </span>
              <span className="inline-flex items-center gap-2 font-body text-[13px]" style={{ color: 'var(--inopi-espresso)' }}>
                <IconClock size={14} style={{ color: 'var(--inopi-orange)' }} />
                {tl('timeLabel')}
              </span>
              <span className="inline-flex items-center gap-2 font-body text-[13px]" style={{ color: 'var(--inopi-espresso)' }}>
                <IconMapPin size={14} style={{ color: 'var(--inopi-orange)' }} />
                {tl('venue')}, {tl('venueDetail')}
              </span>
            </div>

            <span
              className="inline-block font-body text-[13px] font-semibold mt-4 transition-transform group-hover:translate-x-0.5"
              style={{ color: 'var(--inopi-teal-strong)' }}
            >
              {t('link')}
            </span>
          </div>
        </Link>
      </div>
    </div>
  )
}
