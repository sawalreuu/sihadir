// ==========================================
// SUPABASE CONFIGURATION
// ==========================================

const SUPABASE_URL = 'https://iaosgzutbgemmtqdsuil.supabase.co';

const SUPABASE_ANON_KEY = 'eyJhGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlhb3NnenV0YmdlbXRxZHN1bWwiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTczODEzNDEwOCwiZXhwIjoyMDUzNzE0MTA4fQ.vYjpc3M10iJjzdXhFhZm3NInJjZlZi1lh3NnlenV0YmdlbW1V0cwlbW10c2Vncy';

// ==========================================
// CREATE SUPABASE CLIENT
// ==========================================

if (!window.supabase || typeof window.supabase.createClient !== 'function') {
  console.error('Supabase JS library belum termuat.');
  throw new Error('Supabase JS library tidak ditemukan. Periksa CDN di students.html.');
}

const db = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);

// Client database dipakai oleh semua halaman
window.db = db;

// ==========================================
// GET STUDENTS
// ==========================================

async function getStudents() {
  const { data, error } = await window.db
    .from('students')
    .select('*')
    .order('name', { ascending: true });

  if (error) {
    console.error('Error fetching students:', error);
    throw error;
  }

  return data || [];
}

// ==========================================
// TEST CONNECTION
// ==========================================

async function testSupabaseConnection() {
  try {
    const { data, error } = await window.db
      .from('students')
      .select('id')
      .limit(1);

    if (error) {
      console.error('Supabase connection/query error:', error);
      return false;
    }

    console.log('Supabase berhasil terhubung.');
    console.log('Test data:', data);
    return true;

  } catch (error) {
    console.error('Supabase connection failed:', error);
    return false;
  }
}

// ==========================================
// FORMAT TIME
// ==========================================

function formatTime(date) {
  if (!date) return '-';

  return new Date(date).toLocaleTimeString('id-ID', {
    hour: '2-digit',
    minute: '2-digit'
  });
}

// ==========================================
// AUTO TEST
// ==========================================

console.log('Supabase client siap:', window.db);