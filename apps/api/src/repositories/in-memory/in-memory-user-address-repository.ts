import { UserAddress } from '@prisma/client'

import { UserAddressRepository } from '../user-address-repository'

export class InMemoryUserAddressRepository implements UserAddressRepository {
  public items: UserAddress[] = []

  async create(data: UserAddress): Promise<UserAddress> {
    const address = {
      id: 'user-address-1',
      street: data.street,
      number: data.number,
      complement: data.complement,
      neighborhood: data.neighborhood,
      city: data.city,
      state: data.state,
      zipCode: data.zipCode,
      isMain: data.isMain,
      userId: 'user-id-1',
    }

    this.items.push(address)

    return address
  }

  async findById(id: string): Promise<UserAddress | null> {
    const address = this.items.find((item) => item.id === id)

    if (!address) {
      return null
    }

    return address
  }

  async update(data: UserAddress, id: string): Promise<UserAddress> {
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

  async delete(id: string): Promise<UserAddress> {
    const address = this.items.find((item) => item.id === id)

    if (!address) {
      throw new Error('Address not found')
    }

    this.items = this.items.filter((item) => item.id !== id)

    return address
  }
}
