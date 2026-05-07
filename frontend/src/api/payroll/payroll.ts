import { api } from "@/lib/api"
import {
  CalculatePayrollRequestBody,
  CalculatePayrollResponse,
} from "./interface"

async function calculatePayroll(
  body: CalculatePayrollRequestBody,
): Promise<CalculatePayrollResponse> {
  const resp = await api.post("/payroll/calculate", body)
  return resp.data
}

export { calculatePayroll }
