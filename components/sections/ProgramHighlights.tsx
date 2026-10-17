import Link from 'next/link'
import { useTranslations } from 'next-intl'
import {
  IconFlask,
  IconRocket,
  IconCertificate,
  IconNetwork,
} from '@tabler/icons-react'

const programs = [
  { icon: IconFlask, href: '/program/riset-inovasi' },
  { icon: IconRocket, href: '/program/implementasi' },
  { icon: IconNetwork, href: '/program/kemitraan' },
  { icon: IconCertificate, href: '/program/pelatihan-sertifikasi' },
]

export default function ProgramHighlights() {
  const t = useTranslations('ProgramHighlights')
  const texts = t.raw('items') as { title: string; desc: string }[]
  return (
    <section style={{ background: 'var(--inopi-ivory)' }} className="py-14">
      <div className="container">
        <div className="text-center mb-10">
          <h2 className="font-display font-bold mb-2" style={{ fontSize: 'clamp(20px,3vw,28px)', color: 'var(--inopi-espresso)' }}>
            {t('title')}
          </h2>
          <p className="font-body text-[14px]" style={{ color: 'var(--inopi-taupe-strong)' }}>
            {t('subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {programs.map((p, i) => {
            const Icon = p.icon
            return (
              <div
                key={p.href}
                className="bg-white rounded-[12px] p-5 border transition-all hover:border-[var(--inopi-teal-strong)] hover:shadow-hover group"
                style={{ borderColor: 'var(--inopi-sand)' }}
              >
                <div
                  className="inline-flex items-center justify-center w-9 h-9 rounded-[8px] mb-3"
                  style={{ background: 'var(--inopi-sand)' }}
                >
                  <Icon size={18} style={{ color: 'var(--inopi-teal-strong)' }} />
                </div>
                <h3 className="font-display font-semibold text-[14px] mb-1.5" style={{ color: 'var(--inopi-espresso)' }}>
                  {texts[i].title}
                </h3>
                <p className="font-body text-[13px] leading-relaxed mb-3" style={{ color: 'var(--inopi-taupe-strong)' }}>
                  {texts[i].desc}
                </p>
                <Link
                  href={p.href}
                  className="font-body text-[13px] transition-colors hover:underline"
                  style={{ color: 'var(--inopi-teal-strong)' }}
                >
                  {t('more')}
                </Link>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
