import { PrismaCompanyRepository } from '@/repositories/prisma/prisma-company-repository'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-user-repository'
import { CreateCompanyUseCase } from '@/use-cases/company/create-company'

export function makeCreateCompanyUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const companyRepository = new PrismaCompanyRepository()
  const createCompanyUseCase = new CreateCompanyUseCase(
    companyRepository,
    usersRepository,
  )

  return createCompanyUseCase
}
