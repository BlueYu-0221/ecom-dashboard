// 控制台大屏的精美 Mock 数据（后续可替换为 Supabase 实时数据）

export interface StatCard {
  key: string
  label: string
  value: string
  trend: number // 正数上升，负数下降
  hint: string
}

export const statCards: StatCard[] = [
  { key: 'sales', label: '今日销售额', value: '$128,430', trend: 12.5, hint: '较昨日' },
  { key: 'pending', label: '待发货订单', value: '486', trend: 8.2, hint: '待处理' },
  { key: 'transit', label: '跨境物流在途', value: '1,092', trend: 3.4, hint: '运输中' },
  { key: 'lowStock', label: '低库存预警', value: '37', trend: -5.1, hint: 'SKU 需补货' },
]

export interface TrendPoint {
  date: string
  sales: number // 销售额（美元）
  orders: number // 订单量
}

// 最近 7 天销售额与订单量趋势
export const weeklyTrend: TrendPoint[] = [
  { date: '06-28', sales: 82400, orders: 620 },
  { date: '06-29', sales: 91200, orders: 705 },
  { date: '06-30', sales: 78600, orders: 588 },
  { date: '07-01', sales: 105300, orders: 812 },
  { date: '07-02', sales: 98700, orders: 760 },
  { date: '07-03', sales: 121500, orders: 934 },
  { date: '07-04', sales: 128430, orders: 981 },
]