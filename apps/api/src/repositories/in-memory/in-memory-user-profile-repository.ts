import { Prisma, UserProfile } from '@prisma/client'

import { UserProfileRepository } from '../user-profile-repository'

export class InMemoryUserProfileRepository implements UserProfileRepository {
  public items: UserProfile[] = []

  async create(
    data: Prisma.UserProfileUncheckedCreateInput,
  ): Promise<UserProfile> {
    const user = {
      id: 'user-profile-1',
      mobilePhone: data.mobilePhone,
      dateOfBirth: new Date(data.dateOfBirth),
      walletId: null,
      apiKey: null,
      userId: 'user-id-1',
    }

    this.items.push(user)

    return user
  }

  async findByMobilePhone(mobilePhone: string): Promise<UserProfile | null> {
    const user = this.items.find((item) => item.mobilePhone === mobilePhone)

    if (!user) {
      return null
    }

    return user
  }
}
