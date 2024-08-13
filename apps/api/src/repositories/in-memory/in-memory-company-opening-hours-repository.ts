import { CompanyOpeningHour } from '@prisma/client'

import { CompanyOpeningHoursRepository } from '../company-opening-hours'

export class InMemoryCompanyOpeningHoursRepository
  implements CompanyOpeningHoursRepository
{
  public items: CompanyOpeningHour[] = []

  async create(data: CompanyOpeningHour): Promise<CompanyOpeningHour> {
    const companyOpeningHour: CompanyOpeningHour = {
      id: 'company-opening-hour-1',
      dayOfWeek: data.dayOfWeek,
      openAt: data.openAt,
      closeAt: data.closeAt,
      companyId: data.companyId,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    this.items.push(companyOpeningHour)

    return companyOpeningHour
  }

  async findById(
    companyOpeningHourId: string,
  ): Promise<CompanyOpeningHour | null> {
    const companyOpeningHour = this.items.find(
      (item) => item.id === companyOpeningHourId,
    )

    if (!companyOpeningHour) {
      return null
    }

    return companyOpeningHour
  }

  async update(
    data: CompanyOpeningHour,
    companyOpeningHourId: string,
  ): Promise<CompanyOpeningHour> {
    const companyOpeningHour = this.items.find(
      (item) => item.id === companyOpeningHourId,
    )

    if (!companyOpeningHour) {
      throw new Error('Company Opening Hour not found')
    }

    const updatedCompanyOpeningHour = {
      ...companyOpeningHour,
      ...data,
      id: data.id || companyOpeningHour.id,
      dayOfWeek: data.dayOfWeek || companyOpeningHour.dayOfWeek,
      openAt: data.openAt || companyOpeningHour.openAt,
      closeAt: data.closeAt || companyOpeningHour.closeAt,
      companyId: data.companyId || companyOpeningHour.companyId,
      updatedAt: new Date(),
    }

    this.items = this.items.map((item) =>
      item.id === companyOpeningHourId ? updatedCompanyOpeningHour : item,
    )

    return updatedCompanyOpeningHour
  }

  async delete(companyOpeningHourId: string): Promise<boolean> {
    this.items = this.items.filter((item) => item.id !== companyOpeningHourId)

    return true
  }

  async searchSpecificDay(
    companyId: string,
    dayOfWeek: string,
  ): Promise<CompanyOpeningHour | null> {
    const companyOpeningHour = this.items.find(
      (item) => item.companyId === companyId && item.dayOfWeek === dayOfWeek,
    )

    if (!companyOpeningHour) {
      return null
    }

    return companyOpeningHour
  }
}
