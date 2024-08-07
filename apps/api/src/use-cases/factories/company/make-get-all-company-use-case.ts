import { PrismaCompanyRepository } from '@/repositories/prisma/prisma-company-repository'
import { GetAllCompanyUseCase } from '@/use-cases/company/get-all-company'

export function makeGetAllCompanyUseCase() {
  const companyRepository = new PrismaCompanyRepository()
  const getALlCompanyUseCase = new GetAllCompanyUseCase(companyRepository)

  return getALlCompanyUseCase
}
