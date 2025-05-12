import { format } from 'date-fns'

export function useDateFormatter() {
  const formatDate = (date: string | number | Date, dateFormat = 'MMM dd, yyyy') => {
    return format(new Date(date), dateFormat)
  }

  return { formatDate }
}
