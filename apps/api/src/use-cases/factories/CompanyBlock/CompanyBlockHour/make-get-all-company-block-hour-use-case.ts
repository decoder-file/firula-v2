import { PrismaCompanyBlockHourRepository } from '@/repositories/prisma/prisma-company-block-hour-repository'
import { GetAllCompanyBlockHourUseCase } from '@/use-cases/company/companyBlock/BlockHour/get-all-company-block-hour'

export function makeGetAllCompanyBlockHourUseCase() {
  const companyBlockHourRepository = new PrismaCompanyBlockHourRepository()

  const getAllCompanyBlockHourUseCase = new GetAllCompanyBlockHourUseCase(
    companyBlockHourRepository,
  )

  return getAllCompanyBlockHourUseCase
}
