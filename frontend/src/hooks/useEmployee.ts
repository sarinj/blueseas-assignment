import { getEmployees } from "@/api/employee/employee"
import { useQuery } from "@tanstack/react-query"

export function useEmployeesQuery() {
  return useQuery({
    queryKey: ["employees"],
    queryFn: getEmployees,
  })
}
