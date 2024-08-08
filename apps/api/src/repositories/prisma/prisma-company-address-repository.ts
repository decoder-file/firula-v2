import { CompanyAddress, Prisma } from '@prisma/client'

import { prisma } from '@/lib/prisma'

import { CompanyAddressRepository } from '../company-address-repository'

export class PrismaCompanyAddressRepository
  implements CompanyAddressRepository
{
  async create(data: Prisma.CompanyAddressUncheckedCreateInput) {
    return prisma.companyAddress.create({
      data,
    })
  }

  async findById(addressId: string) {
    return prisma.companyAddress.findUnique({
      where: {
        id: addressId,
      },
    })
  }

  async update(
    data: Prisma.CompanyAddressUncheckedUpdateInput,
    id: string,
  ): Promise<CompanyAddress> {
    const userAddress = await prisma.companyAddress.update({
      where: {
        id,
      },
      data,
    })

    return userAddress
  }

  async delete(addressId: string) {
    return prisma.companyAddress.delete({
      where: {
        id: addressId,
      },
    })
  }
}
