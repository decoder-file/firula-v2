import { PrismaCompanyRepository } from '@/repositories/prisma/prisma-company-repository'
import { PrismaTypeBlockRepository } from '@/repositories/prisma/prisma-type-block-repository'
import { CreateTypeBlockUseCase } from '@/use-cases/company/TypeBlock/create-type-block'

export function makeCreateTypeBlockUseCase() {
  const companyRepository = new PrismaCompanyRepository()
  const typeBlockRepository = new PrismaTypeBlockRepository(companyRepository)
  const createTypeBlockUseCase = new CreateTypeBlockUseCase(typeBlockRepository)

  return createTypeBlockUseCase
}
