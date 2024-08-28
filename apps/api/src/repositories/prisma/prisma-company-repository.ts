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

  async listAll(unblockedCompanies?: string, activeCompanies?: string) {
    if (unblockedCompanies) {
      return prisma.company.findMany({
        where: {
          isBlock: false,
        },
      })
    }

    if (activeCompanies) {
      return prisma.company.findMany({
        where: {
          isActive: true,
        },
      })
    }

    if (unblockedCompanies && activeCompanies) {
      return prisma.company.findMany({
        where: {
          isBlock: false,
          isActive: true,
        },
      })
    }
    return prisma.company.findMany()
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
