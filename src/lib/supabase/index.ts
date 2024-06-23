import { createClient } from '@supabase/supabase-js';
import type { SupabaseClient } from '@supabase/supabase-js';
import { config } from '$lib/config';

export let supabase: SupabaseClient;

export const getSupabase = () => {
  if (supabase) return supabase;

  supabase = createClient(
    config.supabaseConfig.url,
    config.supabaseConfig.anonKey
  );

  return supabase;
};
