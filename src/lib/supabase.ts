import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Lazy singleton — o cliente só é criado na primeira utilização (em runtime),
// evitando o erro "supabaseUrl is required" durante o build do Vercel.
let _supabase: SupabaseClient | null = null;

function getSupabase(): SupabaseClient {
  if (!_supabase) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    _supabase = createClient(supabaseUrl, supabaseAnonKey);
  }
  return _supabase;
}

// Exporta como um proxy para manter compatibilidade com `import { supabase }`
// em todos os ficheiros existentes do projeto.
export const supabase = new Proxy({} as SupabaseClient, {
  get(_target, prop) {
    return Reflect.get(getSupabase(), prop);
  },
});
