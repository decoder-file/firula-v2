import { PrismaCompanyOpeningHoursRepository } from '@/repositories/prisma/prisma-company-opening-hours-repository'
import { GetCompanyOpeningHourByIdUseCase } from '@/use-cases/company/CompanyOpeningHour/get-company-opening-hour-by-id'

export function makeGetCompanyOpeningHourByIdUseCase() {
  const companyOpeningHoursRepository =
    new PrismaCompanyOpeningHoursRepository()
  const getCompanyOpeningHourByIdUseCase = new GetCompanyOpeningHourByIdUseCase(
    companyOpeningHoursRepository,
  )

  return getCompanyOpeningHourByIdUseCase
}
