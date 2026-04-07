import { createClient } from '@supabase/supabase-js';

/** 浏览器端仅用 anon key；禁止在此文件用 service_role 创建客户端（会绕过 RLS）。 */
function readUrl(): string | undefined {
  const vite = import.meta.env.VITE_SUPABASE_URL as string | undefined;
  if (vite) return vite;
  if (typeof process !== 'undefined' && process.env) {
    return process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  }
  return undefined;
}

function readAnonKey(): string | undefined {
  const vite = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;
  if (vite) return vite;
  if (typeof process !== 'undefined' && process.env) {
    return process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;
  }
  return undefined;
}

const supabaseUrl = readUrl();
const supabaseAnonKey = readAnonKey();

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('[supabase] Missing URL or anon key (VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY or SUPABASE_* / process.env)');
}

export const supabaseAnon = createClient(supabaseUrl ?? '', supabaseAnonKey ?? '', {
  auth: { persistSession: true, autoRefreshToken: true },
});

/** 与历史命名兼容；请优先使用 `supabaseAnon`。 */
export const supabase = supabaseAnon;
