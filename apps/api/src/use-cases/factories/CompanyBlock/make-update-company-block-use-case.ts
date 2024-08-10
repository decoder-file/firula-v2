import { PrismaCompanyBlockRepository } from '@/repositories/prisma/prisma-company-block-repository'
import { PrismaCompanyRepository } from '@/repositories/prisma/prisma-company-repository'
import { PrismaTypeBlockRepository } from '@/repositories/prisma/prisma-type-block-repository'
import { UpdateCompanyBlockUseCase } from '@/use-cases/company/companyBlock/update-company-block'

export function makeUpdateCompanyBlockUseCase() {
  const companyBlockRepository = new PrismaCompanyBlockRepository()
  const companyRepository = new PrismaCompanyRepository()
  const typeBlockRepository = new PrismaTypeBlockRepository(companyRepository)
  const updateCompanyBlockUseCase = new UpdateCompanyBlockUseCase(
    typeBlockRepository,
    companyBlockRepository,
  )

  return updateCompanyBlockUseCase
}
