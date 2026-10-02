// Ganti dengan URL dan Anon Key dari project Supabase Anda
const SUPABASE_URL = 'https://XXXX.supabase.co';
const SUPABASE_ANON_KEY = 'eyJXXXX...';

// Initialize Supabase Client
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Fungsi Umum (Bisa dipanggil di halaman lain)
async function getStudents() {
  const { data, error } = await supabase.from('students').select('*').order('name');
  if (error) console.error("Error fetching students:", error);
  return data;
}

// Format waktu
function formatTime(date) {
  if (!date) return '-';
  return new Date(date).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
}
