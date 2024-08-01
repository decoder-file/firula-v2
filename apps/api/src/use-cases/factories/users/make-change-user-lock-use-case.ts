import { PrismaUsersRepository } from '@/repositories/prisma/prisma-user-repository'
import { ChangeUserLockUseCase } from '@/use-cases/users/change-user-lock'

export function makeChangeUserLockUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const changeUserLockUseCase = new ChangeUserLockUseCase(usersRepository)

  return changeUserLockUseCase
}
