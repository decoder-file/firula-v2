import { Prisma, Scheduling } from '@prisma/client'

export interface SchedulingRepository {
  create(data: Prisma.SchedulingCreateInput): Promise<Scheduling>
  findById(id: string): Promise<Scheduling | null>
  findByUserId(userId: string): Promise<Scheduling[]>
  update(id: string, data: Prisma.SchedulingUpdateInput): Promise<Scheduling>
  delete(id: string): Promise<Scheduling>
}
