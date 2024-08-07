import { PrismaCompanyRepository } from '@/repositories/prisma/prisma-company-repository'
import { UpdateCompanyUseCase } from '@/use-cases/company/update-company'

export function makeUpdateCompanyUseCase() {
  const companyRepository = new PrismaCompanyRepository()
  const updateCompanyUseCase = new UpdateCompanyUseCase(companyRepository)

  return updateCompanyUseCase
}
