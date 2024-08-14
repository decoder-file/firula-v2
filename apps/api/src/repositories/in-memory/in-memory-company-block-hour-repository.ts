import { CompanyBlockHour } from '@prisma/client'

import { CompanyBlockHourRepository } from '../company-block-hour-repository'

export class InMemoryCompanyBlockHourRepository
  implements CompanyBlockHourRepository
{
  public items: CompanyBlockHour[] = []

  async create(data: CompanyBlockHour): Promise<CompanyBlockHour> {
    this.items.push(data)
    return data
  }

  async findById(companyBlockHourId: string): Promise<CompanyBlockHour | null> {
    return this.items.find((item) => item.id === companyBlockHourId) || null
  }

  async update(data: CompanyBlockHour, id: string): Promise<CompanyBlockHour> {
    const blockHour = this.items.find((item) => item.id === id)

    if (!blockHour) {
      throw new Error('CompanyBlockHour not found')
    }

    const updatedCompanyBlock = {
      ...blockHour,
      ...data,
      id: data.id || blockHour.id,
      date: data.date || blockHour.date,
      startTime: data.startTime || blockHour.startTime,
      endTime: data.endTime || blockHour.endTime,
      companyId: data.companyBlockId || blockHour.companyBlockId,
    }

    this.items = this.items.map((item) =>
      item.id === id ? updatedCompanyBlock : item,
    )

    return updatedCompanyBlock
  }

  async delete(companyBlockHourId: string): Promise<boolean> {
    const index = this.items.findIndex((item) => item.id === companyBlockHourId)
    if (index === -1) {
      return false
    }

    this.items.splice(index, 1)
    return true
  }

  async listAll(): Promise<CompanyBlockHour[]> {
    return this.items
  }
}
