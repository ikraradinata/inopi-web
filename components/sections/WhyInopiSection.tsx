import { WHY_INOPI } from '@/lib/constants/homeContent'

export default function WhyInopiSection() {
  return (
    <section className="py-14" style={{ background: 'var(--inopi-ivory)' }}>
      <div className="container">
        <div className="max-w-3xl mb-8">
          <p
            className="font-body text-[11px] font-semibold uppercase tracking-widest mb-3"
            style={{ color: 'var(--inopi-teal-strong)' }}
          >
            {WHY_INOPI.eyebrow}
          </p>
          <h2
            className="font-display font-bold mb-4"
            style={{ fontSize: 'clamp(22px,3.2vw,30px)', color: 'var(--inopi-espresso)' }}
          >
            {WHY_INOPI.title}
          </h2>
          <p className="font-body text-[14px] leading-relaxed" style={{ color: 'var(--inopi-taupe-strong)' }}>
            {WHY_INOPI.body}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {WHY_INOPI.cards.map((c) => (
            <div
              key={c.title}
              className="rounded-[12px] p-5 border bg-white"
              style={{ borderColor: 'var(--inopi-sand)' }}
            >
              <h3 className="font-display font-semibold text-[15px] mb-2" style={{ color: 'var(--inopi-espresso)' }}>
                {c.title}
              </h3>
              <p className="font-body text-[13px] leading-relaxed" style={{ color: 'var(--inopi-taupe-strong)' }}>
                {c.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
