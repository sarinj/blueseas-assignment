import { Type } from "class-transformer"
import {
  ArrayNotEmpty,
  IsArray,
  IsInt,
  IsNumber,
  Max,
  Min,
  ValidateNested,
} from "class-validator"

export class WorkDateDto {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(31)
  day: number

  @Type(() => Number)
  @IsNumber()
  @Min(0)
  @Max(24)
  workHour: number
}

export class CalculatePayrollDto {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  employeeId: number

  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => WorkDateDto)
  workDate: WorkDateDto[]
}
