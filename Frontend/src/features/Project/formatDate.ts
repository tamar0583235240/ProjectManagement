import { format, isValid, parseISO } from 'date-fns'

const formatDate = (date: string | Date | null | undefined): string => {
  if (!date) return 'N/A'

  const parsedDate = typeof date === 'string' ? parseISO(date) : new Date(date)

  if (!isValid(parsedDate)) return 'N/A'

<<<<<<< HEAD
  return format(parsedDate, 'dd/MM/yyyy')
=======
  return format(parsedDate, 'dd/MM/yyyy') 
>>>>>>> Frontend/Employees
}

export default formatDate
