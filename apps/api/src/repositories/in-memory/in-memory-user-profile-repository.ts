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

  async findById(id: string): Promise<UserProfile | null> {
    const user = this.items.find((item) => item.id === id)

    if (!user) {
      return null
    }

    return user
  }

  async update(
    data: Prisma.UserProfileUncheckedUpdateInput,
    id: string,
  ): Promise<UserProfile> {
    const user = this.items.find((item) => item.id === id)

    if (!user) {
      throw new Error('User not found')
    }

    const updatedUser = {
      ...user,
      ...data,
      id: data.id?.toString() || user.id,
      mobilePhone: data.mobilePhone?.toString() || '',
      walletId: data.walletId?.toString() || null,
      apiKey: typeof data.apiKey === 'string' ? data.apiKey : null,
      userId: typeof data.userId === 'string' ? data.userId : '',
      dateOfBirth: user.dateOfBirth,
    }

    this.items = this.items.map((item) => (item.id === id ? updatedUser : item))

    return updatedUser
  }
}
