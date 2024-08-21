import { PrismaCompanyBlockHourRepository } from '@/repositories/prisma/prisma-company-block-hour-repository'
import { PrismaCompanyBlockRepository } from '@/repositories/prisma/prisma-company-block-repository'
import { GetByDateCompanyBlockHourUseCase } from '@/use-cases/company/companyBlock/BlockHour/get-by-date-company-hour-block'

export function makeGetByDateCompanyBlockHourUseCase() {
  const companyBlockHourRepository = new PrismaCompanyBlockHourRepository()
  const companyBlockRepository = new PrismaCompanyBlockRepository()

  const getByDateCompanyBlockHourUseCase = new GetByDateCompanyBlockHourUseCase(
    companyBlockRepository,
    companyBlockHourRepository,
  )

  return getByDateCompanyBlockHourUseCase
}
