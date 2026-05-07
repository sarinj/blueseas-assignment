import { Injectable, NotFoundException } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"

import { EmployeeResponseDto } from "./dto/employee-response.dto"
import { Employee } from "./employee.entity"

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeesRepository: Repository<Employee>,
  ) {}

  async findAll(): Promise<EmployeeResponseDto[]> {
    const employees = await this.employeesRepository.find({
      order: { id: "ASC" },
    })

    return employees.map((employee) => this.toResponseDto(employee))
  }

  async findById(id: number): Promise<Employee> {
    const employee = await this.employeesRepository.findOneBy({ id })

    if (!employee) {
      throw new NotFoundException(`Employee with id ${id} was not found`)
    }

    return employee
  }

  private toResponseDto(employee: Employee): EmployeeResponseDto {
    return {
      id: employee.id,
      name: employee.name,
      base_salary: Number(employee.baseSalary),
    }
  }
}
