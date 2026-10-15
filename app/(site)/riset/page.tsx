import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Riset & Publikasi',
  description: 'Database publikasi dan hasil riset INOPI.',
}

export default function RisetPage() {
  return (
    <div className="py-14">
      <div className="container max-w-3xl">
        <h1 className="font-display font-bold mb-3" style={{ fontSize: 'clamp(24px,4vw,36px)', color: 'var(--inopi-espresso)' }}>
          Riset & Publikasi
        </h1>
        <p className="font-body text-[14px]" style={{ color: 'var(--inopi-taupe-strong)' }}>
          Portal riset dan database publikasi INOPI akan segera tersedia. Konten akan dikelola melalui Sanity CMS.
        </p>
      </div>
    </div>
  )
}
