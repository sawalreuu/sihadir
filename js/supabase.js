// Ganti dengan URL dan Anon Key dari project Supabase Anda
const SUPABASE_URL = 'https://iaosgzutbgemmtqdisui.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlhb3NnenV0YmdlbW10cWRpc3VpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA5MzcwNTcsImV4cCI6MjEwNjUxMzA1N30.kD-coPBUMvSOEh89dvW5vpOwyPzdCh3qwqfRarSGPn8';

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
