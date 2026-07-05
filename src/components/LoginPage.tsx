import { useState, type FormEvent } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { LayoutDashboard, Mail, Lock, Loader2, ShoppingBag } from 'lucide-react'
import { useAuthStore } from '../store/useAuthStore'

interface LocationState {
  from?: { pathname?: string }
}

export default function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const signIn = useAuthStore((s) => s.signIn)
  const loading = useAuthStore((s) => s.loading)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const from =
    (location.state as LocationState)?.from?.pathname ?? '/dashboard'

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    try {
      await signIn(email, password)
      navigate(from, { replace: true })
    } catch (err) {
      setError(err instanceof Error ? err.message : '登录失败，请重试')
    }
  }

  const handleGuestSignIn = async () => {
    setError('')
    const guestEmail = 'admin@123.com'
    const guestPassword = '123456'
    // 同步填充输入框，让用户看到自动填入的账号密码
    setEmail(guestEmail)
    setPassword(guestPassword)
    try {
      await signIn(guestEmail, guestPassword)
      navigate(from, { replace: true })
    } catch (err) {
      setError(err instanceof Error ? err.message : '登录失败，请重试')
    }
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* 左侧品牌展示区 */}
      <div className="relative hidden w-1/2 flex-col justify-between overflow-hidden bg-gradient-to-br from-indigo-600 via-violet-600 to-fuchsia-600 p-12 text-white lg:flex">
        <div className="flex items-center gap-2 text-xl font-semibold">
          <ShoppingBag className="h-7 w-7" />
          Ecom Admin
        </div>
        <div>
          <h1 className="text-4xl font-bold leading-tight">
            智能电商
            <br />
            数据管理平台
          </h1>
          <p className="mt-4 max-w-sm text-indigo-100">
            实时掌握订单、库存与销售趋势，让每一个经营决策都有据可依。
          </p>
        </div>
        <p className="text-sm text-indigo-200">
          © {new Date().getFullYear()} Ecom Dashboard. All rights reserved.
        </p>
        {/* 装饰性光斑 */}
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-24 right-10 h-72 w-72 rounded-full bg-fuchsia-400/20 blur-3xl" />
      </div>

      {/* 右侧登录表单区 */}
      <div className="flex w-full items-center justify-center p-6 lg:w-1/2">
        <div className="w-full max-w-md">
          <div className="mb-8 flex flex-col items-center text-center">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-lg shadow-indigo-200">
              <LayoutDashboard className="h-6 w-6" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800">欢迎回来</h2>
            <p className="mt-1 text-sm text-slate-500">
              请登录你的管理员账户以继续
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                邮箱地址
              </label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full rounded-lg border border-slate-300 bg-white py-2.5 pl-10 pr-3 text-slate-800 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                密码
              </label>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-lg border border-slate-300 bg-white py-2.5 pl-10 pr-3 text-slate-800 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
              </div>
            </div>

            {error && (
              <div className="rounded-lg bg-red-50 px-4 py-2.5 text-sm text-red-600">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 py-2.5 font-medium text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading && <Loader2 className="h-4 w-4 animate-spin" />}
              {loading ? '登录中…' : '登 录'}
            </button>
          </form>

          {/* 访客一键预览快捷登录 */}
          <div className="mt-4">
            <button
              type="button"
              onClick={handleGuestSignIn}
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-amber-400 to-orange-500 py-2.5 font-semibold text-white shadow-lg shadow-orange-200 ring-2 ring-orange-300 transition hover:from-amber-500 hover:to-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading && <Loader2 className="h-4 w-4 animate-spin" />}
              Sign in as Guest (One-click Preview)
            </button>
            <p className="mt-2 text-center text-xs text-slate-400">
              Note: This connects to a live, secure Supabase testing environment.
            </p>
          </div>

          <p className="mt-6 text-center text-sm text-slate-400">
            忘记密码？请联系系统管理员
          </p>
        </div>
      </div>
    </div>
  )
}