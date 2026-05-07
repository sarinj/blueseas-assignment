"use client"

import { CalculatePayrollResponse } from "@/api/payroll/interface"

type PayrollResultProps = {
  result: CalculatePayrollResponse | null | undefined
  isLoading: boolean
}

const formatter = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

export function PayrollResult({ result, isLoading }: PayrollResultProps) {
  const displayResult = result ?? {
    employeeName: "",
    totalNormalHours: 0,
    totalOtHours: 0,
    totalNormalPay: 0,
    totalOtPay: 0,
    totalCompensation: 0,
  }

  return (
    <section className="grid w-full grid-cols-[1fr_auto_auto] gap-x-4 gap-y-2 rounded-md border bg-card p-5 text-sm text-card-foreground shadow-sm">
      {isLoading ? (
        <p className="col-span-3 rounded-md bg-muted px-3 py-2 text-center text-xs text-muted-foreground">
          กำลังคำนวณเงินเดือน...
        </p>
      ) : null}
      <span className="text-left text-muted-foreground">พนักงาน</span>
      <strong className="text-right font-normal">
        {displayResult.employeeName || "-"}
      </strong>
      <span />

      <span className="text-left text-muted-foreground">ชั่วโมงปกติ</span>
      <strong className="text-right font-normal">
        {formatter.format(displayResult.totalNormalHours)}
      </strong>
      <span className="text-muted-foreground">ชม.</span>

      <span className="text-left text-muted-foreground">ชั่วโมง OT</span>
      <strong className="text-right font-normal">
        {formatter.format(displayResult.totalOtHours)}
      </strong>
      <span className="text-muted-foreground">ชม.</span>

      <span className="text-left text-muted-foreground">เงินเดือน</span>
      <strong className="text-right font-normal">
        {formatter.format(displayResult.totalNormalPay)}
      </strong>
      <span className="text-muted-foreground">บาท</span>

      <span className="text-left text-muted-foreground">OT</span>
      <strong className="text-right font-normal">
        {formatter.format(displayResult.totalOtPay)}
      </strong>
      <span className="text-muted-foreground">บาท</span>

      <span className="border-t pt-3 text-left font-medium">
        เงินที่ได้รับเดือนนี้
      </span>
      <strong className="border-t pt-3 text-right text-base font-semibold">
        {formatter.format(displayResult.totalCompensation)}
      </strong>
      <span className="border-t pt-3 text-muted-foreground">บาท</span>
    </section>
  )
}

export default function PayrollResultPage() {
  return null
}
