'use client'

import { useLocale, useTranslations } from 'next-intl'
import CopyButton from '@/components/ui/CopyButton'
import { formatRupiah } from '@/lib/constants/registration'

export interface Reservation {
  token: string
  uniqueCode: number
  baseAmount: number
  transferAmount: number
  bank: { bank: string; accountNumber: string; accountName: string } | null
}

/** Kartu rekening tujuan + jumlah transfer dengan kode unik. Dipakai jalur A dan Corporate. */
export default function PaymentBox({ reservation }: { reservation: Reservation }) {
  const t = useTranslations('MembershipForm')
  const locale = useLocale()
  const money = (n: number) => formatRupiah(n, locale)
  const full = money(reservation.transferAmount)
  const divider = { borderTop: '1px solid color-mix(in srgb, var(--inopi-ivory) 25%, transparent)' }

  return (
    <div className="rounded-[14px] p-4 sm:p-5 mb-5" style={{ background: 'var(--inopi-espresso)', color: 'var(--inopi-ivory)' }}>
      <p className="font-body text-[11px] font-semibold uppercase tracking-widest mb-3" style={{ color: 'var(--inopi-gold)' }}>
        {t('pay.transferTo')}
      </p>
      {reservation.bank ? (
        <dl className="flex flex-col gap-3">
          <div>
            <dt className="font-body text-[11px]" style={{ color: 'var(--inopi-sand)' }}>{t('pay.bank')}</dt>
            <dd className="font-body text-[15px] font-medium">{reservation.bank.bank}</dd>
          </div>
          <div>
            <dt className="font-body text-[11px]" style={{ color: 'var(--inopi-sand)' }}>{t('pay.accountNumber')}</dt>
            <dd className="flex items-center gap-3 flex-wrap">
              <span className="font-display font-bold text-[22px] tabular-nums tracking-wide">{reservation.bank.accountNumber}</span>
              <CopyButton onDark value={reservation.bank.accountNumber.replace(/\s/g, '')} label={t('pay.accountNumber')} />
            </dd>
          </div>
          <div>
            <dt className="font-body text-[11px]" style={{ color: 'var(--inopi-sand)' }}>{t('pay.accountName')}</dt>
            <dd className="font-body text-[15px] font-medium">{reservation.bank.accountName}</dd>
          </div>
        </dl>
      ) : (
        <p className="font-body text-[13px]" style={{ color: 'var(--inopi-sand)' }}>{t('pay.bankMissing')}</p>
      )}

      <div className="mt-4 pt-4" style={divider}>
        <p className="font-body text-[11px]" style={{ color: 'var(--inopi-sand)' }}>{t('pay.amount')}</p>
        <div className="flex items-center gap-3 flex-wrap mt-0.5">
          <span className="font-display font-bold text-[28px] tabular-nums leading-tight" aria-label={full}>
            {full.slice(0, -3)}
            <mark className="rounded px-1 ml-0.5" style={{ background: 'var(--inopi-gold)', color: 'var(--inopi-espresso)' }}>
              {full.slice(-3)}
            </mark>
          </span>
          <CopyButton onDark value={String(reservation.transferAmount)} label={t('pay.amount')} />
        </div>
        <p className="font-body text-[12px] mt-2" style={{ color: 'var(--inopi-sand)' }}>
          {t('pay.breakdown', { base: money(reservation.baseAmount), code: String(reservation.uniqueCode).padStart(3, '0') })}
        </p>
        <p className="font-body text-[12px] mt-1 leading-relaxed" style={{ color: 'var(--inopi-sand)' }}>
          {t('pay.uniqueHint')}
        </p>
      </div>
    </div>
  )
}
