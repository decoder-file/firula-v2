import { Prisma } from '@prisma/client'

import { prisma } from '@/lib/prisma'

import { CompanyRepository } from '../company-repository'
import { TypeBlockRepository } from '../type-block-repository'

export class PrismaTypeBlockRepository implements TypeBlockRepository {
  constructor(private companyRepository: CompanyRepository) {}

  async create(data: Prisma.TypeBlockUncheckedCreateInput) {
    return prisma.typeBlock.create({
      data,
    })
  }

  async findById(typeBlockId: string) {
    return prisma.typeBlock.findUnique({
      where: {
        id: typeBlockId,
      },
    })
  }

  async update(data: Prisma.TypeBlockUncheckedUpdateInput, id: string) {
    return prisma.typeBlock.update({
      where: {
        id,
      },
      data,
    })
  }

  async delete(typeBlockId: string) {
    prisma.typeBlock.delete({
      where: {
        id: typeBlockId,
      },
    })

    return true
  }

  async listAll() {
    return prisma.typeBlock.findMany()
  }
}
