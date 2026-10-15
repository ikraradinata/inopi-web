import type { Metadata } from 'next'
import { DIVISION_PROGRAMS } from '@/lib/constants/programs'
import ProgramKerjaSection from '@/components/sections/ProgramKerjaSection'
import { IconFlask, IconCheck } from '@tabler/icons-react'

export const metadata: Metadata = {
  title: 'Divisi Riset & Inovasi',
  description: 'Think tank asosiasi INOPI — mengembangkan agenda riset, framework, dan publikasi ilmiah untuk inovasi pembelajaran.',
}

export default function RisetInovasiPage() {
  const division = DIVISION_PROGRAMS.find((d) => d.slug === 'riset-inovasi')!

  return (
    <>
      {/* Hero */}
      <section className="py-14" style={{ background: 'var(--inopi-espresso)' }}>
        <div className="container">
          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-10 h-10 rounded-[10px] flex items-center justify-center"
              style={{ background: 'rgba(13,148,136,0.2)' }}
            >
              <IconFlask size={20} style={{ color: 'var(--inopi-teal)' }} />
            </div>
            <span
              className="text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full"
              style={{ background: 'rgba(13,148,136,0.15)', color: 'var(--inopi-teal)' }}
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
            PIC: {division.pic.join(', ')}
          </p>
        </div>
      </section>

      {/* Tugas & Tanggung Jawab */}
      {division.responsibilities && (
        <section className="py-14 bg-white">
          <div className="container max-w-3xl">
            <h2 className="font-display font-bold text-[20px] mb-6" style={{ color: 'var(--inopi-espresso)' }}>
              Tugas & Tanggung Jawab
            </h2>
            <div className="space-y-3">
              {division.responsibilities.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div
                    className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-0.5"
                    style={{ background: 'var(--inopi-sand)' }}
                  >
                    <IconCheck size={12} style={{ color: 'var(--inopi-teal-strong)' }} />
                  </div>
                  <p className="font-body text-[14px] leading-relaxed" style={{ color: 'var(--inopi-taupe-strong)' }}>
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Program Kerja */}
      <ProgramKerjaSection
        semester1={division.semester1}
        semester2={division.semester2}
      />
    </>
  )
}
