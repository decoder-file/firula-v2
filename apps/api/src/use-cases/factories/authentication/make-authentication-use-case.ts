import { PrismaCompanyRepository } from '@/repositories/prisma/prisma-company-repository'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-user-repository'
import { AuthenticationUseCase } from '@/use-cases/authentication/authentication'

export function makeAuthenticationUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const companyRepository = new PrismaCompanyRepository()
  const authenticationUseCase = new AuthenticationUseCase(
    usersRepository,
    companyRepository,
  )

  return authenticationUseCase
}
