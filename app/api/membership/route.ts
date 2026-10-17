import { NextResponse } from 'next/server'
import { keanggotaanSchema } from '@/lib/schemas/keanggotaan'
import { getPlan } from '@/lib/constants/membershipText'
import {
  ASSOCIATION_EMAIL,
  BANK_ACCOUNT,
  generateRegistrationId,
  formatRupiah,
  isBankConfigured,
} from '@/lib/constants/registration'
import { FAILURE_MESSAGE } from '@/lib/constants/kemitraan'
import { sendEmail } from '@/lib/email'
import { appendToSheet } from '@/lib/sheet'
import { guardForm, oneLine } from '@/lib/spam'

const jakartaTime = (d: Date) =>
  new Intl.DateTimeFormat('id-ID', {
    dateStyle: 'full',
    timeStyle: 'short',
    timeZone: 'Asia/Jakarta',
  }).format(d)

export async function POST(req: Request) {
  const guard = await guardForm(req, 'keanggotaan')
  if (!guard.ok) return guard.response

  const parsed = keanggotaanSchema.safeParse(guard.body)
  if (!parsed.success) {
    return NextResponse.json(
      { success: false, message: 'Data pendaftaran belum lengkap atau tidak valid.' },
      { status: 400 },
    )
  }

  const data = parsed.data
  const bidang = data.bidang?.join(', ') ?? ''
  const plan = getPlan(data.category)!
  const registrationId = generateRegistrationId()
  const submittedAt = new Date()

  // Selalu dicatat di log server agar pendaftaran tetap terekam meski email gagal.
  console.log('[membership] Pendaftaran baru:', {
    registrationId,
    submittedAt: submittedAt.toISOString(),
    ...data,
    amount: plan.amount,
  })

  const rekening = isBankConfigured()
    ? `${BANK_ACCOUNT.bank} — ${BANK_ACCOUNT.accountNumber} a.n. ${BANK_ACCOUNT.accountName}`
    : '(rekening belum dikonfigurasi di situs)'

  const notification = [
    'Pendaftaran keanggotaan INOPI baru.',
    '',
    `Nomor registrasi : ${registrationId}`,
    `Waktu            : ${jakartaTime(submittedAt)} WIB`,
    '',
    `Kategori         : ${plan.name}`,
    `Iuran            : ${formatRupiah(plan.amount)}${plan.note ? ` (${plan.note})` : ''}`,
    '',
    `Nama             : ${data.nama}`,
    `Email            : ${data.email}`,
    `No. HP           : ${data.hp}`,
    `Institusi        : ${data.institusi}`,
    `Jabatan/peran    : ${data.jabatan || '-'}`,
    `Bidang minat     : ${bidang || '-'}`,
    `Alasan bergabung : ${data.alasan || '-'}`,
    `Terima info      : ${data.infoKegiatan ? 'Ya' : 'Tidak'}`,
    'Persetujuan privasi : Ya',
    '',
    `Rekening tujuan  : ${rekening}`,
    '',
    'Pendaftar diminta mentransfer iuran dan mengirim bukti transfer.',
    'Mohon dicocokkan dengan mutasi rekening sebelum keanggotaan diaktifkan.',
  ].join('\n')

  const result = await sendEmail({
    to: ASSOCIATION_EMAIL,
    subject: `[INOPI] Pendaftaran ${plan.name} — ${oneLine(data.nama)} (${registrationId})`,
    text: notification,
    replyTo: data.email,
  })

  if (!result.delivered) {
    console.error('[membership] Notifikasi email tidak terkirim:', result.reason, { registrationId })
  }

  const sheetResult = await appendToSheet({
    registrationId,
    submittedAt,
    category: plan.name,
    amount: plan.amount,
    nama: data.nama,
    email: data.email,
    hp: data.hp,
    institusi: data.institusi,
    bidang,
    jabatan: data.jabatan,
    alasan: data.alasan,
    infoKegiatan: data.infoKegiatan,
  })

  if (!sheetResult.recorded && sheetResult.reason !== 'not_configured') {
    console.error('[membership] Gagal mencatat ke Sheet:', sheetResult.reason, { registrationId })
  }

  // Bila email dan Sheet sama-sama gagal, data hanya ada di log server:
  // pendaftar diberi tahu agar mencoba lagi atau menghubungi pengurus.
  if (!result.delivered && !sheetResult.recorded) {
    return NextResponse.json({ success: false, message: FAILURE_MESSAGE }, { status: 502 })
  }

  return NextResponse.json({
    success: true,
    registrationId,
    category: data.category,
  })
}
