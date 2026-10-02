// ==========================================
// KONFIGURASI SUPABASE (SIHADIR)
// ==========================================
const SUPABASE_URL = 'https://iaosgzutbgemmtqdsui.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlhb3NnenV0YmdlbXRxZHN1bWwiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTczODEzNDEwOCwiZXhwIjoyMDUzNzE0MTA4fQ.vYjpc3M10iJjzdXhFhZm3NInJjZlZi1lh3NnlenV0YmdlbW1V0cwlbW10c2Vncy';

// Inisialisasi Klien Supabase (disimpan ke variabel window.db agar aman global)
if (window.supabase && typeof window.supabase.createClient === 'function') {
  window.db = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  console.log('Supabase client siap & terhubung!');
} else {
  console.error('Pustaka Supabase CDN belum dimuat dengan benar.');
}

// ==========================================
// FUNGSI GLOBAL PENGAMBIL DATA SISWA
// ==========================================
async function getStudents() {
  if (!window.db) {
    console.error('Database client (window.db) belum siap.');
    return [];
  }

  const { data, error } = await window.db
    .from('students')
    .select('*')
    .order('nama', { ascending: true }); // Mengurutkan berdasarkan kolom 'nama' di database Anda

  if (error) {
    console.error('Error fetching students:', error.message);
    throw error;
  }

  return data || [];
}

// ==========================================
// FORMAT WAKTU
// ==========================================
function formatTime(date) {
  if (!date) return '-';
  return new Date(date).toLocaleTimeString('id-ID', {
    hour: '2-digit',
    minute: '2-digit'
  });
}