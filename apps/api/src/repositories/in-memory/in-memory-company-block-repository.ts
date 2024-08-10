import { CompanyBlock } from '@prisma/client'

import { CompanyBlockRepository } from '../company-block-repository'

export class InMemoryCompanyBlockRepository implements CompanyBlockRepository {
  public items: CompanyBlock[] = []

  async create(data: CompanyBlock): Promise<CompanyBlock> {
    const companyBlock: CompanyBlock = {
      id: 'company-block-1',
      name: data.name,
      valueForHour: data.valueForHour,
      imageUrl: '',
      typeBlockId: data.typeBlockId,
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: false,
    }

    this.items.push(companyBlock)

    return companyBlock
  }

  async findById(companyBlockId: string): Promise<CompanyBlock | null> {
    const companyBlock = this.items.find((item) => item.id === companyBlockId)

    if (!companyBlock) {
      return null
    }

    return companyBlock
  }

  async update(
    data: CompanyBlock,
    companyBlockId: string,
  ): Promise<CompanyBlock> {
    const companyBlock = this.items.find((item) => item.id === companyBlockId)

    if (!companyBlock) {
      throw new Error('CompanyBlock not found')
    }

    const updatedCompanyBlock = {
      ...companyBlock,
      ...data,
      id: data.id || companyBlock.id,
      name: data.name || companyBlock.name,
      valueForHour: data.valueForHour || companyBlock.valueForHour,
      imageUrl: data.imageUrl || companyBlock.imageUrl,
      typeBlockId: data.typeBlockId || companyBlock.typeBlockId,
      updatedAt: new Date(),
    }

    this.items = this.items.map((item) =>
      item.id === companyBlockId ? updatedCompanyBlock : item,
    )

    return updatedCompanyBlock
  }

  async delete(companyBlockId: string): Promise<boolean> {
    const companyBlock = this.items.find((item) => item.id === companyBlockId)

    if (!companyBlock) {
      return false
    }

    this.items = this.items.filter((item) => item.id !== companyBlockId)

    return true
  }

  async listAll(
    unblockedCompanyBlocks?: string,
    activeCompanyBlocks?: string,
  ): Promise<CompanyBlock[]> {
    if (unblockedCompanyBlocks) {
      return this.items.filter((item) => !item.isActive)
    }

    if (activeCompanyBlocks) {
      return this.items.filter((item) => item.isActive)
    }

    return this.items
  }
}
