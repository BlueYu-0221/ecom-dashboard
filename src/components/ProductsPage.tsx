import { useCallback, useEffect, useState } from 'react'
import { Plus, RefreshCw, PackageX, AlertCircle } from 'lucide-react'
import {
  fetchProducts,
  LOW_STOCK_THRESHOLD,
  type Product,
} from '../lib/products'
import StatusBadge from './products/StatusBadge'
import AddProductModal from './products/AddProductModal'

const currency = (v: number) =>
  `$${v.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`

// 表头定义
const columns = ['商品名称', 'SKU', '单价', '国内仓', '海外仓', '状态']

// 骨架屏行
function SkeletonRows() {
  return (
    <>
      {Array.from({ length: 6 }).map((_, i) => (
        <tr key={i} className="border-t border-slate-100">
          {columns.map((_, j) => (
            <td key={j} className="px-6 py-4">
              <div className="h-4 w-full max-w-[120px] animate-pulse rounded bg-slate-100" />
            </td>
          ))}
        </tr>
      ))}
    </>
  )
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [modalOpen, setModalOpen] = useState(false)

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await fetchProducts()
      setProducts(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : '加载商品失败')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    load()
  }, [load])

  return (
    <div className="space-y-6">
      {/* 页头 */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
            商品管理
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            管理全球商品 SKU、定价与仓储库存。
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={load}
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50 disabled:opacity-50"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            刷新
          </button>
          <button
            onClick={() => setModalOpen(true)}
            className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-700"
          >
            <Plus className="h-4 w-4" />
            Add Product
          </button>
        </div>
      </div>

      {/* 错误提示 */}
      {error && (
        <div className="flex items-center gap-2 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          <AlertCircle className="h-4 w-4 shrink-0" />
          {error}
        </div>
      )}

      {/* 商品表格 */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="bg-slate-50 text-xs font-medium uppercase tracking-wider text-slate-400">
                {columns.map((col) => (
                  <th key={col} className="px-6 py-3 whitespace-nowrap">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <SkeletonRows />
              ) : products.length === 0 ? (
                <tr>
                  <td colSpan={columns.length} className="px-6 py-16">
                    <div className="flex flex-col items-center justify-center text-center">
                      <PackageX className="h-10 w-10 text-slate-300" />
                      <p className="mt-3 text-sm font-medium text-slate-500">
                        暂无商品数据
                      </p>
                      <p className="mt-1 text-xs text-slate-400">
                        点击右上角 “Add Product” 添加第一件商品
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                products.map((p) => {
                  const lowStock = p.stock_overseas < LOW_STOCK_THRESHOLD
                  return (
                    <tr
                      key={p.id}
                      className="border-t border-slate-100 transition-colors hover:bg-slate-50"
                    >
                      <td className="px-6 py-4 font-medium text-slate-900">
                        {p.name}
                      </td>
                      <td className="px-6 py-4 font-mono text-xs text-slate-500">
                        {p.sku}
                      </td>
                      <td className="px-6 py-4 text-slate-700">
                        {currency(p.price)}
                      </td>
                      <td className="px-6 py-4 text-slate-700">
                        {p.stock_domestic}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={
                            lowStock
                              ? 'font-bold text-rose-600'
                              : 'text-slate-700'
                          }
                          title={lowStock ? '海外仓断货风险' : undefined}
                        >
                          {p.stock_overseas}
                     </span>
                        {lowStock && (
                          <span className="ml-2 inline-flex items-center rounded-full bg-rose-50 px-2 py-0.5 text-[10px] font-semibold text-rose-600">
                            断货风险
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <StatusBadge status={p.status} />
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 新增商品模态框 */}
      <AddProductModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onCreated={load}
      />
    </div>
  )
}