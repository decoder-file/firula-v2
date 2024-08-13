import { CompanyOpeningHour, Prisma } from '@prisma/client'

export interface CompanyOpeningHoursRepository {
  create(
    data: Prisma.CompanyOpeningHourUncheckedCreateInput,
  ): Promise<CompanyOpeningHour>
  findById(openingHourId: string): Promise<CompanyOpeningHour | null>
  update(
    data: Prisma.CompanyOpeningHourUncheckedUpdateInput,
    id: string,
  ): Promise<CompanyOpeningHour>
  delete(openingHourId: string): Promise<boolean>
  searchSpecificDay(
    companyId: string,
    dayOfWeek: string,
  ): Promise<CompanyOpeningHour | null>
}
