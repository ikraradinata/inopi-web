import Link from 'next/link'
import {
  IconFlask,
  IconRocket,
  IconCertificate,
  IconNetwork,
} from '@tabler/icons-react'

const programs = [
  {
    icon: IconFlask,
    title: 'Riset & Inovasi',
    desc: 'Think tank asosiasi — mengembangkan agenda riset, framework pembelajaran, dan menerbitkan publikasi ilmiah.',
    href: '/program/riset-inovasi',
  },
  {
    icon: IconRocket,
    title: 'Program & Implementasi',
    desc: 'Executor asosiasi — menjalankan program pilot, monitoring, dan mendokumentasikan dampak inovasi di lapangan.',
    href: '/program/implementasi',
  },
  {
    icon: IconNetwork,
    title: 'Kemitraan & Kerjasama',
    desc: 'Network builder — membangun jejaring strategis dengan universitas, industri, dan pemerintah.',
    href: '/program/kemitraan',
  },
  {
    icon: IconCertificate,
    title: 'Pelatihan & Sertifikasi',
    desc: 'Capacity builder — meningkatkan kompetensi SDM melalui pelatihan terstruktur dan sertifikasi nasional.',
    href: '/program/pelatihan-sertifikasi',
  },
]

export default function ProgramHighlights() {
  return (
    <section style={{ background: '#f7f9fb' }} className="py-14">
      <div className="container">
        <div className="text-center mb-10">
          <h2 className="font-display font-bold mb-2" style={{ fontSize: 'clamp(20px,3vw,28px)', color: '#071422' }}>
            Program Strategis Kami
          </h2>
          <p className="font-body text-[14px]" style={{ color: '#4a6070' }}>
            Empat divisi program yang mendorong inovasi pembelajaran nasional
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {programs.map((p) => {
            const Icon = p.icon
            return (
              <div
                key={p.title}
                className="bg-white rounded-[12px] p-5 border transition-all hover:border-[#0d9488] hover:shadow-hover group"
                style={{ borderColor: '#e0e8ef' }}
              >
                <div
                  className="inline-flex items-center justify-center w-9 h-9 rounded-[8px] mb-3"
                  style={{ background: '#e0f7f5' }}
                >
                  <Icon size={18} style={{ color: '#0d9488' }} />
                </div>
                <h3 className="font-display font-semibold text-[14px] mb-1.5" style={{ color: '#071422' }}>
                  {p.title}
                </h3>
                <p className="font-body text-[13px] leading-relaxed mb-3" style={{ color: '#4a6070' }}>
                  {p.desc}
                </p>
                <Link
                  href={p.href}
                  className="font-body text-[13px] transition-colors hover:underline"
                  style={{ color: '#0d9488' }}
                >
                  Selengkapnya →
                </Link>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
