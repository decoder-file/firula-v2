import { PrismaUsersRepository } from '@/repositories/prisma/prisma-user-repository'
import { GetAllUserUseCase } from '@/use-cases/users/get-all-user'

export function makeGetAllUsersUserUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const getAllUsersUseCase = new GetAllUserUseCase(usersRepository)

  return getAllUsersUseCase
}
