import Link from 'next/link'

interface CtaDarkProps {
  eyebrow?: string
  title: string
  description: string
  primaryCta: { label: string; href: string }
  /** Tombol tambahan, ditampilkan di antara tombol utama dan sekunder. */
  extraCta?: { label: string; href: string }
  secondaryCta?: { label: string; href: string }
  className?: string
}

export default function CtaDark({ eyebrow, title, description, primaryCta, extraCta, secondaryCta, className }: CtaDarkProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-[16px] px-8 py-12 text-center ${className ?? ''}`}
      style={{ background: 'var(--inopi-espresso)' }}
    >
      <div className="inopi-dots absolute inset-y-0 right-0 hidden w-[360px] sm:block" aria-hidden />
      <div className="relative">
        {eyebrow && (
          <p
            className="font-body text-[11px] font-semibold uppercase tracking-widest mb-4"
            style={{ color: 'var(--inopi-teal)' }}
          >
            {eyebrow}
          </p>
        )}
        <h2
          className="font-display font-bold mb-3"
          style={{ fontSize: 'clamp(22px,3vw,28px)', color: 'var(--inopi-ivory)' }}
        >
          {title}
        </h2>
        <p className="font-body text-[14px] max-w-lg mx-auto mb-7" style={{ color: 'var(--inopi-sand)' }}>
          {description}
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Link
            href={primaryCta.href}
            className="inline-flex items-center px-5 py-2.5 text-[14px] font-semibold text-white rounded-[8px] transition-all hover:-translate-y-px"
            style={{ background: 'var(--inopi-teal-strong)' }}
          >
            {primaryCta.label}
          </Link>
          {extraCta && (
            <Link
              href={extraCta.href}
              className="inline-flex items-center px-5 py-2.5 text-[14px] font-medium rounded-[8px] border transition-all hover:border-[var(--inopi-teal-strong)]"
              style={{ color: 'var(--inopi-sand)', borderColor: 'var(--inopi-sand)' }}
            >
              {extraCta.label}
            </Link>
          )}
          {secondaryCta && (
            <Link
              href={secondaryCta.href}
              className="inline-flex items-center px-5 py-2.5 text-[14px] font-medium rounded-[8px] border transition-all hover:border-[var(--inopi-teal-strong)]"
              style={{ color: 'var(--inopi-sand)', borderColor: 'var(--inopi-sand)' }}
            >
              {secondaryCta.label}
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
