import { Prisma, UserProfile } from '@prisma/client'

export interface UserProfileRepository {
  create(data: Prisma.UserProfileUncheckedCreateInput): Promise<UserProfile>
  findByMobilePhone(mobilePhone: string): Promise<UserProfile | null>
  findById(id: string): Promise<UserProfile | null>
  update(
    data: Prisma.UserProfileUncheckedUpdateInput,
    id: string,
  ): Promise<UserProfile>
}
