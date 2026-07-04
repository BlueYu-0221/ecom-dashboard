// 控制台大屏的精美 Mock 数据（后续可替换为 Supabase 实时数据）

export type StatTone = 'positive' | 'warning' | 'neutral' | 'danger'

export interface StatCard {
  key: string
  label: string
  value: string
  /** 趋势百分比，正数上升、负数下降；为 null 时不展示趋势 */
  trend: number | null
  hint: string
  tone: StatTone
}

export const statCards: StatCard[] = [
  {
    key: 'revenue',
    label: 'Gross Revenue',
    value: '$128,450.00',
    trend: 12.5,
    hint: 'vs last week',
    tone: 'positive',
  },
  {
    key: 'pending',
    label: 'Pending Orders',
    value: '42',
    trend: null,
    hint: 'awaiting fulfillment',
    tone: 'warning',
  },
  {
    key: 'transit',
    label: 'In-transit Supply',
    value: '8',
    trend: null,
    hint: 'containers en route',
    tone: 'neutral',
  },
  {
    key: 'lowStock',
    label: 'Low Stock Alerts',
    value: '5',
    trend: null,
    hint: 'SKUs need restock',
    tone: 'danger',
  },
]

export interface TrendPoint {
  date: string
  revenue: number // 销售额（美元）
  orders: number // 订单量
}

// 最近 7 天销售额与订单量趋势
export const weeklyTrend: TrendPoint[] = [
  { date: 'Jun 28', revenue: 82400, orders: 620 },
  { date: 'Jun 29', revenue: 91200, orders: 705 },
  { date: 'Jun 30', revenue: 78600, orders: 588 },
  { date: 'Jul 01', revenue: 105300, orders: 812 },
  { date: 'Jul 02', revenue: 98700, orders: 760 },
  { date: 'Jul 03', revenue: 121500, orders: 934 },
  { date: 'Jul 04', revenue: 128450, orders: 981 },
]

export type Platform = 'amazon' | 'shopify' | 'ebay'
export type ActivityType = 'order' | 'stock' | 'shipment'

export interface Activity {
  id: string
  platform: Platform
  type: ActivityType
  title: string
  detail: string
  amount?: string
  time: string
}

// 模拟从多平台实时同步的最新订单/库存变动日志
export const recentActivities: Activity[] = [
  { id: 'a1', platform: 'amazon', type: 'order', title: 'New order #AMZ-90271', detail: 'Wireless Earbuds Pro × 2', amount: '+$258.00', time: '2 min ago' },
  { id: 'a2', platform: 'shopify', type: 'stock', title: 'Low stock warning', detail: 'Smart Watch Band — 4 left', time: '11 min ago' },
  { id: 'a3', platform: 'shopify', type: 'order', title: 'New order #SHP-40881', detail: 'Organic Cotton Tee × 5', amount: '+$96.50', time: '23 min ago' },
  { id: 'a4', platform: 'ebay', type: 'shipment', title: 'Container CN-US-08 departed', detail: 'Shenzhen → Los Angeles', time: '1 hr ago' },
  { id: 'a5', platform: 'amazon', type: 'order', title: 'New order #AMZ-90260', detail: 'Portable Blender × 1', amount: '+$49.99', time: '2 hr ago' },
  { id: 'a6', platform: 'ebay', type: 'stock', title: 'Restocked', detail: 'USB-C Hub — +120 units', time: '3 hr ago' },
]