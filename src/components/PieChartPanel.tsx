import React from 'react'
import { PieChart, Pie, Tooltip, ResponsiveContainer, Legend, Cell } from 'recharts'
import type { YearRecord } from '../types'
import { formatNumber } from '../utils'

/* ================================
   Color Palette (Soft Modern)
================================ */
const COLORS = [
  '#3b82f6', // น้ำเงิน
  '#10b981', // เขียว
  '#f59e0b', // ส้ม
]

export function PieChartPanel(props: { record: YearRecord }) {
  const r = props.record

  const data = [
    { name: 'นศ.แรกเข้า', value: r.new_intake },
    { name: 'จำนวนคงอยู่', value: r.retained },
    { name: 'ยังไม่เปิดรับ', value: r.not_open },
  ].filter((d) => d.value > 0)

  return (
    <div className="panel">
      <div className="panelHeader">
        <div>
          <div className="panelTitle">
            กราฟวงกลม: สัดส่วนภาพรวม (ปี {r.year})
          </div>
          <div className="panelSubtitle">
            แจกแจงตามสถานะหลัก (คน)
          </div>
        </div>
      </div>

      <div className="chartBox">
        <ResponsiveContainer width="100%" height={360}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              outerRadius={130}
              label
            >
              {data.map((_, idx) => (
                <Cell
                  key={`cell-${idx}`}
                  fill={COLORS[idx % COLORS.length]}
                />
              ))}
            </Pie>

            <Tooltip
              formatter={(v: number) => formatNumber(Number(v))}
            />

            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}