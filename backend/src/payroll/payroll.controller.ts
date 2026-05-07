import { Body, Controller, Post } from '@nestjs/common';

import { CalculatePayrollDto } from './dto/calculate-payroll.dto';
import { PayrollSummaryDto } from './dto/payroll-summary.dto';
import { PayrollService } from './payroll.service';

@Controller('api/payroll')
export class PayrollController {
  constructor(private readonly payrollService: PayrollService) {}

  @Post('calculate')
  calculatePayroll(
    @Body() calculatePayrollDto: CalculatePayrollDto,
  ): Promise<PayrollSummaryDto> {
    return this.payrollService.calculatePayroll(calculatePayrollDto);
  }
}
