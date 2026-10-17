import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { getDivision } from '@/lib/constants/programs'
import ProgramKerjaSection from '@/components/sections/ProgramKerjaSection'
import TrainingCatalogSection from '@/components/sections/TrainingCatalogSection'
import SkillsCubeSection from '@/components/sections/SkillsCubeSection'
import { IconCertificate } from '@tabler/icons-react'

export const metadata: Metadata = {
  title: 'Divisi Pelatihan & Sertifikasi',
  description: 'Capacity builder INOPI — meningkatkan kompetensi SDM melalui pelatihan terstruktur, katalog 10 program training, dan metodologi INOPI Skills Cube.',
}

export default async function PelatihanSertifikasiPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'Programs' })
  const division = getDivision('pelatihan-sertifikasi', t)

  return (
    <>
      {/* Hero */}
      <section className="py-14" style={{ background: 'var(--inopi-espresso)' }}>
        <div className="container">
          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-10 h-10 rounded-[10px] flex items-center justify-center"
              style={{ background: 'color-mix(in srgb, var(--inopi-teal-strong) 20%, transparent)' }}
            >
              <IconCertificate size={20} style={{ color: 'var(--inopi-teal)' }} />
            </div>
            <span
              className="text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full"
              style={{ background: 'color-mix(in srgb, var(--inopi-teal-strong) 15%, transparent)', color: 'var(--inopi-teal)' }}
            >
              {division.role} · {division.orientation}
            </span>
          </div>
          <h1
            className="font-display font-bold mb-3 text-white"
            style={{ fontSize: 'clamp(24px,4vw,36px)' }}
          >
            {division.title}
          </h1>
          <p className="font-body text-[14px] max-w-xl" style={{ color: 'var(--inopi-sage-strong)' }}>
            {t('pic', { names: division.pic.join(', ') })}
          </p>
        </div>
      </section>

      {/* Program Kerja Divisi */}
      <ProgramKerjaSection
        semester1={division.semester1}
        semester2={division.semester2}
      />

      {/* Katalog Program Training + Learning Path */}
      <TrainingCatalogSection />

      {/* Metodologi INOPI Skills Cube */}
      <SkillsCubeSection />
    </>
  )
}
