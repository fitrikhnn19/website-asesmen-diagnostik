# Progress Siswa

Guru memantau perkembangan pemahaman siswa dari satu asesmen ke asesmen berikutnya.

## Spesifikasi

### Tujuan
Memberi guru gambaran perjalanan pemahaman setiap siswa dari satu asesmen ke asesmen berikutnya, sehingga guru tahu siapa yang membaik, siapa yang stagnan, dan tindakan apa yang perlu diambil.
### Selesai bila
- Guru dapat membuka halaman Progress Siswa dan memilih kelas serta siswa untuk melihat perkembangan pemahamannya.
- Untuk setiap siswa tampil daftar asesmen yang pernah dikerjakan beserta tanggal dan profil pemahaman akhirnya.
- Tersedia grafik perkembangan yang menunjukkan naik-turunnya proporsi paham, miskonsepsi, dan tidak paham antar waktu.
- Siswa yang miskonsepsinya belum berubah setelah remedial ditandai jelas (label/penanda "Perlu Perhatian") dan mudah ditemukan.
- Guru dapat menulis, menyunting, dan menghapus catatan tindak lanjut per siswa, dan catatan tersimpan serta tampil kembali saat halaman dibuka.
- Tampilan ringkas dan terbaca di smartphone maupun laptop, dengan istilah berbahasa Indonesia.

## Sub-fitur: Riwayat Asesmen

Lihat semua asesmen yang pernah dikerjakan oleh setiap siswa.

### Tujuan
Memungkinkan guru melihat seluruh riwayat asesmen yang pernah dikerjakan seorang siswa sebagai dasar pemantauan perkembangan.
### Selesai bila
- Pada halaman progress siswa tampil daftar asesmen yang pernah dikerjakan siswa, urut dari yang terbaru, dengan judul asesmen dan tanggal pengerjaan.
- Setiap baris riwayat menampilkan ringkasan hasil: jumlah butir paham, miskonsepsi, dan tidak paham (atau persentasenya).
- Guru dapat membuka satu baris riwayat untuk melihat rincian profil pemahaman siswa pada asesmen tersebut.
- Bila siswa belum pernah mengerjakan asesmen, tampil pesan kosong yang jelas (mis. "Belum ada asesmen yang dikerjakan").

## Sub-fitur: Grafik Perkembangan

Pantau naik-turunnya pemahaman siswa dari waktu ke waktu.

subSpecs

## Sub-fitur: Siswa Perlu Perhatian

Temukan siswa yang miskonsepsinya belum berubah setelah remedial.

### Tujuan
Menampilkan perubahan pemahaman siswa antar asesmen secara visual agar guru cepat menangkap arah perkembangan (membaik, stagnan, atau menurun).
### Selesai bila
- Tersedia grafik garis/kolom yang menampilkan proporsi paham, miskonsepsi, dan tidak paham siswa untuk setiap asesmen dari waktu ke waktu.
- Grafik diberi sumbu waktu (tanggal/judul asesmen) dan keterangan warna untuk ketiga profil, serta terbaca di layar smartphone.
- Guru dapat mengganti siswa atau kelas yang ditampilkan pada grafik tanpa berpindah halaman.
- Bila siswa baru mengerjakan satu asesmen, grafik tetap tampil dengan keterangan bahwa data masih terbatas.

## Sub-fitur: Catatan Tindak Lanjut

Simpan catatan atau rencana remedial untuk setiap siswa.

subSpecs

## Task

### 1. Bangun tata letak utama Progress Siswa

### 2. Tampilkan riwayat asesmen siswa (mock)

### 3. Buat komponen detail profil asesmen

### 4. Integrasikan grafik perkembangan (mock data)

### 5. Rancang antarmuka catatan tindak lanjut

### 6. Implementasi label 'Perlu Perhatian'

### 7. Buat skema database asesmen siswa

### 8. Buat skema database catatan tindak lanjut

### 9. Buat endpoint riwayat asesmen siswa

### 10. Buat endpoint profil detail asesmen

### 11. Buat endpoint data time-series untuk grafik

### 12. Implementasi logika identifikasi perhatian

### 13. Buat endpoint CRUD catatan tindak lanjut
