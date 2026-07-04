import type { LucideIcon } from 'lucide-react'

interface Props {
  title: string
  description: string
  icon: LucideIcon
}

/** 通用占位页，用于尚未开发的功能模块 */
export default function PlaceholderPage({ title, description, icon: Icon }: Props) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white text-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-500">
        <Icon className="h-8 w-8" />
      </span>
      <h2 className="mt-5 text-xl font-bold text-slate-800">{title}</h2>
      <p className="mt-2 max-w-sm text-sm text-slate-500">{description}</p>
    </div>
  )
}