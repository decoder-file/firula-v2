import { PrismaCompanyBlockHourRepository } from '@/repositories/prisma/prisma-company-block-hour-repository'
import { PrismaCompanyBlockRepository } from '@/repositories/prisma/prisma-company-block-repository'
import { CreateCompanyBlockHourUseCase } from '@/use-cases/company/companyBlock/BlockHour/create-company-block-hour'

export function makeCreateCompanyBlockHourUseCase() {
  const companyBlockRepository = new PrismaCompanyBlockRepository()
  const companyBlockHourRepository = new PrismaCompanyBlockHourRepository()

  const createCompanyBlockHourUseCase = new CreateCompanyBlockHourUseCase(
    companyBlockRepository,
    companyBlockHourRepository,
  )

  return createCompanyBlockHourUseCase
}
