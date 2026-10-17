import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { IconCheck, IconCircle, IconRocket } from '@tabler/icons-react'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Meta.history' })
  return { title: t('title'), description: t('description') }
}

const timelineStatus = ['done', 'done', 'done', 'done', 'launch'] as const

export default async function SejarahPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'Sejarah' })
  const tl = await getTranslations({ locale, namespace: 'Launch' })
  const base = t.raw('timeline') as { label: string; desc: string }[]
  const timeline = [
    ...base.map((b, i) => ({ status: timelineStatus[i], ...b })),
    {
      status: timelineStatus[4],
      label: t('launchLabel'),
      desc: t('launchDesc', { dateLabel: tl('dateLabel'), venue: tl('venue'), venueDetail: tl('venueDetail') }),
    },
  ]
  const challenges = t.raw('challenges') as { title: string; items: string[] }[]
  return (
    <div className="py-14">
      {/* Hero */}
      <div className="container mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-semibold uppercase tracking-wider mb-4"
          style={{ background: 'var(--inopi-sand)', color: 'var(--inopi-teal)' }}>
          {t('badge')}
        </div>
        <h1 className="font-display font-bold mb-3" style={{ fontSize: 'clamp(24px,4vw,36px)', color: 'var(--inopi-espresso)' }}>
          {t('title')}
        </h1>
        <p className="font-body text-[14px] max-w-xl" style={{ color: 'var(--inopi-taupe-strong)' }}>
          {t('intro')}
        </p>
      </div>

      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Timeline */}
          <div>
            <h2 className="font-display font-bold text-[18px] mb-6" style={{ color: 'var(--inopi-espresso)' }}>
              {t('timelineTitle')}
            </h2>
            <div className="relative">
              {timeline.map((step, i) => (
                <div key={step.label} className="flex gap-4 pb-7 relative">
                  {/* Connecting line */}
                  {i < timeline.length - 1 && (
                    <div
                      className="absolute left-[15px] top-7 bottom-0 w-0.5"
                      style={{ borderLeft: '2px dashed var(--inopi-sand)' }}
                    />
                  )}
                  {/* Dot */}
                  <div className="flex-shrink-0 mt-0.5">
                    {step.status === 'done' ? (
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center"
                        style={{ background: 'var(--inopi-teal-strong)' }}
                      >
                        <IconCheck size={14} color="white" />
                      </div>
                    ) : step.status === 'launch' ? (
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center"
                        style={{ background: 'var(--inopi-sand)', border: '2px solid var(--inopi-teal-strong)' }}
                      >
                        <IconRocket size={14} style={{ color: 'var(--inopi-teal-strong)' }} />
                      </div>
                    ) : (
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center"
                        style={{ background: 'var(--inopi-ivory)', border: '2px solid var(--inopi-sand)' }}
                      >
                        <IconCircle size={12} style={{ color: 'var(--inopi-sage-strong)' }} />
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-[14px] mb-0.5" style={{ color: 'var(--inopi-espresso)' }}>
                      {step.label}
                    </h3>
                    <p className="font-body text-[13px] leading-relaxed" style={{ color: 'var(--inopi-taupe-strong)' }}>
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Challenge cards */}
          <div className="flex flex-col gap-4">
            {challenges.map((c) => (
              <div
                key={c.title}
                className="rounded-[12px] p-5 border"
                style={{ borderColor: 'var(--inopi-sand)' }}
              >
                <h3 className="font-display font-semibold text-[15px] mb-3" style={{ color: 'var(--inopi-espresso)' }}>
                  {c.title}
                </h3>
                <ul className="space-y-2">
                  {c.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 font-body text-[13px]" style={{ color: 'var(--inopi-taupe-strong)' }}>
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: 'var(--inopi-teal-strong)' }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div
              className="rounded-[12px] p-5"
              style={{ background: 'var(--inopi-espresso)' }}
            >
              <h3 className="font-display font-semibold text-[15px] mb-3 text-white">
                {t('roleTitle')}
              </h3>
              <p className="font-body text-[13px] leading-relaxed" style={{ color: 'var(--inopi-sand)' }}>
                {t('roleBody')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
