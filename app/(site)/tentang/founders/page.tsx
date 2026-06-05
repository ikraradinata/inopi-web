import type { Metadata } from 'next'
import FoundersGrid from './FoundersGrid'

export const metadata: Metadata = {
  title: 'Para Pendiri INOPI',
  description: '26 tokoh terkemuka dari akademik, industri, dan komunitas profesional pendiri INOPI.',
}

export default function FoundersPage() {
  return (
    <div className="py-14">
      <div className="container">
        <div className="text-center mb-10">
          <p className="font-body text-[11px] font-semibold uppercase tracking-widest mb-3" style={{ color: '#0d9488' }}>
            Tentang INOPI
          </p>
          <h1 className="font-display font-bold mb-3" style={{ fontSize: 'clamp(24px,4vw,36px)', color: '#071422' }}>
            Para Pendiri INOPI
          </h1>
          <p className="font-body text-[14px] max-w-xl mx-auto" style={{ color: '#4a6070' }}>
            26 tokoh terkemuka dari akademik, industri, dan komunitas profesional yang bersama-sama mendirikan INOPI pada 11 April 2026.
          </p>
        </div>
        <FoundersGrid />
      </div>
    </div>
  )
}
