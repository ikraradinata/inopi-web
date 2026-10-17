import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import ContactForm from './ContactForm'
import { IconMapPin, IconMail, IconPhone, IconClock } from '@tabler/icons-react'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Meta.contact' })
  return { title: t('title'), description: t('description') }
}

const infoIcons = [IconMapPin, IconMail, IconPhone, IconClock]

export default async function KontakPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'Kontak' })
  const info = t.raw('info') as { label: string; value: string }[]
  return (
    <div className="py-14">
      <div className="container">
        <h1 className="font-display font-bold mb-2" style={{ fontSize: 'clamp(24px,4vw,36px)', color: 'var(--inopi-espresso)' }}>
          {t('title')}
        </h1>
        <p className="font-body text-[14px] mb-10" style={{ color: 'var(--inopi-taupe-strong)' }}>
          {t('intro')}
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Info */}
          <div>
            <div className="space-y-5">
              {info.map((item, i) => {
                const Icon = infoIcons[i]
                return (
                  <div key={item.label} className="flex items-start gap-4">
                    <div className="w-9 h-9 rounded-[8px] flex items-center justify-center flex-shrink-0" style={{ background: 'var(--inopi-sand)' }}>
                      <Icon size={18} style={{ color: 'var(--inopi-teal-strong)' }} />
                    </div>
                    <div>
                      <p className="font-body text-[12px] font-medium mb-0.5" style={{ color: 'var(--inopi-sage-strong)' }}>{item.label}</p>
                      <p className="font-body text-[14px]" style={{ color: 'var(--inopi-espresso)' }}>{item.value}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Form */}
          <ContactForm />
        </div>
      </div>
    </div>
  )
}
