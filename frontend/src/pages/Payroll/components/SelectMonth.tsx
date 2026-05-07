"use client"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export const payrollMonths = [
  { label: "ม.ค.", value: "1" },
  { label: "ก.พ.", value: "2" },
  { label: "มี.ค.", value: "3" },
  { label: "เม.ย.", value: "4" },
  { label: "พ.ค.", value: "5" },
  { label: "มิ.ย.", value: "6" },
  { label: "ก.ค.", value: "7" },
  { label: "ส.ค.", value: "8" },
  { label: "ก.ย.", value: "9" },
  { label: "ต.ค.", value: "10" },
  { label: "พ.ย.", value: "11" },
  { label: "ธ.ค.", value: "12" },
]

type SelectMonthProps = {
  value?: string
  disabled?: boolean
  onChange: (value: string) => void
}

export function SelectMonth({
  value,
  disabled = false,
  onChange,
}: SelectMonthProps) {
  return (
    <label className="flex flex-col gap-2 text-xs font-semibold text-foreground">
      เดือน
      <Select
        items={payrollMonths}
        value={value}
        onValueChange={(nextValue) => {
          if (nextValue) {
            onChange(nextValue)
          }
        }}
      >
        <SelectTrigger
          aria-label="เดือน"
          disabled={disabled}
          className="h-9 w-full rounded-md border bg-background px-3 text-sm text-foreground shadow-xs"
        >
          <SelectValue placeholder="เลือกเดือน" />
        </SelectTrigger>
        <SelectContent alignItemWithTrigger={false}>
          <SelectGroup>
            {payrollMonths.map((month) => (
              <SelectItem key={month.value} value={month.value}>
                {month.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </label>
  )
}

export default function SelectMonthPage() {
  return null
}
