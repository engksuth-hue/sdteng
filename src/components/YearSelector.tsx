export function YearSelector(props: { years: number[]; value: number; onChange: (y: number) => void }) {
  const { years, value, onChange } = props
  return (
    <div className="selectRow">
      <label className="label">ปีการศึกษา</label>
      <select className="select" value={value} onChange={(e) => onChange(Number(e.target.value))}>
        {years.map((y) => (
          <option key={y} value={y}>
            {y}
          </option>
        ))}
      </select>
    </div>
  )
}
