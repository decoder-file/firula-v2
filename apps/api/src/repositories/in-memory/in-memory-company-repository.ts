import { Company } from '@prisma/client'

import { CompanyRepository } from '../company-repository'

export class InMemoryCompanyRepository implements CompanyRepository {
  public items: Company[] = []

  async create(data: Company): Promise<Company> {
    const company: Company = {
      id: 'company-1',
      name: data.name,
      slug: data.slug,
      cpf_cnpj: data.cpf_cnpj,
      typeDocument: data.typeDocument,
      mobilePhone: data.mobilePhone,
      imageUrl: data.imageUrl || null,
      isActive: data.isActive,
      walletId: data.walletId || null,
      apiKey: data.apiKey || null,
      userId: 'user-id-1',
      isBlock: data.isBlock,
      companyType: data.companyType,
      incomeValue: data.incomeValue,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    this.items.push(company)

    return company
  }

  async findById(companyId: string): Promise<Company | null> {
    const company = this.items.find((item) => item.id === companyId)

    if (!company) {
      return null
    }

    return company
  }

  async update(data: Company, companyId: string): Promise<Company> {
    const company = this.items.find((item) => item.id === companyId)

    if (!company) {
      throw new Error('Company not found')
    }

    const updatedCompany = {
      ...company,
      ...data,
      id: data.id || company.id,
      name: data.name || company.name,
      slug: data.slug || company.slug,
      cpf_cnpj: data.cpf_cnpj || company.cpf_cnpj,
      typeDocument: data.typeDocument || company.typeDocument,
      mobilePhone: data.mobilePhone || company.mobilePhone,
      imageUrl: data.imageUrl || company.imageUrl,
      isActive: data.isActive || company.isActive,
      walletId: data.walletId || company.walletId,
      apiKey: data.apiKey || company.apiKey,
      userId: data.userId || company.userId,
      isBlock: data.isBlock || company.isBlock,
      companyType: data.companyType || company.companyType,
      incomeValue: data.incomeValue || company.incomeValue,
      createdAt: data.createdAt || company.createdAt,
      updatedAt: new Date(),
    }

    this.items = this.items.map((item) =>
      item.id === companyId ? updatedCompany : item,
    )

    return updatedCompany
  }

  async delete(companyId: string): Promise<Company> {
    const company = this.items.find((item) => item.id === companyId)

    if (!company) {
      throw new Error('Company not found')
    }

    this.items = this.items.filter((item) => item.id !== companyId)

    return company
  }

  async listAll(): Promise<Company[]> {
    return this.items
  }

  async findByUserId(userId: string): Promise<Company[]> {
    const companies = this.items.filter((item) => item.userId === userId)

    return companies
  }
}
