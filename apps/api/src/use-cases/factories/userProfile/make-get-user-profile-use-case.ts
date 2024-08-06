import { PrismaUserProfileRepository } from '@/repositories/prisma/prisma-user-profile-repository'
import { GetUserProfileUseCase } from '@/use-cases/users/UserProfile/get-user-profile'

export function makeGetUserProfileUseCase() {
  const registerUserProfileRepository = new PrismaUserProfileRepository()
  const registerUserProfileUseCase = new GetUserProfileUseCase(
    registerUserProfileRepository,
  )

  return registerUserProfileUseCase
}
