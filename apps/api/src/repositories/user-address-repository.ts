import { Prisma, UserAddress } from '@prisma/client'

export interface UserAddressRepository {
  create(data: Prisma.UserAddressUncheckedCreateInput): Promise<UserAddress>
  findById(addressId: string): Promise<UserAddress | null>
  update(
    data: Prisma.UserAddressUncheckedUpdateInput,
    id: string,
  ): Promise<UserAddress>
  delete(addressId: string): Promise<UserAddress>
}
