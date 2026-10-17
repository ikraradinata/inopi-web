import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import {
  IconCalendarEvent,
  IconClock,
  IconMapPin,
  IconUsers,
  IconBook,
  IconBulb,
  IconAffiliate,
  IconChartBar,
} from '@tabler/icons-react'
import { LAUNCH, RSVP_URL, SPEAKER_NAMES, MC } from '@/lib/constants/launch'
import LaunchCountdown from '@/components/sections/LaunchCountdown'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Meta.launching' })
  const tl = await getTranslations({ locale, namespace: 'Launch' })
  const values = {
    eyebrow: tl('eyebrow'),
    title: tl('title'),
    tagline: tl('tagline'),
    dateLabel: tl('dateLabel'),
    timeLabel: tl('timeLabel'),
    venue: tl('venue'),
    venueAddress: tl('venueAddress'),
  }
  return {
    title: t('title', values),
    description: t('description', values),
    openGraph: {
      title: t('title', values),
      description: t('ogDescription', values),
      images: [LAUNCH.poster],
    },
  }
}

const pillarIcons = [IconUsers, IconBook, IconBulb, IconAffiliate, IconChartBar]

const detailIcons = [IconCalendarEvent, IconClock, IconMapPin]

export default async function LaunchingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'LaunchPage' })
  const tl = await getTranslations({ locale, namespace: 'Launch' })
  const th = await getTranslations({ locale, namespace: 'Hero' })
  const details = [
    { label: t('details.date'), value: tl('dateLabel') },
    { label: t('details.time'), value: tl('timeLabel') },
    { label: t('details.location'), value: `${tl('venue')} · ${tl('venueDetail')}` },
  ].map((d, i) => ({ ...d, icon: detailIcons[i] }))
  const pillars = t.raw('pillars') as { label: string; desc: string }[]
  const rundown = t.raw('rundown') as { time: string; segment: string; speaker?: string; highlight?: boolean }[]
  const speakers = t.raw('speakers') as { title: string; subtitle?: string }[]
  const brandValues = t.raw('brandValues') as string[]
  return (
    <>
      {/* Hero acara */}
      <section className="relative overflow-hidden py-14" style={{ background: 'var(--inopi-ivory)' }}>
        <div className="inopi-diagonal hidden lg:block" style={{ right: '4%', top: '-60px', width: '180px', height: '680px' }} />
        <div className="container relative">
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-14 items-start">
            <div className="flex-1">
              <p className="inopi-eyebrow mb-4">{tl('eyebrow')}</p>
              <h1
                className="font-display font-extrabold leading-[1.08] mb-4"
                style={{ fontSize: 'clamp(28px,5vw,46px)', color: 'var(--inopi-espresso)' }}
              >
                {th('headlineLead')}{' '}
                <span style={{ color: 'var(--inopi-teal)' }}>{th('headlineAccent')}</span>
              </h1>
              <p className="font-body text-[15px] leading-relaxed mb-7 max-w-xl" style={{ color: 'var(--inopi-taupe-strong)' }}>
                {tl('tagline')} — {tl('positioning')}.
              </p>

              <div className="mb-8">
                <LaunchCountdown />
              </div>

              {/* Detail waktu & tempat */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                {details.map((d) => {
                  const Icon = d.icon
                  return (
                    <div
                      key={d.label}
                      className="rounded-[12px] p-4 border bg-white"
                      style={{ borderColor: 'var(--inopi-sand)' }}
                    >
                      <Icon size={18} style={{ color: 'var(--inopi-orange)' }} />
                      <p
                        className="font-body text-[11px] font-semibold uppercase tracking-wider mt-2"
                        style={{ color: 'var(--inopi-sage-strong)' }}
                      >
                        {d.label}
                      </p>
                      <p className="font-body text-[13px] font-medium mt-0.5" style={{ color: 'var(--inopi-espresso)' }}>
                        {d.value}
                      </p>
                    </div>
                  )
                })}
              </div>

              <div className="flex flex-wrap gap-3">
                <Link
                  href={RSVP_URL}
                  className="inline-flex items-center px-5 py-2.5 text-[14px] font-semibold text-white rounded-[8px] transition-all hover:-translate-y-px hover:shadow-hover"
                  style={{ background: 'var(--inopi-orange-strong)' }}
                >
                  {t('confirm')}
                </Link>
                <a
                  href={LAUNCH.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 text-[14px] font-medium rounded-[8px] border transition-all hover:border-[var(--inopi-teal-strong)] hover:text-[var(--inopi-teal-strong)]"
                  style={{ color: 'var(--inopi-espresso)', borderColor: 'var(--inopi-sand)' }}
                >
                  <IconMapPin size={16} />
                  {t('openMap')}
                </a>
              </div>
            </div>

            {/* Poster */}
            <div className="w-full lg:w-[38%] flex-shrink-0">
              <Image
                src={LAUNCH.poster}
                alt={t('posterAlt', { eyebrow: tl('eyebrow') })}
                width={1092}
                height={1440}
                priority
                className="w-full h-auto rounded-[12px]"
                style={{ boxShadow: '0 10px 30px rgba(53,41,42,0.14)' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Lima pilar */}
      <section className="py-14 bg-white">
        <div className="container">
          <div className="text-center mb-10">
            <p className="inopi-eyebrow mb-3">{t('brandTagline')}</p>
            <h2
              className="font-display font-bold"
              style={{ fontSize: 'clamp(20px,3vw,28px)', color: 'var(--inopi-espresso)' }}
            >
              {t('pillarsTitle')}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {pillars.map((p, i) => {
              const Icon = pillarIcons[i]
              return (
                <div
                  key={p.label}
                  className="rounded-[12px] p-5 border text-center transition-all hover:border-[var(--inopi-teal-strong)]"
                  style={{ borderColor: 'var(--inopi-sand)' }}
                >
                  <div
                    className="inline-flex items-center justify-center w-11 h-11 rounded-full mb-3"
                    style={{ background: 'var(--inopi-sand)' }}
                  >
                    <Icon size={20} style={{ color: 'var(--inopi-orange)' }} />
                  </div>
                  <p
                    className="font-display font-bold text-[13px] uppercase tracking-wider mb-1"
                    style={{ color: 'var(--inopi-espresso)' }}
                  >
                    {p.label}
                  </p>
                  <p className="font-body text-[12px] leading-snug" style={{ color: 'var(--inopi-taupe-strong)' }}>
                    {p.desc}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Rundown & pengisi acara */}
      <section className="py-14" style={{ background: 'var(--inopi-ivory)' }}>
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-8">
            {/* Rundown */}
            <div>
              <p className="inopi-eyebrow mb-3">{tl('dateLabel')}</p>
              <h2
                className="font-display font-bold mb-6"
                style={{ fontSize: 'clamp(20px,3vw,28px)', color: 'var(--inopi-espresso)' }}
              >
                {t('rundownTitle')}
              </h2>

              <div className="rounded-[16px] border overflow-hidden bg-white" style={{ borderColor: 'var(--inopi-sand)' }}>
                {rundown.map((r, i) => (
                  <div
                    key={r.time}
                    className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-5 px-5 py-3.5"
                    style={{
                      borderTop: i === 0 ? 'none' : '1px solid var(--inopi-sand)',
                      background: r.highlight ? 'var(--inopi-sand)' : 'transparent',
                    }}
                  >
                    <span
                      className="font-body text-[12px] font-semibold tabular-nums flex-shrink-0 sm:w-[104px]"
                      style={{ color: r.highlight ? 'var(--inopi-espresso)' : 'var(--inopi-taupe-strong)' }}
                    >
                      {r.time}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p
                        className="font-body text-[14px] font-medium leading-snug"
                        style={{ color: 'var(--inopi-espresso)' }}
                      >
                        {r.segment}
                      </p>
                      {r.speaker && (
                        <p className="font-body text-[12px] mt-0.5" style={{ color: 'var(--inopi-teal-strong)' }}>
                          {r.speaker}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <p className="font-body text-[12px] mt-3" style={{ color: 'var(--inopi-sage-strong)' }}>
                {t('rundownNote')}
              </p>
            </div>

            {/* Pengisi acara */}
            <div>
              <p className="inopi-eyebrow mb-3">{t('speakersEyebrow')}</p>
              <h2
                className="font-display font-bold mb-6"
                style={{ fontSize: 'clamp(20px,3vw,28px)', color: 'var(--inopi-espresso)' }}
              >
                {t('speakersTitle')}
              </h2>

              <div className="flex flex-col gap-3">
                {speakers.map((s, si) => (
                  <div
                    key={s.title}
                    className="rounded-[12px] p-5 border bg-white"
                    style={{ borderColor: 'var(--inopi-sand)' }}
                  >
                    <p
                      className="font-body text-[11px] font-semibold uppercase tracking-wider"
                      style={{ color: 'var(--inopi-orange-strong)' }}
                    >
                      {s.title}
                    </p>
                    {s.subtitle && (
                      <p className="font-display font-semibold text-[15px] mt-0.5 mb-2.5" style={{ color: 'var(--inopi-espresso)' }}>
                        {s.subtitle}
                      </p>
                    )}
                    <ul className={s.subtitle ? '' : 'mt-2'}>
                      {SPEAKER_NAMES[si].people.map((p) => (
                        <li
                          key={p}
                          className="flex items-center gap-2 font-body text-[13px] py-0.5"
                          style={{ color: 'var(--inopi-espresso)' }}
                        >
                          <span
                            className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                            style={{ background: 'var(--inopi-orange)' }}
                          />
                          {p}
                        </li>
                      ))}
                    </ul>
                    {SPEAKER_NAMES[si].moderator && (
                      <p className="font-body text-[12px] mt-2 pt-2" style={{ color: 'var(--inopi-taupe-strong)', borderTop: '1px solid var(--inopi-sand)' }}>
                        {t('moderator', { name: SPEAKER_NAMES[si].moderator! })}
                      </p>
                    )}
                  </div>
                ))}

                <div
                  className="rounded-[12px] p-5 border"
                  style={{ borderColor: 'var(--inopi-sand)', background: 'var(--inopi-sand)' }}
                >
                  <p
                    className="font-body text-[11px] font-semibold uppercase tracking-wider mb-1.5"
                    style={{ color: 'var(--inopi-taupe-strong)' }}
                  >
                    {t('mcLabel')}
                  </p>
                  <p className="font-body text-[13px]" style={{ color: 'var(--inopi-espresso)' }}>
                    {MC.join(' & ')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lokasi + nilai brand */}
      <section className="py-14 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Lokasi */}
            <div className="rounded-[16px] p-7 border" style={{ borderColor: 'var(--inopi-sand)', background: 'var(--inopi-ivory)' }}>
              <p className="inopi-eyebrow mb-3">{t('locationEyebrow')}</p>
              <h3 className="font-display font-bold text-[20px] mb-1" style={{ color: 'var(--inopi-espresso)' }}>
                {tl('venue')}
              </h3>
              <p className="font-body text-[14px]" style={{ color: 'var(--inopi-espresso)' }}>
                {tl('venueDetail')}
              </p>
              <p className="font-body text-[13px] mt-1 mb-5" style={{ color: 'var(--inopi-taupe-strong)' }}>
                {tl('venueAddress')}
              </p>
              <a
                href={LAUNCH.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-body text-[13px] font-semibold"
                style={{ color: 'var(--inopi-teal-strong)' }}
              >
                <IconMapPin size={15} />
                {t('directions')}
              </a>
            </div>

            {/* Nilai brand */}
            <div
              className="relative overflow-hidden rounded-[16px] p-7"
              style={{ background: 'var(--inopi-espresso)' }}
            >
              <div className="inopi-dots absolute inset-y-0 right-0 hidden w-[260px] sm:block" aria-hidden />
              <div className="relative">
                <p
                  className="font-body text-[11px] font-semibold uppercase tracking-widest mb-4"
                  style={{ color: 'var(--inopi-gold)' }}
                >
                  {t('valuesLabel')}
                </p>
                <div className="flex flex-wrap gap-2 mb-5">
                  {brandValues.map((v) => (
                    <span
                      key={v}
                      className="font-body text-[12px] font-semibold px-3 py-1.5 rounded-full"
                      style={{
                        background: 'color-mix(in srgb, var(--inopi-ivory) 14%, transparent)',
                        color: 'var(--inopi-ivory)',
                      }}
                    >
                      {v}
                    </span>
                  ))}
                </div>
                <p className="font-body text-[14px] leading-relaxed" style={{ color: 'var(--inopi-sand)' }}>
                  {t('about', { positioning: tl('positioning') })}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
