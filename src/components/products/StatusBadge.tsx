import type { ProductStatus } from '../../lib/products'

const statusStyles: Record<ProductStatus, { label: string; className: string }> = {
  active: { label: 'Active', className: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20' },
  inactive: { label: 'Inactive', className: 'bg-slate-100 text-slate-600 ring-slate-500/20' },
  draft: { label: 'Draft', className: 'bg-amber-50 text-amber-700 ring-amber-600/20' },
  archived: { label: 'Archived', className: 'bg-rose-50 text-rose-700 ring-rose-600/20' },
}

interface StatusBadgeProps {
  status: ProductStatus
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  // 兜底：数据库出现未知状态时降级为 inactive 样式
  const meta = statusStyles[status] ?? {
    label: status,
    className: 'bg-slate-100 text-slate-600 ring-slate-500/20',
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${meta.className}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" />
      {meta.label}
    </span>
  )
}