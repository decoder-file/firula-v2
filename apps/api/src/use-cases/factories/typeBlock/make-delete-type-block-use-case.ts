import { PrismaCompanyRepository } from '@/repositories/prisma/prisma-company-repository'
import { PrismaTypeBlockRepository } from '@/repositories/prisma/prisma-type-block-repository'
import { DeleteTypeBlockUseCase } from '@/use-cases/company/TypeBlock/delete-type-block'

export function makeDeleteTypeBlockUseCase() {
  const companyRepository = new PrismaCompanyRepository()
  const typeBlockRepository = new PrismaTypeBlockRepository(companyRepository)
  const deleteTypeBlockUseCase = new DeleteTypeBlockUseCase(typeBlockRepository)

  return deleteTypeBlockUseCase
}
