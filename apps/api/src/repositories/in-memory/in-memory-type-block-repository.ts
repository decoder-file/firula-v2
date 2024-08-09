import { TypeBlock } from '@prisma/client'

import { TypeBlockRepository } from '../type-block-repository'

export class InMemoryTypeBlockRepository implements TypeBlockRepository {
  public items: TypeBlock[] = []

  async create(data: TypeBlock) {
    this.items.push(data)

    return data
  }

  async findById(typeBlockId: string) {
    return this.items.find((item) => item.id === typeBlockId) || null
  }

  async update(data: TypeBlock, id: string) {
    const index = this.items.findIndex((item) => item.id === id)

    this.items[index] = data

    return data
  }

  async delete(typeBlockId: string) {
    const index = this.items.findIndex((item) => item.id === typeBlockId)

    this.items.splice(index, 1)

    return true
  }

  async listAll() {
    return this.items
  }
}
