import Link from 'next/link'
import { PRIORITY_PROGRAMS, type PriorityStatus } from '@/lib/constants/homeContent'

// Lencana: teks espresso di atas gold/sand, teks putih hanya di atas teal-strong.
const statusStyle: Record<PriorityStatus, { background: string; color: string }> = {
  'Berlangsung 26 Okt 2026': { background: 'var(--inopi-teal-strong)', color: '#fff' },
  Direncanakan: { background: 'var(--inopi-sand)', color: 'var(--inopi-espresso)' },
  'Terbuka untuk kolaborasi': { background: 'var(--inopi-gold)', color: 'var(--inopi-espresso)' },
}

export default function PriorityProgramsSection() {
  return (
    <section className="py-14 bg-white">
      <div className="container">
        <p
          className="font-body text-[11px] font-semibold uppercase tracking-widest mb-3"
          style={{ color: 'var(--inopi-teal-strong)' }}
        >
          Program Prioritas Tahun Pertama
        </p>
        <h2
          className="font-display font-bold mb-8"
          style={{ fontSize: 'clamp(22px,3.2vw,30px)', color: 'var(--inopi-espresso)' }}
        >
          Lima langkah awal INOPI
        </h2>

        <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {PRIORITY_PROGRAMS.map((p) => (
            <li
              key={p.no}
              className="rounded-[12px] p-5 border flex flex-col"
              style={{ borderColor: 'var(--inopi-sand)', background: 'var(--inopi-ivory)' }}
            >
              <span className="font-display font-bold text-[28px] leading-none mb-3" style={{ color: 'var(--inopi-orange)' }}>
                {p.no}
              </span>
              <h3 className="font-display font-semibold text-[15px] mb-2" style={{ color: 'var(--inopi-espresso)' }}>
                {p.title}
              </h3>
              <p className="font-body text-[13px] leading-relaxed mb-4 flex-1" style={{ color: 'var(--inopi-taupe-strong)' }}>
                {p.desc}
              </p>
              <span
                className="self-start text-[11px] font-semibold px-2.5 py-1 rounded-full"
                style={statusStyle[p.status]}
              >
                {p.status}
              </span>
            </li>
          ))}
        </ol>

        <div className="mt-8">
          <Link
            href="/program"
            className="font-body text-[14px] font-semibold underline underline-offset-4 hover:text-[var(--inopi-teal-strong)] transition-colors"
            style={{ color: 'var(--inopi-espresso)' }}
          >
            Lihat semua program
          </Link>
        </div>
      </div>
    </section>
  )
}
