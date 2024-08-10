import { PrismaCompanyBlockRepository } from '@/repositories/prisma/prisma-company-block-repository'
import { GetCompanyBlockByIdUseCase } from '@/use-cases/company/companyBlock/gt-company-block-by-id'

export function makeGetCompanyBlockByIdUseCase() {
  const companyBlockRepository = new PrismaCompanyBlockRepository()
  const getCompanyBlockByIdUseCase = new GetCompanyBlockByIdUseCase(
    companyBlockRepository,
  )

  return getCompanyBlockByIdUseCase
}
