'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import type { TrainingHorizon, TrainingProgram } from '@/lib/constants/training'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { IconSparkles } from '@tabler/icons-react'

const HORIZONS: TrainingHorizon[] = ['short', 'medium', 'long']

function priorityBadgeStyle(priority: number) {
  if (priority === 1) return { background: 'var(--inopi-sand)', color: 'var(--inopi-teal)' }
  if (priority === 2) return { background: 'var(--inopi-sand)', color: 'var(--inopi-taupe-strong)' }
  return { background: 'var(--inopi-ivory)', color: 'var(--inopi-sage-strong)' }
}

export default function TrainingCatalogSection() {
  const t = useTranslations('Training')
  const [activeHorizon, setActiveHorizon] = useState<TrainingHorizon>('short')

  const TRAINING_PROGRAMS = t.raw('programs') as TrainingProgram[]
  const HORIZON_LABELS = t.raw('horizons') as Record<TrainingHorizon, { label: string; range: string }>
  const PLACEMENT_MATRIX = t.raw('placementMatrix') as {
    proficiency: string
    proficiencyDesc: string
    cells: { grade: string; codes: string[] }[]
  }[]
  const INDUSTRY_USE_CASES = t.raw('industryUseCases') as { industry: string; priority: number; useCase: string; expert: string }[]
  const LEARNING_PATH = t.raw('learningPath') as { order: number; level: string; program: string; func: string }[]
  const RATIONALE = t.raw('rationale') as { points: { title: string; desc: string }[]; conclusion: string }

  return (
    <>
      {/* Rationale */}
      <section className="py-14 bg-white">
        <div className="container max-w-4xl">
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-semibold uppercase tracking-wider mb-4"
            style={{ background: 'var(--inopi-sand)', color: 'var(--inopi-teal)' }}
          >
            <IconSparkles size={13} /> {t('ui.badge')}
          </div>
          <h2 className="font-display font-bold text-[22px] mb-3" style={{ color: 'var(--inopi-espresso)' }}>
            {t('ui.title')}
          </h2>
          <p className="font-body text-[14px] leading-relaxed mb-8" style={{ color: 'var(--inopi-taupe-strong)' }}>
            {t.rich('ui.intro', { b: (chunks) => <strong>{chunks}</strong> })}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {RATIONALE.points.map((p) => (
              <div key={p.title} className="rounded-[12px] p-5 border" style={{ borderColor: 'var(--inopi-sand)' }}>
                <h3 className="font-display font-semibold text-[14px] mb-2" style={{ color: 'var(--inopi-espresso)' }}>
                  {p.title}
                </h3>
                <p className="font-body text-[13px] leading-relaxed" style={{ color: 'var(--inopi-taupe-strong)' }}>
                  {p.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="rounded-[12px] p-5" style={{ background: 'var(--inopi-espresso)' }}>
            <p className="font-body text-[13px] leading-relaxed" style={{ color: 'var(--inopi-sage-strong)' }}>
              <span className="font-display font-semibold text-white">{t('ui.conclusionLabel')}</span>
              {RATIONALE.conclusion}
            </p>
          </div>
        </div>
      </section>

      {/* Placement matrix */}
      <section className="py-14" style={{ background: 'var(--inopi-ivory)' }}>
        <div className="container max-w-4xl">
          <h2 className="font-display font-bold text-[20px] mb-2" style={{ color: 'var(--inopi-espresso)' }}>
            {t('ui.placementTitle')}
          </h2>
          <p className="font-body text-[13px] mb-6" style={{ color: 'var(--inopi-taupe-strong)' }}>
            {t('ui.placementIntro')}
          </p>
          <div className="overflow-x-auto rounded-[12px] border bg-white" style={{ borderColor: 'var(--inopi-sand)' }}>
            <table className="w-full border-collapse min-w-[560px]">
              <thead>
                <tr>
                  <th
                    className="text-left font-body text-[11px] font-semibold uppercase tracking-wide p-3 border-b"
                    style={{ color: 'var(--inopi-sage-strong)', borderColor: 'var(--inopi-sand)' }}
                  >
                    {t('ui.placementCorner')}
                  </th>
                  {(t.raw('ui.grades') as string[]).map((g) => (
                    <th
                      key={g}
                      className="text-left font-body text-[11px] font-semibold uppercase tracking-wide p-3 border-b"
                      style={{ color: 'var(--inopi-sage-strong)', borderColor: 'var(--inopi-sand)' }}
                    >
                      {g}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {PLACEMENT_MATRIX.map((row) => (
                  <tr key={row.proficiency}>
                    <td className="p-3 border-b align-top" style={{ borderColor: 'var(--inopi-sand)' }}>
                      <span className="font-display font-semibold text-[13px] block" style={{ color: 'var(--inopi-espresso)' }}>
                        {row.proficiency}
                      </span>
                      <span className="font-body text-[11px]" style={{ color: 'var(--inopi-sage-strong)' }}>
                        {row.proficiencyDesc}
                      </span>
                    </td>
                    {row.cells.map((cell) => (
                      <td key={cell.grade} className="p-3 border-b align-top" style={{ borderColor: 'var(--inopi-sand)' }}>
                        <div className="flex flex-col gap-1">
                          {cell.codes.map((c) => (
                            <span
                              key={c}
                              className="inline-flex w-fit items-center px-2 py-0.5 rounded-full text-[11px] font-medium"
                              style={{ background: 'var(--inopi-sand)', color: 'var(--inopi-teal)' }}
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
          <h2 className="font-display font-bold text-[20px] mb-6" style={{ color: 'var(--inopi-espresso)' }}>
            {t('ui.catalogTitle')}
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
                      background: active ? 'var(--inopi-espresso)' : 'var(--inopi-ivory)',
                      color: active ? 'var(--inopi-ivory)' : 'var(--inopi-taupe-strong)',
                      borderColor: active ? 'var(--inopi-espresso)' : 'var(--inopi-sand)',
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
                      style={{ borderColor: 'var(--inopi-sand)' }}
                    >
                      <AccordionTrigger className="!rounded-none px-5 py-4 hover:no-underline">
                        <div className="flex flex-col items-start gap-1.5 text-left w-full pr-4">
                          <div className="flex flex-wrap items-center gap-2">
                            <span
                              className="font-display font-bold text-[11px] px-2 py-0.5 rounded-full"
                              style={{ background: 'var(--inopi-espresso)', color: 'var(--inopi-ivory)' }}
                            >
                              {program.code}
                            </span>
                            {program.flagship && (
                              <span
                                className="font-body text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full"
                                style={{ background: 'var(--inopi-sand)', color: 'var(--inopi-teal)' }}
                              >
                                {t('ui.flagship')}
                              </span>
                            )}
                            <span className="font-display font-semibold text-[14px]" style={{ color: 'var(--inopi-espresso)' }}>
                              {program.title}
                            </span>
                          </div>
                          <p className="font-body text-[12px] leading-snug" style={{ color: 'var(--inopi-taupe-strong)' }}>
                            {program.tagline}
                          </p>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-5">
                        <div className="pb-2 border-t pt-4" style={{ borderColor: 'var(--inopi-sand)' }}>
                          <p className="font-body text-[13px] leading-relaxed mb-4" style={{ color: 'var(--inopi-taupe-strong)' }}>
                            {program.description}
                          </p>

                          {/* Spec grid */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
                            {[
                              { label: t('ui.spec.proficiency'), value: program.spec.proficiency },
                              { label: t('ui.spec.jobGrade'), value: program.spec.jobGrade },
                              { label: t('ui.spec.skillComposition'), value: program.spec.skillComposition },
                              { label: t('ui.spec.format'), value: program.spec.format },
                              ...(program.spec.capacity ? [{ label: t('ui.spec.capacity'), value: program.spec.capacity }] : []),
                              { label: t('ui.spec.price'), value: program.spec.price },
                            ].map((s) => (
                              <div key={s.label} className="rounded-[10px] p-3" style={{ background: 'var(--inopi-ivory)' }}>
                                <span className="font-body text-[10px] font-semibold uppercase tracking-wide block mb-0.5" style={{ color: 'var(--inopi-sage-strong)' }}>
                                  {s.label}
                                </span>
                                <span className="font-body text-[12px]" style={{ color: 'var(--inopi-espresso)' }}>
                                  {s.value}
                                </span>
                              </div>
                            ))}
                          </div>

                          {/* Module groups */}
                          <div className="space-y-4 mb-5">
                            {program.moduleGroups.map((group) => (
                              <div key={group.heading}>
                                <h4 className="font-display font-semibold text-[13px] mb-2" style={{ color: 'var(--inopi-espresso)' }}>
                                  {group.heading}
                                </h4>
                                <div className="overflow-x-auto rounded-[8px] border" style={{ borderColor: 'var(--inopi-sand)' }}>
                                  <table className="w-full border-collapse min-w-[420px]">
                                    <thead>
                                      <tr>
                                        <th className="text-left font-body text-[10px] font-semibold uppercase tracking-wide p-2.5 border-b" style={{ color: 'var(--inopi-sage-strong)', borderColor: 'var(--inopi-sand)', background: 'var(--inopi-ivory)' }}>
                                          {t('ui.module')}
                                        </th>
                                        <th className="text-left font-body text-[10px] font-semibold uppercase tracking-wide p-2.5 border-b w-24" style={{ color: 'var(--inopi-sage-strong)', borderColor: 'var(--inopi-sand)', background: 'var(--inopi-ivory)' }}>
                                          {t('ui.duration')}
                                        </th>
                                        {group.metaLabel && (
                                          <th className="text-left font-body text-[10px] font-semibold uppercase tracking-wide p-2.5 border-b" style={{ color: 'var(--inopi-sage-strong)', borderColor: 'var(--inopi-sand)', background: 'var(--inopi-ivory)' }}>
                                            {group.metaLabel}
                                          </th>
                                        )}
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {group.rows.map((row, i) => (
                                        <tr key={i}>
                                          <td className="p-2.5 border-b font-body text-[12px]" style={{ color: 'var(--inopi-espresso)', borderColor: 'var(--inopi-sand)' }}>
                                            {row.no !== undefined && <span className="font-semibold mr-1.5" style={{ color: 'var(--inopi-teal-strong)' }}>{row.no}.</span>}
                                            {row.name}
                                          </td>
                                          <td className="p-2.5 border-b font-body text-[12px] whitespace-nowrap" style={{ color: 'var(--inopi-taupe-strong)', borderColor: 'var(--inopi-sand)' }}>
                                            {row.duration}
                                          </td>
                                          {group.metaLabel && (
                                            <td className="p-2.5 border-b font-body text-[12px]" style={{ color: 'var(--inopi-taupe-strong)', borderColor: 'var(--inopi-sand)' }}>
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

                          <p className="font-body text-[12px] font-medium mb-4" style={{ color: 'var(--inopi-teal)' }}>
                            {program.totalLabel}
                          </p>

                          {/* Certification schemes (P8) */}
                          {program.certificationSchemes && (
                            <div className="mb-5">
                              <h4 className="font-display font-semibold text-[13px] mb-2" style={{ color: 'var(--inopi-espresso)' }}>
                                {t('ui.certTitle')}
                              </h4>
                              <div className="overflow-x-auto rounded-[8px] border" style={{ borderColor: 'var(--inopi-sand)' }}>
                                <table className="w-full border-collapse min-w-[480px]">
                                  <thead>
                                    <tr>
                                      {(t.raw('ui.certHeaders') as string[]).map((h2) => (
                                        <th key={h2} className="text-left font-body text-[10px] font-semibold uppercase tracking-wide p-2.5 border-b" style={{ color: 'var(--inopi-sage-strong)', borderColor: 'var(--inopi-sand)', background: 'var(--inopi-ivory)' }}>
                                          {h2}
                                        </th>
                                      ))}
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {program.certificationSchemes.map((s) => (
                                      <tr key={s.name}>
                                        <td className="p-2.5 border-b font-body text-[12px] font-medium" style={{ color: 'var(--inopi-espresso)', borderColor: 'var(--inopi-sand)' }}>{s.name}</td>
                                        <td className="p-2.5 border-b font-body text-[12px]" style={{ color: 'var(--inopi-taupe-strong)', borderColor: 'var(--inopi-sand)' }}>{s.linkedProgram}</td>
                                        <td className="p-2.5 border-b font-body text-[12px]" style={{ color: 'var(--inopi-taupe-strong)', borderColor: 'var(--inopi-sand)' }}>{s.assessmentStructure}</td>
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
                              <span className="font-body text-[11px] font-semibold uppercase tracking-wide block mb-2" style={{ color: 'var(--inopi-sage-strong)' }}>
                                {t('ui.customization')}
                              </span>
                              <div className="flex flex-wrap gap-1.5">
                                {program.customization.map((c) => (
                                  <span key={c} className="text-[11px] px-2.5 py-1 rounded-full font-medium" style={{ background: 'var(--inopi-sand)', color: 'var(--inopi-taupe-strong)' }}>
                                    {c}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <span className="font-body text-[11px] font-semibold uppercase tracking-wide block mb-1" style={{ color: 'var(--inopi-sage-strong)' }}>
                                {t('ui.trainer')}
                              </span>
                              <p className="font-body text-[12px] leading-relaxed" style={{ color: 'var(--inopi-taupe-strong)' }}>
                                {program.trainers.join(', ')}
                              </p>
                            </div>
                            {program.targetMarket && (
                              <div>
                                <span className="font-body text-[11px] font-semibold uppercase tracking-wide block mb-1" style={{ color: 'var(--inopi-sage-strong)' }}>
                                  {t('ui.targetMarket')}
                                </span>
                                <p className="font-body text-[12px] leading-relaxed" style={{ color: 'var(--inopi-taupe-strong)' }}>
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
      <section className="py-14" style={{ background: 'var(--inopi-ivory)' }}>
        <div className="container max-w-4xl">
          <h2 className="font-display font-bold text-[20px] mb-2" style={{ color: 'var(--inopi-espresso)' }}>
            {t('ui.industryTitle')}
          </h2>
          <p className="font-body text-[13px] mb-6" style={{ color: 'var(--inopi-taupe-strong)' }}>
            {t('ui.industryIntro')}
          </p>
          <div className="overflow-x-auto rounded-[12px] border bg-white" style={{ borderColor: 'var(--inopi-sand)' }}>
            <table className="w-full border-collapse min-w-[720px]">
              <thead>
                <tr>
                  {(t.raw('ui.industryHeaders') as string[]).map((h) => (
                    <th key={h} className="text-left font-body text-[11px] font-semibold uppercase tracking-wide p-3 border-b" style={{ color: 'var(--inopi-sage-strong)', borderColor: 'var(--inopi-sand)' }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {INDUSTRY_USE_CASES.map((row) => (
                  <tr key={row.industry}>
                    <td className="p-3 border-b font-body text-[12px] font-medium" style={{ color: 'var(--inopi-espresso)', borderColor: 'var(--inopi-sand)' }}>
                      {row.industry}
                    </td>
                    <td className="p-3 border-b" style={{ borderColor: 'var(--inopi-sand)' }}>
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium" style={priorityBadgeStyle(row.priority)}>
                        {t('ui.priority', { n: row.priority })}
                      </span>
                    </td>
                    <td className="p-3 border-b font-body text-[12px]" style={{ color: 'var(--inopi-taupe-strong)', borderColor: 'var(--inopi-sand)' }}>
                      {row.useCase}
                    </td>
                    <td className="p-3 border-b font-body text-[12px]" style={{ color: 'var(--inopi-taupe-strong)', borderColor: 'var(--inopi-sand)' }}>
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
          <h2 className="font-display font-bold text-[20px] mb-2" style={{ color: 'var(--inopi-espresso)' }}>
            {t('ui.pathTitle')}
          </h2>
          <p className="font-body text-[13px] mb-8" style={{ color: 'var(--inopi-taupe-strong)' }}>
            {t('ui.pathIntro')}
          </p>
          <div className="relative">
            {LEARNING_PATH.map((step, i) => (
              <div key={step.order} className="flex gap-4 pb-7 relative">
                {i < LEARNING_PATH.length - 1 && (
                  <div className="absolute left-[15px] top-8 bottom-0 w-0.5" style={{ borderLeft: '2px dashed var(--inopi-sand)' }} />
                )}
                <div
                  className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-display font-bold text-[13px] text-white mt-0.5"
                  style={{ background: 'var(--inopi-teal-strong)' }}
                >
                  {step.order}
                </div>
                <div>
                  <span className="font-body text-[11px] font-semibold uppercase tracking-wide" style={{ color: 'var(--inopi-teal)' }}>
                    {step.level}
                  </span>
                  <h3 className="font-display font-semibold text-[14px] mb-0.5" style={{ color: 'var(--inopi-espresso)' }}>
                    {step.program}
                  </h3>
                  <p className="font-body text-[13px] leading-relaxed" style={{ color: 'var(--inopi-taupe-strong)' }}>
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
