# INOPI Registry — panduan pasang

Database pendaftaran anggota adalah **Google Sheet "PENDAFTARAN"** milik asosiasi.inopi@gmail.com.
Skrip `registry.js` dipasang di dalam Sheet itu (container-bound) dan menjadi satu-satunya
"pintu" yang boleh membaca/menulis. Website memanggilnya lewat Web app dengan kunci rahasia.

```
Pengunjung ─► website (Vercel) ─► Apps Script Web app ─► Sheet PENDAFTARAN + folder Drive privat
                  secret di server saja                      Bendahara bekerja langsung di Sheet
```

## 1. Pasang skrip (sekali, ±10 menit)

Masuk Google sebagai **asosiasi.inopi@gmail.com**, buka Sheet PENDAFTARAN.

1. **Extensions → Apps Script**. Hapus isi `Code.gs`, tempel seluruh isi `apps-script/registry.js`, simpan.
2. **Project Settings (ikon roda gigi) → Script Properties → Add**:

   | Properti | Isi |
   |---|---|
   | `API_SECRET` | rangkaian acak panjang (≥ 32 karakter). Buat dengan `openssl rand -hex 32`. **Rahasia, jangan dibagikan atau dimasukkan ke repo.** |
   | `NOTIFY_EMAIL` | (opsional) email Bendahara yang diberi tahu tiap ada pendaftaran. Kosong = asosiasi.inopi@gmail.com |
   | `FOLDER_ID` | (opsional) ID folder Drive untuk bukti transfer. Kosong = skrip membuat folder privat "INOPI - Bukti Transfer" sendiri |

3. Pilih fungsi `doGet` di menu fungsi lalu **Run** sekali. Google meminta otorisasi (Sheets, Drive, Gmail/Mail,
   Script). Pilih akun asosiasi → *Advanced* → *Go to … (unsafe)* → *Allow*. Peringatan "unsafe" muncul karena
   skrip belum diverifikasi Google; ini skrip milik sendiri.
4. **Deploy → New deployment → Web app**
   - Execute as: **Me**
   - Who has access: **Anyone**
   - Salin **Web app URL** (berakhiran `/exec`).

   > "Anyone" hanya berarti URL bisa dipanggil; tanpa `API_SECRET` yang benar setiap permintaan ditolak
   > (`unauthorized`) dan tidak menyentuh data.
5. Buka kembali Sheet, **muat ulang (refresh)**. Muncul menu **INOPI**. Klik
   **INOPI → Pasang pemicu otomatis (sekali saja)** dan setujui otorisasi. Tanpa langkah ini perubahan kolom
   Status tidak diproses otomatis (lihat bagian 4: menu "Proses status sekarang" tetap bisa dipakai).

Setiap kali `registry.js` diubah: tempel ulang, lalu **Deploy → Manage deployments → ✎ → Version: New version → Deploy**
(URL tetap sama).

## 2. Variabel environment di Vercel

Project → Settings → Environment Variables (Production dan Preview), lalu redeploy:

| Variabel | Isi |
|---|---|
| `APPS_SCRIPT_URL` | Web app URL dari langkah 1.4 |
| `APPS_SCRIPT_SECRET` | sama persis dengan `API_SECRET` |
| `MEMBERSHIP_BANK_NAME` | nama bank, mis. `Bank Mandiri` |
| `MEMBERSHIP_BANK_NUMBER` | nomor rekening |
| `MEMBERSHIP_BANK_OWNER` | nama pemilik rekening |

Contoh isian ada di `.env.example`. Sebelum `APPS_SCRIPT_URL` terisi, form menampilkan galat "belum dapat
diproses" dan **tidak ada data yang hilang atau bocor**.

## 3. Isi Sheet (dibuat otomatis pada permintaan pertama)

