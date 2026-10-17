'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { toast } from 'sonner'
import { IconCheck, IconCopy } from '@tabler/icons-react'

export default function CopyButton({ value, label, onDark = false }: { value: string; label: string; onDark?: boolean }) {
  const t = useTranslations('CopyButton')
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      toast.success(t('copied', { label }))
      setTimeout(() => setCopied(false), 2000)
    } catch {
      toast.error(t('failed'))
    }
  }
  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-[6px] border font-body text-[12px] transition-colors hover:border-[var(--inopi-teal-strong)]"
      style={{
        borderColor: onDark ? 'var(--inopi-taupe)' : 'var(--inopi-sand)',
        color: onDark ? 'var(--inopi-ivory)' : 'var(--inopi-teal-strong)',
      }}
    >
      {copied ? <IconCheck size={13} /> : <IconCopy size={13} />}
      {copied ? t('done') : t('copy')}
    </button>
  )
}
