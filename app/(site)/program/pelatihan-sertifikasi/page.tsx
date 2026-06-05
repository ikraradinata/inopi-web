import type { Metadata } from 'next'
import { DIVISION_PROGRAMS } from '@/lib/constants/programs'
import ProgramKerjaSection from '@/components/sections/ProgramKerjaSection'
import { IconCertificate } from '@tabler/icons-react'

export const metadata: Metadata = {
  title: 'Divisi Pelatihan & Sertifikasi',
  description: 'Capacity builder INOPI — meningkatkan kompetensi SDM melalui pelatihan terstruktur dan sertifikasi nasional.',
}

export default function PelatihanSertifikasiPage() {
  const division = DIVISION_PROGRAMS.find((d) => d.slug === 'pelatihan-sertifikasi')!

  return (
    <>
      {/* Hero */}
      <section className="py-14" style={{ background: '#071422' }}>
        <div className="container">
          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-10 h-10 rounded-[10px] flex items-center justify-center"
              style={{ background: 'rgba(13,148,136,0.2)' }}
            >
              <IconCertificate size={20} style={{ color: '#5dd4c8' }} />
            </div>
            <span
              className="text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full"
              style={{ background: 'rgba(13,148,136,0.15)', color: '#5dd4c8' }}
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
          <p className="font-body text-[14px] max-w-xl" style={{ color: '#8fa5b5' }}>
            PIC: {division.pic.join(', ')}
          </p>
        </div>
      </section>

      {/* Program Kerja */}
      <ProgramKerjaSection
        semester1={division.semester1}
        semester2={division.semester2}
      />
    </>
  )
}
