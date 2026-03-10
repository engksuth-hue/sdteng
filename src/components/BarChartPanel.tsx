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

import type { YearRecord } from '../types'
import { formatNumber } from '../utils'

/* ================================
   Color Theme (Maroon Engineering)
================================ */
const COLORS = {
  plan: '#35eb81',      // เลือดหมูเข้ม
  new: '#ebeb01',       // แดงสด
  retained: '#2b8dca',  // เขียวอมฟ้า
  notOpen: '#eb221b',   // เทา
}

export function BarChartPanel(props: { records: YearRecord[] }) {

  const data = props.records.map((r) => ({
    year: String(r.year),
    plan: r.intake_plan,
    new: r.new_intake,
    retained: r.retained,
    notOpen: r.not_open,
  }))

  return (
    <div className="panel">

      <div className="panelHeader">
        <div>
          <div className="panelTitle">
            กราฟแท่ง: เปรียบเทียบปีการศึกษา 65–67
          </div>

          <div className="panelSubtitle">
            แผนรับเข้า / รับเข้าใหม่ / คงอยู่ / ยังไม่เปิดรับ
          </div>
        </div>
      </div>

      <div className="chartBox">

        <ResponsiveContainer width="100%" height={360}>

          <BarChart
            data={data}
            margin={{ top: 16, right: 16, left: 8, bottom: 8 }}
            barGap={6}
          >

            <CartesianGrid strokeDasharray="3 3" stroke="#66d305" />

            <XAxis
              dataKey="year"
              tick={{ fontSize: 14 }}
            />

            <YAxis
              tickFormatter={(v) => formatNumber(Number(v))}
            />

            <Tooltip
              formatter={(v: any) => formatNumber(Number(v))}
              contentStyle={{
                borderRadius: 10,
                border: '1px solid #0d345d'
              }}
            />

            <Legend
              verticalAlign="top"
              height={36}
            />

            <Bar
              dataKey="plan"
              name="แผนการรับ"
              fill={COLORS.plan}
              radius={[6,6,0,0]}
              animationDuration={900}
            />

            <Bar
              dataKey="new"
              name="นศ.แรกเข้า"
              fill={COLORS.new}
              radius={[6,6,0,0]}
              animationDuration={900}
            />

            <Bar
              dataKey="retained"
              name="จำนวนคงอยู่"
              fill={COLORS.retained}
              radius={[6,6,0,0]}
              animationDuration={900}
            />

            <Bar
              dataKey="notOpen"
              name="ยังไม่เปิดรับ"
              fill={COLORS.notOpen}
              radius={[6,6,0,0]}
              animationDuration={900}
            />

          </BarChart>

        </ResponsiveContainer>

      </div>

      <div className="note">
        เปลี่ยนข้อมูลได้ที่ <code>public/data/students_65_67.json</code>
        หรือระบุ URL ผ่าน <code>VITE_DATA_URL</code>
      </div>

    </div>
  )
}