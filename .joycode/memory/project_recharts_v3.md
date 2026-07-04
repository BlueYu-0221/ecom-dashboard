---
name: Recharts 3.x TooltipProps 类型陷阱
description: 本项目 recharts 为 3.x，自定义 Tooltip 不要 import TooltipProps，需自定义 props 类型
type: project
---

本项目使用 recharts `^3.9.2`（v3）。自定义 `<Tooltip content={...} />` 组件时，**不要**从 recharts 导入 `TooltipProps` 泛型类型。

**Why:** v3 中 `TooltipProps<number, string>` 不再暴露 `payload` / `label` 属性，直接用会导致 TS2339 编译错误（在严格模式 `noImplicitAny` 下 `payload.find` 的参数也会报 TS7006）。

**How to apply:** 为自定义 Tooltip 组件手写一个宽松的 props 接口（含 `active?: boolean`、`label?: string`、`payload?: { dataKey?; value? }[]`）。参考 [`src/components/dashboard/RevenueChart.tsx`](src/components/dashboard/RevenueChart.tsx) 中的 `ChartTooltipProps`。