'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import type { ProgramItem } from '@/lib/constants/programs'

interface ProgramKerjaSectionProps {
  semester1: ProgramItem[]
  semester2: ProgramItem[]
}

export default function ProgramKerjaSection({ semester1, semester2 }: ProgramKerjaSectionProps) {
  const t = useTranslations('ProgramKerja')
  const [activeSemester, setActiveSemester] = useState<1 | 2>(1)
  const items = activeSemester === 1 ? semester1 : semester2

  return (
    <section className="py-14" style={{ background: 'var(--inopi-ivory)' }}>
      <div className="container">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <h2 className="font-display font-bold text-[22px]" style={{ color: 'var(--inopi-espresso)' }}>
            {t('title')}
          </h2>
          <div
            className="inline-flex rounded-[10px] p-1"
            style={{ background: 'var(--inopi-sand)' }}
          >
            <button
              onClick={() => setActiveSemester(1)}
              className="px-4 py-2 rounded-[8px] text-[13px] font-medium transition-all"
              style={{
                background: activeSemester === 1 ? 'var(--inopi-ivory)' : 'transparent',
                color: activeSemester === 1 ? 'var(--inopi-espresso)' : 'var(--inopi-taupe-strong)',
                boxShadow: activeSemester === 1 ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
              }}
            >
              {t('semester1')}
            </button>
            <button
              onClick={() => setActiveSemester(2)}
              className="px-4 py-2 rounded-[8px] text-[13px] font-medium transition-all"
              style={{
                background: activeSemester === 2 ? 'var(--inopi-ivory)' : 'transparent',
                color: activeSemester === 2 ? 'var(--inopi-espresso)' : 'var(--inopi-taupe-strong)',
                boxShadow: activeSemester === 2 ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
              }}
            >
              {t('semester2')}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((program) => (
            <div
              key={program.no}
              className="bg-white rounded-[12px] p-5 border transition-all hover:border-[var(--inopi-teal-strong)] hover:shadow-hover"
              style={{ borderColor: 'var(--inopi-sand)' }}
            >
              <div className="flex items-start gap-3 mb-3">
                <span
                  className="flex-shrink-0 w-8 h-8 rounded-[8px] flex items-center justify-center font-display font-bold text-[14px] text-white"
                  style={{ background: 'var(--inopi-teal-strong)' }}
                >
                  {program.no}
                </span>
                <h3 className="font-display font-semibold text-[14px] leading-snug" style={{ color: 'var(--inopi-espresso)' }}>
                  {program.name}
                </h3>
              </div>
              <p className="font-body text-[13px] leading-relaxed mb-3" style={{ color: 'var(--inopi-taupe-strong)' }}>
                {program.description}
              </p>
              <div
                className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-medium"
                style={{ background: 'var(--inopi-sand)', color: 'var(--inopi-teal)' }}
              >
                📋 {program.output}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
