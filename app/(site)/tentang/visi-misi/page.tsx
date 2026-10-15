import type { Metadata } from 'next'
import {
  IconLayersIntersect,
  IconMicroscope,
  IconBuildingBridge,
  IconUsersGroup,
  IconAward,
  IconLeaf,
  IconRefresh,
  IconBulb,
  IconUsers,
  IconHeart,
} from '@tabler/icons-react'

export const metadata: Metadata = {
  title: 'Visi & Misi',
  description: 'Visi dan misi strategis INOPI dalam membangun ekosistem inovasi pembelajaran Indonesia.',
}

const misi = [
  {
    no: '01',
    title: 'Ekosistem Berkelanjutan',
    desc: 'Mengembangkan ekosistem inovasi pembelajaran yang inklusif, adaptif, dan berkelanjutan.',
    icon: IconLayersIntersect,
  },
  {
    no: '02',
    title: 'Riset & Teknologi',
    desc: 'Mendorong riset dan implementasi teknologi pendidikan yang relevan dengan kebutuhan zaman.',
    icon: IconMicroscope,
  },
  {
    no: '03',
    title: 'Jembatan Lintas Sektor',
    desc: 'Menjadi jembatan strategis antara akademisi, industri, dan pemerintah.',
    icon: IconBuildingBridge,
  },
  {
    no: '04',
    title: 'Peningkatan Kapasitas SDM',
    desc: 'Meningkatkan kompetensi dan kapasitas SDM di bidang pembelajaran digital.',
    icon: IconUsersGroup,
  },
  {
    no: '05',
    title: 'Standar dan Best Practices',
    desc: 'Menciptakan standar dan best practices inovasi pembelajaran di Indonesia.',
    icon: IconAward,
  },
]

const nilai = [
  { label: 'Inklusif', icon: IconHeart, desc: 'Terbuka untuk semua kalangan tanpa diskriminasi.' },
  { label: 'Adaptif', icon: IconRefresh, desc: 'Mampu menyesuaikan diri dengan perubahan zaman.' },
  { label: 'Berkelanjutan', icon: IconLeaf, desc: 'Berorientasi pada dampak jangka panjang.' },
  { label: 'Inovatif', icon: IconBulb, desc: 'Selalu mendorong gagasan dan pendekatan baru.' },
  { label: 'Kolaboratif', icon: IconUsers, desc: 'Mengedepankan kerja sama lintas disiplin.' },
]

export default function VisiMisiPage() {
  return (
    <>
      {/* Visi block */}
      <section style={{ background: 'var(--inopi-espresso)' }} className="py-16">
        <div className="container text-center">
          <p className="font-body text-[11px] font-semibold uppercase tracking-widest mb-4" style={{ color: 'var(--inopi-teal)' }}>
            VISI INOPI
          </p>
          <blockquote
            className="font-display font-bold italic max-w-2xl mx-auto"
            style={{ fontSize: 'clamp(20px,3vw,26px)', color: 'var(--inopi-ivory)', lineHeight: 1.4 }}
          >
            "Menjadi pusat kolaborasi dan inovasi pembelajaran terdepan di Indonesia yang berdaya saing global."
          </blockquote>
        </div>
      </section>

      {/* Misi */}
      <section className="py-14 bg-white">
        <div className="container max-w-3xl">
          <h2 className="font-display font-bold text-[22px] mb-8" style={{ color: 'var(--inopi-espresso)' }}>
            5 Misi Strategis
          </h2>
          <div className="divide-y" style={{ borderColor: 'var(--inopi-sand)' }}>
            {misi.map((m) => {
              const Icon = m.icon
              return (
                <div
                  key={m.no}
                  className="flex items-start gap-5 py-5 transition-colors hover:bg-[var(--inopi-ivory)] rounded-[8px] px-3 -mx-3"
                >
                  <span
                    className="font-display font-bold text-[28px] leading-none flex-shrink-0 w-10 text-right"
                    style={{ color: 'var(--inopi-teal-strong)' }}
                  >
                    {m.no}
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Icon size={16} style={{ color: 'var(--inopi-teal-strong)' }} />
                      <h3 className="font-display font-semibold text-[15px]" style={{ color: 'var(--inopi-espresso)' }}>
                        {m.title}
                      </h3>
                    </div>
                    <p className="font-body text-[13px] leading-relaxed" style={{ color: 'var(--inopi-taupe-strong)' }}>
                      {m.desc}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Nilai */}
      <section style={{ background: 'var(--inopi-ivory)' }} className="py-14">
        <div className="container">
          <h2 className="font-display font-bold text-[22px] mb-8 text-center" style={{ color: 'var(--inopi-espresso)' }}>
            Nilai Organisasi
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {nilai.map((n) => {
              const Icon = n.icon
              return (
                <div
                  key={n.label}
                  className="bg-white rounded-[12px] p-5 border text-center"
                  style={{ borderColor: 'var(--inopi-sand)' }}
                >
                  <div
                    className="inline-flex items-center justify-center w-10 h-10 rounded-full mb-3"
                    style={{ background: 'var(--inopi-sand)' }}
                  >
                    <Icon size={18} style={{ color: 'var(--inopi-teal-strong)' }} />
                  </div>
                  <p className="font-display font-bold text-[13px] mb-1" style={{ color: 'var(--inopi-espresso)' }}>{n.label}</p>
                  <p className="font-body text-[12px] leading-snug" style={{ color: 'var(--inopi-taupe-strong)' }}>{n.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}
