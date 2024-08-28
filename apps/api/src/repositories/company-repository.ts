import { Company, Prisma } from '@prisma/client'

export interface CompanyRepository {
  create(data: Prisma.CompanyUncheckedCreateInput): Promise<Company>
  findById(companyId: string): Promise<Company | null>
  update(data: Prisma.CompanyUncheckedUpdateInput, id: string): Promise<Company>
  delete(companyId: string): Promise<Company>
  listAll(
    unblockedCompanies?: string,
    activeCompanies?: string,
  ): Promise<Company[]>
  findByUserId(userId: string): Promise<Company[]>
  countCompanies(): Promise<number>
}
