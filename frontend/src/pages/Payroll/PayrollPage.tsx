"use client"

import { useMutation } from "@tanstack/react-query"

import { PayrollEmployeeSelector } from "./components/PayrollEmployeeSelector"
import { PayrollForm, PayrollFormValues } from "./components/PayrollForm"
import { PayrollResult } from "./components/PayrollResult"
import { useState } from "react"
import { calculatePayroll } from "@/api/payroll/payroll"
import { CalculatePayrollRequestBody } from "@/api/payroll/interface"
import { getDaysInMonth } from "@/lib/utils"
import { toast } from "sonner"

export interface EmployeeOption {
  employeeId?: string
  month?: string
  year?: string
}

const defaultMonth = "10"
const defaultYear = "2568"

export function PayrollPage() {
  const [option, setOption] = useState<EmployeeOption>({
    month: defaultMonth,
    year: defaultYear,
  })
  const daysInMonth = getDaysInMonth(
    option.month ?? defaultMonth,
    option.year ?? defaultYear,
  )
  const employeeId = Number(option.employeeId)
  const canCalculate = Number.isInteger(employeeId) && employeeId > 0

  const { mutate, data, isPending } = useMutation({
    mutationFn: (body: CalculatePayrollRequestBody) => calculatePayroll(body),
  })

  async function handleCalculate(values: PayrollFormValues) {
    if (!canCalculate) {
      toast.error("กรุณาเลือกพนักงานก่อนคำนวณเงินเดือน")
      return
    }

    mutate({
      employeeId,
      workDate: values.workDate.map((item) => ({
        day: item.day,
        workHour: item.workHour,
      })),
    })
  }

  return (
    <main className="min-h-screen bg-muted/40 px-4 py-8 text-foreground">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
        <header className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold tracking-normal">
            Payroll Calculator
          </h1>
          <p className="text-sm text-muted-foreground">
            เลือกพนักงานและบันทึกชั่วโมงทำงานเพื่อคำนวณเงินเดือนประจำเดือน
          </p>
        </header>

        <div className="grid gap-4 lg:grid-cols-[16rem_minmax(0,1fr)]">
          <PayrollEmployeeSelector
            value={option}
            disabled={isPending}
            onValueChange={setOption}
          />
          <div className="flex flex-col gap-4">
            <PayrollForm
              daysInMonth={daysInMonth}
              onCalculate={handleCalculate}
              isCalculating={isPending}
              canCalculate={canCalculate}
            />
            <PayrollResult result={data} isLoading={isPending} />
          </div>
        </div>
      </div>
    </main>
  )
}

export default function PayrollPageRoute() {
  return null
}
