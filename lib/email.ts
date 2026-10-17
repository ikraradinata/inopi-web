// Pengiriman email lewat REST API Resend, tanpa dependency tambahan.
//
// Aktifkan dengan mengisi variabel lingkungan:
//   RESEND_API_KEY  — kunci API dari resend.com
//   RESEND_API_URL  — (opsional) alamat API pengganti, untuk pengujian dengan server tiruan
//   MAIL_FROM       — alamat pengirim, mis. "INOPI <noreply@inopi.id>"
//                     (tanpa domain terverifikasi, Resend hanya mengizinkan
//                      "onboarding@resend.dev" dan tujuan email pemilik akun)
//
// Bila RESEND_API_KEY belum diisi, email tidak dikirim namun isinya tetap
// dicatat di log server sehingga pendaftaran tidak hilang.

interface SendEmailOptions {
  to: string
  subject: string
  text: string
  replyTo?: string
}

export interface SendEmailResult {
  delivered: boolean
  reason?: string
}

export async function sendEmail({ to, subject, text, replyTo }: SendEmailOptions): Promise<SendEmailResult> {
  const apiKey = process.env.RESEND_API_KEY
  const from = process.env.MAIL_FROM ?? 'INOPI <onboarding@resend.dev>'

  if (!apiKey) {
    console.warn('[email] RESEND_API_KEY belum diset — email tidak dikirim. Isi pesan:\n', { to, subject, text })
    return { delivered: false, reason: 'not_configured' }
  }

  try {
    const res = await fetch(process.env.RESEND_API_URL ?? 'https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: [to],
        subject,
        text,
        ...(replyTo ? { reply_to: replyTo } : {}),
      }),
    })

    if (!res.ok) {
      const detail = await res.text()
      console.error('[email] Gagal mengirim:', res.status, detail)
      return { delivered: false, reason: `http_${res.status}` }
    }

    return { delivered: true }
  } catch (err) {
    console.error('[email] Error jaringan:', err)
    return { delivered: false, reason: 'network_error' }
  }
}
