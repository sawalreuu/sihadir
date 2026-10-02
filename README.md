# SIHADIR - Versi HTML + Supabase

Versi ini dibuat murni menggunakan HTML, CSS, JavaScript biasa (Vanilla JS) yang langsung terhubung ke database **Supabase**.

## Cara Setup Supabase

1. Buka [supabase.com](https://supabase.com) dan buat akun/login.
2. Buat Project Baru.
3. Setelah project siap, buka menu **SQL Editor** (ikon terminal/SQL di sidebar kiri).
4. Copy dan Paste kode SQL di bawah ini, lalu klik **Run**:

```sql
-- Buat tabel siswa
create table public.students (
  id uuid default gen_random_uuid() primary key,
  nis text not null unique,
  name text not null,
  class_name text not null,
  qr_code_id text not null unique,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Buat tabel presensi
create table public.attendance (
  id uuid default gen_random_uuid() primary key,
  student_id uuid references public.students(id) on delete cascade not null,
  status text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Buka akses publik (Anonymous) agar bisa diakses langsung lewat HTML tanpa login
alter table public.students enable row level security;
alter table public.attendance enable row level security;

create policy "Public Access Students" on public.students for all using (true);
create policy "Public Access Attendance" on public.attendance for all using (true);
```

5. Buka menu **Project Settings** (ikon gerigi) -> **API**.
6. Copy `Project URL` dan `anon` public key.
7. Buka file `js/supabase.js` di dalam folder proyek ini menggunakan text editor (Notepad/VSCode).
8. Ganti bagian ini dengan URL dan Key milik Anda:
```javascript
const SUPABASE_URL = 'https://XXXX.supabase.co';
const SUPABASE_ANON_KEY = 'eyJXXXX...';
```

## Penggunaan Scanner Barcode Fisik (Model Indomaret)
1. Tancapkan Scanner Fisik ke port USB.
2. Buka halaman `scanner.html`.
3. Klik tombol abu-abu **"Mode Scanner Fisik"** (atau cukup klik di bagian kosong mana saja di halaman tersebut).
4. Sorot QR Code kartu siswa dengan scanner fisik Anda.
5. Sistem akan otomatis memproses data, memberikan bunyi *beep*, dan mencatatnya ke database!
