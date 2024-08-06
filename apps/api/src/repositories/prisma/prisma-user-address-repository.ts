import { Prisma, UserAddress } from '@prisma/client'

import { prisma } from '@/lib/prisma'

import { UserAddressRepository } from '../user-address-repository'

export class PrismaUserAddressRepository implements UserAddressRepository {
  async create(data: Prisma.UserAddressUncheckedCreateInput) {
    return prisma.userAddress.create({
      data,
    })
  }

  async findById(addressId: string) {
    return prisma.userAddress.findUnique({
      where: {
        id: addressId,
      },
    })
  }

  async update(
    data: Prisma.UserAddressUncheckedUpdateInput,
    id: string,
  ): Promise<UserAddress> {
    const userAddress = await prisma.userAddress.update({
      where: {
        id,
      },
      data,
    })

    return userAddress
  }

  async delete(addressId: string) {
    return prisma.userAddress.delete({
      where: {
        id: addressId,
      },
    })
  }
}
