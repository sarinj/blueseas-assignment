"use client"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type SelectYearProps = {
  from?: string
  to?: string
  value?: string
  disabled?: boolean
  onChange: (value: string) => void
}

export function SelectYear({
  from,
  to,
  value,
  disabled = false,
  onChange,
}: SelectYearProps) {
  const payrollYears = () => {
    const fromYear = Number(from) || new Date().getFullYear() + 543
    const toYear = Number(to) || new Date().getFullYear() + 543 + 10

    if (Number.isNaN(fromYear) || Number.isNaN(toYear)) {
      return []
    }

    const years = []
    for (let year = fromYear; year <= toYear; year++) {
      years.push(String(year))
    }
    return years
  }

  return (
    <label className="flex flex-col gap-2 text-xs font-semibold text-foreground">
      ปี
      <Select
        items={payrollYears().map((year) => ({ label: year, value: year }))}
        value={value}
        onValueChange={(nextValue) => {
          if (nextValue) {
            onChange(nextValue)
          }
        }}
      >
        <SelectTrigger
          aria-label="ปี"
          disabled={disabled}
          className="h-9 w-full rounded-md border bg-background px-3 text-sm text-foreground shadow-xs"
        >
          <SelectValue placeholder="เลือกปี" />
        </SelectTrigger>
        <SelectContent alignItemWithTrigger={false}>
          <SelectGroup>
            {payrollYears().map((year) => (
              <SelectItem key={year} value={year}>
                {year}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </label>
  )
}

export default function SelectYearPage() {
  return null
}
