import type { Metadata } from 'next'
import ThankYou from '@/components/sections/ThankYou'
import CopyButton from '@/components/ui/CopyButton'
import { getPlan } from '@/lib/constants/membership'
import { ASSOCIATION_EMAIL, BANK_ACCOUNT, formatRupiah, isBankConfigured } from '@/lib/constants/registration'

export const metadata: Metadata = {
  title: { absolute: 'Terima Kasih — INOPI' },
  robots: { index: false },
}

const label = 'font-body text-[11px] uppercase tracking-wider'

export default async function KeanggotaanTerimaKasihPage({
  searchParams,
}: {
  searchParams: Promise<{ reg?: string; k?: string }>
}) {
  const { reg, k } = await searchParams
  const plan = getPlan(k ?? '')
  // Nomor registrasi hanya ditampilkan bila bentuknya sah (INOPI-2026-XXXXXX).
  const registrationId = reg && /^INOPI-\d{4}-[A-Z0-9]{6}$/.test(reg) ? reg : null

  return (
    <ThankYou
      title="Terima kasih, pendaftaran Anda sudah kami terima."
      text="Tim INOPI akan memeriksa data Anda dan mengirimkan informasi selanjutnya ke email yang Anda daftarkan."
      actions={[
        { label: 'Kembali ke Beranda', href: '/' },
        { label: 'Lihat Acara INOPI', href: '/acara' },
      ]}
    >
      {registrationId && plan && (
        <div className="text-left mb-8 space-y-4">
          <div className="rounded-[12px] p-5 border" style={{ borderColor: 'var(--inopi-sand)', background: 'var(--inopi-ivory)' }}>
            <div className="flex justify-between items-baseline gap-4 mb-3 pb-3" style={{ borderBottom: '1px solid var(--inopi-sand)' }}>
              <span className={label} style={{ color: 'var(--inopi-taupe-strong)' }}>Nomor Registrasi</span>
              <span className="font-display font-bold text-[15px] tabular-nums" style={{ color: 'var(--inopi-espresso)' }}>
                {registrationId}
              </span>
            </div>
            <div className="flex justify-between items-baseline gap-4">
              <div>
                <p className={label} style={{ color: 'var(--inopi-taupe-strong)' }}>Kategori</p>
                <p className="font-body text-[14px] font-medium" style={{ color: 'var(--inopi-espresso)' }}>
                  {plan.name}
                  {plan.note ? ` · ${plan.note}` : ''}
                </p>
              </div>
              <span className="font-display font-bold text-[22px]" style={{ color: 'var(--inopi-orange)' }}>
                {formatRupiah(plan.amount)}
              </span>
            </div>
          </div>

          <div className="rounded-[12px] p-5 border" style={{ borderColor: 'var(--inopi-sand)' }}>
            <h2 className="font-display font-semibold text-[14px] mb-3" style={{ color: 'var(--inopi-espresso)' }}>
              Pembayaran iuran
            </h2>
            {isBankConfigured() ? (
              <>
                <p className="font-body text-[14px] font-medium" style={{ color: 'var(--inopi-espresso)' }}>
                  {BANK_ACCOUNT.bank} · a.n. {BANK_ACCOUNT.accountName}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <p className="font-display font-bold text-[20px] tabular-nums tracking-wide" style={{ color: 'var(--inopi-espresso)' }}>
                    {BANK_ACCOUNT.accountNumber}
                  </p>
                  <CopyButton value={BANK_ACCOUNT.accountNumber} label="Nomor rekening" />
                </div>
                {BANK_ACCOUNT.note && (
                  <p className="font-body text-[12px] mt-2" style={{ color: 'var(--inopi-taupe-strong)' }}>
                    {BANK_ACCOUNT.note}
                  </p>
                )}
                <p
                  className="font-body text-[12px] leading-relaxed mt-4 pt-3"
                  style={{ color: 'var(--inopi-taupe-strong)', borderTop: '1px solid var(--inopi-sand)' }}
                >
                  Cantumkan nomor registrasi pada berita transfer, lalu kirim bukti transfer ke {ASSOCIATION_EMAIL}.
                </p>
              </>
            ) : (
              <p className="font-body text-[13px] leading-relaxed" style={{ color: 'var(--inopi-taupe-strong)' }}>
                Informasi pembayaran dikirim melalui email setelah data pendaftaran diverifikasi. Simpan nomor
                registrasi di atas sebagai rujukan.
              </p>
            )}
          </div>
        </div>
      )}
    </ThankYou>
  )
}
