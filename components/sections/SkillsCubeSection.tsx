import { useTranslations } from 'next-intl'
import { IconCube3dSphere } from '@tabler/icons-react'

type Level = 'high' | 'medium' | 'emerging'

function matrixCellStyle(value: Level) {
  if (value === 'high') return { background: 'var(--inopi-espresso)', color: 'var(--inopi-ivory)' }
  if (value === 'medium') return { background: 'var(--inopi-sand)', color: 'var(--inopi-teal)' }
  return { background: 'var(--inopi-ivory)', color: 'var(--inopi-sage-strong)', border: '1px solid var(--inopi-sand)' }
}

export default function SkillsCubeSection() {
  const t = useTranslations('SkillsCube')
  const SUPPORTING_STATS = t.raw('supportingStats') as { value: string; label: string }[]
  const DIMENSIONS = t.raw('dimensions') as { no: number; name: string; detail: string }[]
  const PROFICIENCY_LEVELS = t.raw('proficiencyLevels') as { level: string; code: string; desc: string }[]
  const JOB_GRADES = t.raw('jobGrades') as { grade: string; code: string; desc: string }[]
  const LAYERS = t.raw('layers') as { code: string; name: string; func: string; components: string[] }[]
  const SKILL_CODES = t.raw('skillCodes') as { hard: { code: string; name: string }[]; soft: { code: string; name: string }[] }
  const CODE_EXAMPLES = t.raw('codeExamples') as { code: string; meaning: string }[]
  const GRADE_LEVEL_READING = t.raw('gradeLevelReading') as { combo: string; label: string }[]
  const INDUSTRY_COLUMNS = t.raw('industryColumns') as string[]
  const HARD_SKILL_INDUSTRY_MATRIX = t.raw('hardSkillIndustryMatrix') as { skill: string; values: Level[] }[]
  const JOB_GRADE_COLUMNS = t.raw('jobGradeColumns') as string[]
  const SOFT_SKILL_GRADE_MATRIX = t.raw('softSkillGradeMatrix') as { skill: string; values: Level[] }[]
  const TOP_HARD_SKILLS = t.raw('topHardSkills') as { rank: number; name: string; desc: string }[]
  const TOP_SOFT_SKILLS = t.raw('topSoftSkills') as { rank: number; name: string; desc: string }[]
  const INDUSTRY_COMBO_RECOMMENDATIONS = t.raw('industryComboRecommendations') as { cluster: string; hardSkill: string; softSkill: string; useCase: string }[]
  const APPLICATION_STEPS = t.raw('applicationSteps') as { no: number; stage: string; activity: string }[]
  const SUCCESS_METRICS = t.raw('successMetrics') as { dimension: string; indicators: string }[]
  return (
    <>
      {/* Intro + stats */}
      <section className="py-14" style={{ background: 'var(--inopi-espresso)' }}>
        <div className="container max-w-4xl">
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-semibold uppercase tracking-wider mb-4"
            style={{ background: 'color-mix(in srgb, var(--inopi-teal-strong) 15%, transparent)', color: 'var(--inopi-teal)' }}
          >
            <IconCube3dSphere size={13} /> {t('ui.badge')}
          </div>
          <h2 className="font-display font-bold mb-3 text-white" style={{ fontSize: 'clamp(20px,3vw,28px)' }}>
            {t('ui.title')}
          </h2>
          <p className="font-body text-[14px] leading-relaxed max-w-2xl mb-10" style={{ color: 'var(--inopi-sage-strong)' }}>
            {t('ui.intro')}
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {SUPPORTING_STATS.map((s) => (
              <div key={s.label}>
                <span className="font-display font-bold text-[26px] leading-none block mb-1.5" style={{ color: 'var(--inopi-teal)' }}>
                  {s.value}
                </span>
                <span className="font-body text-[12px] leading-snug block" style={{ color: 'var(--inopi-sage-strong)' }}>
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4 Dimensions */}
      <section className="py-14 bg-white">
        <div className="container max-w-4xl">
          <h3 className="font-display font-bold text-[18px] mb-6" style={{ color: 'var(--inopi-espresso)' }}>
            {t('ui.dimensionsTitle')}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {DIMENSIONS.map((d) => (
              <div key={d.no} className="rounded-[12px] p-5 border" style={{ borderColor: 'var(--inopi-sand)' }}>
                <span className="font-display font-bold text-[22px] leading-none block mb-2" style={{ color: 'var(--inopi-teal-strong)' }}>
                  {String(d.no).padStart(2, '0')}
                </span>
                <h4 className="font-display font-semibold text-[14px] mb-1" style={{ color: 'var(--inopi-espresso)' }}>
                  {d.name}
                </h4>
                <p className="font-body text-[12px] leading-relaxed" style={{ color: 'var(--inopi-taupe-strong)' }}>
                  {d.detail}
                </p>
              </div>
            ))}
          </div>

          {/* Proficiency & Job Grade detail */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            <div>
              <h4 className="font-display font-semibold text-[14px] mb-3" style={{ color: 'var(--inopi-espresso)' }}>
                {t('ui.proficiency')}
              </h4>
              <div className="space-y-2">
                {PROFICIENCY_LEVELS.map((l) => (
                  <div key={l.code} className="flex items-start gap-3 rounded-[10px] p-3" style={{ background: 'var(--inopi-ivory)' }}>
                    <span className="font-display font-bold text-[11px] px-2 py-0.5 rounded-full flex-shrink-0" style={{ background: 'var(--inopi-espresso)', color: 'var(--inopi-ivory)' }}>
                      {l.code}
                    </span>
                    <div>
                      <span className="font-body text-[13px] font-semibold block" style={{ color: 'var(--inopi-espresso)' }}>{l.level}</span>
                      <span className="font-body text-[12px]" style={{ color: 'var(--inopi-taupe-strong)' }}>{l.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-display font-semibold text-[14px] mb-3" style={{ color: 'var(--inopi-espresso)' }}>
                {t('ui.jobGrade')}
              </h4>
              <div className="space-y-2">
                {JOB_GRADES.map((g) => (
                  <div key={g.code} className="flex items-start gap-3 rounded-[10px] p-3" style={{ background: 'var(--inopi-ivory)' }}>
                    <span className="font-display font-bold text-[11px] px-2 py-0.5 rounded-full flex-shrink-0" style={{ background: 'var(--inopi-teal)', color: 'var(--inopi-ivory)' }}>
                      {g.code}
                    </span>
                    <div>
                      <span className="font-body text-[13px] font-semibold block" style={{ color: 'var(--inopi-espresso)' }}>{g.grade}</span>
                      <span className="font-body text-[12px]" style={{ color: 'var(--inopi-taupe-strong)' }}>{g.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Layers */}
          <h4 className="font-display font-semibold text-[14px] mb-3" style={{ color: 'var(--inopi-espresso)' }}>
            {t('ui.layersTitle')}
          </h4>
          <p className="font-body text-[12px] mb-4" style={{ color: 'var(--inopi-taupe-strong)' }}>
            {t('ui.layersIntro')}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {LAYERS.map((l) => (
              <div key={l.code} className="rounded-[12px] p-5 border" style={{ borderColor: 'var(--inopi-sand)' }}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-display font-bold text-[11px] w-6 h-6 rounded-full flex items-center justify-center" style={{ background: 'var(--inopi-sand)', color: 'var(--inopi-teal)' }}>
                    {l.code}
                  </span>
                  <h5 className="font-display font-semibold text-[13px]" style={{ color: 'var(--inopi-espresso)' }}>{l.name}</h5>
                </div>
                <p className="font-body text-[12px] mb-3" style={{ color: 'var(--inopi-taupe-strong)' }}>{l.func}</p>
                <ul className="space-y-1">
                  {l.components.map((c) => (
                    <li key={c} className="font-body text-[11px] flex items-start gap-1.5" style={{ color: 'var(--inopi-taupe-strong)' }}>
                      <span className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0" style={{ background: 'var(--inopi-teal-strong)' }} />
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Code system */}
      <section className="py-14" style={{ background: 'var(--inopi-ivory)' }}>
        <div className="container max-w-4xl">
          <h3 className="font-display font-bold text-[18px] mb-2" style={{ color: 'var(--inopi-espresso)' }}>
            {t('ui.codesTitle')}
          </h3>
          <p className="font-body text-[13px] mb-2" style={{ color: 'var(--inopi-taupe-strong)' }}>
            {t('ui.formatLabel')}<code className="font-mono text-[12px] px-1.5 py-0.5 rounded" style={{ background: 'var(--inopi-sand)', color: 'var(--inopi-espresso)' }}>{t('ui.codeFormat')}</code>
          </p>
          <p className="font-body text-[12px] mb-6" style={{ color: 'var(--inopi-sage-strong)' }}>
            {t('ui.codesLegend')}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <span className="font-body text-[11px] font-semibold uppercase tracking-wide block mb-2" style={{ color: 'var(--inopi-sage-strong)' }}>{t('ui.hardCodes')}</span>
              <div className="flex flex-wrap gap-1.5">
                {SKILL_CODES.hard.map((s) => (
                  <span key={s.code} className="text-[11px] px-2.5 py-1 rounded-full font-medium bg-white border" style={{ borderColor: 'var(--inopi-sand)', color: 'var(--inopi-espresso)' }}>
                    <span className="font-mono font-bold">{s.code}</span> — {s.name}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <span className="font-body text-[11px] font-semibold uppercase tracking-wide block mb-2" style={{ color: 'var(--inopi-sage-strong)' }}>{t('ui.softCodes')}</span>
              <div className="flex flex-wrap gap-1.5">
                {SKILL_CODES.soft.map((s) => (
                  <span key={s.code} className="text-[11px] px-2.5 py-1 rounded-full font-medium bg-white border" style={{ borderColor: 'var(--inopi-sand)', color: 'var(--inopi-espresso)' }}>
                    <span className="font-mono font-bold">{s.code}</span> — {s.name}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-[12px] p-5 bg-white border" style={{ borderColor: 'var(--inopi-sand)' }}>
              <span className="font-body text-[11px] font-semibold uppercase tracking-wide block mb-3" style={{ color: 'var(--inopi-sage-strong)' }}>{t('ui.examples')}</span>
              <div className="space-y-2">
                {CODE_EXAMPLES.map((e) => (
                  <div key={e.code} className="flex flex-col">
                    <code className="font-mono text-[12px] font-bold" style={{ color: 'var(--inopi-teal)' }}>{e.code}</code>
                    <span className="font-body text-[12px]" style={{ color: 'var(--inopi-taupe-strong)' }}>{e.meaning}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-[12px] p-5 bg-white border" style={{ borderColor: 'var(--inopi-sand)' }}>
              <span className="font-body text-[11px] font-semibold uppercase tracking-wide block mb-3" style={{ color: 'var(--inopi-sage-strong)' }}>{t('ui.reading')}</span>
              <div className="space-y-2">
                {GRADE_LEVEL_READING.map((g) => (
                  <div key={g.combo} className="flex items-center gap-3">
                    <code className="font-mono text-[12px] font-bold px-2 py-0.5 rounded" style={{ background: 'var(--inopi-sand)', color: 'var(--inopi-teal)' }}>{g.combo}</code>
                    <span className="font-body text-[12px]" style={{ color: 'var(--inopi-taupe-strong)' }}>{g.label}</span>
                  </div>
                ))}
              </div>
              <p className="font-body text-[11px] mt-3" style={{ color: 'var(--inopi-sage-strong)' }}>
                {t('ui.readingNote')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Priority matrices */}
      <section className="py-14 bg-white">
        <div className="container max-w-4xl">
          <h3 className="font-display font-bold text-[18px] mb-1" style={{ color: 'var(--inopi-espresso)' }}>
            {t('ui.hardMatrixTitle')}
          </h3>
          <p className="font-body text-[12px] mb-4" style={{ color: 'var(--inopi-sage-strong)' }}>
            {t('ui.hardMatrixLegend')}
          </p>
          <div className="overflow-x-auto rounded-[12px] border mb-12" style={{ borderColor: 'var(--inopi-sand)' }}>
            <table className="w-full border-collapse min-w-[820px]">
              <thead>
                <tr>
                  <th className="text-left font-body text-[11px] font-semibold p-3 border-b sticky left-0 bg-white" style={{ color: 'var(--inopi-espresso)', borderColor: 'var(--inopi-sand)' }}>
                    {t('ui.hardMatrixCorner')}
                  </th>
                  {INDUSTRY_COLUMNS.map((c) => (
                    <th key={c} className="text-left font-body text-[11px] font-semibold p-3 border-b" style={{ color: 'var(--inopi-sage-strong)', borderColor: 'var(--inopi-sand)' }}>
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {HARD_SKILL_INDUSTRY_MATRIX.map((row) => (
                  <tr key={row.skill}>
                    <td className="p-3 border-b font-body text-[12px] font-medium sticky left-0 bg-white" style={{ color: 'var(--inopi-espresso)', borderColor: 'var(--inopi-sand)' }}>
                      {row.skill}
                    </td>
                    {row.values.map((v, i) => (
                      <td key={i} className="p-2 border-b" style={{ borderColor: 'var(--inopi-sand)' }}>
                        <span className="inline-flex items-center justify-center w-full px-2 py-1 rounded-[6px] text-[11px] font-medium" style={matrixCellStyle(v)}>
                          {t(`levels.${v}`)}
                        </span>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h3 className="font-display font-bold text-[18px] mb-1" style={{ color: 'var(--inopi-espresso)' }}>
            {t('ui.softMatrixTitle')}
          </h3>
          <p className="font-body text-[12px] mb-4" style={{ color: 'var(--inopi-sage-strong)' }}>
            {t('ui.softMatrixLegend')}
          </p>
          <div className="overflow-x-auto rounded-[12px] border" style={{ borderColor: 'var(--inopi-sand)' }}>
            <table className="w-full border-collapse min-w-[480px]">
              <thead>
                <tr>
                  <th className="text-left font-body text-[11px] font-semibold p-3 border-b" style={{ color: 'var(--inopi-espresso)', borderColor: 'var(--inopi-sand)' }}>
                    {t('ui.softMatrixCorner')}
                  </th>
                  {JOB_GRADE_COLUMNS.map((c) => (
                    <th key={c} className="text-left font-body text-[11px] font-semibold p-3 border-b" style={{ color: 'var(--inopi-sage-strong)', borderColor: 'var(--inopi-sand)' }}>
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {SOFT_SKILL_GRADE_MATRIX.map((row) => (
                  <tr key={row.skill}>
                    <td className="p-3 border-b font-body text-[12px] font-medium" style={{ color: 'var(--inopi-espresso)', borderColor: 'var(--inopi-sand)' }}>
                      {row.skill}
                    </td>
                    {row.values.map((v, i) => (
                      <td key={i} className="p-2 border-b" style={{ borderColor: 'var(--inopi-sand)' }}>
                        <span className="inline-flex items-center justify-center w-full px-2 py-1 rounded-[6px] text-[11px] font-medium" style={matrixCellStyle(v)}>
                          {t(`levels.${v}`)}
                        </span>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Recommendations */}
      <section className="py-14" style={{ background: 'var(--inopi-ivory)' }}>
        <div className="container max-w-4xl">
          <h3 className="font-display font-bold text-[18px] mb-6" style={{ color: 'var(--inopi-espresso)' }}>
            {t('ui.recoTitle')}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            <div>
              <h4 className="font-display font-semibold text-[13px] mb-3" style={{ color: 'var(--inopi-espresso)' }}>
                {t('ui.topHard')}
              </h4>
              <div className="space-y-3">
                {TOP_HARD_SKILLS.map((s) => (
                  <div key={s.rank} className="flex gap-3 bg-white rounded-[10px] p-3 border" style={{ borderColor: 'var(--inopi-sand)' }}>
                    <span className="font-display font-bold text-[16px] flex-shrink-0 w-5" style={{ color: 'var(--inopi-teal-strong)' }}>{s.rank}</span>
                    <div>
                      <span className="font-body text-[13px] font-semibold block" style={{ color: 'var(--inopi-espresso)' }}>{s.name}</span>
                      <span className="font-body text-[12px] leading-relaxed" style={{ color: 'var(--inopi-taupe-strong)' }}>{s.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-display font-semibold text-[13px] mb-3" style={{ color: 'var(--inopi-espresso)' }}>
                {t('ui.topSoft')}
              </h4>
              <div className="space-y-3">
                {TOP_SOFT_SKILLS.map((s) => (
                  <div key={s.rank} className="flex gap-3 bg-white rounded-[10px] p-3 border" style={{ borderColor: 'var(--inopi-sand)' }}>
                    <span className="font-display font-bold text-[16px] flex-shrink-0 w-5" style={{ color: 'var(--inopi-teal)' }}>{s.rank}</span>
                    <div>
                      <span className="font-body text-[13px] font-semibold block" style={{ color: 'var(--inopi-espresso)' }}>{s.name}</span>
                      <span className="font-body text-[12px] leading-relaxed" style={{ color: 'var(--inopi-taupe-strong)' }}>{s.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <h4 className="font-display font-semibold text-[13px] mb-4" style={{ color: 'var(--inopi-espresso)' }}>
            {t('ui.comboTitle')}
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {INDUSTRY_COMBO_RECOMMENDATIONS.map((c) => (
              <div key={c.cluster} className="bg-white rounded-[12px] p-5 border" style={{ borderColor: 'var(--inopi-sand)' }}>
                <h5 className="font-display font-semibold text-[13px] mb-2" style={{ color: 'var(--inopi-espresso)' }}>{c.cluster}</h5>
                <p className="font-body text-[12px] mb-1"><span style={{ color: 'var(--inopi-sage-strong)' }}>{t('ui.hardSkill')}</span><span style={{ color: 'var(--inopi-taupe-strong)' }}>{c.hardSkill}</span></p>
                <p className="font-body text-[12px] mb-1"><span style={{ color: 'var(--inopi-sage-strong)' }}>{t('ui.softSkill')}</span><span style={{ color: 'var(--inopi-taupe-strong)' }}>{c.softSkill}</span></p>
                <p className="font-body text-[12px]"><span style={{ color: 'var(--inopi-sage-strong)' }}>{t('ui.useCase')}</span><span style={{ color: 'var(--inopi-taupe-strong)' }}>{c.useCase}</span></p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application flow + success metrics */}
      <section className="py-14 bg-white">
        <div className="container max-w-4xl">
          <h3 className="font-display font-bold text-[18px] mb-6" style={{ color: 'var(--inopi-espresso)' }}>
            {t('ui.flowTitle')}
          </h3>
          <div className="flex flex-wrap gap-2 mb-12">
            {APPLICATION_STEPS.map((s, i) => (
              <div key={s.no} className="flex items-center gap-2">
                <div className="rounded-[10px] px-4 py-3 border" style={{ borderColor: 'var(--inopi-sand)', background: 'var(--inopi-ivory)' }}>
                  <span className="font-display font-bold text-[11px] block mb-0.5" style={{ color: 'var(--inopi-teal-strong)' }}>
                    {s.no}. {s.stage}
                  </span>
                  <span className="font-body text-[11px]" style={{ color: 'var(--inopi-taupe-strong)' }}>{s.activity}</span>
                </div>
                {i < APPLICATION_STEPS.length - 1 && (
                  <span className="font-display font-bold hidden sm:inline" style={{ color: 'var(--inopi-sage-strong)' }}>→</span>
                )}
              </div>
            ))}
          </div>

          <h3 className="font-display font-bold text-[18px] mb-6" style={{ color: 'var(--inopi-espresso)' }}>
            {t('ui.metricsTitle')}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {SUCCESS_METRICS.map((m) => (
              <div key={m.dimension} className="rounded-[12px] p-5 border" style={{ borderColor: 'var(--inopi-sand)' }}>
                <h4 className="font-display font-semibold text-[14px] mb-2" style={{ color: 'var(--inopi-espresso)' }}>{m.dimension}</h4>
                <p className="font-body text-[12px] leading-relaxed" style={{ color: 'var(--inopi-taupe-strong)' }}>{m.indicators}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
