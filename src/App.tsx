import { useEffect } from 'react'
import {
  HashRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'
import { ShoppingCart, Truck } from 'lucide-react'
import { useAuthStore } from './store/useAuthStore'
import ProtectedRoute from './components/ProtectedRoute'
import LoginPage from './components/LoginPage'
import DashboardLayout from './components/DashboardLayout'
import DashboardHome from './components/DashboardHome'
import ProductsPage from './components/ProductsPage'
import PlaceholderPage from './components/PlaceholderPage'

function App() {
  const init = useAuthStore((s) => s.init)

  // 应用启动时初始化 Supabase 会话
  useEffect(() => {
    init()
  }, [init])

  return (
    <HashRouter >
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        {/* 受保护的后台路由 */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardHome />} />
          <Route path="products" element={<ProductsPage />} />
          <Route
            path="orders"
            element={
              <PlaceholderPage
                title="订单管理"
                description="查看并处理跨境订单、发货与售后流程。"
                icon={ShoppingCart}
              />
            }
          />
          <Route
            path="supply-chain"
            element={
              <PlaceholderPage
                title="供应链监控"
                description="实时追踪跨境物流在途、仓储与库存周转。"
                icon={Truck}
              />
            }
          />
        </Route>

        {/* 默认重定向到后台 */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </HashRouter>
  )
}

export default App