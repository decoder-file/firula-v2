import { Prisma } from '@prisma/client'

import { prisma } from '@/lib/prisma'

import { CompanyRepository } from '../company-repository'

export class PrismaCompanyRepository implements CompanyRepository {
  async create(data: Prisma.CompanyUncheckedCreateInput) {
    return prisma.company.create({
      data,
    })
  }

  async findById(companyId: string) {
    return prisma.company.findUnique({
      where: {
        id: companyId,
      },
    })
  }

  async update(data: Prisma.CompanyUncheckedUpdateInput, id: string) {
    const company = await prisma.company.update({
      where: {
        id,
      },
      data,
    })

    return company
  }

  async delete(companyId: string) {
    return prisma.company.delete({
      where: {
        id: companyId,
      },
    })
  }

  async listAll(
    page: number,
    nameQuery?: string,
    unblockedCompanies?: boolean,
    activeCompanies?: boolean,
  ) {
    if (nameQuery) {
      return prisma.company.findMany({
        where: {
          slug: {
            contains: nameQuery,
          },
          isActive: activeCompanies ? true : undefined,
          isBlock: unblockedCompanies ? true : undefined,
        },
        take: 10,
        skip: (page - 1) * 10,
      })
    }

    return prisma.company.findMany({
      where: {
        isActive: activeCompanies ? true : undefined,
        isBlock: unblockedCompanies ? true : undefined,
      },
      take: 10,
      skip: (page - 1) * 10,
    })
  }

  async findByUserId(userId: string) {
    return prisma.company.findMany({
      where: {
        userId,
      },
    })
  }

  async countCompanies() {
    return prisma.company.count()
  }
}
