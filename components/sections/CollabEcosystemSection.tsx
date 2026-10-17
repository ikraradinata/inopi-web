import Link from 'next/link'
import { COLLAB_ECOSYSTEM } from '@/lib/constants/homeContent'

// Sengaja tanpa logo mitra sampai ada kerja sama bertanda tangan dan izin logo.
export default function CollabEcosystemSection() {
  return (
    <section className="py-14" style={{ background: 'var(--inopi-ivory)' }}>
      <div className="container">
        <p
          className="font-body text-[11px] font-semibold uppercase tracking-widest mb-3"
          style={{ color: 'var(--inopi-teal-strong)' }}
        >
          Ekosistem Kolaborasi
        </p>
        <h2
          className="font-display font-bold mb-8"
          style={{ fontSize: 'clamp(22px,3.2vw,30px)', color: 'var(--inopi-espresso)' }}
        >
          Siapa saja yang kami ajak bekerja sama
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {COLLAB_ECOSYSTEM.map((g) => (
            <div key={g.title} className="rounded-[12px] p-5" style={{ background: 'var(--inopi-sand)' }}>
              <h3 className="font-display font-semibold text-[15px] mb-2" style={{ color: 'var(--inopi-espresso)' }}>
                {g.title}
              </h3>
              <p className="font-body text-[13px] leading-relaxed" style={{ color: 'var(--inopi-espresso)' }}>
                {g.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <Link
            href="/kemitraan"
            className="inline-flex items-center px-5 py-2.5 text-[14px] font-semibold text-white rounded-[8px] transition-all hover:-translate-y-px"
            style={{ background: 'var(--inopi-espresso)' }}
          >
            Ajukan Kemitraan
          </Link>
        </div>
      </div>
    </section>
  )
}
