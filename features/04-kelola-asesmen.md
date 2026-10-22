# Kelola Asesmen

Guru menyusun soal tiga tingkat lengkap dengan rumus dan media, lalu membagikannya ke siswa.

## Spesifikasi

### Tujuan
Fitur ini ada agar guru dapat menyusun asesmen diagnostik tiga tingkat (jawaban, alasan, keyakinan) lengkap dengan rumus dan media, lalu membagikannya ke siswa dalam satu alur yang utuh.
### Selesai bila
- Guru dapat membuat asesmen baru dengan judul dan keterangan tujuan asesmen, lalu menyimpannya sebagai draf dan melihatnya kembali di daftar asesmen miliknya.
- Guru dapat menambah, mengubah, mengurutkan, dan menghapus butir soal tiga tingkat pada satu asesmen tanpa kehilangan data yang sudah diisi.
- Guru dapat menetapkan token masuk, batas waktu pengerjaan, serta memilih kelas atau siswa yang boleh mengerjakan asesmen tersebut.
- Guru dapat melihat pratinjau tampilan soal persis seperti yang akan dilihat siswa sebelum asesmen diterbitkan.
- Setelah diterbitkan, status asesmen berubah menjadi terbit dan siswa yang terdaftar dapat masuk mengerjakan menggunakan token.

## Sub-fitur: Susun Soal 3 Tingkat

Buat soal pilihan ganda tiga tingkat beserta pilihan alasan pada tiap butir.

### Tujuan
Sub-fitur ini memungkinkan guru menyusun setiap butir soal dalam tiga tingkat: pertanyaan pilihan ganda (Tier 1), pilihan alasan (Tier 2), dan pernyataan keyakinan (Tier 3).
### Selesai bila
- Guru dapat menambahkan butir soal dengan pertanyaan Tier 1 beserta beberapa pilihan jawaban dan menandai satu pilihan sebagai jawaban benar.
- Guru dapat menambahkan beberapa pilihan alasan Tier 2 untuk tiap butir dan menandai mana alasan yang benar.
- Guru dapat melihat dan mengubah urutan butir soal, serta menghapus butir yang tidak diperlukan.
- Setiap butir tersimpan dan muncul kembali dengan isi yang sama saat guru membuka asesmen tersebut lagi.

## Sub-fitur: Tulis Rumus & Media

Sisipkan rumus matematika, gambar, video, audio, dan grafik ke dalam soal.

subSpecs[1]='### Tujuan\nSub-fitur ini memungkinkan guru menyisipkan rumus matematika dan media (gambar, video, audio, grafik) ke dalam soal maupun pilihan jawaban agar pertanyaan lebih jelas dan kontekstual.\n### Selesai bila\n- Guru dapat menuliskan rumus matematika pada pertanyaan, pilihan jawaban, dan pilihan alasan, dan rumus tersebut tampil rapi saat dibaca.\n- Guru dapat melampirkan berkas gambar, video, atau audio pada satu butir soal, serta menandai jenis medianya.\n- Guru dapat menambahkan grafik pada butir soal dan melihat pratinjaunya di tempat yang sama.\n- Media dan rumus yang sudah disisipkan tetap tampil benar saat guru membuka kembali butir soal tersebut.\n

## Sub-fitur: Atur Token & Waktu

Tentukan token masuk serta batas waktu pengerjaan asesmen.

subSpecs[2]='### Tujuan\nSub-fitur ini memberi guru kendali atas siapa yang bisa masuk dan berapa lama siswa boleh mengerjakan asesmen.\n### Selesai bila\n- Guru dapat menetapkan token masuk untuk asesmen dan melihat token tersebut setelah disimpan.\n- Guru dapat mengatur batas waktu pengerjaan dalam satuan menit dan melihatnya tertulis pada ringkasan asesmen.\n- Guru dapat mengganti token atau batas waktu sebelum asesmen diterbitkan tanpa mengubah soal yang sudah dibuat.\n

## Sub-fitur: Pilih Peserta

Tentukan kelas atau siswa yang boleh mengerjakan asesmen.

subSpecs[3]='### Tujuan\nSub-fitur ini memungkinkan guru menentukan kelas atau siswa tertentu saja yang berhak mengerjakan asesmen.\n### Selesai bila\n- Guru dapat memilih satu atau beberapa kelas sebagai peserta asesmen.\n- Guru dapat menambah atau mengeluarkan siswa tertentu dari daftar peserta asesmen.\n- Daftar peserta yang dipilih tersimpan dan tampil kembali saat guru membuka asesmen tersebut.\n

## Sub-fitur: Pratinjau & Terbitkan

Cek tampilan soal sebelum asesmen dibagikan ke siswa.

subSpecs[4]='### Tujuan\nSub-fitur ini memungkinkan guru memeriksa tampilan asesmen dari sudut pandang siswa sebelum asesmen benar-benar dibagikan.\n### Selesai bila\n- Guru dapat melihat pratinjau seluruh butir soal beserta pilihan jawaban, pilihan alasan, dan pernyataan keyakinan seperti yang akan dilihat siswa.\n- Guru dapat melihat pratinjau token, batas waktu, dan daftar peserta pada halaman pratinjau.\n- Guru dapat menerbitkan asesmen dari halaman pratinjau, dan status asesmen berubah menjadi terbit setelahnya.\n- Asesmen yang sudah terbit tidak dapat diubah soalnya lagi, dan guru mendapat pemberitahuan jelas tentang hal ini.\n

## Task

### 1. Buat tata letak utama asesmen draf

### 2. Buat komponen editor butir soal 3 tingkat

### 3. Buat modul input rumus dan media

### 4. Bangun panel pengaturan token dan waktu

### 5. Implementasikan pilihan peserta asesmen

### 6. Buat tampilan pratinjau asesmen siswa

### 7. Implementasikan daftar asesmen yang dibuat guru

### 8. Definisikan skema dan migrasi database asesmen

### 9. Buat API untuk CRUD data asesmen draf

### 10. Buat API untuk manajemen butir soal 3 tingkat

### 11. Buat API untuk menyimpan pengaturan asesmen

### 12. Buat API transisi status publikasi asesmen
