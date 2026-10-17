'use client'

import { useSyncExternalStore } from 'react'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { IconCalendarEvent, IconArrowRight } from '@tabler/icons-react'
import { LAUNCH, LAUNCH_END } from '@/lib/constants/launch'

const subscribe = () => () => {}

export default function AnnouncementBar() {
  const t = useTranslations('Launch')
  const tBar = useTranslations('AnnouncementBar')
  // Dirender kosong di server: status bergantung pada waktu browser.
  const show = useSyncExternalStore(
    subscribe,
    () => Date.now() < new Date(LAUNCH_END).getTime(),
    () => false,
  )

  if (!show) return null

  return (
    <Link
      href={LAUNCH.href}
      className="group flex w-full items-center justify-center gap-2 px-4 py-2 text-center transition-opacity hover:opacity-95"
      style={{ background: 'var(--inopi-espresso)' }}
    >
      <IconCalendarEvent size={15} style={{ color: 'var(--inopi-gold)' }} className="flex-shrink-0" />
      <span className="font-body text-[12px]" style={{ color: 'var(--inopi-ivory)' }}>
        <span className="font-semibold">{t('eyebrow')}</span>
        <span className="hidden sm:inline"> — {t('dateLabel')} · {t('venue')}</span>
      </span>
      <span
        className="font-body text-[12px] font-semibold inline-flex items-center gap-1"
        style={{ color: 'var(--inopi-gold)' }}
      >
        {tBar('detail')}
        <IconArrowRight size={13} className="transition-transform group-hover:translate-x-0.5" />
      </span>
    </Link>
  )
}
