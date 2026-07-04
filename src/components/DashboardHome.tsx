import { statCards } from '../lib/mockData'
import StatCard from './dashboard/StatCard'
import RevenueChart from './dashboard/RevenueChart'
import ActivityFeed from './dashboard/ActivityFeed'

export default function DashboardHome() {
  return (
    <div className="space-y-6">
      {/* 页头 */}
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
          Overview
        </h1>
        <p className="mt-1 text-sm text-slate-400">
          Real-time snapshot of sales, fulfillment and supply chain.
        </p>
      </div>

      {/* 指标卡片：自适应网格 */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {statCards.map((stat) => (
          <StatCard key={stat.key} stat={stat} />
        ))}
      </div>

      {/* 图表 + 活动列表：大屏左右分栏，小屏堆叠 */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <RevenueChart />
        </div>
        <div className="xl:col-span-1">
          <ActivityFeed />
        </div>
      </div>
    </div>
  )
}