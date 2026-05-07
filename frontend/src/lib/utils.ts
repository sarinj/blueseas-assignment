import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getDaysInMonth(month: string, buddhistYear: string) {
  const christianYear = Number(buddhistYear) - 543
  const monthIndex = Number(month) - 1

  return new Date(christianYear, monthIndex + 1, 0).getDate()
}
