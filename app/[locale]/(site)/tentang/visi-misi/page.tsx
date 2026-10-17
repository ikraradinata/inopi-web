import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import {
  IconLayersIntersect,
  IconMicroscope,
  IconBuildingBridge,
  IconUsersGroup,
  IconAward,
  IconLeaf,
  IconRefresh,
  IconBulb,
  IconUsers,
  IconHeart,
} from '@tabler/icons-react'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Meta.visionMission' })
  return { title: t('title'), description: t('description') }
}

const missionIcons = [IconLayersIntersect, IconMicroscope, IconBuildingBridge, IconUsersGroup, IconAward]
const valueIcons = [IconHeart, IconRefresh, IconLeaf, IconBulb, IconUsers]

export default async function VisiMisiPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'VisiMisi' })
  const mission = t.raw('mission') as { title: string; desc: string }[]
  const values = t.raw('values') as { label: string; desc: string }[]
  return (
    <>
      {/* Visi block */}
      <section style={{ background: 'var(--inopi-espresso)' }} className="py-16">
        <div className="container text-center">
          <p className="font-body text-[11px] font-semibold uppercase tracking-widest mb-4" style={{ color: 'var(--inopi-teal)' }}>
            {t('visionLabel')}
          </p>
          <blockquote
            className="font-display font-bold italic max-w-2xl mx-auto"
            style={{ fontSize: 'clamp(20px,3vw,26px)', color: 'var(--inopi-ivory)', lineHeight: 1.4 }}
          >
            {t('vision')}
          </blockquote>
        </div>
      </section>

      {/* Misi */}
      <section className="py-14 bg-white">
        <div className="container max-w-3xl">
          <h2 className="font-display font-bold text-[22px] mb-8" style={{ color: 'var(--inopi-espresso)' }}>
            {t('missionTitle')}
          </h2>
          <div className="divide-y" style={{ borderColor: 'var(--inopi-sand)' }}>
            {mission.map((m, i) => {
              const Icon = missionIcons[i]
              return (
                <div
                  key={i}
                  className="flex items-start gap-5 py-5 transition-colors hover:bg-[var(--inopi-ivory)] rounded-[8px] px-3 -mx-3"
                >
                  <span
                    className="font-display font-bold text-[28px] leading-none flex-shrink-0 w-10 text-right"
                    style={{ color: 'var(--inopi-teal-strong)' }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Icon size={16} style={{ color: 'var(--inopi-teal-strong)' }} />
                      <h3 className="font-display font-semibold text-[15px]" style={{ color: 'var(--inopi-espresso)' }}>
                        {m.title}
                      </h3>
                    </div>
                    <p className="font-body text-[13px] leading-relaxed" style={{ color: 'var(--inopi-taupe-strong)' }}>
                      {m.desc}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Nilai */}
      <section style={{ background: 'var(--inopi-ivory)' }} className="py-14">
        <div className="container">
          <h2 className="font-display font-bold text-[22px] mb-8 text-center" style={{ color: 'var(--inopi-espresso)' }}>
            {t('valuesTitle')}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {values.map((n, i) => {
              const Icon = valueIcons[i]
              return (
                <div
                  key={n.label}
                  className="bg-white rounded-[12px] p-5 border text-center"
                  style={{ borderColor: 'var(--inopi-sand)' }}
                >
                  <div
                    className="inline-flex items-center justify-center w-10 h-10 rounded-full mb-3"
                    style={{ background: 'var(--inopi-sand)' }}
                  >
                    <Icon size={18} style={{ color: 'var(--inopi-teal-strong)' }} />
                  </div>
                  <p className="font-display font-bold text-[13px] mb-1" style={{ color: 'var(--inopi-espresso)' }}>{n.label}</p>
                  <p className="font-body text-[12px] leading-snug" style={{ color: 'var(--inopi-taupe-strong)' }}>{n.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}
