import { format, isValid } from 'date-fns'

export function useDateFormatter() {
  const formatDate = (date: string | number | Date, dateFormat = 'MMM dd, yyyy') => {
    const parsedDate = new Date(date)

    if (!isValid(parsedDate)) {
      return 'Date inconnue'
    }

    return format(parsedDate, dateFormat)
  }

  return { formatDate }
}
