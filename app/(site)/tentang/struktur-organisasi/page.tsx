import type { Metadata } from 'next'
import {
  IconShieldCheck,
  IconEye,
  IconBrain,
  IconCrown,
  IconFileText,
  IconCoin,
  IconFlask,
  IconRocket,
  IconNetwork,
  IconCertificate,
} from '@tabler/icons-react'

export const metadata: Metadata = {
  title: 'Struktur Organisasi',
  description: 'Struktur organisasi dan pengurus INOPI — Asosiasi Inovasi Pembelajaran Indonesia.',
}

const orgSections = [
  {
    title: 'Dewan Pembina',
    icon: IconShieldCheck,
    description: 'Menjaga visi jangka panjang, membuka akses ke ekosistem kebijakan pendidikan nasional.',
    members: ['Pony Halim', 'Gogot Suharwoto', 'M. Aditya Warman', 'Bonifasius W. Pudjianto', 'Subchan Gatot', 'Heru Dewanto'],
    accent: 'var(--inopi-espresso)',
  },
  {
    title: 'Dewan Pengawas',
    icon: IconEye,
    description: 'Memastikan program dan keuangan sesuai AD/ART dan regulasi.',
    members: ['Paulina Pannen', 'Tutut Handayani', 'Bambang Yapri'],
    accent: 'var(--inopi-teal)',
  },
  {
    title: 'Dewan Pakar',
    icon: IconBrain,
    description: 'Memberikan legitimasi akademik dan arah inovasi berbasis evidence.',
    members: ['Stephen Ng', 'Tyo Guritno', 'Kun Wardana', 'Ferry Sutanto', 'Jahja'],
    accent: 'var(--inopi-teal-strong)',
  },
]

const pimpinan = [
  { jabatan: 'Ketua Umum', name: 'Meyliana', icon: IconCrown },
  { jabatan: 'Wakil Ketua Umum', name: 'Sunardi', icon: IconCrown },
  { jabatan: 'Sekretaris Jenderal', name: 'Idha Kristiana', icon: IconFileText },
  { jabatan: 'Bendahara Umum', name: 'Ikrar Adinata Arin', icon: IconCoin },
]

const divisi = [
  {
    title: 'Riset & Inovasi',
    icon: IconFlask,
    pic: 'Bobi Kurniawan, Nunik Afriliana',
    role: 'Think tank asosiasi',
    orientation: 'Akademik & Ilmiah',
    href: '/program/riset-inovasi',
  },
  {
    title: 'Program & Implementasi',
    icon: IconRocket,
    pic: 'Nita Felia Pambudi, Yasser Muhammad Syaiful',
    role: 'Executor asosiasi',
    orientation: 'Operasional',
    href: '/program/implementasi',
  },
  {
    title: 'Kemitraan & Kerjasama',
    icon: IconNetwork,
    pic: 'Victor Osman, Siti Elda Hiererra',
    role: 'Network builder',
    orientation: 'Relasional & Strategis',
    href: '/program/kemitraan',
  },
  {
    title: 'Pelatihan & Sertifikasi',
    icon: IconCertificate,
    pic: 'Andy Febrico Bintoro, Daniel Adhinugraha W.',
    role: 'Capacity builder',
    orientation: 'Profesional & Kompetensi',
    href: '/program/pelatihan-sertifikasi',
  },
]

