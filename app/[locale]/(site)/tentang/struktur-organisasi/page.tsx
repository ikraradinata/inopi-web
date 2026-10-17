import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import {
  IconShieldCheck,
  IconEye,
  IconBrain,
  IconCrown,
  IconFileText,
  IconCoin,
  IconFlask,
  IconRocket,
  IconNetwork,
  IconCertificate,
} from '@tabler/icons-react'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Meta.organization' })
  return { title: t('title'), description: t('description') }
}

const orgSections = [
  {
    icon: IconShieldCheck,
    members: ['Pony Halim', 'Gogot Suharwoto', 'M. Aditya Warman', 'Bonifasius W. Pudjianto', 'Subchan Gatot', 'Heru Dewanto'],
    accent: 'var(--inopi-espresso)',
  },
  {
    icon: IconEye,
    members: ['Paulina Pannen', 'Tutut Handayani', 'Bambang Yapri'],
    accent: 'var(--inopi-teal)',
  },
  {
    icon: IconBrain,
    members: ['Stephen Ng', 'Tyo Guritno', 'Kun Wardana', 'Ferry Sutanto', 'Jahja'],
    accent: 'var(--inopi-teal-strong)',
  },
]

const pimpinan = [
  { name: 'Meyliana', icon: IconCrown },
  { name: 'Sunardi', icon: IconCrown },
  { name: 'Idha Kristiana', icon: IconFileText },
  { name: 'Ikrar Adinata Arin', icon: IconCoin },
]

const divisi = [
  {
    icon: IconFlask,
    pic: 'Bobi Kurniawan, Nunik Afriliana',
    href: '/program/riset-inovasi',
  },
  {
    icon: IconRocket,
    pic: 'Nita Felia Pambudi, Yasser Muhammad Syaiful',
    href: '/program/implementasi',
  },
  {
    icon: IconNetwork,
    pic: 'Victor Osman, Siti Elda Hiererra',
    href: '/program/kemitraan',
  },
  {
    icon: IconCertificate,
    pic: 'Andy Febrico Bintoro, Daniel Adhinugraha W.',
    href: '/program/pelatihan-sertifikasi',
  },
]

export default async function StrukturOrganisasiPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'StrukturOrg' })
  const councils = t.raw('councils') as { title: string; description: string }[]
  const leadership = t.raw('leadership') as string[]
  const divisions = t.raw('divisions') as { title: string; role: string; orientation: string }[]
  return (
    <div className="py-14">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-12">
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-semibold uppercase tracking-wider mb-4"
            style={{ background: 'var(--inopi-sand)', color: 'var(--inopi-teal)' }}
          >
            {t('badge')}
          </div>
          <h1 className="font-display font-bold mb-3" style={{ fontSize: 'clamp(24px,4vw,36px)', color: 'var(--inopi-espresso)' }}>
            {t('title')}
          </h1>
          <p className="font-body text-[14px] max-w-xl mx-auto" style={{ color: 'var(--inopi-taupe-strong)' }}>
            {t('intro')}
          </p>
        </div>

        {/* Dewan-Dewan */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {orgSections.map((section, i) => {
            const Icon = section.icon
            return (
              <div
                key={councils[i].title}
                className="rounded-[12px] p-5 border bg-white"
                style={{ borderColor: 'var(--inopi-sand)' }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <div
                    className="w-8 h-8 rounded-[8px] flex items-center justify-center"
                    style={{ background: 'var(--inopi-sand)' }}
                  >
                    <Icon size={16} style={{ color: section.accent }} />
                  </div>
                  <h2 className="font-display font-bold text-[15px]" style={{ color: 'var(--inopi-espresso)' }}>
                    {councils[i].title}
                  </h2>
                </div>
                <p className="font-body text-[12px] leading-relaxed mb-4" style={{ color: 'var(--inopi-taupe-strong)' }}>
                  {councils[i].description}
                </p>
                <div className="space-y-1.5">
                  {section.members.map((member) => (
                    <div key={member} className="flex items-center gap-2">
                      <div
                        className="w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-bold text-white flex-shrink-0"
                        style={{ background: `linear-gradient(135deg, ${section.accent}, var(--inopi-espresso))` }}
                      >
                        {member.split(' ').slice(0, 2).map((n) => n[0]).join('').toUpperCase()}
                      </div>
                      <span className="font-body text-[13px]" style={{ color: 'var(--inopi-espresso)' }}>
                        {member}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        {/* Pimpinan */}
        <div className="mb-10">
          <h2 className="font-display font-bold text-[18px] mb-5 text-center" style={{ color: 'var(--inopi-espresso)' }}>
            {t('leadershipTitle')}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {pimpinan.map((p, i) => {
              return (
                <div
                  key={leadership[i]}
                  className="rounded-[12px] p-5 text-center border bg-white"
                  style={{ borderColor: 'var(--inopi-sand)' }}
                >
                  <div
                    className="w-14 h-14 rounded-full mx-auto mb-3 flex items-center justify-center text-white font-display font-bold text-[16px]"
                    style={{ background: 'linear-gradient(135deg, var(--inopi-teal), var(--inopi-espresso))' }}
                  >
                    {p.name.split(' ').slice(0, 2).map((n) => n[0]).join('').toUpperCase()}
                  </div>
                  <p className="font-body font-semibold text-[13px]" style={{ color: 'var(--inopi-espresso)' }}>
                    {p.name}
                  </p>
                  <p className="font-body text-[12px] mt-0.5" style={{ color: 'var(--inopi-teal-strong)' }}>
                    {leadership[i]}
                  </p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Divisi */}
        <div>
          <h2 className="font-display font-bold text-[18px] mb-5 text-center" style={{ color: 'var(--inopi-espresso)' }}>
            {t('divisionsTitle')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {divisi.map((d, i) => {
              const Icon = d.icon
              return (
                <a
                  key={divisions[i].title}
                  href={d.href}
                  className="rounded-[12px] p-5 border bg-white transition-all hover:border-[var(--inopi-teal-strong)] hover:shadow-hover block"
                  style={{ borderColor: 'var(--inopi-sand)' }}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div
                      className="w-9 h-9 rounded-[8px] flex items-center justify-center"
                      style={{ background: 'var(--inopi-sand)' }}
                    >
                      <Icon size={18} style={{ color: 'var(--inopi-teal-strong)' }} />
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-[14px]" style={{ color: 'var(--inopi-espresso)' }}>
                        {divisions[i].title}
                      </h3>
                      <span className="font-body text-[11px]" style={{ color: 'var(--inopi-sage-strong)' }}>
                        {divisions[i].role} · {divisions[i].orientation}
                      </span>
                    </div>
                  </div>
                  <p className="font-body text-[12px]" style={{ color: 'var(--inopi-taupe-strong)' }}>
                    {t('pic', { names: d.pic })}
                  </p>
                  <span className="font-body text-[12px] mt-2 block" style={{ color: 'var(--inopi-teal-strong)' }}>
                    {t('viewProgram')}
                  </span>
                </a>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
