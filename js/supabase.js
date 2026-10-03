// --- KONFIGURASI SUPABASE ---
const SUPABASE_URL = 'https://iaosgzutbgemmtqdsui.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_5V_WJSAroz4Fddr5SQkZgw_FhXzL-2Y';

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