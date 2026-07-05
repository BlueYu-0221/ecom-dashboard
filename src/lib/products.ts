import { supabase } from './supabase'

// 商品状态：与数据库 status 列取值保持一致
export type ProductStatus = 'active' | 'inactive' | 'draft' | 'archived'

// products 表的行结构
export interface Product {
  id: string
  created_at: string
  sku: string
  name: string
  price: number
  stock_domestic: number
  stock_overseas: number
  status: ProductStatus
}

// 新增商品时的输入负载（不含数据库自动生成字段 id / created_at）
export interface NewProductInput {
  name: string
  sku: string
  price: number
  stock_domestic: number
  stock_overseas: number
  status: ProductStatus
}

/** 拉取全部商品，按创建时间倒序 */
export async function fetchProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw new Error(error.message)
  return (data ?? []) as Product[]
}

/** 新增商品，返回写入后的完整行 */
export async function insertProduct(input: NewProductInput): Promise<Product> {
  const { data, error } = await supabase
    .from('products')
    .insert(input)
    .select()
    .single()

  if (error) throw new Error(error.message)
  return data as Product
}

// 海外仓断货风险阈值
export const LOW_STOCK_THRESHOLD = 10