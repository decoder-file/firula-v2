import { UserProfile } from '@prisma/client'

import { UserProfileRepository } from '@/repositories/user-profile-repository'
import { UsersRepository } from '@/repositories/users-repository'
import { UserProfileMobilePhoneExistsError } from '@/use-cases/errors/userProfile/user-profile-mobile-phone-exists-error'
import { UserNotFound } from '@/use-cases/errors/users/user-not-found'

interface CreateUserProfileUseCaseRequest {
  mobilePhone: string
  dateOfBirth: Date
  walletId?: string
  apiKey?: string
  userId: string
}

interface CreateUserProfileUseCaseResponse {
  userProfile: UserProfile
}

export class CreateUserProfileUseCase {
  constructor(
    private userProfileRepository: UserProfileRepository,
    private userUsesRepository: UsersRepository,
  ) {}

  async execute({
    mobilePhone,
    dateOfBirth,
    walletId,
    apiKey,
    userId,
  }: CreateUserProfileUseCaseRequest): Promise<CreateUserProfileUseCaseResponse> {
    const { user } = await this.userUsesRepository.findById(userId)

    if (!user) {
      throw new UserNotFound()
    }

    const userMobilePhone =
      await this.userProfileRepository.findByMobilePhone(mobilePhone)

    if (userMobilePhone) {
      throw new UserProfileMobilePhoneExistsError()
    }

    const userProfile = await this.userProfileRepository.create({
      mobilePhone,
      dateOfBirth,
      walletId,
      apiKey,
      userId,
    })

    return {
      userProfile,
    }
  }
}
