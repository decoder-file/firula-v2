import { Prisma, UserProfile } from '@prisma/client'

import { prisma } from '@/lib/prisma'

import { UserProfileRepository } from '../user-profile-repository'

export class PrismaUserProfileRepository implements UserProfileRepository {
  async create(data: Prisma.UserProfileUncheckedCreateInput) {
    const user = await prisma.userProfile.create({
      data,
    })

    return user
  }

  async findByMobilePhone(mobilePhone: string): Promise<UserProfile | null> {
    const user = await prisma.userProfile.findFirst({
      where: {
        mobilePhone,
      },
    })

    return user
  }
}
