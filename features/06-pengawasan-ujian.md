# Pengawasan Ujian

Guru mendapat bukti bila siswa mengerjakan asesmen dengan cara yang tidak jujur.

## Spesifikasi

### Tujuan
Memberi guru bukti nyata ketika siswa mengerjakan asesmen dengan cara tidak jujur, sehingga hasil asesmen bisa dipercaya dan siswa terdorong jujur saat mengerjakan.

### Selesai bila
- Selama siswa mengerjakan asesmen, setiap kali siswa keluar dari halaman asesmen tercatat lengkap dengan waktu kejadiannya.
- Halaman asesmen siswa terkunci penuh selama pengerjaan, sehingga siswa tidak bisa berpindah ke aplikasi atau halaman lain tanpa tercatat.
- Siswa menerima peringatan yang jelas dan berjenjang ketika terindikasi melakukan kecurangan.
- Guru dapat membuka daftar siswa dengan aktivitas mencurigakan pada setiap asesmen, disertai jenis kejadian, waktu, dan tingkat keparahannya.
- Kejadian kecurangan tetap tercatat meskipun siswa menutup atau memuat ulang halaman asesmen.

## Sub-fitur: Deteksi Pindah Tab

Sistem mencatat bila siswa keluar dari halaman asesmen saat mengerjakan.

### Tujuan
Mencatat setiap kali siswa keluar dari halaman asesmen selama mengerjakan, agar guru punya bukti objektif saat menilai kejujuran pengerjaan.

### Selesai bila
- Setiap kali siswa berpindah tab, meminimalkan jendela, atau meninggalkan halaman asesmen, tercatat satu kejadian berisi waktu kejadian dan jenisnya.
- Siswa yang kembali ke halaman asesmen tetap bisa melanjutkan pengerjaan tanpa kehilangan jawaban, dan kejadian sebelumnya tidak hilang.
- Guru dapat melihat jumlah dan rincian kejadian pindah tab per siswa pada asesmen terkait.

## Sub-fitur: Kunci Layar Ujian

Halaman asesmen terkunci penuh selama siswa mengerjakan soal.

### Tujuan
Mengunci tampilan asesmen dalam mode fokus penuh selama siswa mengerjakan, agar siswa sulit membuka sumber lain saat menjawab soal.

### Selesai bila
- Saat siswa memulai asesmen, halaman asesmen tampil memenuhi seluruh layar tanpa menu atau tombol keluar yang mengganggu.
- Siswa tidak dapat melakukan salin-tempel atau klik kanan pada halaman asesmen selama pengerjaan.
- Bila siswa keluar dari mode fokus penuh, sistem mencatatnya sebagai kejadian dan menampilkan pemberitahuan agar siswa kembali ke mode ujian.

## Sub-fitur: Peringatan Otomatis

Siswa mendapat peringatan saat terindikasi melakukan kecurangan.

### Tujuan
Memberi tahu siswa secara langsung ketika ia terindikasi melakukan kecurangan, agar ia menyadari dan kembali jujur tanpa harus menunggu teguran guru.

### Selesai bila
- Muncul peringatan di layar siswa setiap kali ia terindikasi melakukan kecurangan, dengan kalimat yang jelas dan berbahasa Indonesia.
- Peringatan diberikan berjenjang: peringatan pertama berupa imbauan, peringatan berikutnya makin tegas, dan siswa diberi tahu bahwa kejadiannya dicatat.
- Siswa tetap dapat melanjutkan pengerjaan setelah menutup peringatan, dan setiap peringatan yang muncul tercatat sebagai bukti.
- Guru dapat melihat berapa kali peringatan pernah muncul untuk setiap siswa pada asesmen terkait.

## Sub-fitur: Laporan Kecurangan

Guru melihat daftar siswa dengan aktivitas mencurigakan pada tiap asesmen.

### Tujuan
Menampilkan bagi guru daftar siswa yang mencurigakan pada setiap asesmen, sehingga guru dapat menindaklanjuti dengan bukti yang jelas.

### Selesai bila
- Guru dapat membuka satu halaman laporan yang menampilkan daftar siswa dengan aktivitas mencurigakan pada asesmen terpilih.
- Setiap baris laporan menampilkan nama siswa, jumlah kejadian, jenis kejadian terakhir, waktu kejadian terakhir, dan tingkat keparahannya.
- Laporan dapat disaring berdasarkan asesmen dan diurutkan dari siswa dengan aktivitas paling mencurigakan.
- Bila tidak ada kejadian mencurigakan, laporan menampilkan keterangan bahwa tidak ditemukan aktivitas mencurigakan pada asesmen tersebut.

## Task

### 1. Buat layout utama halaman ujian siswa

### 2. Implementasi komponen kunci layar ujian

### 3. Buat komponen peringatan kecurangan berjenjang

### 4. Develop tampilan laporan kecurangan guru

### 5. Buat listener deteksi pindah tab lokal

### 6. Buat skema database dan migrasi insiden

### 7. Buat endpoint API pencatatan kejadian kecurangan

### 8. Bangun logika deteksi dan pencatatan peringatan otomatis

### 9. Sediakan API untuk data laporan kecurangan guru
