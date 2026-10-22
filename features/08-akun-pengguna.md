# Akun & Pengguna

Guru dapat mendaftar dan masuk ke aplikasi, sementara admin mengendalikan seluruh akun.

## Spesifikasi

### Tujuan
Memungkinkan guru mengelola akses akunnya sendiri dan admin mengendalikan seluruh akun guru, sehingga hanya pengguna berwenang yang dapat masuk sesuai perannya.

### Selesai bila
- Guru dapat mendaftar akun, login, logout, dan mengatur ulang password tanpa bantuan teknis.
- Admin dapat melihat daftar akun guru beserta status aktif/nonaktif, serta menambah, mengubah, dan menonaktifkan akun.
- Akun guru yang dinonaktifkan tidak dapat login, sedangkan akun aktif dapat mengakses dasbor guru.
- Setiap keberhasilan atau kegagalan aksi akun menampilkan pesan berbahasa Indonesia yang jelas.

## Sub-fitur: Daftar Akun Guru

Guru membuat akun dengan email dan password.

### Tujuan
Memungkinkan guru baru membuat akun dengan email dan password agar dapat menggunakan aplikasi sesuai perannya.

### Selesai bila
- Tersedia formulir daftar berisi email dan password beserta konfirmasi password.
- Email yang sudah terdaftar dan password yang tidak memenuhi ketentuan ditolak dengan pesan yang jelas.
- Setelah berhasil mendaftar, akun guru baru dapat digunakan untuk login sebagai guru.

## Sub-fitur: Login & Logout

Guru masuk dan keluar dari akunnya dengan aman.

### Tujuan
Memungkinkan guru masuk dan keluar dari akunnya dengan aman agar hanya guru berwenang yang dapat mengakses fiturnya.

### Selesai bila
- Guru dapat login menggunakan email dan password yang terdaftar.
- Email/password salah atau akun nonaktif ditolak dengan pesan yang jelas.
- Setelah login, guru diarahkan ke dasbor guru; setelah logout, halaman guru tidak dapat diakses kembali tanpa login.

## Sub-fitur: Reset Password

Guru memulihkan akses akun saat lupa password.

### Tujuan
Memungkinkan guru memulihkan akses akun saat lupa password melalui email terdaftar.

### Selesai bila
- Tersedia formulir lupa password yang menerima email guru terdaftar.
- Guru dapat membuka tautan pemulihan dan menetapkan password baru.
- Password baru dapat dipakai untuk login, sedangkan password lama tidak lagi berlaku, dengan pesan status yang jelas.

## Sub-fitur: Kelola Akun oleh Admin

Admin dapat menambah, mengubah, atau menonaktifkan akun guru.

### Tujuan
Memungkinkan admin mengelola seluruh akun guru agar status dan data pengguna tetap terkendali.

### Selesai bila
- Admin melihat daftar akun guru beserta nama, email, dan status aktif/nonaktif.
- Admin dapat menambah akun guru baru serta mengubah nama, email, atau status akun.
- Akun guru yang dinonaktifkan tidak dapat login, dan setiap perubahan menampilkan konfirmasi yang jelas.

## Task

### 1. Bangun halaman login & daftar dasar

### 2. Implementasi form pendaftaran guru

### 3. Flow login pengguna dengan mock data

### 4. Buat antarmuka reset password

### 5. Rancang dasbor guru pasca login

### 6. Buat halaman admin daftar akun guru

### 7. Bangun formulir tambah/ubah akun admin

### 8. Implementasi notifikasi status global

### 9. Definisi skema dan migrasi database pengguna

### 10. Setup service autentikasi dasar pengguna

### 11. Buat endpoint API pendaftaran akun guru

### 12. Buat endpoint API login dan token

### 13. Middleware otorisasi peran admin/guru

### 14. Implementasi endpoint CRUD daftar guru

### 15. Implementasi endpoint tambah/ubah akun admin

### 16. Buat endpoint API reset password