export default function StrukturOrganisasiPage() {
  return (
    <div className="py-14">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-12">
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-semibold uppercase tracking-wider mb-4"
            style={{ background: 'var(--inopi-sand)', color: 'var(--inopi-teal)' }}
          >
            Organisasi INOPI
          </div>
          <h1 className="font-display font-bold mb-3" style={{ fontSize: 'clamp(24px,4vw,36px)', color: 'var(--inopi-espresso)' }}>
            Struktur Organisasi
          </h1>
          <p className="font-body text-[14px] max-w-xl mx-auto" style={{ color: 'var(--inopi-taupe-strong)' }}>
            Pengurus dan divisi-divisi INOPI yang bekerja sinergis untuk mewujudkan visi organisasi.
          </p>
        </div>

        {/* Dewan-Dewan */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {orgSections.map((section) => {
            const Icon = section.icon
            return (
              <div
                key={section.title}
                className="rounded-[12px] p-5 border bg-white"
                style={{ borderColor: 'var(--inopi-sand)' }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <div
                    className="w-8 h-8 rounded-[8px] flex items-center justify-center"
                    style={{ background: 'var(--inopi-sand)' }}
                  >
                    <Icon size={16} style={{ color: section.accent }} />
                  </div>
                  <h2 className="font-display font-bold text-[15px]" style={{ color: 'var(--inopi-espresso)' }}>
                    {section.title}
                  </h2>
                </div>
                <p className="font-body text-[12px] leading-relaxed mb-4" style={{ color: 'var(--inopi-taupe-strong)' }}>
                  {section.description}
                </p>
                <div className="space-y-1.5">
                  {section.members.map((member) => (
                    <div key={member} className="flex items-center gap-2">
                      <div
                        className="w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-bold text-white flex-shrink-0"
                        style={{ background: `linear-gradient(135deg, ${section.accent}, var(--inopi-espresso))` }}
                      >
                        {member.split(' ').slice(0, 2).map((n) => n[0]).join('').toUpperCase()}
                      </div>
                      <span className="font-body text-[13px]" style={{ color: 'var(--inopi-espresso)' }}>
                        {member}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        {/* Pimpinan */}
        <div className="mb-10">
          <h2 className="font-display font-bold text-[18px] mb-5 text-center" style={{ color: 'var(--inopi-espresso)' }}>
            Pimpinan & Sekretariat
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {pimpinan.map((p) => {
              return (
                <div
                  key={p.jabatan}
                  className="rounded-[12px] p-5 text-center border bg-white"
                  style={{ borderColor: 'var(--inopi-sand)' }}
                >
                  <div
                    className="w-14 h-14 rounded-full mx-auto mb-3 flex items-center justify-center text-white font-display font-bold text-[16px]"
                    style={{ background: 'linear-gradient(135deg, var(--inopi-teal), var(--inopi-espresso))' }}
                  >
                    {p.name.split(' ').slice(0, 2).map((n) => n[0]).join('').toUpperCase()}
                  </div>
                  <p className="font-body font-semibold text-[13px]" style={{ color: 'var(--inopi-espresso)' }}>
                    {p.name}
                  </p>
                  <p className="font-body text-[12px] mt-0.5" style={{ color: 'var(--inopi-teal-strong)' }}>
                    {p.jabatan}
                  </p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Divisi */}
        <div>
          <h2 className="font-display font-bold text-[18px] mb-5 text-center" style={{ color: 'var(--inopi-espresso)' }}>
            Divisi-Divisi
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {divisi.map((d) => {
              const Icon = d.icon
              return (
                <a
                  key={d.title}
                  href={d.href}
                  className="rounded-[12px] p-5 border bg-white transition-all hover:border-[var(--inopi-teal-strong)] hover:shadow-hover block"
                  style={{ borderColor: 'var(--inopi-sand)' }}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div
                      className="w-9 h-9 rounded-[8px] flex items-center justify-center"
                      style={{ background: 'var(--inopi-sand)' }}
                    >
                      <Icon size={18} style={{ color: 'var(--inopi-teal-strong)' }} />
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-[14px]" style={{ color: 'var(--inopi-espresso)' }}>
                        {d.title}
                      </h3>
                      <span className="font-body text-[11px]" style={{ color: 'var(--inopi-sage-strong)' }}>
                        {d.role} · {d.orientation}
                      </span>
                    </div>
                  </div>
                  <p className="font-body text-[12px]" style={{ color: 'var(--inopi-taupe-strong)' }}>
                    PIC: {d.pic}
                  </p>
                  <span className="font-body text-[12px] mt-2 block" style={{ color: 'var(--inopi-teal-strong)' }}>
                    Lihat Program Kerja →
                  </span>
                </a>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
