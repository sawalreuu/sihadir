// --- KONFIGURASI SUPABASE ---
const SUPABASE_URL = 'https://iaosgzutbgemmtqdsuil.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlhb3NnenV0YmdlbXRxZHN1aWwiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTczODEzNDEwOCwiZXhwIjoyMDUzNzE0MTA4fQ.vYjpc3M10iJjzdXhFhZm3NInJjZlZi1lh3NnlenV0YmdlbW1V0cwlbW10c2Vncy'; // (Gunakan key lengkap Anda yang asli)

// Inisialisasi Klien Supabase global
window.supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Fungsi Umum Mengambil Data Siswa
async function getStudents() {
  const { data, error } = await window.supabase
    .from('students')
    .select('*')
    .order('name');
    
  if (error) {
    console.error("Error fetching students:", error);
    return [];
  }
  return data;
}

// Format waktu
function formatTime(date) {
  if (!date) return '-';
  return new Date(date).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
}