# Pengerjaan Asesmen

Siswa mengerjakan asesmen dengan token dan langsung menerima hasil profil pemahamannya.

## Spesifikasi

### Tujuan
Siswa dapat mengerjakan asesmen tiga tingkat hanya dengan token dari guru, dan setelah submit langsung melihat profil pemahamannya sebagai bahan refleksi.
### Selesai bila
- Siswa yang memasukkan token valid bisa langsung masuk ke lembar soal tanpa membuat akun, dan token salah/kedaluwarsa ditolak dengan pesan yang jelas.
- Setiap butir menampilkan tiga tahap berurutan (pilihan jawaban, pilihan alasan, tingkat keyakinan) beserta rumus dan media yang disisipkan guru, dan siswa tidak bisa lanjut sebelum tahap sebelumnya terisi.
- Jawaban siswa tersimpan otomatis selama pengerjaan dan tetap utuh saat koneksi terputus atau halaman dimuat ulang, serta tidak hilang saat waktu habis.
- Setelah submit (atau waktu habis), siswa melihat halaman hasil berisi profil pemahaman per butir (paham / miskonsepsi / tidak paham) dengan label dan warna yang membedakan ketiganya.
- Guru dapat melihat status pengerjaan siswa (belum mulai, sedang mengerjakan, selesai) pada asesmen tersebut.

## Sub-fitur: Masuk dengan Token

Siswa membuka asesmen hanya dengan token yang diberikan guru.

### Tujuan
Siswa bisa membuka dan memulai asesmen hanya dengan memasukkan token yang diberikan guru, tanpa membuat akun.
### Selesai bila
- Halaman masuk asesmen hanya meminta satu isian token (dan identitas siswa bila diminta) lalu tombol mulai, dengan pesan kesalahan jelas untuk token salah, kedaluwarsa, atau asesmen belum terbit.
- Siswa yang tokennya valid langsung diarahkan ke butir pertama, dan nama serta judul asesmen yang dikerjakan tampil di halaman.
- Siswa yang sudah pernah masuk dengan token yang sama melanjutkan sesi yang sama, bukan memulai dari awal.

## Sub-fitur: Jawab Soal 3 Tingkat

Siswa memilih jawaban, alasan, dan tingkat keyakinan pada tiap butir.

### Tujuan
Siswa menjawab tiap butir secara bertahap: pilih jawaban, pilih alasan, lalu pilih tingkat keyakinan, sehingga kombinasi ketiganya terekam.
### Selesai bila
- Setiap butir menampilkan tiga tahap berurutan (jawaban, alasan, keyakinan yakin/tidak yakin) yang hanya bisa dilanjutkan setelah tahap sebelumnya dipilih.
- Soal, pilihan jawaban, dan pilihan alasan tampil lengkap termasuk rumus dan media (gambar, video, audio, grafik) yang disisipkan guru.
- Siswa dapat berpindah antar butir, melihat butir mana yang sudah/belum terjawab, dan menerima peringatan bila menekan submit sebelum semua butir terjawab.

## Sub-fitur: Simpan Otomatis

Jawaban siswa tersimpan selama pengerjaan meski koneksi terputus.

### Tujuan
Jawaban siswa tersimpan selama pengerjaan tanpa menekan tombol simpan, sehingga tidak hilang saat koneksi terputus atau halaman tertutup.
### Selesai bila
- Setiap kali siswa memilih jawaban, alasan, atau keyakinan, status tersimpan muncul otomatis di layar (mis. "tersimpan" dengan waktu terakhir).
- Saat koneksi terputus, siswa melihat penanda bahwa jawaban tertunda tersimpan dan pengerjaan tetap bisa dilanjutkan, lalu jawaban terkirim otomatis ketika koneksi pulih.
- Saat siswa membuka kembali asesmen setelah koneksi terputus atau perangkat mati, jawaban yang sebelumnya dipilih sudah terisi kembali.

## Sub-fitur: Hasil & Refleksi

Setelah submit, siswa melihat profil pemahamannya sebagai bahan refleksi.

### Tujuan
Setelah submit, siswa melihat profil pemahamannya per butir sebagai bahan refleksi atas jawabannya.
### Selesai bila
- Halaman hasil menampilkan ringkasan jumlah butir untuk tiap profil (paham, miskonsepsi, tidak paham) beserta persentasenya.
- Daftar butir menampilkan profil tiap butir (paham / miskonsepsi / tidak paham) dengan label dan warna berbeda, serta jawaban yang dipilih siswa.
- Halaman hasil menandai butir yang perlu dipelajari ulang dan memberi pesan singkat yang mudah dipahami siswa, serta tidak bisa diubah lagi setelah submit.

## Task

### 1. Buat halaman login token dengan mock data

### 2. Bangun layout utama halaman asesmen

### 3. Buat komponen soal tiga tahap berturut

### 4. Rancang halaman hasil dan refleksi pemahaman

### 5. Definisikan skema DB dan lakukan migrasi

### 6. Implementasi endpoint validasi token

### 7. Buat API untuk ambil data asesmen soal

### 8. Rancang endpoint simpan dan kirim jawaban

### 9. Implementasikan logika profil pemahaman

### 10. Sediakan API untuk status pengerjaan guru
