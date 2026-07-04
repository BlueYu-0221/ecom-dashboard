---
name: Supabase 环境变量 URL 后缀陷阱
description: 本项目 .env 中 VITE_SUPABASE_URL 误带 /rest/v1/ 后缀，需清理为基础 URL
type: project
---

`.env` 中的 `VITE_SUPABASE_URL` 被配置成了 `https://xxx.supabase.co/rest/v1/`（带 REST API 路径后缀）。

**Why:** `createClient()` 需要的是项目基础 URL（`https://xxx.supabase.co`），若直接传入带 `/rest/v1/` 的值会导致请求路径拼接错误、认证/查询失败。

**How to apply:** 在 [`src/lib/supabase.ts`](src/lib/supabase.ts) 中已用正则 `replace(/\/rest\/v1\/?$/, '')` 清理。若后续新增其他直接使用该环境变量的代码，同样需要清理后缀；或建议用户把 `.env` 里的值改为纯基础 URL。