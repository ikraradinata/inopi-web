'use client'

import { useState } from 'react'
import type { ProgramItem } from '@/lib/constants/programs'

interface ProgramKerjaSectionProps {
  semester1: ProgramItem[]
  semester2: ProgramItem[]
}

export default function ProgramKerjaSection({ semester1, semester2 }: ProgramKerjaSectionProps) {
  const [activeSemester, setActiveSemester] = useState<1 | 2>(1)
  const items = activeSemester === 1 ? semester1 : semester2

  return (
    <section className="py-14" style={{ background: '#f7f9fb' }}>
      <div className="container">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <h2 className="font-display font-bold text-[22px]" style={{ color: '#071422' }}>
            Program Kerja
          </h2>
          <div
            className="inline-flex rounded-[10px] p-1"
            style={{ background: '#e0e8ef' }}
          >
            <button
              onClick={() => setActiveSemester(1)}
              className="px-4 py-2 rounded-[8px] text-[13px] font-medium transition-all"
              style={{
                background: activeSemester === 1 ? '#ffffff' : 'transparent',
                color: activeSemester === 1 ? '#071422' : '#4a6070',
                boxShadow: activeSemester === 1 ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
              }}
            >
              Semester 1
            </button>
            <button
              onClick={() => setActiveSemester(2)}
              className="px-4 py-2 rounded-[8px] text-[13px] font-medium transition-all"
              style={{
                background: activeSemester === 2 ? '#ffffff' : 'transparent',
                color: activeSemester === 2 ? '#071422' : '#4a6070',
                boxShadow: activeSemester === 2 ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
              }}
            >
              Semester 2
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((program) => (
            <div
              key={program.no}
              className="bg-white rounded-[12px] p-5 border transition-all hover:border-[#0d9488] hover:shadow-hover"
              style={{ borderColor: '#e0e8ef' }}
            >
              <div className="flex items-start gap-3 mb-3">
                <span
                  className="flex-shrink-0 w-8 h-8 rounded-[8px] flex items-center justify-center font-display font-bold text-[14px] text-white"
                  style={{ background: '#0d9488' }}
                >
                  {program.no}
                </span>
                <h3 className="font-display font-semibold text-[14px] leading-snug" style={{ color: '#071422' }}>
                  {program.name}
                </h3>
              </div>
              <p className="font-body text-[13px] leading-relaxed mb-3" style={{ color: '#4a6070' }}>
                {program.description}
              </p>
              <div
                className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-medium"
                style={{ background: '#e0f7f5', color: '#0b7b8a' }}
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
