import { PrismaUserProfileRepository } from '@/repositories/prisma/prisma-user-profile-repository'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-user-repository'
import { CreateUserProfileUseCase } from '@/use-cases/users/UserProfile/create-userProfile'

export function makeRegisterUserProfileUseCase() {
  const userRepository = new PrismaUsersRepository()
  const registerUserProfileRepository = new PrismaUserProfileRepository()
  const registerUserProfileUseCase = new CreateUserProfileUseCase(
    registerUserProfileRepository,
    userRepository,
  )

  return registerUserProfileUseCase
}
