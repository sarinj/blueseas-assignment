"use client"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Employee } from "@/types/employee.type"
import { useEmployeesQuery } from "@/hooks/useEmployee"

type SelectEmployeeProps = {
  value: string
  disabled?: boolean
  onChange: (value: string, employee?: Employee) => void
}

export function SelectEmployee({
  value,
  disabled = false,
  onChange,
}: SelectEmployeeProps) {
  const { data: employees = [], isPending } = useEmployeesQuery()
  const isDisabled = disabled || isPending

  return (
    <label className="flex flex-col gap-2 text-xs font-semibold text-foreground">
      พนักงาน
      <Select
        items={employees.map((employee) => ({
          label: employee.name,
          value: String(employee.id),
        }))}
        value={value}
        onValueChange={(nextValue) => {
          if (!nextValue) {
            return
          }

          onChange(
            nextValue,
            employees.find((employee) => String(employee.id) === nextValue),
          )
        }}
      >
        <SelectTrigger
          aria-label="พนักงาน"
          disabled={isDisabled}
          className="h-9 w-full rounded-md border bg-background px-3 text-sm text-foreground shadow-xs"
        >
          <SelectValue placeholder={isPending ? "กำลังโหลด" : "เลือกพนักงาน"} />
        </SelectTrigger>
        <SelectContent alignItemWithTrigger={false}>
          <SelectGroup>
            {employees.map((employee) => (
              <SelectItem key={employee.id} value={String(employee.id)}>
                {employee.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </label>
  )
}

export default function PayrollEmployeeSelectPage() {
  return null
}
