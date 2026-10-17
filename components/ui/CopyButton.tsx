'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import { IconCheck, IconCopy } from '@tabler/icons-react'

export default function CopyButton({ value, label }: { value: string; label: string }) {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      toast.success(`${label} disalin`)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      toast.error('Gagal menyalin. Silakan salin manual.')
    }
  }
  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-[6px] border font-body text-[12px] transition-colors hover:border-[var(--inopi-teal-strong)]"
      style={{ borderColor: 'var(--inopi-sand)', color: 'var(--inopi-teal-strong)' }}
    >
      {copied ? <IconCheck size={13} /> : <IconCopy size={13} />}
      {copied ? 'Tersalin' : 'Salin'}
    </button>
  )
}
