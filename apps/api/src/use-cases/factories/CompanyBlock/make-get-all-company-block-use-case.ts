import { PrismaCompanyBlockRepository } from '@/repositories/prisma/prisma-company-block-repository'
import { GetAllCompanyBlockUseCase } from '@/use-cases/company/companyBlock/get-all-company-block'

export function makeGetAllCompanyBlockUseCase() {
  const companyBlockRepository = new PrismaCompanyBlockRepository()
  const getAllCompanyBlockUseCase = new GetAllCompanyBlockUseCase(
    companyBlockRepository,
  )

  return getAllCompanyBlockUseCase
}
