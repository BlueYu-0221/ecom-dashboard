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
import type { TrendPoint } from '../lib/mockData'

interface Props {
  data: TrendPoint[]
}

interface TooltipItem {
  dataKey?: string | number
  value?: number
}

interface ChartTooltipProps {
  active?: boolean
  label?: string
  payload?: TooltipItem[]
}

// 自定义 Tooltip，商业感更强
function CustomTooltip({ active, payload, label }: ChartTooltipProps) {
  if (!active || !payload?.length) return null
  const sales = payload.find((p) => p.dataKey === 'sales')?.value ?? 0
  const orders = payload.find((p) => p.dataKey === 'orders')?.value ?? 0
  return (
   <div className="rounded-xl border border-slate-200 bg-white/95 px-4 py-3 shadow-lg backdrop-blur">
      <p className="mb-2 text-xs font-medium text-slate-400">{label}</p>
      <div className="space-y-1">
        <p className="flex items-center gap-2 text-sm">
          <span className="h-2 w-2 rounded-full bg-indigo-500" />
          <span className="text-slate-500">销售额</span>
          <span className="ml-auto font-semibold text-slate-800">
            ${Number(sales).toLocaleString()}
          </span>
        </p>
        <p className="flex items-center gap-2 text-sm">
          <span className="h-2 w-2 rounded-full bg-emerald-400" />
          <span className="text-slate-500">订单量</span>
          <span className="ml-auto font-semibold text-slate-800">
            {Number(orders).toLocaleString()}
          </span>
        </p>
      </div>
    </div>
  )
}

export default function SalesTrendChart({ data }: Props) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
       <div>
          <h3 className="text-lg font-semibold text-slate-800">近 7 天经营趋势</h3>
          <p className="mt-0.5 text-sm text-slate-500">
            销售额（折线）与订单量（柱状）双轴对比
          </p>
        </div>
        <div className="flex items-center gap-4 text-xs text-slate-500">
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-indigo-500" /> 销售额
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-sm bg-emerald-400" /> 订单量
          </span>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={340}>
        <ComposedChart
          data={data}
          margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="salesLine" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#6366f1" />
              <stop offset="100%" stopColor="#a855f7" />
            </linearGradient>
            <linearGradient id="ordersBar" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#34d399" />
              <stop offset="100%" stopColor="#a7f3d0" />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
          <XAxis
            dataKey="date"
            tickLine={false}
            axisLine={false}
            tick={{ fill: '#94a3b8', fontSize: 12 }}
          />
          {/* 左轴：销售额 */}
          <YAxis
            yAxisId="left"
            tickLine={false}
            axisLine={false}
            tick={{ fill: '#94a3b8', fontSize: 12 }}
            tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
          />
          {/* 右轴：订单量 */}
          <YAxis
            yAxisId="right"
            orientation="right"
            tickLine={false}
            axisLine={false}
            tick={{ fill: '#94a3b8', fontSize: 12 }}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f8fafc' }} />
          <Legend wrapperStyle={{ display: 'none' }} />

          <Bar
            yAxisId="right"
            dataKey="orders"
            name="订单量"
            fill="url(#ordersBar)"
            radius={[6, 6, 0, 0]}
            barSize={28}
          />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="sales"
            name="销售额"
            stroke="url(#salesLine)"
            strokeWidth={3}
            dot={{ r: 4, fill: '#6366f1', strokeWidth: 2, stroke: '#fff' }}
            activeDot={{ r: 6 }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  )
}