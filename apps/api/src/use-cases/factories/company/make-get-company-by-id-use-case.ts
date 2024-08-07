import { PrismaCompanyRepository } from '@/repositories/prisma/prisma-company-repository'
import { GetCompanyByIdUseCase } from '@/use-cases/company/get-company-by-id'

export function makeGetCompanyByIdUseCase() {
  const companyRepository = new PrismaCompanyRepository()
  const getCompanyByIdUseCase = new GetCompanyByIdUseCase(companyRepository)

  return getCompanyByIdUseCase
}
