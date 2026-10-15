import { IconMicroscope, IconHeartHandshake, IconFileText } from '@tabler/icons-react'

const features = [
  {
    icon: IconMicroscope,
    title: 'Riset Terapan',
    desc: 'Mendorong riset dan implementasi teknologi pendidikan yang relevan dengan kebutuhan zaman.',
    accent: 'var(--inopi-sand)',
    accentBorder: 'var(--inopi-teal-strong)',
  },
  {
    icon: IconHeartHandshake,
    title: 'Kolaborasi Aktif',
    desc: 'Menjadi jembatan strategis antara akademisi, industri, dan pemerintah dalam ekosistem inovasi.',
    accent: 'var(--inopi-sand)',
    accentBorder: 'var(--inopi-teal)',
  },
  {
    icon: IconFileText,
    title: 'Advokasi Kebijakan',
    desc: 'Menciptakan standar dan best practices inovasi pembelajaran yang berdampak pada kebijakan nasional.',
    accent: 'var(--inopi-sand)',
    accentBorder: 'var(--inopi-espresso)',
  },
]

export default function EkosistemSection() {
  return (
    <section className="py-12 bg-white">
      <div className="container">
        <div
          className="rounded-[12px] p-7 mx-auto max-w-[860px]"
          style={{ border: '1px solid var(--inopi-sand)' }}
        >
          <h2 className="font-display font-bold text-[20px] mb-2" style={{ color: 'var(--inopi-espresso)' }}>
            Ekosistem Inovasi Nasional
          </h2>
          <p className="font-body text-[14px] leading-relaxed mb-8" style={{ color: 'var(--inopi-taupe-strong)' }}>
            INOPI (Asosiasi Inovasi Pembelajaran Indonesia) hadir sebagai katalisator yang menghubungkan akademisi, industri, dan pemerintah. Kami percaya bahwa masa depan pendidikan indonesia terbaik pada integrasi teknologi yang humanis dan berkelanjutan.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((f) => {
              const Icon = f.icon
              return (
                <div
                  key={f.title}
                  className="pt-4"
                  style={{ borderTop: `2px solid ${f.accentBorder}` }}
                >
                  <div
                    className="inline-flex items-center justify-center w-9 h-9 rounded-[8px] mb-3"
                    style={{ background: f.accent }}
                  >
                    <Icon size={18} style={{ color: f.accentBorder }} />
                  </div>
                  <h3 className="font-display font-semibold text-[14px] mb-1.5" style={{ color: 'var(--inopi-espresso)' }}>
                    {f.title}
                  </h3>
                  <p className="font-body text-[13px] leading-relaxed" style={{ color: 'var(--inopi-taupe-strong)' }}>
                    {f.desc}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