| Tab | Fungsi |
|---|---|
| **Pendaftaran** | Satu baris per pendaftar (Mahasiswa/Profesional) atau per perusahaan (Corporate). Di sinilah Bendahara bekerja. Kolom *Nominal Transfer* ditebalkan untuk dicocokkan dengan mutasi bank. |
| **Perusahaan** | Data institusi + PIC, pilihan invoice dan alamat penagihan, dan apakah PIC memakai kursi 1. |
| **Kursi** | 3 kursi per perusahaan. Kode kursi baru terisi setelah pendaftaran Corporate diverifikasi. |
| **Anggota** | Pemegang kursi Corporate beserta status kartu. |
| **Log** | Jejak audit: pendaftaran, verifikasi, penolakan, kursi diganti, kegagalan email. |
| Reservasi, Unggahan | Tab teknis (tersembunyi): kode unik transfer yang sedang dipesan dan bukti yang menunggu dipakai. Jangan diedit. |

Tab **Sheet1** yang kosong otomatis dipakai sebagai tab Pendaftaran.

Hak akses = siapa yang diberi akses ke Sheet. Beri akses **Editor** hanya kepada Bendahara dan pengurus
yang berwenang. Bukti transfer ada di folder Drive privat; tautan "Lihat bukti" di Sheet hanya terbuka
untuk akun yang punya akses ke folder itu.

## 4. Alur kerja Bendahara

1. Pendaftaran baru masuk: baris baru berstatus **Menunggu Verifikasi** dan email pemberitahuan tiba di `NOTIFY_EMAIL`.
2. Cocokkan **Nominal Transfer** (iuran + 3 digit kode unik) dengan mutasi rekening; klik **Lihat bukti** bila perlu.
3. Ubah kolom **Status** lewat dropdown:
   - **Aktif** → *Diverifikasi Pada* dan *Berlaku s.d.* (1 tahun) terisi otomatis. Untuk Corporate, 3 kode kursi
     diterbitkan di tab **Kursi**; bila PIC memilih "Saya memakai kursi 1", kursi 1 otomatis atas nama PIC
     dengan kartu aktif.
   - **Ditolak** → isi dulu kolom **Alasan Penolakan** (wajib), baru pilih Ditolak. Tanpa alasan, status
     dikembalikan ke Menunggu Verifikasi dan muncul pesan.
4. Pendaftaran yang sudah **Aktif** terkunci: statusnya tidak bisa dikembalikan lewat dropdown.
5. **Mengganti pemegang kursi Corporate (mis. karyawan resign):** di tab **Kursi**, klik baris kursi tersebut →
   **INOPI → Nonaktifkan kursi terpilih & terbitkan kode pengganti**. Kode lama dan kartu pemegangnya
   nonaktif; baris baru dengan kode pengganti muncul untuk kursi yang sama.
6. **Ekspor CSV:** pilih tab yang diinginkan → **File → Download → Comma-separated values (.csv)**.
7. Bila pemicu otomatis tidak jalan (mis. otorisasi kedaluwarsa): **INOPI → Proses status sekarang** memproses
   semua perubahan yang tertunda. Aman dijalankan berulang.

## 5. Pemecahan masalah

| Gejala | Penyebab / solusi |
|---|---|
| Form menampilkan "Pendaftaran belum terkirim" | `APPS_SCRIPT_URL` / `APPS_SCRIPT_SECRET` belum terisi di Vercel, atau secret berbeda dari `API_SECRET`. |
| `unauthorized` di log Vercel | Secret di Vercel tidak sama dengan Script Property `API_SECRET` (periksa spasi di ujung). |
| `not_configured` | Script Property `API_SECRET` belum dibuat. |
| Galat Drive "Sorry, unable to open the file" | Terjadi bila membuka tautan Drive saat login dengan akun Google lain. Buka tautan lewat Chrome yang login sebagai akun asosiasi, atau tambahkan akun Bendahara sebagai Editor folder "INOPI - Bukti Transfer". |
| Status diubah tapi tidak terjadi apa-apa | Pemicu belum dipasang: jalankan **INOPI → Pasang pemicu otomatis**, atau **Proses status sekarang**. |
| Email tidak terkirim | Kuota Apps Script ±100 email/hari untuk akun Gmail biasa. Pemberitahuan gagal dicatat di tab Log; pendaftaran tidak terpengaruh. |
| Deploy baru tapi perilaku lama | Setelah mengganti kode, buat **New version** di Manage deployments (bukan deployment baru). |
