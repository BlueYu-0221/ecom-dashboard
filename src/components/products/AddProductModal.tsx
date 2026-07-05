import { useState, type FormEvent } from 'react'
import { X, Loader2 } from 'lucide-react'
import {
  insertProduct,
  type NewProductInput,
  type ProductStatus,
} from '../../lib/products'

interface AddProductModalProps {
  open: boolean
  onClose: () => void
  /** 新增成功后回调，用于刷新列表 */
  onCreated: () => void
}

// 表单初始值
const emptyForm = {
  name: '',
  sku: '',
  price: '',
  stock_domestic: '',
  stock_overseas: '',
  status: 'active' as ProductStatus,
}

type FormState = typeof emptyForm

const statusOptions: ProductStatus[] = ['active', 'inactive', 'draft', 'archived']

export default function AddProductModal({
  open,
  onClose,
  onCreated,
}: AddProductModalProps) {
  const [form, setForm] = useState<FormState>(emptyForm)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  if (!open) return null

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  const resetAndClose = () => {
    setForm(emptyForm)
    setError(null)
    onClose()
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)

    // 基础校验
    if (!form.name.trim() || !form.sku.trim()) {
      setError('商品名称和 SKU 不能为空')
      return
    }
    const price = Number(form.price)
    const stockDomestic = Number(form.stock_domestic)
    const stockOverseas = Number(form.stock_overseas)
    if (Number.isNaN(price) || price < 0) {
      setError('请输入有效的单价')
      return
    }
    if (Number.isNaN(stockDomestic) || Number.isNaN(stockOverseas)) {
      setError('库存必须为数字')
      return
    }

    const payload: NewProductInput = {
      name: form.name.trim(),
      sku: form.sku.trim(),
      price,
      stock_domestic: stockDomestic,
      stock_overseas: stockOverseas,
      status: form.status,
    }

    try {
      setSubmitting(true)
      await insertProduct(payload)
      setForm(emptyForm)
      onCreated()
      onClose()
    } catch (err) {
      setError(err instanceof Error ? err.message : '保存失败，请重试')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* 遮罩 */}
      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
        onClick={submitting ? undefined : resetAndClose}
      />

      {/* 模态框 */}
      <div className="relative z-10 w-full max-w-lg rounded-2xl bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
          <h2 className="text-lg font-semibold text-slate-900">Add Product</h2>
          <button
            type="button"
            onClick={resetAndClose}
            disabled={submitting}
            className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600 disabled:opacity-50"
          >
            <X className="h-5 w-5" />
      </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 px-6 py-5">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              商品名称
            </label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => update('name', e.target.value)}
              placeholder="Wireless Earbuds Pro"
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                SKU
              </label>
              <input
                type="text"
                value={form.sku}
                onChange={(e) => update('sku', e.target.value)}
                placeholder="SKU-0001"
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                单价 (USD)
              </label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={form.price}
                onChange={(e) => update('price', e.target.value)}
                placeholder="0.00"
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                国内仓库存
              </label>
              <input
                type="number"
                min="0"
                value={form.stock_domestic}
                onChange={(e) => update('stock_domestic', e.target.value)}
                placeholder="0"
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                海外仓库存
              </label>
              <input
                type="number"
                min="0"
                value={form.stock_overseas}
                onChange={(e) => update('stock_overseas', e.target.value)}
                placeholder="0"
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              状态
            </label>
            <select
              value={form.status}
              onChange={(e) => update('status', e.target.value as ProductStatus)}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            >
              {statusOptions.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          {error && (
            <p className="rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-600">
              {error}
            </p>
          )}

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={resetAndClose}
             disabled={submitting}
              className="rounded-lg px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 disabled:opacity-50"
            >
              取消
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-700 disabled:opacity-60"
            >
              {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
              保存
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}