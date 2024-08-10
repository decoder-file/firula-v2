import { PrismaCompanyBlockRepository } from '@/repositories/prisma/prisma-company-block-repository'
import { PrismaCompanyRepository } from '@/repositories/prisma/prisma-company-repository'
import { PrismaTypeBlockRepository } from '@/repositories/prisma/prisma-type-block-repository'
import { CreateCompanyBlockUseCase } from '@/use-cases/company/companyBlock/create-company-block'

export function makeCreateCompanyBlockUseCase() {
  const companyBlockRepository = new PrismaCompanyBlockRepository()
  const companyRepository = new PrismaCompanyRepository()
  const typeBlockRepository = new PrismaTypeBlockRepository(companyRepository)
  const createCompanyBlockUseCase = new CreateCompanyBlockUseCase(
    companyRepository,
    typeBlockRepository,
    companyBlockRepository,
  )

  return createCompanyBlockUseCase
}
