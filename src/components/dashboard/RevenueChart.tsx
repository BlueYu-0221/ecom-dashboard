import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { weeklyTrend } from '../../lib/mockData'

// Recharts v3 不再暴露稳定的 TooltipProps（payload/label），此处手写宽松类型规避 TS 陷阱
interface TooltipItem {
  dataKey?: string | number
  name?: string
  value?: number
  color?: string
}
interface ChartTooltipProps {
  active?: boolean
  label?: string
  payload?: TooltipItem[]
}

const currency = (v: number) =>
  `$${v.toLocaleString('en-US', { maximumFractionDigits: 0 })}`

function ChartTooltip({ active, label, payload }: ChartTooltipProps) {
  if (!active || !payload || payload.length === 0) return null

  const revenue = payload.find((p) => p.dataKey === 'revenue')?.value
  const orders = payload.find((p) => p.dataKey === 'orders')?.value

  return (
    <div className="rounded-xl border border-slate-200 bg-white/95 px-4 py-3 shadow-lg backdrop-blur">
      <p className="mb-2 text-xs font-medium text-slate-400">{label}</p>
      {revenue !== undefined && (
        <div className="flex items-center justify-between gap-6 text-sm">
          <span className="flex items-center gap-2 text-slate-500">
            <span className="h-2 w-2 rounded-full bg-indigo-500" />
            Revenue
          </span>
          <span className="font-semibold text-slate-900">{currency(revenue)}</span>
        </div>
      )}
      {orders !== undefined && (
        <div className="mt-1 flex items-center justify-between gap-6 text-sm">
          <span className="flex items-center gap-2 text-slate-500">
            <span className="h-2 w-2 rounded-full bg-slate-300" />
            Orders
          </span>
          <span className="font-semibold text-slate-900">{orders}</span>
        </div>
      )}
    </div>
  )
}

export default function RevenueChart() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h2 className="text-base font-semibold text-slate-900">Revenue & Orders</h2>
          <p className="mt-1 text-sm text-slate-400">Last 7 days performance</p>
        </div>
      </div>

      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={weeklyTrend}
            margin={{ top: 8, right: 8, bottom: 0, left: 8 }}
          >
            <defs>
              <linearGradient id="revenueBar" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#6366f1" stopOpacity={0.9} />
                <stop offset="100%" stopColor="#818cf8" stopOpacity={0.5} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tick={{ fill: '#94a3b8', fontSize: 12 }}
            />
            <YAxis
              yAxisId="left"
              tickLine={false}
              axisLine={false}
              tick={{ fill: '#94a3b8', fontSize: 12 }}
              tickFormatter={(v: number) => `$${v / 1000}k`}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              tickLine={false}
              axisLine={false}
              tick={{ fill: '#cbd5e1', fontSize: 12 }}
            />
            <Tooltip content={<ChartTooltip />} cursor={{ fill: '#f8fafc' }} />
            <Legend
              iconType="circle"
              wrapperStyle={{ fontSize: 13, paddingTop: 12 }}
            />

            <Bar
              yAxisId="left"
              dataKey="revenue"
              name="Revenue (USD)"
              fill="url(#revenueBar)"
              radius={[6, 6, 0, 0]}
              barSize={28}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="orders"
              name="Orders"
              stroke="#0f172a"
              strokeWidth={2.5}
              dot={{ r: 3, fill: '#0f172a' }}
              activeDot={{ r: 5 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}