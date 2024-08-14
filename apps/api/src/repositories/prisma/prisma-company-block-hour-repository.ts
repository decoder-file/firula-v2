import { CompanyBlockHour, Prisma } from '@prisma/client'

import { prisma } from '@/lib/prisma'

import { CompanyBlockHourRepository } from '../company-block-hour-repository'

export class PrismaCompanyBlockHourRepository
  implements CompanyBlockHourRepository
{
  async create(
    data: Prisma.CompanyBlockHourCreateInput,
  ): Promise<CompanyBlockHour> {
    return prisma.companyBlockHour.create({ data })
  }

  async findById(companyBlockHourId: string): Promise<CompanyBlockHour | null> {
    return prisma.companyBlockHour.findUnique({
      where: { id: companyBlockHourId },
    })
  }

  async update(
    data: Prisma.CompanyBlockHourUncheckedUpdateInput,
    id: string,
  ): Promise<CompanyBlockHour> {
    return prisma.companyBlockHour.update({
      where: { id },
      data,
    })
  }

  async delete(companyBlockHourId: string): Promise<boolean> {
    const deleted = await prisma.companyBlockHour.delete({
      where: { id: companyBlockHourId },
    })

    return !!deleted
  }

  async listAll(): Promise<CompanyBlockHour[]> {
    return prisma.companyBlockHour.findMany()
  }
}
