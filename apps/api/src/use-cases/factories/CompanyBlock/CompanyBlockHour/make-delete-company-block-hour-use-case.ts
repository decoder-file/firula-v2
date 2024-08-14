import { PrismaCompanyBlockHourRepository } from '@/repositories/prisma/prisma-company-block-hour-repository'
import { DeleteCompanyBlockHourUseCase } from '@/use-cases/company/companyBlock/BlockHour/delete-company-block-hour'

export function makeDeleteCompanyBlockHourUseCase() {
  const companyBlockHourRepository = new PrismaCompanyBlockHourRepository()

  const createCompanyBlockHourUseCase = new DeleteCompanyBlockHourUseCase(
    companyBlockHourRepository,
  )

  return createCompanyBlockHourUseCase
}
