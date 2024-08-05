import { Prisma, UserProfile } from '@prisma/client'

export interface UserProfileRepository {
  create(data: Prisma.UserProfileUncheckedCreateInput): Promise<UserProfile>
  findByMobilePhone(mobilePhone: string): Promise<UserProfile | null>
}
