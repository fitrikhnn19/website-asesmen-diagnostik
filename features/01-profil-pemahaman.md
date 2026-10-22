# Profil Pemahaman

Guru langsung melihat siswa mana yang paham, miskonsepsi, atau tidak paham setelah asesmen dikerjakan.

## Spesifikasi

### Tujuan
Guru dapat langsung melihat siswa mana yang paham, miskonsepsi, atau tidak paham setelah asesmen dikerjakan, sehingga tahu siapa yang perlu perhatian.
### Selesai bila
- Guru dapat membuka halaman Profil Pemahaman untuk asesmen yang sudah dikerjakan dan melihat siswa terbagi ke tiga kategori: Paham, Miskonsepsi, Tidak Paham.
- Setiap kategori menampilkan jumlah siswa dan persentasenya terhadap total siswa yang mengerjakan.
- Guru dapat berpindah dari ringkasan kelas ke rincian per siswa dan peta miskonsepsi tanpa kehilangan konteks kelas/asesmen yang sedang dilihat.
- Bila belum ada siswa yang submit, halaman menampilkan pesan kosong yang jelas tentang apa yang harus dilakukan guru.

## Sub-fitur: Ringkasan Kelas

Lihat sekilas berapa siswa yang paham, miskonsepsi, dan tidak paham dalam satu kelas.

### Tujuan
Guru melihat sekilas komposisi pemahaman satu kelas pada asesmen terpilih.
### Selesai bila
- Menampilkan tiga angka utama: jumlah dan persentase siswa Paham, Miskonsepsi, dan Tidak Paham, serta total siswa yang mengerjakan.
- Ada visual proporsi ketiga kategori (mis. bilah atau donat) dengan label bahasa Indonesia dan warna berbeda tiap kategori.
- Angka ringkasan konsisten dengan daftar siswa di profil per siswa dan ikut berubah saat kelas atau asesmen diganti.

## Sub-fitur: Profil per Siswa

Buka rincian profil pemahaman setiap siswa beserta butir yang dijawabnya.

### Tujuan
Guru membuka rincian profil pemahaman seorang siswa beserta butir soal yang dijawabnya.
### Selesai bila
- Daftar siswa menampilkan nama, kelas, label profil keseluruhan (Paham/Miskonsepsi/Tidak Paham), serta jumlah butir pada tiap kategori.
- Membuka satu siswa menampilkan tiap butir: pertanyaan ringkas, pilihan jawaban Tier 1, pilihan alasan Tier 2, tingkat keyakinan Tier 3, dan profil butir tersebut.
- Butir berprofil Miskonsepsi atau Tidak Paham diberi penanda yang mudah terlihat agar guru cepat menemukannya.

## Sub-fitur: Peta Miskonsepsi

Temukan konsep mana yang paling sering salah dipahami oleh siswa.

### Tujuan
Guru menemukan konsep yang paling sering salah dipahami siswa pada suatu asesmen.
### Selesai bila
- Menampilkan daftar konsep yang diurutkan dari yang paling banyak miskonsepsi, lengkap dengan jumlah siswa dan persentasenya.
- Setiap konsep dapat dibuka untuk melihat butir soal terkait dan siswa yang mengalami miskonsepsi pada konsep tersebut.
- Konsep dengan miskonsepsi tertinggi diberi penanda jelas sebagai prioritas perbaikan.

## Sub-fitur: Filter & Pencarian

Saring hasil berdasarkan kelas, asesmen, atau nama siswa.

### Tujuan
Guru menyaring hasil profil pemahaman berdasarkan kelas, asesmen, atau nama siswa.
### Selesai bila
- Tersedia pilihan kelas dan asesmen; mengubahnya langsung memperbarui ringkasan kelas, daftar siswa, dan peta miskonsepsi.
- Kotak pencarian nama siswa menyaring daftar secara langsung dan menampilkan pesan bila tidak ada siswa yang cocok.
- Filter yang sedang aktif terlihat jelas dan dapat direset ke tampilan awal dengan satu tindakan.

## Task

### 1. Buat layout halaman utama Profil Pemahaman

### 2. Implementasi filter kelas dan asesmen

### 3. Visualisasi ringkasan pemahaman kelas

### 4. Menampilkan daftar siswa dan profil ringkas

### 5. Desain detail profil pemahaman per siswa

### 6. Tampilan peta konsep miskonsepsi

### 7. Manajemen status kosong/loading halaman

### 8. Definisikan skema dan model data hasil asesmen

### 9. Buat endpoint ringkasan profil kelas

### 10. Buat endpoint rincian profil siswa

### 11. Buat endpoint peta miskonsepsi konsep

### 12. Implementasi logika pencarian dan filter API
