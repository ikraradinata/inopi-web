import { NextResponse } from 'next/server'
import { z } from 'zod'
import { getPlan } from '@/lib/constants/membership'
import {
  ASSOCIATION_EMAIL,
  BANK_ACCOUNT,
  generateRegistrationId,
  formatRupiah,
  isBankConfigured,
} from '@/lib/constants/registration'
import { sendEmail } from '@/lib/email'

const schema = z.object({
  category: z.enum(['student', 'professional', 'corporate']),
  nama: z.string().min(2).max(120),
  email: z.string().email().max(160),
  hp: z.string().min(8).max(32),
  institusi: z.string().min(2).max(160),
  bidang: z.string().max(160).optional(),
})

const jakartaTime = (d: Date) =>
  new Intl.DateTimeFormat('id-ID', {
    dateStyle: 'full',
    timeStyle: 'short',
    timeZone: 'Asia/Jakarta',
  }).format(d)

export async function POST(req: Request) {
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ success: false, message: 'Format permintaan tidak valid.' }, { status: 400 })
  }

  const parsed = schema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { success: false, message: 'Data pendaftaran belum lengkap atau tidak valid.' },
      { status: 400 },
    )
  }

  const data = parsed.data
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
    `Bidang           : ${data.bidang?.trim() || '-'}`,
    '',
    `Rekening tujuan  : ${rekening}`,
    '',
    'Pendaftar diminta mentransfer iuran dan mengirim bukti transfer.',
    'Mohon dicocokkan dengan mutasi rekening sebelum keanggotaan diaktifkan.',
  ].join('\n')

  const result = await sendEmail({
    to: ASSOCIATION_EMAIL,
    subject: `[INOPI] Pendaftaran ${plan.name} — ${data.nama} (${registrationId})`,
    text: notification,
    replyTo: data.email,
  })

  if (!result.delivered) {
    console.error('[membership] Notifikasi email tidak terkirim:', result.reason, { registrationId })
  }

  // Pendaftaran tetap dianggap berhasil bagi pendaftar; kegagalan email
  // adalah urusan internal dan sudah tercatat di log.
  return NextResponse.json({
    success: true,
    registrationId,
    notified: result.delivered,
  })
}
