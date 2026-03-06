import { formatNumber } from '../utils'
import type { YearRecord } from '../types'

type CardProps = {
  title: string
  value: number
  hint?: string
  color: string
}

function Card({ title, value, hint, color }: CardProps) {
  return (
    <div
      className="card"
      style={{
        borderTop: `6px solid ${color}`,
      }}
    >
      <div className="cardTitle">{title}</div>

      <div
        className="cardValue"
        style={{
          color: color,
        }}
      >
        {formatNumber(value)}
      </div>

      {hint && <div className="cardHint">{hint}</div>}
    </div>
  )
}

export function SummaryCards(props: { record: YearRecord }) {
  const r = props.record

  return (
    <div className="grid5">
      <Card
        title="แผนการรับ (คน)"
        value={r.intake_plan}
        hint="เป้าหมายรับเข้า"
        color="#005a8b"
      />

      <Card
        title="นศ.แรกเข้า (คน)"
        value={r.new_intake}
        hint="รับเข้าแล้ว / ยืนยันสิทธิ"
        color="#e3dc0d"
      />

      <Card
        title="จำนวนคงอยู่ (คน)"
        value={r.retained}
        hint="ยังศึกษาอยู่"
        color="#43dac9"
      />
    </div>
  )
}