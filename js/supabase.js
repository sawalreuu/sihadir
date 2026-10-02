// --- KONFIGURASI SUPABASE ---
const SUPABASE_URL = 'https://iaosgzutbgemmtqdsui.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlhb3NnenV0YmdlbXRxZHN1bWwiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTczODEzNDEwOCwiZXhwIjoyMDUzNzE0MTA4fQ.vYjpc3M10iJjzdXhFhZm3NInJjZlZi1lh3NnlenV0YmdlbW1V0cwlbW10c2Vncy';

// Inisialisasi Klien Supabase
if (window.supabase && typeof window.supabase.createClient === 'function') {
  window.db = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
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