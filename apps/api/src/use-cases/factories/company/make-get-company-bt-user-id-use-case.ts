import { PrismaCompanyRepository } from '@/repositories/prisma/prisma-company-repository'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-user-repository'
import { GetCompanyByUserIdUseCase } from '@/use-cases/company/get-company-by-user-id'

export function makeGetCompanyByUserIdUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const companyRepository = new PrismaCompanyRepository()
  const getCompanyByUserIdUseCase = new GetCompanyByUserIdUseCase(
    companyRepository,
    usersRepository,
  )

  return getCompanyByUserIdUseCase
}
