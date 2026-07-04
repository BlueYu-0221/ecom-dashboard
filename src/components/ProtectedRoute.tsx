import type { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore'

interface ProtectedRouteProps {
  children: ReactNode
}

/** 路由守卫：未登录用户访问受保护页面时重定向到 /login */
export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const user = useAuthStore((s) => s.user)
  const initialized = useAuthStore((s) => s.initialized)
  const location = useLocation()

  // 会话尚未初始化完成，先展示加载态，避免刷新时误跳登录页
  if (!initialized) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 text-slate-400">
        加载中…
      </div>
    )
  }

  if (!user) {
    return <Navigate to="./login" replace state={{ from: location }} />
  }

  return <>{children}</>
}