import { PrismaUsersRepository } from '@/repositories/prisma/prisma-user-repository'
import { CreateUserUseCase } from '@/use-cases/users/create-user'

export function makeRegisterUserUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const registerUserUseCase = new CreateUserUseCase(usersRepository)

  return registerUserUseCase
}
