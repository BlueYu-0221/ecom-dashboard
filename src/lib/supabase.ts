import { createClient } from '@supabase/supabase-js'

const rawUrl = import.meta.env.VITE_SUPABASE_URL as string
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string

if (!rawUrl || !supabaseAnonKey) {
  throw new Error(
    '缺少 Supabase 环境变量，请在 .env 中配置 VITE_SUPABASE_URL 与 VITE_SUPABASE_ANON_KEY',
  )
}

// Supabase 客户端需要项目基础 URL（如 https://xxx.supabase.co），
// 若 .env 中误带了 /rest/v1 等 API 路径后缀，这里做一次清理。
const supabaseUrl = rawUrl.replace(/\/rest\/v1\/?$/, '').replace(/\/$/, '')

export const supabase = createClient(supabaseUrl, supabaseAnonKey)