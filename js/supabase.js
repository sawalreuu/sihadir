// --- KONFIGURASI SUPABASE ---
const SUPABASE_URL = 'https://iaosgzutbgemmtqdisui.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlhb3NnenV0YmdlbW10cWRpc3VpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA5MzcwNTcsImV4cCI6MjEwNjUxMzA1N30.kD-coPBUMvSOEh89dvW5vpOwyPzdCh3qwqfRarSGPn8';

// Inisialisasi Klien Supabase
if (window.supabase && typeof window.supabase.createClient === 'function') {
  const client = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  window.supabase = client; // agar pemanggilan supabase.from() di file HTML berhasil
  window.db = client;       // untuk kompatibilitas fungsi di bawah
}

// Fungsi Ambil Data Siswa (Sesuai dengan nama kolom tabel di Supabase: 'nama', 'kelas')
async function getStudents() {
  if (!window.db) {
    console.error("Database client belum siap.");
    return [];
  }

  const { data, error } = await window.db
    .from('students')
    .select('*')
    .order('nama', { ascending: true });

  if (error) {
    console.error('Gagal mengambil data:', error.message);
    return [];
  }

  return data || [];
}