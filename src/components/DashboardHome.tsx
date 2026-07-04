import {
  DollarSign,
  PackageCheck,
  Plane,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
  type LucideIcon,
} from 'lucide-react'
import { statCards, weeklyTrend } from '../lib/mockData'
import SalesTrendChart from './SalesTrendChart'

const iconMap: Record<string, LucideIcon> = {
  sales: DollarSign,
  pending: PackageCheck,
  transit: Plane,
  lowStock: AlertTriangle,
}

const accentMap: Record<string, string> = {
  sales: 'from-indigo-500 to-violet-500',
  pending: 'from-sky-500 to-cyan-500',
  transit: 'from-emerald-500 to-teal-500',
  lowStock: 'from-amber-500 to-orange-500',
}

export default function DashboardHome() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">跨境电商数据控制台</h2>
        <p className="mt-1 text-sm text-slate-500">
          实时监控全球销售、履约与供应链动态
        </p>
      </div>

      {/* 指标卡片 */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {statCards.map((card) => {
          const Icon = iconMap[card.key]
          const positive = card.trend >= 0
          return (
            <div
              key={card.key}
              className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-lg"
            >
              {/* 顶部彩色渐变条 */}
              <div
                className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${accentMap[card.key]}`}
              />
              <div className="flex items-start justify-between">
                <span
                  className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-md ${accentMap[card.key]}`}
                >
                  <Icon className="h-5 w-5" />
                </span>
                <span
                  className={`flex items-center gap-0.5 rounded-full px-2 py-0.5 text-xs font-semibold ${
                    positive
                      ? 'bg-emerald-50 text-emerald-600'
                      : 'bg-red-50 text-red-600'
                  }`}
                >
                  {positive ? (
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  ) : (
                    <ArrowDownRight className="h-3.5 w-3.5" />
                  )}
                  {Math.abs(card.trend)}%
                </span>
              </div>
              <p className="mt-4 text-3xl font-bold tracking-tight text-slate-800">
                {card.value}
              </p>
              <p className="mt-1 text-sm text-slate-500">
                {card.label}
                <span className="ml-1 text-slate-400">· {card.hint}</span>
              </p>
            </div>
          )
        })}
      </div>

      {/* 双轴趋势图 */}
      <SalesTrendChart data={weeklyTrend} />
    </div>
  )
}