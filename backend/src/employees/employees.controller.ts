import { Controller, Get } from '@nestjs/common';

import { EmployeeResponseDto } from './dto/employee-response.dto';
import { EmployeesService } from './employees.service';

@Controller('api/employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Get()
  findAll(): Promise<EmployeeResponseDto[]> {
    return this.employeesService.findAll();
  }
}
