import { PrismaCompanyBlockRepository } from '@/repositories/prisma/prisma-company-block-repository'
import { PrismaCompanyRepository } from '@/repositories/prisma/prisma-company-repository'
import { GetCompanyBlockByCompanyIdUseCase } from '@/use-cases/company/companyBlock/get-company-block-by-company-id'

export function makeGetCompanyBlockByCompanyIdUseCase() {
  const companyBlockRepository = new PrismaCompanyBlockRepository()
  const companyRepository = new PrismaCompanyRepository()
  const getCompanyBlockByCompanyIdUseCase =
    new GetCompanyBlockByCompanyIdUseCase(
      companyBlockRepository,
      companyRepository,
    )

  return getCompanyBlockByCompanyIdUseCase
}
