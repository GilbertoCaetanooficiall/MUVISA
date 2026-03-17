import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

/**
 * Cliente público — usa a ANON KEY.
 * Pode ser usado no browser mas respeita as políticas RLS.
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Cliente admin — usa a SERVICE ROLE KEY (bypassa RLS).
 * APENAS para uso em Server Components, API Routes e Server Actions.
 * NUNCA expor ao browser.
 */
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});
