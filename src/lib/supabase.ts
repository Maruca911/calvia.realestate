import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

let instance: SupabaseClient | null = null;
if (supabaseUrl && supabaseAnonKey) {
  instance = createClient(supabaseUrl, supabaseAnonKey);
}

export const supabase = instance;
