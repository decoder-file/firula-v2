import { PrismaCompanyOpeningHoursRepository } from '@/repositories/prisma/prisma-company-opening-hours-repository'
import { UpdateCompanyOpeningHourUseCase } from '@/use-cases/company/CompanyOpeningHour/update-company-opening-hour'

export function makeUpdateCompanyOpeningHourUseCase() {
  const companyOpeningHoursRepository =
    new PrismaCompanyOpeningHoursRepository()
  const updateCompanyOpeningHourUseCase = new UpdateCompanyOpeningHourUseCase(
    companyOpeningHoursRepository,
  )

  return updateCompanyOpeningHourUseCase
}
