import { PrismaCompanyBlockRepository } from '@/repositories/prisma/prisma-company-block-repository'
import { PrismaCompanyRepository } from '@/repositories/prisma/prisma-company-repository'
import { PrismaTypeBlockRepository } from '@/repositories/prisma/prisma-type-block-repository'
import { DeleteCompanyBlockUseCase } from '@/use-cases/company/companyBlock/delete-company-block'

export function makeDeleteCompanyBlockUseCase() {
  const companyBlockRepository = new PrismaCompanyBlockRepository()
  const companyRepository = new PrismaCompanyRepository()
  const typeBlockRepository = new PrismaTypeBlockRepository(companyRepository)
  const getCompanyBlockByIdUseCase = new DeleteCompanyBlockUseCase(
    companyRepository,
    typeBlockRepository,
    companyBlockRepository,
  )

  return getCompanyBlockByIdUseCase
}
