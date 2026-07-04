import { ArrowUpRight, ArrowDownRight } from 'lucide-react'
import type { StatCard as StatCardData, StatTone } from '../../lib/mockData'

// 不同语义色调对应的视觉样式（Stripe/Vercel 浅色极简审美）
const toneStyles: Record<
  StatTone,
  { accent: string; valueColor: string; ring: string; dot: string }
> = {
  positive: {
    accent: 'text-emerald-600',
    valueColor: 'text-slate-900',
    ring: 'hover:ring-emerald-200',
    dot: 'bg-emerald-500',
  },
  warning: {
    accent: 'text-amber-600',
    valueColor: 'text-amber-600',
    ring: 'hover:ring-amber-200',
    dot: 'bg-amber-500',
  },
  neutral: {
    accent: 'text-slate-500',
    valueColor: 'text-slate-900',
    ring: 'hover:ring-slate-200',
    dot: 'bg-slate-400',
  },
  danger: {
    accent: 'text-rose-600',
    valueColor: 'text-rose-600',
    ring: 'hover:ring-rose-200',
    dot: 'bg-rose-500',
  },
}

interface StatCardProps {
  stat: StatCardData
}

export default function StatCard({ stat }: StatCardProps) {
  const styles = toneStyles[stat.tone]
  const isUp = stat.trend !== null && stat.trend >= 0

  return (
    <div
      className={`group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm ring-1 ring-transparent transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${styles.ring}`}
    >
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-slate-500">{stat.label}</span>
        <span className={`h-2 w-2 rounded-full ${styles.dot}`} />
      </div>

      <div className="mt-3 flex items-end gap-2">
        <span className={`text-3xl font-semibold tracking-tight ${styles.valueColor}`}>
          {stat.value}
        </span>
        {stat.trend !== null && (
          <span
            className={`mb-1 inline-flex items-center gap-0.5 text-sm font-semibold ${
              isUp ? 'text-emerald-600' : 'text-rose-600'
            }`}
          >
            {isUp ? (
              <ArrowUpRight className="h-4 w-4" />
            ) : (
              <ArrowDownRight className="h-4 w-4" />
            )}
            {Math.abs(stat.trend)}%
          </span>
        )}
      </div>

      <p className="mt-2 text-xs text-slate-400">{stat.hint}</p>
    </div>
  )
}