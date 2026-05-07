import { EmployeeOption } from "../PayrollPage"
import { SelectEmployee } from "./PayrollEmployeeSelect"
import { SelectMonth } from "./SelectMonth"
import { SelectYear } from "./SelectYear"

interface PayrollEmployeeSelectorProps {
  value?: EmployeeOption
  disabled?: boolean
  onValueChange?: (value: EmployeeOption) => void
}

export function PayrollEmployeeSelector({
  value,
  disabled = false,
  onValueChange,
}: PayrollEmployeeSelectorProps) {
  return (
    <aside className="flex w-full flex-col gap-4 rounded-md border bg-card p-5 text-card-foreground shadow-sm">
      <div className="flex flex-col gap-1 border-b pb-4">
        <h2 className="text-sm font-semibold">ตัวเลือก</h2>
        <p className="text-xs text-muted-foreground">กำหนดรอบเงินเดือน</p>
      </div>
      <SelectEmployee
        value={String(value?.employeeId ?? "")}
        disabled={disabled}
        onChange={(employeeId) => {
          onValueChange?.({ ...value, employeeId })
        }}
      />
      <SelectMonth
        value={value?.month}
        disabled={disabled}
        onChange={(month) => {
          onValueChange?.({ ...value, month })
        }}
      />
      <SelectYear
        value={value?.year}
        disabled={disabled}
        onChange={(year) => {
          onValueChange?.({ ...value, year })
        }}
      />
    </aside>
  )
}

export default function PayrollEmployeeSelectorPage() {
  return null
}
