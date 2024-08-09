import { PrismaCompanyRepository } from '@/repositories/prisma/prisma-company-repository'
import { PrismaTypeBlockRepository } from '@/repositories/prisma/prisma-type-block-repository'
import { UpdateTypeBlockUseCase } from '@/use-cases/company/TypeBlock/update-type-block'

export function makeUpdateTypeBlockUseCase() {
  const companyRepository = new PrismaCompanyRepository()
  const typeBlockRepository = new PrismaTypeBlockRepository(companyRepository)
  const updateTypeBlockUseCase = new UpdateTypeBlockUseCase(typeBlockRepository)

  return updateTypeBlockUseCase
}
