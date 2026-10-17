import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: { absolute: 'Tata Kelola & Informasi Legal — INOPI' },
  description:
    'Identitas badan hukum, struktur tata kelola, dan akuntabilitas Perkumpulan Asosiasi Inovasi Pembelajaran Indonesia.',
}

// Baris dengan data yang belum diputuskan pengurus (nomor SK pengesahan, NPWP,
// alamat kedudukan) sengaja belum ditampilkan. Tambahkan setelah ada keputusan.
const identity = [
  ['Nama resmi', 'Perkumpulan Asosiasi Inovasi Pembelajaran Indonesia (INOPI)'],
  ['Bentuk', 'Perkumpulan berbadan hukum, tidak berorientasi pada keuntungan'],
  ['Akta pendirian', 'Nomor 122, tanggal 30 Maret 2026, Notaris Ahmad Fadillah, S.H., M.Kn., Kota Cirebon'],
  ['Asas', 'Pancasila dan Undang-Undang Dasar 1945'],
]

const governance = [
  { title: 'Dewan Pembina', desc: 'Menjaga visi jangka panjang dan membuka akses ke ekosistem kebijakan pendidikan nasional.' },
  { title: 'Dewan Pengawas', desc: 'Memastikan program dan keuangan berjalan sesuai AD/ART dan regulasi.' },
  { title: 'Dewan Pakar', desc: 'Memberikan legitimasi akademik dan arah inovasi berbasis bukti.' },
  {
    title: 'Dewan Pengurus Inti',
    desc: 'Ketua, Wakil Ketua, Sekretaris, dan Bendahara, yang menjalankan organisasi sehari-hari bersama empat divisi.',
  },
]

const h2 = 'font-display font-bold text-[20px] mb-5'

export default function TataKelolaPage() {
  return (
    <div className="py-14">
      <div className="container max-w-3xl">
        <h1 className="font-display font-bold mb-3" style={{ fontSize: 'clamp(24px,4vw,36px)', color: 'var(--inopi-espresso)' }}>
          Tata Kelola &amp; Informasi Legal
        </h1>
        <p className="font-body text-[14px] leading-relaxed mb-10" style={{ color: 'var(--inopi-taupe-strong)' }}>
          INOPI dikelola secara terbuka dan akuntabel sesuai Anggaran Dasar, Anggaran Rumah Tangga, dan peraturan
          perundang-undangan yang berlaku.
        </p>

        <h2 className={h2} style={{ color: 'var(--inopi-espresso)' }}>Identitas Badan Hukum</h2>
        <dl className="rounded-[12px] border bg-white mb-12 overflow-hidden" style={{ borderColor: 'var(--inopi-sand)' }}>
          {identity.map(([k, v], i) => (
            <div
              key={k}
              className="grid grid-cols-1 sm:grid-cols-[180px_1fr] gap-1 sm:gap-4 px-5 py-3.5"
              style={{ borderTop: i === 0 ? 'none' : '1px solid var(--inopi-sand)' }}
            >
              <dt className="font-body text-[13px] font-medium" style={{ color: 'var(--inopi-taupe-strong)' }}>{k}</dt>
              <dd className="font-body text-[14px]" style={{ color: 'var(--inopi-espresso)' }}>{v}</dd>
            </div>
          ))}
        </dl>

        <h2 className={h2} style={{ color: 'var(--inopi-espresso)' }}>Struktur Tata Kelola</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          {governance.map((g) => (
            <div key={g.title} className="rounded-[12px] p-5" style={{ background: 'var(--inopi-sand)' }}>
              <h3 className="font-display font-semibold text-[15px] mb-1.5" style={{ color: 'var(--inopi-espresso)' }}>{g.title}</h3>
              <p className="font-body text-[13px] leading-relaxed" style={{ color: 'var(--inopi-espresso)' }}>{g.desc}</p>
            </div>
          ))}
        </div>
        <p className="font-body text-[13px] mb-12" style={{ color: 'var(--inopi-taupe-strong)' }}>
          Nama-nama pengurus dapat dilihat di{' '}
          <Link href="/tentang/struktur-organisasi" className="underline" style={{ color: 'var(--inopi-teal-strong)' }}>
            halaman Struktur Organisasi
          </Link>
          .
        </p>

        <h2 className={h2} style={{ color: 'var(--inopi-espresso)' }}>Akuntabilitas</h2>
        <ul className="list-disc pl-5 space-y-2 font-body text-[14px] leading-relaxed" style={{ color: 'var(--inopi-taupe-strong)' }}>
          <li>Laporan kegiatan dan dampak program akan dipublikasikan setiap akhir tahun di website.</li>
          <li>
            Pertanyaan terkait tata kelola dapat diajukan melalui halaman{' '}
            <Link href="/kontak" className="underline" style={{ color: 'var(--inopi-teal-strong)' }}>Kontak</Link>{' '}
            dengan topik &ldquo;Umum&rdquo;.
          </li>
        </ul>
      </div>
    </div>
  )
}
