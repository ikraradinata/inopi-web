import Link from 'next/link'

interface CtaDarkProps {
  eyebrow?: string
  title: string
  description: string
  primaryCta: { label: string; href: string }
  secondaryCta?: { label: string; href: string }
  className?: string
}

export default function CtaDark({ eyebrow, title, description, primaryCta, secondaryCta, className }: CtaDarkProps) {
  return (
    <div
      className={`rounded-[16px] px-8 py-12 text-center ${className ?? ''}`}
      style={{ background: '#071422' }}
    >
      {eyebrow && (
        <p
          className="font-body text-[11px] font-semibold uppercase tracking-widest mb-4"
          style={{ color: '#5dd4c8' }}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className="font-display font-bold mb-3"
        style={{ fontSize: 'clamp(22px,3vw,28px)', color: '#ffffff' }}
      >
        {title}
      </h2>
      <p className="font-body text-[14px] max-w-lg mx-auto mb-7" style={{ color: '#8fa5b5' }}>
        {description}
      </p>
      <div className="flex flex-wrap gap-3 justify-center">
        <Link
          href={primaryCta.href}
          className="inline-flex items-center px-5 py-2.5 text-[14px] font-semibold text-white rounded-[8px] transition-all hover:-translate-y-px"
          style={{ background: '#0d9488' }}
        >
          {primaryCta.label}
        </Link>
        {secondaryCta && (
          <Link
            href={secondaryCta.href}
            className="inline-flex items-center px-5 py-2.5 text-[14px] font-medium rounded-[8px] border transition-all hover:border-[#0d9488]"
            style={{ color: '#8fa5b5', borderColor: '#1a2e40' }}
          >
            {secondaryCta.label}
          </Link>
        )}
      </div>
    </div>
  )
}
