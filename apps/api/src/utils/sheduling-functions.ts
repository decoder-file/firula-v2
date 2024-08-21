import { CompanyBlockHour } from '@prisma/client'
import moment from 'moment'

export function isTimeAvailable(
  startTime: string,
  endTime: string,
  existingBookings: CompanyBlockHour[],
) {
  const requestedStart = moment(startTime, 'HH:mm')
  const requestedEnd = moment(endTime, 'HH:mm')

  // Verifica se há conflitos com horários já marcados
  for (const booking of existingBookings) {
    const bookedStart = moment(booking.startTime, 'HH:mm')
    const bookedEnd = moment(booking.endTime, 'HH:mm')

    if (
      requestedStart.isBefore(bookedEnd) &&
      requestedEnd.isAfter(bookedStart)
    ) {
      return false // Horário já está ocupado
    }
  }

  return true // Horário disponível
}
