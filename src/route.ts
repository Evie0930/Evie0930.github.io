/**
 * 浏览器侧 Supabase 入口：仅导出 anon 客户端，与 `barrages` 等表的 RLS 一致。
 * 禁止在此文件或前端代码中创建使用 `SUPABASE_SERVICE_ROLE_KEY` 的客户端。
 */
export { supabase, supabaseAnon } from './lib/supabase';
