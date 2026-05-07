"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import * as React from "react"
import { FieldErrors, UseFormRegister, useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { CalculatePayrollRequestBody } from "@/api/payroll/interface"

const workHourSchema = z
  .string()
  .trim()
  .refine((value) => value === "" || !Number.isNaN(Number(value)), {
    message: "กรุณากรอกเป็นตัวเลข",
  })
  .refine((value) => value === "" || Number(value) >= 0, {
    message: "ชั่วโมงทำงานต้องไม่ติดลบ",
  })
  .refine((value) => value === "" || Number(value) <= 24, {
    message: "ชั่วโมงทำงานต้องไม่เกิน 24",
  })
  .transform((value) => (value === "" ? 0 : Number(value)))

export const payrollFormSchema = z.object({
  workDate: z
    .array(
      z.object({
        day: z.number().int().min(1).max(31),
        workHour: workHourSchema,
      }),
    )
    .min(1)
    .max(31),
})

type PayrollFormInput = z.input<typeof payrollFormSchema>
export type PayrollFormValues = Pick<CalculatePayrollRequestBody, "workDate">

type PayrollFormProps = {
  daysInMonth: number
  isCalculating: boolean
  onCalculate: (values: PayrollFormValues) => void
}

export function PayrollForm({
  daysInMonth,
  isCalculating,
  onCalculate,
}: PayrollFormProps) {
  const defaultValues = React.useMemo(
    () => ({
      workDate: createDefaultWorkDate(daysInMonth),
    }),
    [daysInMonth],
  )
  const days = React.useMemo(
    () => Array.from({ length: daysInMonth }, (_, index) => index + 1),
    [daysInMonth],
  )
  const oddDays = days.filter((day) => day % 2 === 1)
  const evenDays = days.filter((day) => day % 2 === 0)
  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm<PayrollFormInput, undefined, PayrollFormValues>({
    resolver: zodResolver(payrollFormSchema),
    defaultValues,
  })

  React.useEffect(() => {
    reset(defaultValues)
  }, [defaultValues, reset])

  return (
    <form
      className="flex w-full flex-col rounded-md border bg-card p-5 text-card-foreground shadow-sm"
      onSubmit={handleSubmit(onCalculate)}
    >
      <fieldset disabled={isCalculating} className="contents">
        <div className="grid gap-8 md:grid-cols-2">
          <DayColumn
            title="จำนวนชั่วโมงทำงาน"
            days={oddDays}
            errors={errors}
            register={register}
          />
          <DayColumn
            title="จำนวนชั่วโมงทำงาน"
            days={evenDays}
            errors={errors}
            register={register}
          />
        </div>

        <div className="mt-6 flex justify-end border-t pt-4">
          <Button
            type="submit"
            size="sm"
            disabled={isCalculating}
            className="min-w-32 rounded-md"
          >
            {isCalculating ? "กำลังคำนวณ" : "คำนวณเงินเดือน"}
          </Button>
        </div>
      </fieldset>
    </form>
  )
}

function createDefaultWorkDate(daysInMonth: number) {
  return Array.from({ length: daysInMonth }, (_, index) => ({
    day: index + 1,
    workHour: "",
  }))
}

export default function PayrollFormPage() {
  return null
}

type DayColumnProps = {
  title: string
  days: number[]
  errors: FieldErrors<PayrollFormInput>
  register: UseFormRegister<PayrollFormInput>
}

function DayColumn({ title, days, errors, register }: DayColumnProps) {
  return (
    <div className="flex flex-col gap-2">
      <h2 className="mb-2 text-sm font-semibold text-foreground">
        {title}
      </h2>
      {days.map((day) => (
        <DayInput
          key={day}
          day={day}
          error={errors.workDate?.[day - 1]?.workHour?.message}
          register={register}
        />
      ))}
    </div>
  )
}

type DayInputProps = {
  day: number
  error?: string
  register: UseFormRegister<PayrollFormInput>
}

function DayInput({ day, error, register }: DayInputProps) {
  return (
    <label className="grid grid-cols-[3.5rem_minmax(7rem,1fr)] items-center gap-3 text-xs text-muted-foreground">
      <span className="font-medium">วันที่ {day}</span>
      <span className="flex flex-col gap-1">
        <input
          type="hidden"
          {...register(`workDate.${day - 1}.day`, { valueAsNumber: true })}
        />
        <input
          type="number"
          min="0"
          step="0.5"
          {...register(`workDate.${day - 1}.workHour`)}
          aria-invalid={Boolean(error)}
          aria-label={`ชั่วโมงทำงานวันที่ ${day}`}
          title={error}
          className={cn(
            "h-8 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground shadow-xs transition-colors outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/20",
            error &&
              "border-destructive focus-visible:border-destructive focus-visible:ring-destructive/20",
          )}
        />
      </span>
    </label>
  )
}
