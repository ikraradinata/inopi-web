# Email pendaftaran anggota — pemasangan dan DNS

Ringkasan: email pendaftaran dikirim oleh **Google Apps Script lewat Gmail asosiasi.inopi@gmail.com**
(keputusan pengurus). Karena pengirimnya alamat Gmail, **tidak ada record DNS yang wajib ditambahkan
di IDCloudHost** agar email ini sampai. Bagian 3 menjelaskan record yang perlu ditambahkan **hanya bila**
pengurus nanti ingin pengirim berupa alamat @inopi.id.

> ⚠️ **Jangan hapus record MX yang sudah ada di IDCloudHost** (domain inopi.id). Menghapus atau
> menimpanya menghentikan email masuk ke @inopi.id. Semua record di bawah adalah record **TXT**
> (atau CNAME) yang ditambahkan, bukan pengganti MX.

## 1. Email yang dikirim

| Pemicu | Penerima | Isi |
|---|---|---|
| Pendaftaran terkirim | Pendaftar (PIC untuk Corporate) | Ringkasan, nominal transfer, status menunggu verifikasi |
| Pendaftaran terkirim | Bendahara (`NOTIFY_EMAIL`) | Notifikasi + tautan ke Google Sheet (tanpa email/WhatsApp pendaftar) |
| Status → Aktif (Mahasiswa/Profesional) | Anggota | Kartu aktif, **PDF terlampir** + tautan unduh |
| Status → Aktif (Corporate) | PIC | 3 kode kursi + status tiap kursi, cara memakai kode, cara meminta kode pengganti; kartu PIC (PDF) bila memakai kursi 1 |
| Status → Ditolak | Pendaftar | Alasan + kontak sekretariat + tautan daftar kembali |
| Kode kursi dipakai | Anggota + PIC | Kartu aktif (PDF) untuk anggota; pemberitahuan "kursi terpakai" untuk PIC |
| Kursi diganti (menu INOPI) | PIC | Kode pengganti |

Bahasa mengikuti pilihan bahasa pendaftar saat mendaftar (Indonesia atau English). Tampilan terang satu
kolom (maks. 560 px) dengan logo INOPI, nyaman di ponsel; tersedia juga versi teks biasa.

## 2. Pasang di Apps Script

1. Tempel versi terbaru `apps-script/registry.js` (lihat `apps-script/README.md`), lalu **Deploy → Manage
   deployments → ✎ → New version**.
2. Jalankan fungsi apa pun sekali dari editor (mis. `doGet`) dan **setujui otorisasi baru**: kini skrip
   juga meminta izin *"Connect to an external service"* (untuk mengambil PDF kartu dari website) dan
   *"Send email as you"*.
3. (Opsional) Script Properties:
   - `SITE_URL` — alamat website untuk tautan di email. Kosong = `https://www.inopi.id`. Isi dengan alamat
     pratinjau Vercel saat menguji sebelum domain final aktif.
   - `NOTIFY_EMAIL` — email Bendahara penerima notifikasi pendaftaran baru.
4. Pastikan website production sudah berjalan: PDF kartu diambil dari `SITE_URL/api/membership/card/…`.
   Bila PDF tidak bisa diambil, email **tetap terkirim** tanpa lampiran dan berisi tombol "Unduh kartu anggota".

## 3. Hanya bila ingin pengirim `@inopi.id` (belum diperlukan)

Gmail dapat mengirim "sebagai" alamat lain lewat *Settings → Accounts → Send mail as*. Syaratnya alamat
@inopi.id punya kotak surat (mis. dari IDCloudHost) dan DNS-nya mengizinkan Google mengirim atas nama
domain. Kerjakan bersama orang yang mengelola DNS; sebelum mengubah apa pun, **catat semua record yang ada**.

| Record | Nama | Isi | Catatan |
|---|---|---|---|
| SPF (TXT) | `inopi.id` (`@`) | `v=spf1 include:_spf.google.com <include penyedia hosting Anda> ~all` | **Hanya boleh ada satu record SPF.** Gabungkan ke record SPF yang sudah ada, jangan membuat yang kedua. Nilai `include` hosting ada di panel IDCloudHost. |
| DKIM (TXT/CNAME) | disebut penyedia, mis. `google._domainkey` | dibuat oleh penyedia pengirim (Google Workspace Admin → Apps → Gmail → Authenticate email) | Tanpa Google Workspace, Gmail biasa tidak dapat menandatangani DKIM untuk `@inopi.id`. Pertimbangkan Workspace atau penyedia email transaksional. |
| DMARC (TXT) | `_dmarc.inopi.id` | `v=DMARC1; p=none; rua=mailto:asosiasi.inopi@gmail.com` | Mulai dengan `p=none` (hanya memantau). Naikkan ke `quarantine` setelah laporan bersih. |

Email formulir kontak/kemitraan di website memakai Resend (`RESEND_API_KEY`, `MAIL_FROM`). Bila domain
inopi.id diverifikasi di Resend, record SPF/DKIM yang ditampilkan dashboard Resend ditambahkan
**di samping** record yang ada (jangan menggantikan SPF yang sudah dipakai email biasa).

Setelah mengubah DNS, uji dengan mengirim email ke alamat Gmail lain dan memeriksa *Show original* → SPF,
DKIM, dan DMARC bertulis **PASS**.

## 4. Kuota, kegagalan, dan kirim ulang

- Gmail biasa: ±100 penerima/hari lewat Apps Script (Google Workspace ±1.500). Satu pendaftaran Corporate
  yang diverifikasi memakai 1–2 email; satu kode kursi dipakai memakai 2 email.
- Email dikirim **setelah** data tersimpan. Bila gagal (kuota, jaringan), pendaftaran/verifikasi **tidak
  dibatalkan**; kegagalan tercatat di tab **Log** (`email_failed`, alamat disamarkan).
- **Kirim ulang:** pilih baris di tab Pendaftaran, Kursi, atau Anggota → menu **INOPI → Kirim ulang email
  untuk baris terpilih**. Email yang dikirim sesuai status baris (menunggu / aktif / ditolak).
- Hasil tiap pengiriman: `email_sent`, `email_failed`, `email_attach_failed` di tab Log.
