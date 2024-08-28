import { Prisma } from '@prisma/client'

import { prisma } from '@/lib/prisma'

import { CompanyBlockRepository } from '../company-block-repository'

export class PrismaCompanyBlockRepository implements CompanyBlockRepository {
  async create(data: Prisma.CompanyBlockUncheckedCreateInput) {
    return prisma.companyBlock.create({
      data,
    })
  }

  async findById(companyBlockId: string) {
    return prisma.companyBlock.findUnique({
      where: {
        id: companyBlockId,
      },
    })
  }

  async update(data: Prisma.CompanyBlockUncheckedUpdateInput, id: string) {
    return prisma.companyBlock.update({
      where: {
        id,
      },
      data,
    })
  }

  async delete(companyBlockId: string) {
    prisma.companyBlock.delete({
      where: {
        id: companyBlockId,
      },
    })

    return true
  }

  async listAll() {
    return prisma.companyBlock.findMany()
  }

  async findBlockByCompanyId(companyId: string) {
    return prisma.companyBlock.findMany({
      where: {
        companyId,
      },
    })
  }

  async countBlocks() {
    return prisma.companyBlock.count()
  }
}
