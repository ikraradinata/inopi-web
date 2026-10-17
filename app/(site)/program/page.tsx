import type { Metadata } from 'next'
import Link from 'next/link'
import CtaDark from '@/components/sections/CtaDark'
import PriorityProgramsSection from '@/components/sections/PriorityProgramsSection'
import { IconFlask, IconRocket, IconCertificate, IconNetwork } from '@tabler/icons-react'

export const metadata: Metadata = {
  title: 'Program & Kegiatan Strategis',
  description: 'Rangkaian program terstruktur INOPI untuk mendorong inovasi pembelajaran nasional.',
}

const programs = [
  {
    icon: IconFlask,
    title: 'Riset & Inovasi',
    desc: 'Think tank asosiasi — mengembangkan agenda riset tahunan, framework pembelajaran, dan menerbitkan publikasi ilmiah.',
    href: '/program/riset-inovasi',
    team: 'Bobi Kurniawan Soegoto, Nunik Afriliana',
    orientation: 'Akademik & Ilmiah',
  },
  {
    icon: IconRocket,
    title: 'Program & Implementasi',
    desc: 'Executor asosiasi — menjalankan program pilot, monitoring, dan mendokumentasikan dampak inovasi.',
    href: '/program/implementasi',
    team: 'Nita Felia, Yasser Muhammad Syaiful',
    orientation: 'Operasional',
  },
  {
    icon: IconNetwork,
    title: 'Kemitraan & Kerjasama',
    desc: 'Network builder — membangun jejaring strategis dengan universitas, industri, dan pemerintah.',
    href: '/program/kemitraan',
    team: 'Victor Osman, Siti Elda Hiererra',
    orientation: 'Relasional & Strategis',
  },
  {
    icon: IconCertificate,
    title: 'Pelatihan & Sertifikasi',
    desc: 'Capacity builder — meningkatkan kompetensi SDM melalui pelatihan terstruktur dan sertifikasi nasional.',
    href: '/program/pelatihan-sertifikasi',
    team: 'Andy Febrico Bintoro',
    orientation: 'Profesional & Kompetensi',
  },
]

const statusLabels = [
  { label: 'Direncanakan', meaning: 'Sudah ditetapkan pengurus, belum dimulai.' },
  { label: 'Terbuka untuk Kolaborasi', meaning: 'Mencari mitra atau peserta untuk memulai.' },
  { label: 'Berjalan', meaning: 'Sedang dilaksanakan.' },
  { label: 'Selesai', meaning: 'Telah dilaksanakan; dokumentasi tersedia.' },
]

export default function ProgramPage() {
  return (
    <>
    <div className="py-14">
      <div className="container">
        <div className="mb-10">
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-semibold uppercase tracking-wider mb-4"
            style={{ background: 'var(--inopi-sand)', color: 'var(--inopi-teal)' }}
          >
            4 Divisi Strategis
          </div>
          <h1 className="font-display font-bold mb-3" style={{ fontSize: 'clamp(24px,4vw,36px)', color: 'var(--inopi-espresso)' }}>
            Program & Kegiatan Strategis
          </h1>
          <p className="font-body text-[14px] max-w-xl" style={{ color: 'var(--inopi-taupe-strong)' }}>
            Empat divisi program INOPI yang bekerja sinergis untuk mendorong ekosistem inovasi pembelajaran nasional.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {programs.map((p) => {
            const Icon = p.icon
            return (
              <Link key={p.title} href={p.href}
                className="block rounded-[12px] p-6 border bg-white transition-all hover:border-[var(--inopi-teal-strong)] hover:shadow-hover"
                style={{ borderColor: 'var(--inopi-sand)' }}>
                <div className="inline-flex items-center justify-center w-11 h-11 rounded-[10px] mb-4" style={{ background: 'var(--inopi-sand)' }}>
                  <Icon size={22} style={{ color: 'var(--inopi-teal-strong)' }} />
                </div>
                <h2 className="font-display font-bold text-[16px] mb-2" style={{ color: 'var(--inopi-espresso)' }}>{p.title}</h2>
                <p className="font-body text-[13px] leading-relaxed mb-4" style={{ color: 'var(--inopi-taupe-strong)' }}>{p.desc}</p>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-body text-[12px]" style={{ color: 'var(--inopi-sage-strong)' }}>Tim: {p.team}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full font-medium" style={{ background: 'var(--inopi-sand)', color: 'var(--inopi-teal)' }}>
                    {p.orientation}
                  </span>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </div>

    <PriorityProgramsSection showAllLink={false}>
      <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-1.5">
        {statusLabels.map((l) => (
          <div key={l.label} className="font-body text-[12px] leading-relaxed">
            <dt className="inline font-semibold" style={{ color: 'var(--inopi-espresso)' }}>{l.label}: </dt>
            <dd className="inline" style={{ color: 'var(--inopi-taupe-strong)' }}>{l.meaning}</dd>
          </div>
        ))}
      </dl>
    </PriorityProgramsSection>

    <section className="py-14" style={{ background: 'var(--inopi-ivory)' }}>
      <div className="container">
        <CtaDark
          title="Punya gagasan program bersama?"
          description="INOPI terbuka untuk riset kolaboratif, proyek percontohan, dan pengembangan kompetensi bersama mitra."
          primaryCta={{ label: 'Ajukan Kemitraan', href: '/kemitraan' }}
        />
      </div>
    </section>
    </>
  )
}
