import { NextResponse } from 'next/server'
import { kemitraanSchema } from '@/lib/schemas/kemitraan'
import { COLLAB_MODELS, FAILURE_MESSAGE } from '@/lib/constants/kemitraan'
import { ASSOCIATION_EMAIL } from '@/lib/constants/registration'
import { sendEmail } from '@/lib/email'
import { guardForm, oneLine } from '@/lib/spam'

// Penerima: KEMITRAAN_EMAIL (email Divisi Kemitraan & Kerjasama) bila diisi,
// jika tidak, email asosiasi.
const RECIPIENT = process.env.KEMITRAAN_EMAIL || ASSOCIATION_EMAIL

const fail = (status: number, message: string) =>
  NextResponse.json({ success: false, message }, { status })

export async function POST(req: Request) {
  const guard = await guardForm(req, 'kemitraan')
  if (!guard.ok) return guard.response

  const parsed = kemitraanSchema.safeParse(guard.body)
  if (!parsed.success) {
    return fail(400, 'Data pengajuan belum lengkap atau tidak valid.')
  }

  const d = parsed.data
  const modelLabels = d.model.map((v) => COLLAB_MODELS.find((m) => m.value === v)!.title)
  const submittedAt = new Intl.DateTimeFormat('id-ID', {
    dateStyle: 'full',
    timeStyle: 'short',
    timeZone: 'Asia/Jakarta',
  }).format(new Date())

  const text = [
    'Pengajuan kemitraan INOPI baru.',
    '',
    `Waktu               : ${submittedAt} WIB`,
    `Nama                : ${d.nama}`,
    `Email               : ${d.email}`,
    `Telepon/WhatsApp    : ${d.telepon || '-'}`,
    `Organisasi          : ${d.organisasi}`,
    `Jenis organisasi    : ${d.jenisOrganisasi}`,
    `Model kolaborasi    : ${modelLabels.join('; ')}`,
    `Perkiraan mulai     : ${d.waktuMulai || '-'}`,
    '',
    'Ringkasan gagasan/kebutuhan:',
    d.ringkasan,
    '',
    'Pemohon telah menyetujui Kebijakan Privasi.',
  ].join('\n')

  // Dicatat di log server agar pengajuan tidak hilang bila email bermasalah.
  console.log('[kemitraan] Pengajuan baru:', { ...d, submittedAt })

  const result = await sendEmail({
    to: RECIPIENT,
    subject: `[INOPI] Pengajuan kemitraan — ${oneLine(d.organisasi)}`,
    text,
    replyTo: d.email,
  })

  if (!result.delivered) {
    console.error('[kemitraan] Notifikasi email tidak terkirim:', result.reason)
    return fail(502, FAILURE_MESSAGE)
  }

  // Konfirmasi otomatis ke pemohon. Hanya dikirim bila domain pengirim sudah
  // dikonfigurasi (MAIL_FROM); kegagalannya tidak membatalkan pengajuan.
  if (process.env.MAIL_FROM) {
    await sendEmail({
      to: d.email,
      subject: 'Pengajuan kemitraan Anda sudah kami terima — INOPI',
      text: [
        `Yth. ${d.nama},`,
        '',
        'Terima kasih. Pengajuan kemitraan Anda sudah kami terima. Divisi Kemitraan & Kerjasama INOPI akan menelaah pengajuan Anda dan menghubungi Anda melalui email.',
        '',
        'Salam,',
        'INOPI — Asosiasi Inovasi Pembelajaran Indonesia',
      ].join('\n'),
      replyTo: RECIPIENT,
    })
  }

  return NextResponse.json({ success: true })
}
