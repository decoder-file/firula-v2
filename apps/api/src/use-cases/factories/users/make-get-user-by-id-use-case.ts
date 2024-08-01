import { PrismaUsersRepository } from '@/repositories/prisma/prisma-user-repository'
import { GetUserByIdUserUseCase } from '@/use-cases/users/get-user-by-id'

export function makeGetUserByIdUserUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const getUserByIdUseCase = new GetUserByIdUserUseCase(usersRepository)

  return getUserByIdUseCase
}
