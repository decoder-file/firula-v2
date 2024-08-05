import { PrismaUserProfileRepository } from '@/repositories/prisma/prisma-user-profile-repository'
import { UpdateUserProfileUseCase } from '@/use-cases/users/UserProfile/update-userProfile'

export function makeUpdateUserProfileUseCase() {
  const registerUserProfileRepository = new PrismaUserProfileRepository()
  const registerUserProfileUseCase = new UpdateUserProfileUseCase(
    registerUserProfileRepository,
  )

  return registerUserProfileUseCase
}
