import { PrismaUsersRepository } from '@/repositories/prisma/prisma-user-repository'
import { UpdateUserUseCase } from '@/use-cases/users/update-user'

export function makeUpdateUserUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const updateUserUseCase = new UpdateUserUseCase(usersRepository)

  return updateUserUseCase
}