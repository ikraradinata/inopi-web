import { useTranslations } from 'next-intl'
import { IconMicroscope, IconHeartHandshake, IconFileText } from '@tabler/icons-react'

const features = [
  { icon: IconMicroscope, accent: 'var(--inopi-sand)', accentBorder: 'var(--inopi-teal-strong)' },
  { icon: IconHeartHandshake, accent: 'var(--inopi-sand)', accentBorder: 'var(--inopi-teal)' },
  { icon: IconFileText, accent: 'var(--inopi-sand)', accentBorder: 'var(--inopi-espresso)' },
]

export default function EkosistemSection() {
  const t = useTranslations('Ekosistem')
  const texts = t.raw('features') as { title: string; desc: string }[]
  return (
    <section className="py-12 bg-white">
      <div className="container">
        <div
          className="rounded-[12px] p-7 mx-auto max-w-[860px]"
          style={{ border: '1px solid var(--inopi-sand)' }}
        >
          <h2 className="font-display font-bold text-[20px] mb-2" style={{ color: 'var(--inopi-espresso)' }}>
            {t('title')}
          </h2>
          <p className="font-body text-[14px] leading-relaxed mb-8" style={{ color: 'var(--inopi-taupe-strong)' }}>
            {t('body')}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((f, i) => {
              const Icon = f.icon
              return (
                <div
                  key={texts[i].title}
                  className="pt-4"
                  style={{ borderTop: `2px solid ${f.accentBorder}` }}
                >
                  <div
                    className="inline-flex items-center justify-center w-9 h-9 rounded-[8px] mb-3"
                    style={{ background: f.accent }}
                  >
                    <Icon size={18} style={{ color: f.accentBorder }} />
                  </div>
                  <h3 className="font-display font-semibold text-[14px] mb-1.5" style={{ color: 'var(--inopi-espresso)' }}>
                    {texts[i].title}
                  </h3>
                  <p className="font-body text-[13px] leading-relaxed" style={{ color: 'var(--inopi-taupe-strong)' }}>
                    {texts[i].desc}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
