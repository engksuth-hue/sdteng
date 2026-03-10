import { useMemo, useState } from 'react'
import type { DepartmentRow, YearRecord } from '../types'
import { formatNumber, safeLower } from '../utils'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from 'recharts'

type SortKey =
  | 'department'
  | 'intake_plan'
  | 'new_intake'
  | 'retained'
  | 'total'

function sortRows(
  rows: DepartmentRow[],
  key: SortKey,
  dir: 'asc' | 'desc'
): DepartmentRow[] {
  const m = dir === 'asc' ? 1 : -1
  return [...rows].sort((a, b) => {
    if (key === 'department') return a.department.localeCompare(b.department) * m
    return ((a as any)[key] - (b as any)[key]) * m
  })
}

/* ===== Color Theme ===== */
const COLORS = {
  plan: '#e0ff14',      // เลือดหมู
  new: '#31f700',       // น้ำเงิน
  retained: '#2929fb',  // เขียว
}

export function DepartmentDashboard(props: { record: YearRecord }) {

  const [q, setQ] = useState('')
  const [sortKey] = useState<SortKey>('department')
  const [dir] = useState<'asc' | 'desc'>('asc')

  const rows = useMemo(() => {

    let r = props.record.by_department

    if (q.trim()) {
      r = r.filter(d =>
        safeLower(d.department).includes(safeLower(q))
      )
    }

    return sortRows(r, sortKey, dir)

  }, [props.record, q, sortKey, dir])

  return (
    <div className="panel">

      <div className="panelHeader">
        <div>
          <div className="panelTitle">
            รายสาขา (ปี {props.record.year})
          </div>
          <div className="panelSubtitle">
            แผนการรับ / นศ.แรกเข้า / จำนวนคงอยู่
          </div>
        </div>
      </div>

      {/* search */}
      <div className="selectRow">
        <input
          placeholder="ค้นหาสาขา..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
      </div>

      {/* chart */}
      <div className="chartBox">

        <ResponsiveContainer width="100%" height={420}>

          <BarChart data={rows}>

            <CartesianGrid strokeDasharray="3 3" opacity={0.2} />

            <XAxis
              dataKey="department"
              angle={-15}
              textAnchor="end"
              height={80}
            />

            <YAxis />

            <Tooltip
              formatter={(v: number) => formatNumber(v)}
            />

            <Legend />

            <Bar
              dataKey="intake_plan"
              name="แผนการรับ"
              fill={COLORS.plan}
              radius={[6,6,0,0]}
            />

            <Bar
              dataKey="new_intake"
              name="นศ.แรกเข้า"
              fill={COLORS.new}
              radius={[6,6,0,0]}
            />

            <Bar
              dataKey="retained"
              name="จำนวนคงอยู่"
              fill={COLORS.retained}
              radius={[6,6,0,0]}
            />

          </BarChart>

        </ResponsiveContainer>

      </div>

      {/* table */}
      <div className="tableWrap">

        <table className="dataTable">

          <thead>
            <tr>
              <th>สาขา</th>
              <th>แผนการรับ</th>
              <th>นศ.แรกเข้า</th>
              <th>จำนวนคงอยู่</th>
            </tr>
          </thead>

          <tbody>

            {rows.map((d, i) => (
              <tr key={i}>
                <td>{d.department}</td>
                <td>{formatNumber(d.intake_plan)}</td>
                <td>{formatNumber(d.new_intake)}</td>
                <td>{formatNumber(d.retained)}</td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  )
}