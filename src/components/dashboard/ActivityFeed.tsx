import { ShoppingCart, PackageX, Truck } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import {
  recentActivities,
  type Activity,
  type Platform,
  type ActivityType,
} from '../../lib/mockData'

// 平台标识：字母徽标 + 品牌色
const platformBadge: Record<Platform, { label: string; className: string }> = {
  amazon: { label: 'AZ', className: 'bg-orange-100 text-orange-700' },
  shopify: { label: 'SH', className: 'bg-emerald-100 text-emerald-700' },
  ebay: { label: 'EB', className: 'bg-blue-100 text-blue-700' },
}

// 活动类型对应的图标与色调
const typeMeta: Record<ActivityType, { icon: LucideIcon; className: string }> = {
  order: { icon: ShoppingCart, className: 'text-indigo-500' },
  stock: { icon: PackageX, className: 'text-rose-500' },
  shipment: { icon: Truck, className: 'text-slate-500' },
}

function ActivityRow({ activity }: { activity: Activity }) {
  const badge = platformBadge[activity.platform]
  const { icon: Icon, className } = typeMeta[activity.type]

  return (
    <li className="flex items-start gap-3 rounded-xl px-2 py-3 transition-colors hover:bg-slate-50">
      <div className="relative">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100">
          <Icon className={`h-4 w-4 ${className}`} />
        </div>
        <span
          className={`absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full text-[9px] font-bold ${badge.className}`}
        >
          {badge.label}
        </span>
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <p className="truncate text-sm font-medium text-slate-800">{activity.title}</p>
          {activity.amount && (
            <span className="shrink-0 text-sm font-semibold text-emerald-600">
              {activity.amount}
            </span>
          )}
        </div>
        <p className="truncate text-xs text-slate-400">{activity.detail}</p>
      </div>

      <span className="shrink-0 text-xs text-slate-300">{activity.time}</span>
    </li>
  )
}

export default function ActivityFeed() {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-2 flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold text-slate-900">Recent Activity</h2>
          <p className="mt-1 text-sm text-slate-400">Synced from your stores</p>
        </div>
        <span className="flex items-center gap-1.5 text-xs font-medium text-emerald-600">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          Live
        </span>
      </div>

      <ul className="-mx-2 mt-2 flex-1 divide-y divide-slate-100">
        {recentActivities.map((activity) => (
          <ActivityRow key={activity.id} activity={activity} />
        ))}
      </ul>
    </div>
  )
}