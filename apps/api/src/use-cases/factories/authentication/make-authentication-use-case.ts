import { PrismaUsersRepository } from '@/repositories/prisma/prisma-user-repository'
import { AuthenticationUseCase } from '@/use-cases/authentication/authentication'

export function makeAuthenticationUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const authenticationUseCase = new AuthenticationUseCase(usersRepository)

  return authenticationUseCase
}
