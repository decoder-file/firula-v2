import { CompanyAddress } from '@prisma/client'

import { CompanyAddressRepository } from '../company-address-repository'

export class InMemoryCompanyAddressRepository
  implements CompanyAddressRepository
{
  public items: CompanyAddress[] = []

  async create(data: CompanyAddress): Promise<CompanyAddress> {
    const address = {
      id: 'company-address',
      street: data.street,
      number: data.number,
      complement: data.complement,
      neighborhood: data.neighborhood,
      city: data.city,
      state: data.state,
      zipCode: data.zipCode,
      isMain: data.isMain,
      companyId: 'company-id',
    }

    this.items.push(address)

    return address
  }

  async findById(id: string): Promise<CompanyAddress | null> {
    const address = this.items.find((item) => item.id === id)

    if (!address) {
      return null
    }

    return address
  }

  async update(data: CompanyAddress, id: string): Promise<CompanyAddress> {
    const address = this.items.find((item) => item.id === id)

    if (!address) {
      throw new Error('Address not found')
    }

    const updatedAddress = {
      ...address,
      ...data,
      id: data.id || address.id,
      street: data.street || address.street,
      number: data.number || address.number,
      complement: data.complement || address.complement,
      neighborhood: data.neighborhood || address.neighborhood,
      city: data.city || address.city,
      state: data.state || address.state,
      zipCode: data.zipCode || address.zipCode,
      isMain: data.isMain || address.isMain,
    }

    this.items = this.items.map((item) =>
      item.id === id ? updatedAddress : item,
    )

    return updatedAddress
  }

  async delete(id: string): Promise<CompanyAddress> {
    const address = this.items.find((item) => item.id === id)

    if (!address) {
      throw new Error('Address not found')
    }

    this.items = this.items.filter((item) => item.id !== id)

    return address
  }
}
