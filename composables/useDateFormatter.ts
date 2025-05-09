import { format } from 'date-fns'

export function useDateFormatter() {
  const formatDate = (date: string, dateFormat = 'MMM dd, yyyy') => {
    return format(new Date(date), dateFormat)
  }

  return { formatDate }
}
