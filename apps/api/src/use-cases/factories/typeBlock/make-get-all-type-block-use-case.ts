import { PrismaCompanyRepository } from '@/repositories/prisma/prisma-company-repository'
import { PrismaTypeBlockRepository } from '@/repositories/prisma/prisma-type-block-repository'
import { GetAllTypeBlockUseCase } from '@/use-cases/company/TypeBlock/get-all-type-block'

export function makeGetAllTypeBlockUseCase() {
  const companyRepository = new PrismaCompanyRepository()
  const typeBlockRepository = new PrismaTypeBlockRepository(companyRepository)
  const getAllTypeBlockUseCase = new GetAllTypeBlockUseCase(typeBlockRepository)

  return getAllTypeBlockUseCase
}
