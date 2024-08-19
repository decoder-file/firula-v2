import { Prisma, Scheduling } from '@prisma/client'

import { prisma } from '@/lib/prisma'

import { SchedulingRepository } from '../scheduling-repository'

export class PrismaSchedulingRepository implements SchedulingRepository {
  async create(data: Prisma.SchedulingCreateInput): Promise<Scheduling> {
    return await prisma.scheduling.create({
      data,
    })
  }

  async findById(id: string): Promise<Scheduling | null> {
    return await prisma.scheduling.findUnique({
      where: {
        id,
      },
    })
  }

  async findByUserId(userId: string): Promise<Scheduling[]> {
    return await prisma.scheduling.findMany({
      where: {
        userId,
      },
    })
  }

  async update(
    id: string,
    data: Prisma.SchedulingUpdateInput,
  ): Promise<Scheduling> {
    return await prisma.scheduling.update({
      where: {
        id,
      },
      data,
    })
  }

  async delete(id: string): Promise<Scheduling> {
    return await prisma.scheduling.delete({
      where: {
        id,
      },
    })
  }
}
