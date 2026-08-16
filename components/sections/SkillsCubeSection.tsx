import {
  SUPPORTING_STATS,
  DIMENSIONS,
  PROFICIENCY_LEVELS,
  JOB_GRADES,
  LAYERS,
  SKILL_CODES,
  CODE_EXAMPLES,
  GRADE_LEVEL_READING,
  INDUSTRY_COLUMNS,
  HARD_SKILL_INDUSTRY_MATRIX,
  JOB_GRADE_COLUMNS,
  SOFT_SKILL_GRADE_MATRIX,
  TOP_HARD_SKILLS,
  TOP_SOFT_SKILLS,
  INDUSTRY_COMBO_RECOMMENDATIONS,
  APPLICATION_STEPS,
  SUCCESS_METRICS,
} from '@/lib/constants/skillsCube'
import { IconCube3dSphere } from '@tabler/icons-react'

function matrixCellStyle(value: string) {
  if (value === 'Tinggi') return { background: '#083344', color: '#ffffff' }
  if (value === 'Sedang') return { background: '#e0f7f5', color: '#0b7b8a' }
  return { background: '#f7f9fb', color: '#8fa5b5', border: '1px solid #e0e8ef' }
}

export default function SkillsCubeSection() {
  return (
    <>
      {/* Intro + stats */}
      <section className="py-14" style={{ background: '#071422' }}>
        <div className="container max-w-4xl">
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-semibold uppercase tracking-wider mb-4"
            style={{ background: 'rgba(13,148,136,0.15)', color: '#5dd4c8' }}
          >
            <IconCube3dSphere size={13} /> Metodologi INOPI
          </div>
          <h2 className="font-display font-bold mb-3 text-white" style={{ fontSize: 'clamp(20px,3vw,28px)' }}>
            INOPI Skills Cube
          </h2>
          <p className="font-body text-[14px] leading-relaxed max-w-2xl mb-10" style={{ color: '#8fa5b5' }}>
            Kerangka analisis 4 dimensi kebutuhan pelatihan — Proficiency × Job Grade × Skill (Hard/Soft) × Industri.
            Pelatihan seragam tidak lagi cukup: kebutuhan skill berbeda menurut level, jabatan, jenis keterampilan,
            dan industri. INOPI Skills Cube memetakan semuanya agar pelatihan tepat sasaran.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {SUPPORTING_STATS.map((s) => (
              <div key={s.label}>
                <span className="font-display font-bold text-[26px] leading-none block mb-1.5" style={{ color: '#5dd4c8' }}>
                  {s.value}
                </span>
                <span className="font-body text-[12px] leading-snug block" style={{ color: '#8fa5b5' }}>
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
          <h3 className="font-display font-bold text-[18px] mb-6" style={{ color: '#071422' }}>
            Satu Cube, Empat Dimensi
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {DIMENSIONS.map((d) => (
              <div key={d.no} className="rounded-[12px] p-5 border" style={{ borderColor: '#e0e8ef' }}>
                <span className="font-display font-bold text-[22px] leading-none block mb-2" style={{ color: '#0d9488' }}>
                  {String(d.no).padStart(2, '0')}
                </span>
                <h4 className="font-display font-semibold text-[14px] mb-1" style={{ color: '#071422' }}>
                  {d.name}
                </h4>
                <p className="font-body text-[12px] leading-relaxed" style={{ color: '#4a6070' }}>
                  {d.detail}
                </p>
              </div>
            ))}
          </div>

          {/* Proficiency & Job Grade detail */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            <div>
              <h4 className="font-display font-semibold text-[14px] mb-3" style={{ color: '#071422' }}>
                Proficiency Level
              </h4>
              <div className="space-y-2">
                {PROFICIENCY_LEVELS.map((l) => (
                  <div key={l.code} className="flex items-start gap-3 rounded-[10px] p-3" style={{ background: '#f7f9fb' }}>
                    <span className="font-display font-bold text-[11px] px-2 py-0.5 rounded-full flex-shrink-0" style={{ background: '#083344', color: '#fff' }}>
                      {l.code}
                    </span>
                    <div>
                      <span className="font-body text-[13px] font-semibold block" style={{ color: '#071422' }}>{l.level}</span>
                      <span className="font-body text-[12px]" style={{ color: '#4a6070' }}>{l.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-display font-semibold text-[14px] mb-3" style={{ color: '#071422' }}>
                Job Grade
              </h4>
              <div className="space-y-2">
                {JOB_GRADES.map((g) => (
                  <div key={g.code} className="flex items-start gap-3 rounded-[10px] p-3" style={{ background: '#f7f9fb' }}>
                    <span className="font-display font-bold text-[11px] px-2 py-0.5 rounded-full flex-shrink-0" style={{ background: '#0b7b8a', color: '#fff' }}>
                      {g.code}
                    </span>
                    <div>
                      <span className="font-body text-[13px] font-semibold block" style={{ color: '#071422' }}>{g.grade}</span>
                      <span className="font-body text-[12px]" style={{ color: '#4a6070' }}>{g.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Layers */}
          <h4 className="font-display font-semibold text-[14px] mb-3" style={{ color: '#071422' }}>
            Lapisan Assessment · Coaching · Delivery
          </h4>
          <p className="font-body text-[12px] mb-4" style={{ color: '#4a6070' }}>
            Dua lapisan tipis membungkus setiap sel cube — menentukan bagaimana skill diukur, dilatih, dan disampaikan.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {LAYERS.map((l) => (
              <div key={l.code} className="rounded-[12px] p-5 border" style={{ borderColor: '#e0e8ef' }}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-display font-bold text-[11px] w-6 h-6 rounded-full flex items-center justify-center" style={{ background: '#e0f7f5', color: '#0b7b8a' }}>
                    {l.code}
                  </span>
                  <h5 className="font-display font-semibold text-[13px]" style={{ color: '#071422' }}>{l.name}</h5>
                </div>
                <p className="font-body text-[12px] mb-3" style={{ color: '#4a6070' }}>{l.func}</p>
                <ul className="space-y-1">
                  {l.components.map((c) => (
                    <li key={c} className="font-body text-[11px] flex items-start gap-1.5" style={{ color: '#4a6070' }}>
                      <span className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0" style={{ background: '#0d9488' }} />
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
      <section className="py-14" style={{ background: '#f7f9fb' }}>
        <div className="container max-w-4xl">
          <h3 className="font-display font-bold text-[18px] mb-2" style={{ color: '#071422' }}>
            Sistem Kode
          </h3>
          <p className="font-body text-[13px] mb-2" style={{ color: '#4a6070' }}>
            Format: <code className="font-mono text-[12px] px-1.5 py-0.5 rounded" style={{ background: '#eef2f7', color: '#083344' }}>[INDUSTRI] · [H/S + DOMAIN] · [G#L#]</code>
          </p>
          <p className="font-body text-[12px] mb-6" style={{ color: '#8fa5b5' }}>
            Industri · Jenis + Domain Skill · Grade + Level
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <span className="font-body text-[11px] font-semibold uppercase tracking-wide block mb-2" style={{ color: '#8fa5b5' }}>Kode Hard Skill (H)</span>
              <div className="flex flex-wrap gap-1.5">
                {SKILL_CODES.hard.map((s) => (
                  <span key={s.code} className="text-[11px] px-2.5 py-1 rounded-full font-medium bg-white border" style={{ borderColor: '#e0e8ef', color: '#083344' }}>
                    <span className="font-mono font-bold">{s.code}</span> — {s.name}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <span className="font-body text-[11px] font-semibold uppercase tracking-wide block mb-2" style={{ color: '#8fa5b5' }}>Kode Soft Skill (S)</span>
              <div className="flex flex-wrap gap-1.5">
                {SKILL_CODES.soft.map((s) => (
                  <span key={s.code} className="text-[11px] px-2.5 py-1 rounded-full font-medium bg-white border" style={{ borderColor: '#e0e8ef', color: '#083344' }}>
                    <span className="font-mono font-bold">{s.code}</span> — {s.name}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-[12px] p-5 bg-white border" style={{ borderColor: '#e0e8ef' }}>
              <span className="font-body text-[11px] font-semibold uppercase tracking-wide block mb-3" style={{ color: '#8fa5b5' }}>Contoh Penerapan</span>
              <div className="space-y-2">
                {CODE_EXAMPLES.map((e) => (
                  <div key={e.code} className="flex flex-col">
                    <code className="font-mono text-[12px] font-bold" style={{ color: '#0b7b8a' }}>{e.code}</code>
                    <span className="font-body text-[12px]" style={{ color: '#4a6070' }}>{e.meaning}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-[12px] p-5 bg-white border" style={{ borderColor: '#e0e8ef' }}>
              <span className="font-body text-[11px] font-semibold uppercase tracking-wide block mb-3" style={{ color: '#8fa5b5' }}>Cara Membaca Grade × Level</span>
              <div className="space-y-2">
                {GRADE_LEVEL_READING.map((g) => (
                  <div key={g.combo} className="flex items-center gap-3">
                    <code className="font-mono text-[12px] font-bold px-2 py-0.5 rounded" style={{ background: '#e0f7f5', color: '#0b7b8a' }}>{g.combo}</code>
                    <span className="font-body text-[12px]" style={{ color: '#4a6070' }}>{g.label}</span>
                  </div>
                ))}
              </div>
              <p className="font-body text-[11px] mt-3" style={{ color: '#8fa5b5' }}>
                Angka makin besar = makin senior & makin dalam.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Priority matrices */}
      <section className="py-14 bg-white">
        <div className="container max-w-4xl">
          <h3 className="font-display font-bold text-[18px] mb-1" style={{ color: '#071422' }}>
            Matriks Prioritas Hard Skill per Industri
          </h3>
          <p className="font-body text-[12px] mb-4" style={{ color: '#8fa5b5' }}>
            Tinggi = mendesak & meluas · Sedang = penting/berkembang · Emerging = mulai relevan
          </p>
          <div className="overflow-x-auto rounded-[12px] border mb-12" style={{ borderColor: '#e0e8ef' }}>
            <table className="w-full border-collapse min-w-[820px]">
              <thead>
                <tr>
                  <th className="text-left font-body text-[11px] font-semibold p-3 border-b sticky left-0 bg-white" style={{ color: '#071422', borderColor: '#e0e8ef' }}>
                    Emerging Tech \ Industri
                  </th>
                  {INDUSTRY_COLUMNS.map((c) => (
                    <th key={c} className="text-left font-body text-[11px] font-semibold p-3 border-b" style={{ color: '#8fa5b5', borderColor: '#e0e8ef' }}>
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {HARD_SKILL_INDUSTRY_MATRIX.map((row) => (
                  <tr key={row.skill}>
                    <td className="p-3 border-b font-body text-[12px] font-medium sticky left-0 bg-white" style={{ color: '#071422', borderColor: '#e0e8ef' }}>
                      {row.skill}
                    </td>
                    {row.values.map((v, i) => (
                      <td key={i} className="p-2 border-b" style={{ borderColor: '#e0e8ef' }}>
                        <span className="inline-flex items-center justify-center w-full px-2 py-1 rounded-[6px] text-[11px] font-medium" style={matrixCellStyle(v)}>
                          {v}
                        </span>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h3 className="font-display font-bold text-[18px] mb-1" style={{ color: '#071422' }}>
            Matriks Prioritas Soft Skill per Jenjang
          </h3>
          <p className="font-body text-[12px] mb-4" style={{ color: '#8fa5b5' }}>
            Analytical thinking, creative thinking & resilience = prioritas tinggi di semua jenjang (WEF 2025).
          </p>
          <div className="overflow-x-auto rounded-[12px] border" style={{ borderColor: '#e0e8ef' }}>
            <table className="w-full border-collapse min-w-[480px]">
              <thead>
                <tr>
                  <th className="text-left font-body text-[11px] font-semibold p-3 border-b" style={{ color: '#071422', borderColor: '#e0e8ef' }}>
                    Soft Skill \ Job Grade
                  </th>
                  {JOB_GRADE_COLUMNS.map((c) => (
                    <th key={c} className="text-left font-body text-[11px] font-semibold p-3 border-b" style={{ color: '#8fa5b5', borderColor: '#e0e8ef' }}>
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {SOFT_SKILL_GRADE_MATRIX.map((row) => (
                  <tr key={row.skill}>
                    <td className="p-3 border-b font-body text-[12px] font-medium" style={{ color: '#071422', borderColor: '#e0e8ef' }}>
                      {row.skill}
                    </td>
                    {row.values.map((v, i) => (
                      <td key={i} className="p-2 border-b" style={{ borderColor: '#e0e8ef' }}>
                        <span className="inline-flex items-center justify-center w-full px-2 py-1 rounded-[6px] text-[11px] font-medium" style={matrixCellStyle(v)}>
                          {v}
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
      <section className="py-14" style={{ background: '#f7f9fb' }}>
        <div className="container max-w-4xl">
          <h3 className="font-display font-bold text-[18px] mb-6" style={{ color: '#071422' }}>
            Rekomendasi Berbasis Data
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            <div>
              <h4 className="font-display font-semibold text-[13px] mb-3" style={{ color: '#071422' }}>
                Top 5 Hard Skill Paling Dibutuhkan
              </h4>
              <div className="space-y-3">
                {TOP_HARD_SKILLS.map((s) => (
                  <div key={s.rank} className="flex gap-3 bg-white rounded-[10px] p-3 border" style={{ borderColor: '#e0e8ef' }}>
                    <span className="font-display font-bold text-[16px] flex-shrink-0 w-5" style={{ color: '#0d9488' }}>{s.rank}</span>
                    <div>
                      <span className="font-body text-[13px] font-semibold block" style={{ color: '#071422' }}>{s.name}</span>
                      <span className="font-body text-[12px] leading-relaxed" style={{ color: '#4a6070' }}>{s.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-display font-semibold text-[13px] mb-3" style={{ color: '#071422' }}>
                Top 5 Soft Skill Paling Dibutuhkan
              </h4>
              <div className="space-y-3">
                {TOP_SOFT_SKILLS.map((s) => (
                  <div key={s.rank} className="flex gap-3 bg-white rounded-[10px] p-3 border" style={{ borderColor: '#e0e8ef' }}>
                    <span className="font-display font-bold text-[16px] flex-shrink-0 w-5" style={{ color: '#0b7b8a' }}>{s.rank}</span>
                    <div>
                      <span className="font-body text-[13px] font-semibold block" style={{ color: '#071422' }}>{s.name}</span>
                      <span className="font-body text-[12px] leading-relaxed" style={{ color: '#4a6070' }}>{s.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <h4 className="font-display font-semibold text-[13px] mb-4" style={{ color: '#071422' }}>
            Kombinasi Prioritas per Kelompok Industri
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {INDUSTRY_COMBO_RECOMMENDATIONS.map((c) => (
              <div key={c.cluster} className="bg-white rounded-[12px] p-5 border" style={{ borderColor: '#e0e8ef' }}>
                <h5 className="font-display font-semibold text-[13px] mb-2" style={{ color: '#071422' }}>{c.cluster}</h5>
                <p className="font-body text-[12px] mb-1"><span style={{ color: '#8fa5b5' }}>Hard Skill: </span><span style={{ color: '#4a6070' }}>{c.hardSkill}</span></p>
                <p className="font-body text-[12px] mb-1"><span style={{ color: '#8fa5b5' }}>Soft Skill: </span><span style={{ color: '#4a6070' }}>{c.softSkill}</span></p>
                <p className="font-body text-[12px]"><span style={{ color: '#8fa5b5' }}>Use Case: </span><span style={{ color: '#4a6070' }}>{c.useCase}</span></p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application flow + success metrics */}
      <section className="py-14 bg-white">
        <div className="container max-w-4xl">
          <h3 className="font-display font-bold text-[18px] mb-6" style={{ color: '#071422' }}>
            Alur Penerapan — 6 Tahap
          </h3>
          <div className="flex flex-wrap gap-2 mb-12">
            {APPLICATION_STEPS.map((s, i) => (
              <div key={s.no} className="flex items-center gap-2">
                <div className="rounded-[10px] px-4 py-3 border" style={{ borderColor: '#e0e8ef', background: '#f7f9fb' }}>
                  <span className="font-display font-bold text-[11px] block mb-0.5" style={{ color: '#0d9488' }}>
                    {s.no}. {s.stage}
                  </span>
                  <span className="font-body text-[11px]" style={{ color: '#4a6070' }}>{s.activity}</span>
                </div>
                {i < APPLICATION_STEPS.length - 1 && (
                  <span className="font-display font-bold hidden sm:inline" style={{ color: '#8fa5b5' }}>→</span>
                )}
              </div>
            ))}
          </div>

          <h3 className="font-display font-bold text-[18px] mb-6" style={{ color: '#071422' }}>
            Metrik Keberhasilan
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {SUCCESS_METRICS.map((m) => (
              <div key={m.dimension} className="rounded-[12px] p-5 border" style={{ borderColor: '#e0e8ef' }}>
                <h4 className="font-display font-semibold text-[14px] mb-2" style={{ color: '#071422' }}>{m.dimension}</h4>
                <p className="font-body text-[12px] leading-relaxed" style={{ color: '#4a6070' }}>{m.indicators}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
