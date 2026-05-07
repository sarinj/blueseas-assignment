import { api } from "@/lib/api"
import { Employee } from "@/types/employee.type"

async function getEmployees(): Promise<Employee[]> {
  const resp = await api.get("/employees")
  return resp.data
}

export { getEmployees }
