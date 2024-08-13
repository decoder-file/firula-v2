import { PrismaCompanyOpeningHoursRepository } from '@/repositories/prisma/prisma-company-opening-hours-repository'
import { PrismaCompanyRepository } from '@/repositories/prisma/prisma-company-repository'
import { CreateCompanyOpeningHourUseCase } from '@/use-cases/company/CompanyOpeningHour/create-company-opening-hour'

export function makeCreateCompanyOpeningHourUseCase() {
  const companyOpeningHoursRepository =
    new PrismaCompanyOpeningHoursRepository()
  const companyRepository = new PrismaCompanyRepository()

  const createCompanyUseCase = new CreateCompanyOpeningHourUseCase(
    companyRepository,
    companyOpeningHoursRepository,
  )

  return createCompanyUseCase
}
