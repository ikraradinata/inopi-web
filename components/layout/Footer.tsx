import Link from 'next/link'
import Logo from '@/components/ui/Logo'

// Ikon media sosial dan newsletter disembunyikan sampai akun resmi dan
// layanan berlangganan tersedia (docs/01_RENCANA_PERUBAHAN_STRUKTUR.md, bagian 3).
const footerGroups = [
  {
    title: 'Organisasi',
    links: [
      { label: 'Tentang', href: '/tentang' },
      { label: 'Struktur Organisasi', href: '/tentang/struktur-organisasi' },
      { label: 'Founder', href: '/tentang/founders' },
      { label: 'Tata Kelola & Legal', href: '/tentang/tata-kelola' },
    ],
  },
  {
    title: 'Program',
    links: [
      { label: 'Program', href: '/program' },
      { label: 'Kemitraan', href: '/kemitraan' },
      { label: 'Acara', href: '/acara' },
      { label: 'Wawasan', href: '/riset' },
    ],
  },
  {
    title: 'Bergabung',
    links: [
      { label: 'Keanggotaan', href: '/keanggotaan' },
      { label: 'Daftar Anggota', href: '/keanggotaan/daftar' },
      { label: 'Ajukan Kemitraan', href: '/kemitraan' },
      { label: 'Kontak', href: '/kontak' },
    ],
  },
  {
    title: 'Legal',
    links: [{ label: 'Kebijakan Privasi', href: '/privacy' }],
  },
]

export default function Footer() {
  return (
    <footer style={{ background: 'var(--inopi-espresso)' }} className="pb-6">
      <svg
        aria-hidden
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        style={{ display: 'block', width: '100%', height: '90px', opacity: 0.28 }}
      >
        <path d="M0 70 C 240 10, 480 120, 720 60 S 1200 0, 1440 50 L1440 0 L0 0 Z" fill="var(--inopi-orange)" />
        <path d="M0 90 C 300 30, 600 120, 900 70 S 1300 20, 1440 70 L1440 0 L0 0 Z" fill="var(--inopi-gold)" opacity={0.7} />
        <path d="M0 40 C 260 100, 620 0, 960 50 S 1320 90, 1440 30 L1440 0 L0 0 Z" fill="var(--inopi-teal)" opacity={0.8} />
      </svg>
      <div className="container pt-14">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 mb-10">
          {/* Col 1 */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <div className="mb-3">
              <Logo light={true} />
            </div>
            <p className="text-[13px] leading-relaxed mb-4" style={{ color: 'var(--inopi-sand)' }}>
              Asosiasi Inovasi Pembelajaran Indonesia. Membangun ekosistem inovasi pembelajaran berbasis AI dan kolaborasi nasional.
            </p>
          </div>

          {footerGroups.map((group) => (
            <div key={group.title}>
              <h4 className="text-white text-[13px] font-semibold mb-4 font-display">{group.title}</h4>
              <ul className="space-y-2.5">
                {group.links.map((l) => (
                  <li key={group.title + l.label}>
                    <Link href={l.href} className="text-[13px] transition-colors hover:text-[var(--inopi-teal)]" style={{ color: 'var(--inopi-sand)' }}>
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-6" style={{ borderTop: '1px solid var(--inopi-espresso)' }}>
          <p className="text-[12px] text-center" style={{ color: 'var(--inopi-sand)' }}>
            © {new Date().getFullYear()} INOPI, Advancing Academic Excellence through Technology.
          </p>
        </div>
      </div>
    </footer>
  )
}
