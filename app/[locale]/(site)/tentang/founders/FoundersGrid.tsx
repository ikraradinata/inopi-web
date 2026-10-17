'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import {
  FOUNDERS,
  FOUNDER_GROUPS,
  DIVISION_GROUPS,
  type Founder,
  type FounderGroup,
} from '@/lib/constants/founders'

function Avatar({ founder, size }: { founder: Founder; size: number }) {
  if (founder.photo) {
    return (
      <Image
        src={`/founders/${founder.photo}.jpg`}
        alt={founder.name}
        width={size}
        height={size}
        className="rounded-full object-cover"
        style={{ width: size, height: size, objectPosition: 'center top' }}
      />
    )
  }
  return (
    <div
      className="rounded-full flex items-center justify-center font-display font-bold"
      style={{
        width: size,
        height: size,
        fontSize: size * 0.3,
        background: 'var(--inopi-sand)',
        color: 'var(--inopi-taupe-strong)',
      }}
    >
      {founder.initials}
    </div>
  )
}

function FounderCard({
  founder,
  onSelect,
  showRole,
  featured,
}: {
  founder: Founder
  onSelect: (f: Founder) => void
  showRole: boolean
  featured?: boolean
}) {
  const t = useTranslations('Founders')
  return (
    <button
      onClick={() => onSelect(founder)}
      className="text-left rounded-[12px] p-4 border bg-white transition-all hover:border-[var(--inopi-teal-strong)] hover:shadow-hover hover:scale-[1.02]"
      style={{ borderColor: featured ? 'var(--inopi-taupe)' : 'var(--inopi-sand)' }}
    >
      <div className="flex justify-center mb-3">
        <Avatar founder={founder} size={featured ? 88 : 72} />
      </div>
      <p
        className="font-body font-semibold text-[13px] text-center leading-snug"
        style={{ color: 'var(--inopi-espresso)' }}
      >
        {founder.name}
      </p>
      {showRole && (
        <p
          className="font-body text-[12px] text-center mt-0.5 leading-tight"
          style={{ color: 'var(--inopi-teal-strong)' }}
        >
          {t(`roles.${founder.role}`)}
        </p>
      )}
      {founder.institution && (
        <p
          className="font-body text-[11px] text-center mt-1 leading-tight line-clamp-2"
          style={{ color: 'var(--inopi-sage-strong)' }}
        >
          {founder.institution}
        </p>
      )}
    </button>
  )
}

function GroupHeading({ label, count }: { label: string; count: number }) {
  const t = useTranslations('Founders')
  return (
    <div className="flex items-center gap-3 mb-4">
      <h2
        className="font-display font-bold text-[15px] uppercase tracking-wider whitespace-nowrap"
        style={{ color: 'var(--inopi-espresso)' }}
      >
        {label}
      </h2>
      <span
        className="font-body text-[12px] tabular-nums flex-shrink-0"
        style={{ color: 'var(--inopi-sage-strong)' }}
      >
        {t('peopleCount', { count })}
      </span>
      <span className="flex-1 h-px" style={{ background: 'var(--inopi-sand)' }} />
    </div>
  )
}

export default function FoundersGrid() {
  const t = useTranslations('Founders')
  const [selected, setSelected] = useState<Founder | null>(null)

  const byGroup = (g: FounderGroup) => FOUNDERS.filter((f) => f.group === g)
  const councils = FOUNDER_GROUPS.filter((g) => ['pembina', 'pengawas', 'pakar'].includes(g.id))
  const pengurus = byGroup('pengurus')
  const divisions = FOUNDER_GROUPS.filter((g) => DIVISION_GROUPS.includes(g.id))

  return (
    <>
      <div className="flex flex-col gap-12">
        {/* Dewan */}
        {councils.map((g) => {
          const members = byGroup(g.id)
          return (
            <section key={g.id}>
              <GroupHeading label={t(`groups.${g.id}`)} count={members.length} />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {members.map((f) => (
                  <FounderCard key={f.name} founder={f} onSelect={setSelected} showRole={false} />
                ))}
              </div>
            </section>
          )
        })}

        {/* Pengurus Harian */}
        <section>
          <GroupHeading label={t('groups.pengurus')} count={pengurus.length} />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {pengurus.map((f) => (
              <FounderCard key={f.name} founder={f} onSelect={setSelected} showRole featured />
            ))}
          </div>
        </section>

        {/* Divisi */}
        <section>
          <GroupHeading label={t('divisions')} count={divisions.reduce((n, g) => n + byGroup(g.id).length, 0)} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8">
            {divisions.map((g) => (
              <div key={g.id}>
                <p
                  className="font-body text-[12px] font-semibold uppercase tracking-wider mb-3"
                  style={{ color: 'var(--inopi-orange-strong)' }}
                >
                  {t(`groups.${g.id}`)}
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {byGroup(g.id).map((f) => (
                    <FounderCard key={f.name} founder={f} onSelect={setSelected} showRole />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent className="max-w-md">
          {selected && (
            <>
              <DialogHeader>
                <div className="mb-3">
                  <Avatar founder={selected} size={80} />
                </div>
                <DialogTitle className="font-display text-[18px] leading-snug" style={{ color: 'var(--inopi-espresso)' }}>
                  {selected.fullName ?? selected.name}
                </DialogTitle>
              </DialogHeader>

              <span
                className="inline-flex self-start items-center px-2.5 py-1 rounded-full font-body text-[11px] font-semibold uppercase tracking-wider"
                style={{ background: 'var(--inopi-sand)', color: 'var(--inopi-espresso)' }}
              >
                {t(`roles.${selected.role}`)}
              </span>

              {selected.title && (
                <p className="text-[13px] font-medium mt-3 leading-snug" style={{ color: 'var(--inopi-espresso)' }}>
                  {selected.title}
                </p>
              )}
              {selected.institution && (
                <p className="text-[13px] leading-snug" style={{ color: 'var(--inopi-taupe-strong)' }}>
                  {selected.institution}
                </p>
              )}

              {selected.message ? (
                <blockquote
                  className="text-[13px] leading-relaxed italic mt-4 pl-3"
                  style={{ color: 'var(--inopi-taupe-strong)', borderLeft: '2px solid var(--inopi-sand)' }}
                >
                  “{selected.message}”
                </blockquote>
              ) : (
                <p className="text-[13px] leading-relaxed mt-4" style={{ color: 'var(--inopi-sage-strong)' }}>
                  {t('profileSoon')}
                </p>
              )}
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
