import { Prisma } from '@prisma/client'

import { prisma } from '@/lib/prisma'

import { CompanyOpeningHoursRepository } from '../company-opening-hours'

export class PrismaCompanyOpeningHoursRepository
  implements CompanyOpeningHoursRepository
{
  async create(data: Prisma.CompanyOpeningHourUncheckedCreateInput) {
    return prisma.companyOpeningHour.create({
      data,
    })
  }

  async findById(companyId: string) {
    return prisma.companyOpeningHour.findUnique({
      where: {
        id: companyId,
      },
    })
  }

  async update(
    data: Prisma.CompanyOpeningHourUncheckedUpdateInput,
    id: string,
  ) {
    const company = await prisma.companyOpeningHour.update({
      where: {
        id,
      },
      data,
    })

    return company
  }

  async delete(openingHourId: string) {
    prisma.companyOpeningHour.delete({
      where: {
        id: openingHourId,
      },
    })

    return true
  }

  async searchSpecificDay(companyId: string, dayOfWeek: string) {
    return prisma.companyOpeningHour.findFirst({
      where: {
        companyId,
        dayOfWeek,
      },
    })
  }
}
