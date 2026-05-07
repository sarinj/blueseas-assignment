export interface CalculatePayrollRequestBody {
  employeeId: number
  workDate: { day: number; workHour: number }[]
}

export interface CalculatePayrollResponse {
  employeeName: string
  totalNormalHours: number
  totalOtHours: number
  totalNormalPay: number
  totalOtPay: number
  totalCompensation: number
}
