import { PrismaCompanyRepository } from '@/repositories/prisma/prisma-company-repository'
import { PrismaTypeBlockRepository } from '@/repositories/prisma/prisma-type-block-repository'
import { GetTypeBlockByIdUseCase } from '@/use-cases/company/TypeBlock/get-type-block-by-id'

export function makeGetTypeBlockByIdUseCase() {
  const companyRepository = new PrismaCompanyRepository()
  const typeBlockRepository = new PrismaTypeBlockRepository(companyRepository)
  const getTypeBlockByIdUseCase = new GetTypeBlockByIdUseCase(
    typeBlockRepository,
  )

  return getTypeBlockByIdUseCase
}
