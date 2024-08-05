import { UserProfile } from '@prisma/client'

import { UserProfileRepository } from '@/repositories/user-profile-repository'
import { UserProfileNotFound } from '@/use-cases/errors/userProfile/user-profie-not-found'
import { UserProfileMobilePhoneExistsError } from '@/use-cases/errors/userProfile/user-profile-mobile-phone-exists-error'

interface UpdateUserProfileUseCaseRequest {
  mobilePhone?: string
  walletId?: string
  apiKey?: string
  userProfileId: string
}

interface UpdateUserProfileUseCaseResponse {
  userProfile: UserProfile
}

export class UpdateUserProfileUseCase {
  constructor(private userProfileRepository: UserProfileRepository) {}

  async execute({
    mobilePhone,
    walletId,
    apiKey,
    userProfileId,
  }: UpdateUserProfileUseCaseRequest): Promise<UpdateUserProfileUseCaseResponse> {
    const responseUserProfile =
      await this.userProfileRepository.findById(userProfileId)

    if (!responseUserProfile) {
      throw new UserProfileNotFound()
    }

    if (mobilePhone) {
      const userMobilePhone =
        await this.userProfileRepository.findByMobilePhone(mobilePhone)

      if (userMobilePhone) {
        throw new UserProfileMobilePhoneExistsError()
      }
    }

    const userProfile = await this.userProfileRepository.update(
      {
        mobilePhone,
        walletId,
        apiKey,
      },
      userProfileId,
    )

    return {
      userProfile,
    }
  }
}
