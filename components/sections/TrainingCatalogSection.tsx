'use client'

import { useState } from 'react'
import {
  TRAINING_PROGRAMS,
  HORIZON_LABELS,
  PLACEMENT_MATRIX,
  INDUSTRY_USE_CASES,
  LEARNING_PATH,
  type TrainingHorizon,
} from '@/lib/constants/training'
import { RATIONALE } from '@/lib/constants/skillsCube'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { IconSparkles } from '@tabler/icons-react'

const HORIZONS: TrainingHorizon[] = ['short', 'medium', 'long']

function priorityBadgeStyle(priority: number) {
  if (priority === 1) return { background: '#e0f7f5', color: '#0b7b8a' }
  if (priority === 2) return { background: '#eef2f7', color: '#4a6070' }
  return { background: '#f7f9fb', color: '#8fa5b5' }
}

export default function TrainingCatalogSection() {
  const [activeHorizon, setActiveHorizon] = useState<TrainingHorizon>('short')

  return (
    <>
      {/* Rationale */}
      <section className="py-14 bg-white">
        <div className="container max-w-4xl">
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-semibold uppercase tracking-wider mb-4"
            style={{ background: '#e0f7f5', color: '#0b7b8a' }}
          >
            <IconSparkles size={13} /> Produk Unggulan Divisi
          </div>
          <h2 className="font-display font-bold text-[22px] mb-3" style={{ color: '#071422' }}>
            Training: Langkah Nyata Pertama INOPI
          </h2>
          <p className="font-body text-[14px] leading-relaxed mb-8" style={{ color: '#4a6070' }}>
            Blueprint kurikulum & materi pelatihan INOPI untuk peningkatan produktivitas kerja dan employability —{' '}
            <strong>10 program</strong> dalam <strong>3 horizon waktu peluncuran</strong>, dipetakan pada matriks
            Proficiency Level × Job Grade, mencakup 10 hard skills dan 12 soft skills, dengan 12 industri sebagai
            sumber studi kasus.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {RATIONALE.points.map((p) => (
              <div key={p.title} className="rounded-[12px] p-5 border" style={{ borderColor: '#e0e8ef' }}>
                <h3 className="font-display font-semibold text-[14px] mb-2" style={{ color: '#071422' }}>
                  {p.title}
                </h3>
                <p className="font-body text-[13px] leading-relaxed" style={{ color: '#4a6070' }}>
                  {p.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="rounded-[12px] p-5" style={{ background: '#071422' }}>
            <p className="font-body text-[13px] leading-relaxed" style={{ color: '#8fa5b5' }}>
              <span className="font-display font-semibold text-white">Kesimpulan: </span>
              {RATIONALE.conclusion}
            </p>
          </div>
        </div>
      </section>

      {/* Placement matrix */}
      <section className="py-14" style={{ background: '#f7f9fb' }}>
        <div className="container max-w-4xl">
          <h2 className="font-display font-bold text-[20px] mb-2" style={{ color: '#071422' }}>
            Program Mana yang Cocok untuk Saya?
          </h2>
          <p className="font-body text-[13px] mb-6" style={{ color: '#4a6070' }}>
            Matriks penempatan program berdasarkan Proficiency Level × Job Grade.
          </p>
          <div className="overflow-x-auto rounded-[12px] border bg-white" style={{ borderColor: '#e0e8ef' }}>
            <table className="w-full border-collapse min-w-[560px]">
              <thead>
                <tr>
                  <th
                    className="text-left font-body text-[11px] font-semibold uppercase tracking-wide p-3 border-b"
                    style={{ color: '#8fa5b5', borderColor: '#e0e8ef' }}
                  >
                    Proficiency ↓ / Job Grade →
                  </th>
                  {['Staf', 'Manager', 'Executive'].map((g) => (
                    <th
                      key={g}
                      className="text-left font-body text-[11px] font-semibold uppercase tracking-wide p-3 border-b"
                      style={{ color: '#8fa5b5', borderColor: '#e0e8ef' }}
                    >
                      {g}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {PLACEMENT_MATRIX.map((row) => (
                  <tr key={row.proficiency}>
                    <td className="p-3 border-b align-top" style={{ borderColor: '#e0e8ef' }}>
                      <span className="font-display font-semibold text-[13px] block" style={{ color: '#071422' }}>
                        {row.proficiency}
                      </span>
                      <span className="font-body text-[11px]" style={{ color: '#8fa5b5' }}>
                        {row.proficiencyDesc}
                      </span>
                    </td>
                    {row.cells.map((cell) => (
                      <td key={cell.grade} className="p-3 border-b align-top" style={{ borderColor: '#e0e8ef' }}>
                        <div className="flex flex-col gap-1">
                          {cell.codes.map((c) => (
                            <span
                              key={c}
                              className="inline-flex w-fit items-center px-2 py-0.5 rounded-full text-[11px] font-medium"
                              style={{ background: '#e0f7f5', color: '#0b7b8a' }}
                            >
                              {c}
                            </span>
                          ))}
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Catalog */}
      <section className="py-14 bg-white">
        <div className="container max-w-4xl">
          <h2 className="font-display font-bold text-[20px] mb-6" style={{ color: '#071422' }}>
            Katalog 10 Program Training
          </h2>

          <Tabs
            value={activeHorizon}
            onValueChange={(v) => setActiveHorizon(v as TrainingHorizon)}
            className="flex flex-col gap-6"
          >
            <TabsList className="!h-auto !w-full !bg-transparent !p-0 flex flex-wrap gap-2 justify-start">
              {HORIZONS.map((h) => {
                const count = TRAINING_PROGRAMS.filter((p) => p.horizon === h).length
                const active = activeHorizon === h
                return (
                  <TabsTrigger
                    key={h}
                    value={h}
                    className="!h-auto !flex-none !rounded-[10px] !px-4 !py-2 !text-[13px] !font-medium !border !shadow-none"
                    style={{
                      background: active ? '#083344' : '#f7f9fb',
                      color: active ? '#ffffff' : '#4a6070',
                      borderColor: active ? '#083344' : '#e0e8ef',
                    }}
                  >
                    {HORIZON_LABELS[h].label} · {HORIZON_LABELS[h].range} ({count})
                  </TabsTrigger>
                )
              })}
            </TabsList>

            {HORIZONS.map((h) => (
              <TabsContent key={h} value={h}>
                <Accordion className="space-y-3">
                  {TRAINING_PROGRAMS.filter((p) => p.horizon === h).map((program) => (
                    <AccordionItem
                      key={program.code}
                      value={program.code}
                      className="!border-0 rounded-[12px] border bg-white overflow-hidden"
                      style={{ borderColor: '#e0e8ef' }}
                    >
                      <AccordionTrigger className="!rounded-none px-5 py-4 hover:no-underline">
                        <div className="flex flex-col items-start gap-1.5 text-left w-full pr-4">
                          <div className="flex flex-wrap items-center gap-2">
                            <span
                              className="font-display font-bold text-[11px] px-2 py-0.5 rounded-full"
                              style={{ background: '#083344', color: '#ffffff' }}
                            >
                              {program.code}
                            </span>
                            {program.flagship && (
                              <span
                                className="font-body text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full"
                                style={{ background: '#e0f7f5', color: '#0b7b8a' }}
                              >
                                ⭐ Flagship
                              </span>
                            )}
                            <span className="font-display font-semibold text-[14px]" style={{ color: '#071422' }}>
                              {program.title}
                            </span>
                          </div>
                          <p className="font-body text-[12px] leading-snug" style={{ color: '#4a6070' }}>
                            {program.tagline}
                          </p>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-5">
                        <div className="pb-2 border-t pt-4" style={{ borderColor: '#e0e8ef' }}>
                          <p className="font-body text-[13px] leading-relaxed mb-4" style={{ color: '#4a6070' }}>
                            {program.description}
                          </p>

                          {/* Spec grid */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
                            {[
                              { label: 'Proficiency', value: program.spec.proficiency },
                              { label: 'Job Grade', value: program.spec.jobGrade },
                              { label: 'Komposisi Skill', value: program.spec.skillComposition },
                              { label: 'Format', value: program.spec.format },
                              ...(program.spec.capacity ? [{ label: 'Kapasitas', value: program.spec.capacity }] : []),
                              { label: 'Harga', value: program.spec.price },
                            ].map((s) => (
                              <div key={s.label} className="rounded-[10px] p-3" style={{ background: '#f7f9fb' }}>
                                <span className="font-body text-[10px] font-semibold uppercase tracking-wide block mb-0.5" style={{ color: '#8fa5b5' }}>
                                  {s.label}
                                </span>
                                <span className="font-body text-[12px]" style={{ color: '#0d1e2e' }}>
                                  {s.value}
                                </span>
                              </div>
                            ))}
                          </div>

                          {/* Module groups */}
                          <div className="space-y-4 mb-5">
                            {program.moduleGroups.map((group) => (
                              <div key={group.heading}>
                                <h4 className="font-display font-semibold text-[13px] mb-2" style={{ color: '#071422' }}>
                                  {group.heading}
                                </h4>
                                <div className="overflow-x-auto rounded-[8px] border" style={{ borderColor: '#e0e8ef' }}>
                                  <table className="w-full border-collapse min-w-[420px]">
                                    <thead>
                                      <tr>
                                        <th className="text-left font-body text-[10px] font-semibold uppercase tracking-wide p-2.5 border-b" style={{ color: '#8fa5b5', borderColor: '#e0e8ef', background: '#f7f9fb' }}>
                                          Modul
                                        </th>
                                        <th className="text-left font-body text-[10px] font-semibold uppercase tracking-wide p-2.5 border-b w-24" style={{ color: '#8fa5b5', borderColor: '#e0e8ef', background: '#f7f9fb' }}>
                                          Durasi
                                        </th>
                                        {group.metaLabel && (
                                          <th className="text-left font-body text-[10px] font-semibold uppercase tracking-wide p-2.5 border-b" style={{ color: '#8fa5b5', borderColor: '#e0e8ef', background: '#f7f9fb' }}>
                                            {group.metaLabel}
                                          </th>
                                        )}
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {group.rows.map((row, i) => (
                                        <tr key={i}>
                                          <td className="p-2.5 border-b font-body text-[12px]" style={{ color: '#0d1e2e', borderColor: '#e0e8ef' }}>
                                            {row.no !== undefined && <span className="font-semibold mr-1.5" style={{ color: '#0d9488' }}>{row.no}.</span>}
                                            {row.name}
                                          </td>
                                          <td className="p-2.5 border-b font-body text-[12px] whitespace-nowrap" style={{ color: '#4a6070', borderColor: '#e0e8ef' }}>
                                            {row.duration}
                                          </td>
                                          {group.metaLabel && (
                                            <td className="p-2.5 border-b font-body text-[12px]" style={{ color: '#4a6070', borderColor: '#e0e8ef' }}>
                                              {row.meta ?? '—'}
                                            </td>
                                          )}
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            ))}
                          </div>

                          <p className="font-body text-[12px] font-medium mb-4" style={{ color: '#0b7b8a' }}>
                            {program.totalLabel}
                          </p>

                          {/* Certification schemes (P8) */}
                          {program.certificationSchemes && (
                            <div className="mb-5">
                              <h4 className="font-display font-semibold text-[13px] mb-2" style={{ color: '#071422' }}>
                                3 Skema Sertifikasi Awal
                              </h4>
                              <div className="overflow-x-auto rounded-[8px] border" style={{ borderColor: '#e0e8ef' }}>
                                <table className="w-full border-collapse min-w-[480px]">
                                  <thead>
                                    <tr>
                                      {['Skema', 'Terhubung ke Program', 'Struktur Asesmen'].map((h2) => (
                                        <th key={h2} className="text-left font-body text-[10px] font-semibold uppercase tracking-wide p-2.5 border-b" style={{ color: '#8fa5b5', borderColor: '#e0e8ef', background: '#f7f9fb' }}>
                                          {h2}
                                        </th>
                                      ))}
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {program.certificationSchemes.map((s) => (
                                      <tr key={s.name}>
                                        <td className="p-2.5 border-b font-body text-[12px] font-medium" style={{ color: '#0d1e2e', borderColor: '#e0e8ef' }}>{s.name}</td>
                                        <td className="p-2.5 border-b font-body text-[12px]" style={{ color: '#4a6070', borderColor: '#e0e8ef' }}>{s.linkedProgram}</td>
                                        <td className="p-2.5 border-b font-body text-[12px]" style={{ color: '#4a6070', borderColor: '#e0e8ef' }}>{s.assessmentStructure}</td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          )}

                          {/* Customization */}
                          {program.customization && (
                            <div className="mb-4">
                              <span className="font-body text-[11px] font-semibold uppercase tracking-wide block mb-2" style={{ color: '#8fa5b5' }}>
                                Kustomisasi / Varian
                              </span>
                              <div className="flex flex-wrap gap-1.5">
                                {program.customization.map((c) => (
                                  <span key={c} className="text-[11px] px-2.5 py-1 rounded-full font-medium" style={{ background: '#eef2f7', color: '#4a6070' }}>
                                    {c}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <span className="font-body text-[11px] font-semibold uppercase tracking-wide block mb-1" style={{ color: '#8fa5b5' }}>
                                Trainer
                              </span>
                              <p className="font-body text-[12px] leading-relaxed" style={{ color: '#4a6070' }}>
                                {program.trainers.join(', ')}
                              </p>
                            </div>
                            {program.targetMarket && (
                              <div>
                                <span className="font-body text-[11px] font-semibold uppercase tracking-wide block mb-1" style={{ color: '#8fa5b5' }}>
                                  Target Market
                                </span>
                                <p className="font-body text-[12px] leading-relaxed" style={{ color: '#4a6070' }}>
                                  {program.targetMarket}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Industry use case */}
      <section className="py-14" style={{ background: '#f7f9fb' }}>
        <div className="container max-w-4xl">
          <h2 className="font-display font-bold text-[20px] mb-2" style={{ color: '#071422' }}>
            Industri Use Case — Bahan Materi & Kustomisasi
          </h2>
          <p className="font-body text-[13px] mb-6" style={{ color: '#4a6070' }}>
            12 industri sebagai sumber studi kasus nyata untuk kustomisasi materi training.
          </p>
          <div className="overflow-x-auto rounded-[12px] border bg-white" style={{ borderColor: '#e0e8ef' }}>
            <table className="w-full border-collapse min-w-[720px]">
              <thead>
                <tr>
                  {['Industri', 'Prioritas', 'Use Case Materi', 'Expert Terkait'].map((h) => (
                    <th key={h} className="text-left font-body text-[11px] font-semibold uppercase tracking-wide p-3 border-b" style={{ color: '#8fa5b5', borderColor: '#e0e8ef' }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {INDUSTRY_USE_CASES.map((row) => (
                  <tr key={row.industry}>
                    <td className="p-3 border-b font-body text-[12px] font-medium" style={{ color: '#071422', borderColor: '#e0e8ef' }}>
                      {row.industry}
                    </td>
                    <td className="p-3 border-b" style={{ borderColor: '#e0e8ef' }}>
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium" style={priorityBadgeStyle(row.priority)}>
                        Prioritas {row.priority}
                      </span>
                    </td>
                    <td className="p-3 border-b font-body text-[12px]" style={{ color: '#4a6070', borderColor: '#e0e8ef' }}>
                      {row.useCase}
                    </td>
                    <td className="p-3 border-b font-body text-[12px]" style={{ color: '#4a6070', borderColor: '#e0e8ef' }}>
                      {row.expert}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Learning path */}
      <section className="py-14 bg-white">
        <div className="container max-w-3xl">
          <h2 className="font-display font-bold text-[20px] mb-2" style={{ color: '#071422' }}>
            Learning Path — Jalur Pengembangan Peserta
          </h2>
          <p className="font-body text-[13px] mb-8" style={{ color: '#4a6070' }}>
            Funnel bertahap dari pintu masuk ekosistem hingga menjadi multiplier bagi INOPI.
          </p>
          <div className="relative">
            {LEARNING_PATH.map((step, i) => (
              <div key={step.order} className="flex gap-4 pb-7 relative">
                {i < LEARNING_PATH.length - 1 && (
                  <div className="absolute left-[15px] top-8 bottom-0 w-0.5" style={{ borderLeft: '2px dashed #e0e8ef' }} />
                )}
                <div
                  className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-display font-bold text-[13px] text-white mt-0.5"
                  style={{ background: '#0d9488' }}
                >
                  {step.order}
                </div>
                <div>
                  <span className="font-body text-[11px] font-semibold uppercase tracking-wide" style={{ color: '#0b7b8a' }}>
                    {step.level}
                  </span>
                  <h3 className="font-display font-semibold text-[14px] mb-0.5" style={{ color: '#071422' }}>
                    {step.program}
                  </h3>
                  <p className="font-body text-[13px] leading-relaxed" style={{ color: '#4a6070' }}>
                    {step.func}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
