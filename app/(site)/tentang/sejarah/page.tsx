import type { Metadata } from 'next'
import { IconCheck, IconCircle, IconRocket } from '@tabler/icons-react'

export const metadata: Metadata = {
  title: 'Sejarah & Latar Belakang',
  description: 'Perjalanan INOPI dari gagasan kolaboratif menuju asosiasi inovasi pembelajaran terkemuka Indonesia.',
}

const timeline = [
  { status: 'done', label: 'Nama Disetujui AHU', desc: 'INOPI resmi terdaftar di Administrasi Hukum Umum Kemenkumham.' },
  { status: 'done', label: 'Inisiasi & Diskusi Founders', desc: '11 April 2026 — pertemuan perdana 26 founders dari berbagai institusi.' },
  { status: 'pending', label: 'Penyusunan Visi, Misi & AD/ART', desc: 'Merumuskan landasan hukum dan arah strategis organisasi.' },
  { status: 'pending', label: 'Pembentukan Struktur Organisasi', desc: 'Menetapkan pengurus dan divisi-divisi kerja INOPI.' },
  { status: 'launch', label: 'Legalisasi → Soft Launch → Grand Launch', desc: 'Target Q3–Q4 2026.' },
]

const challenges = [
  {
    title: 'Gelombang Transformasi',
    items: ['AI (Artificial Intelligence)', 'Digital learning ecosystem', 'Smart education & adaptive learning', 'Immersive Technology', 'Society 5.0'],
  },
  {
    title: 'Tantangan Utama Indonesia',
    items: ['Fragmentasi inovasi pembelajaran', 'Kesenjangan akademik-industri-kebijakan', 'Kurangnya platform kolaborasi', 'Minimnya standardisasi', 'Terbatasnya adopsi teknologi'],
  },
]

export default function SejarahPage() {
  return (
    <div className="py-14">
      {/* Hero */}
      <div className="container mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-semibold uppercase tracking-wider mb-4"
          style={{ background: 'var(--inopi-sand)', color: 'var(--inopi-teal)' }}>
          Perjalanan INOPI
        </div>
        <h1 className="font-display font-bold mb-3" style={{ fontSize: 'clamp(24px,4vw,36px)', color: 'var(--inopi-espresso)' }}>
          Sejarah & Latar Belakang
        </h1>
        <p className="font-body text-[14px] max-w-xl" style={{ color: 'var(--inopi-taupe-strong)' }}>
          Dari gagasan kolaboratif menuju asosiasi inovasi pembelajaran terkemuka Indonesia.
        </p>
      </div>

      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Timeline */}
          <div>
            <h2 className="font-display font-bold text-[18px] mb-6" style={{ color: 'var(--inopi-espresso)' }}>
              Perjalanan Pembentukan
            </h2>
            <div className="relative">
              {timeline.map((t, i) => (
                <div key={t.label} className="flex gap-4 pb-7 relative">
                  {/* Connecting line */}
                  {i < timeline.length - 1 && (
                    <div
                      className="absolute left-[15px] top-7 bottom-0 w-0.5"
                      style={{ borderLeft: '2px dashed var(--inopi-sand)' }}
                    />
                  )}
                  {/* Dot */}
                  <div className="flex-shrink-0 mt-0.5">
                    {t.status === 'done' ? (
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center"
                        style={{ background: 'var(--inopi-teal-strong)' }}
                      >
                        <IconCheck size={14} color="white" />
                      </div>
                    ) : t.status === 'launch' ? (
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center"
                        style={{ background: 'var(--inopi-sand)', border: '2px solid var(--inopi-teal-strong)' }}
                      >
                        <IconRocket size={14} style={{ color: 'var(--inopi-teal-strong)' }} />
                      </div>
                    ) : (
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center"
                        style={{ background: 'var(--inopi-ivory)', border: '2px solid var(--inopi-sand)' }}
                      >
                        <IconCircle size={12} style={{ color: 'var(--inopi-sage-strong)' }} />
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-[14px] mb-0.5" style={{ color: 'var(--inopi-espresso)' }}>
                      {t.label}
                    </h3>
                    <p className="font-body text-[13px] leading-relaxed" style={{ color: 'var(--inopi-taupe-strong)' }}>
                      {t.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Challenge cards */}
          <div className="flex flex-col gap-4">
            {challenges.map((c) => (
              <div
                key={c.title}
                className="rounded-[12px] p-5 border"
                style={{ borderColor: 'var(--inopi-sand)' }}
              >
                <h3 className="font-display font-semibold text-[15px] mb-3" style={{ color: 'var(--inopi-espresso)' }}>
                  {c.title}
                </h3>
                <ul className="space-y-2">
                  {c.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 font-body text-[13px]" style={{ color: 'var(--inopi-taupe-strong)' }}>
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: 'var(--inopi-teal-strong)' }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div
              className="rounded-[12px] p-5"
              style={{ background: 'var(--inopi-espresso)' }}
            >
              <h3 className="font-display font-semibold text-[15px] mb-3 text-white">
                Peran INOPI
              </h3>
              <p className="font-body text-[13px] leading-relaxed" style={{ color: 'var(--inopi-sage-strong)' }}>
                INOPI hadir sebagai katalisator yang menghubungkan akademisi, industri, dan pemerintah dalam ekosistem inovasi pembelajaran yang inklusif dan berkelanjutan — menjawab tantangan transformasi digital pendidikan Indonesia.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
