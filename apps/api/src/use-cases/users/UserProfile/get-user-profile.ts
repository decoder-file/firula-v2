import { UserProfile } from '@prisma/client'

import { UserProfileRepository } from '@/repositories/user-profile-repository'
import { UserProfileNotFound } from '@/use-cases/errors/userProfile/user-profie-not-found'

interface GetUserProfileUseCaseRequest {
  userProfileId: string
}

interface GetUserProfileUseCaseResponse {
  userProfile: UserProfile
}

export class GetUserProfileUseCase {
  constructor(private userProfileRepository: UserProfileRepository) {}

  async execute({
    userProfileId,
  }: GetUserProfileUseCaseRequest): Promise<GetUserProfileUseCaseResponse> {
    const userProfile = await this.userProfileRepository.findById(userProfileId)

    if (!userProfile) {
      throw new UserProfileNotFound()
    }

    return { userProfile }
  }
}
