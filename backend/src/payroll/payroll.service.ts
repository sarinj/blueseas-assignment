import { Injectable } from "@nestjs/common"

import { EmployeesService } from "../employees/employees.service"
import { CalculatePayrollDto } from "./dto/calculate-payroll.dto"
import { PayrollSummaryDto } from "./dto/payroll-summary.dto"

const NORMAL_HOURS_PER_DAY = 8
const NORMAL_WORK_DAYS_PER_MONTH = 30
const STANDARD_MONTHLY_HOURS = NORMAL_HOURS_PER_DAY * NORMAL_WORK_DAYS_PER_MONTH
const OT_RATE_MULTIPLIER = 1.5

@Injectable()
export class PayrollService {
  constructor(private readonly employeesService: EmployeesService) {}

  async calculatePayroll(
    calculatePayrollDto: CalculatePayrollDto,
  ): Promise<PayrollSummaryDto> {
    const employee = await this.employeesService.findById(
      calculatePayrollDto.employeeId,
    )

    const baseSalary = Number(employee.baseSalary)
    const hourlyRate = baseSalary / STANDARD_MONTHLY_HOURS

    const totalNormalHours = calculatePayrollDto.workDate.reduce(
      (sum, item) => sum + Math.min(item.workHour, NORMAL_HOURS_PER_DAY),
      0,
    )
    const totalOtHours = calculatePayrollDto.workDate.reduce(
      (sum, item) => sum + Math.max(item.workHour - NORMAL_HOURS_PER_DAY, 0),
      0,
    )
    const totalNormalPay = hourlyRate * totalNormalHours
    const totalOtPay = hourlyRate * OT_RATE_MULTIPLIER * totalOtHours
    const totalCompensation = totalNormalPay + totalOtPay

    return {
      employeeName: employee.name,
      totalNormalHours: this.round(totalNormalHours, 1),
      totalOtHours: this.round(totalOtHours, 1),
      totalNormalPay: this.round(totalNormalPay, 2),
      totalOtPay: this.round(totalOtPay, 2),
      totalCompensation: this.round(totalCompensation, 2),
    }
  }

  private round(value: number, fractionDigits: number): number {
    return Number(value.toFixed(fractionDigits))
  }
}
