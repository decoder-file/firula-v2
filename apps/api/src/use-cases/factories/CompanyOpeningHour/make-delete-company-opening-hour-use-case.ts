import { PrismaCompanyOpeningHoursRepository } from '@/repositories/prisma/prisma-company-opening-hours-repository'
import { DeleteCompanyOpeningHourUseCase } from '@/use-cases/company/CompanyOpeningHour/delete-company-opening-hour'

export function makeDeleteCompanyOpeningHourUseCase() {
  const companyOpeningHoursRepository =
    new PrismaCompanyOpeningHoursRepository()
  const deleteCompanyOpeningHourUseCase = new DeleteCompanyOpeningHourUseCase(
    companyOpeningHoursRepository,
  )

  return deleteCompanyOpeningHourUseCase
}
