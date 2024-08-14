import { CompanyBlockHour, Prisma } from '@prisma/client'

export interface CompanyBlockHourRepository {
  create(data: Prisma.CompanyBlockHourCreateInput): Promise<CompanyBlockHour>
  findById(companyBlockHourId: string): Promise<CompanyBlockHour | null>
  update(
    data: Prisma.CompanyBlockHourUncheckedUpdateInput,
    id: string,
  ): Promise<CompanyBlockHour>
  delete(companyBlockHourId: string): Promise<boolean>
  listAll(): Promise<CompanyBlockHour[]>
}
