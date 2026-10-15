'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { FOUNDERS, type Founder } from '@/lib/constants/founders'

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

export default function FoundersGrid() {
  const [selected, setSelected] = useState<Founder | null>(null)

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {FOUNDERS.map((f) => (
          <button
            key={f.name}
            onClick={() => setSelected(f)}
            className="text-left rounded-[12px] p-4 border bg-white transition-all hover:border-[var(--inopi-teal-strong)] hover:shadow-hover hover:scale-[1.02]"
            style={{ borderColor: 'var(--inopi-sand)' }}
          >
            <div className="flex justify-center mb-3">
              <Avatar founder={f} size={72} />
            </div>
            <p
              className="font-body font-semibold text-[13px] text-center leading-snug"
              style={{ color: 'var(--inopi-espresso)' }}
            >
              {f.name}
            </p>
            <p
              className="font-body text-[12px] text-center mt-0.5 leading-tight"
              style={{ color: 'var(--inopi-teal-strong)' }}
            >
              {f.role}
            </p>
            {f.institution && (
              <p
                className="font-body text-[11px] text-center mt-1 leading-tight line-clamp-2"
                style={{ color: 'var(--inopi-sage-strong)' }}
              >
                {f.institution}
              </p>
            )}
          </button>
        ))}
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
                {selected.role}
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
                  Profil lengkap akan segera ditambahkan.
                </p>
              )}
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
