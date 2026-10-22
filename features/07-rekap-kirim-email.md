# Rekap & Kirim Email

Guru memperoleh rangkuman hasil asesmen yang siap diarsipkan atau dikirim ke email.

## Spesifikasi

### Tujuan
Guru mendapatkan rangkuman hasil satu asesmen dalam satu kelas yang ringkas dan siap diarsipkan atau dikirim ke email, sehingga tidak perlu menyusun laporan secara manual.
### Selesai bila
- Guru dapat membuka halaman rekap untuk satu asesmen dan satu kelas, dan melihat ringkasan berisi jumlah peserta, jumlah yang sudah/belum mengerjakan, rata-rata skor, serta jumlah siswa per profil pemahaman (Paham, Miskonsepsi, Tidak Paham).
- Rekap menampilkan daftar siswa dengan nama, skor, dan profil pemahamannya, serta dapat disaring atau dicari berdasarkan nama siswa.
- Rekap menampilkan ringkasan per butir soal berupa persentase tiap profil pemahaman dan kategori kualitas butir, dalam format angka yang mudah dibaca (mis. "75%", dua desimal untuk indeks).
- Guru dapat mengunduh rekap ke berkas dan mengirimkannya ke email dari halaman yang sama, dengan pemberitahuan jelas saat berhasil atau gagal.
- Bila asesmen belum memiliki jawaban siswa, halaman rekap menampilkan pesan bahwa data belum tersedia dan tombol unduh/kirim email tidak aktif.

## Sub-fitur: Rangkuman Hasil

Dapatkan rekap hasil asesmen satu kelas dalam satu halaman ringkas.

### Tujuan
Guru melihat rangkuman hasil asesmen satu kelas dalam satu halaman ringkas sebagai gambaran cepat kondisi pemahaman siswa.
### Selesai bila
- Halaman rekap menampilkan judul asesmen, kelas, tanggal pelaksanaan, jumlah peserta, serta jumlah siswa pada tiap profil pemahaman (Paham, Miskonsepsi, Tidak Paham) dengan angka dan persentase.
- Tersedia tabel daftar siswa berisi nama, skor, profil pemahaman, dan status pengerjaan, yang dapat diurutkan dan dicari berdasarkan nama siswa.
- Rekap menampilkan ringkasan per butir soal: persentase tiap profil pemahaman dan kategori kualitas butir, dengan label berbahasa Indonesia yang mudah dipahami guru.
- Tampilan tetap rapi dan terbaca baik di smartphone maupun laptop, serta menampilkan pesan yang jelas bila data jawaban belum tersedia.

## Sub-fitur: Unduh Rekap

Unduh rangkuman hasil dalam bentuk berkas untuk arsip atau cetak.

### Tujuan
Guru dapat menyimpan rangkuman hasil asesmen sebagai berkas agar bisa diarsipkan atau dicetak.
### Selesai bila
- Tersedia tombol unduh pada halaman rekap yang menghasilkan berkas berisi ringkasan kelas, daftar siswa beserta skor dan profil pemahaman, serta ringkasan per butir soal.
- Nama berkas mencantumkan judul asesmen dan kelas sehingga mudah dikenali saat disimpan, dan isi berkas dapat dibuka serta dicetak tanpa terpotong.
- Guru menerima pemberitahuan jelas saat unduhan berhasil atau gagal, dan tombol unduh tidak aktif ketika data rekap belum tersedia.

## Sub-fitur: Kirim ke Email

Kirim rangkuman hasil asesmen langsung ke email guru.

### Tujuan
Guru dapat mengirim rangkuman hasil asesmen langsung ke emailnya dari aplikasi tanpa perlu mengunduh lalu melampirkan sendiri.
### Selesai bila
- Tersedia tombol kirim ke email pada halaman rekap dengan alamat email guru terisi otomatis dan dapat diperiksa sebelum dikirim.
- Setelah terkirim, guru melihat pemberitahuan berhasil, dan bila gagal muncul pesan kesalahan yang jelas beserta saran mencoba lagi.
- Guru dapat melihat riwayat pengiriman email untuk asesmen tersebut berisi waktu pengiriman, alamat tujuan, dan status berhasil atau gagal.

## Task

### 1. Buat layout rekap hasil asesmen

### 2. Implementasi tampilan ringkasan statistik kelas

### 3. Buat tabel daftar siswa dengan fitur cari

### 4. Tampilkan ringkasan performa tiap butir soal

### 5. Setup tombol unduh dan kirim email

### 6. Implementasi state pesan notifikasi rekap

### 7. Buat skema dan migrasi hasil asesmen

### 8. Buat endpoint ambil data rekap lengkap

### 9. Buat service dan API generate PDF rekap

### 10. Buat endpoint kirim rangkuman melalui email

### 11. Setup logging riwayat pengiriman email
