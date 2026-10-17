// Namespace pesan yang dikirim ke komponen klien (useTranslations di berkas
// 'use client'). Tambahkan di sini saat komponen klien baru memakai pesan;
// namespace lain tetap di server agar bundel klien kecil.
export const CLIENT_NAMESPACES = ['Nav', 'Launch', 'Countdown', 'AnnouncementBar', 'Hero', 'Stats', 'Founders', 'ProgramKerja', 'Forms', 'Validation', 'MembershipForm', 'MembershipCorporate', 'MembershipCode', 'Membership', 'KemitraanForm', 'Kemitraan', 'ContactForm', 'CopyButton', 'Common', 'Locale'] as const
