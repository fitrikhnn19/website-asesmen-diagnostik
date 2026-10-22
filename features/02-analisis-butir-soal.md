# Analisis Butir Soal

Guru mendapatkan analisis lengkap kualitas butir soal, termasuk saran perbaikannya.

## Spesifikasi

### Tujuan
Guru dapat melihat kualitas setiap butir soal berdasarkan jawaban siswa pada tier 1 dan tier 2, sehingga tahu butir mana yang layak dipakai dan mana yang perlu diperbaiki.

### Selesai bila
- Guru membuka halaman analisis butir untuk satu asesmen dan melihat seluruh butir beserta nilai kualitasnya dalam satu tampilan ringkas.
- Setiap butir menampilkan tingkat kesukaran, daya pembeda, hasil uji validitas, dan reliabilitas dengan angka serta label kategori yang mudah dibaca (mis. "Sedang", "Baik").
- Guru dapat menyaring dan mengurutkan daftar butir berdasarkan kategori kualitas agar butir bermasalah cepat ditemukan.
- Setiap butir dilengkapi keterangan singkat arti nilainya dan tindakan yang disarankan (dipertahankan, diperbaiki, atau diganti).
- Bila asesmen belum memiliki jawaban siswa, tampil pesan jelas bahwa analisis belum tersedia.

## Sub-fitur: Tingkat Kesukaran

Lihat butir mana yang terlalu mudah atau terlalu sulit bagi siswa.

### Tujuan
Guru melihat butir mana yang terlalu mudah atau terlalu sulit bagi siswa, sehingga tahu butir mana yang perlu disesuaikan tingkat tantangannya.

### Selesai bila
- Setiap butir menampilkan nilai tingkat kesukaran dalam rentang 0,00–1,00 beserta label kategori (mudah / sedang / sukar) yang mudah dikenali.
- Nilai dihitung dari jawaban siswa pada tier 1 dan tier 2, dan konsisten dengan banyaknya siswa yang menjawab benar.
- Guru dapat mengurutkan daftar butir dari paling mudah ke paling sukar sehingga sebaran tingkat kesukaran langsung terlihat.

## Sub-fitur: Daya Pembeda

Ketahui butir mana yang mampu membedakan siswa paham dan belum paham.

### Tujuan
Guru mengetahui butir mana yang mampu membedakan siswa yang sudah paham dan yang belum paham, sehingga kualitas pembeda soal dapat dinilai.

### Selesai bila
- Setiap butir menampilkan indeks daya pembeda beserta label kategori (jelek / cukup / baik / sangat baik) dan keterangan singkat artinya dalam bahasa awam.
- Nilai ditampilkan dengan tanda positif atau negatif, dan butir bernilai negatif diberi penanda khusus agar mudah terlihat.
- Guru dapat mengurutkan daftar butir berdasarkan daya pembeda sehingga butir terlemah muncul paling atas.

## Sub-fitur: Uji Validitas & Reliabilitas

Ketahui apakah soal sudah layak dipakai berdasarkan pola jawaban siswa.

### Tujuan
Guru mengetahui apakah keseluruhan soal dan tiap butir sudah layak dipakai, dilihat dari pola jawaban siswa.

### Selesai bila
- Guru melihat satu nilai reliabilitas untuk keseluruhan asesmen beserta label kategori (mis. rendah / cukup / tinggi) dan penjelasan singkat artinya.
- Setiap butir menampilkan nilai validitas beserta status "valid" atau "tidak valid", disertai keterangan singkat apa artinya bila soal tidak valid.
- Bila jumlah peserta terlalu sedikit untuk analisis yang bermakna, muncul pemberitahuan bahwa hasil belum dapat diandalkan.

## Sub-fitur: Rekomendasi Perbaikan

Dapatkan saran butir mana yang perlu diperbaiki atau diganti.

### Tujuan
Guru mendapat saran tindakan untuk setiap butir sehingga tahu butir mana yang dipertahankan, diperbaiki, atau diganti.

### Selesai bila
- Setiap butir memiliki status tindakan yang jelas — "Dipertahankan", "Perlu Diperbaiki", atau "Diganti" — ditampilkan sebagai label pada daftar butir.
- Untuk butir berstatus perlu diperbaiki atau diganti, muncul saran singkat berbahasa Indonesia tentang bagian apa yang perlu diubah (mis. pilihan pengecoh, kejelasan pertanyaan).
- Bagian atas halaman menampilkan ringkasan jumlah butir per status, dan guru dapat menyaring daftar agar hanya menampilkan butir yang butuh perbaikan.

## Task

### 1. Buat layout halaman analisis butir soal

### 2. Implementasi UI dasar untuk tampilan butir soal

### 3. Buat komponen filter dan pengurutan butir

### 4. Wire tampilan indikator kualitas butir soal

### 5. Mock data hasil analisis butir soal lengkap

### 6. Implementasi tampilan pesan 'data belum tersedia'

### 7. Integrasi frontend dengan endpoint analisis butir soal

### 8. Terapkan logika tampilan sesuai status dan rekomendasi

### 9. Buat API endpoint untuk mendapatkan analisis butir soal

### 10. Buat model dan skema data butir soal analisis

### 11. Implementasi logika perhitungan tingkat kesukaran

### 12. Implementasi logika perhitungan daya pembeda

### 13. Implementasi logika uji validitas dan reliabilitas asesmen

### 14. Buat service untuk menghasilkan rekomendasi perbaikan butir
