import { CompanyBlock, Prisma } from '@prisma/client'

export interface CompanyBlockRepository {
  create(data: Prisma.CompanyBlockCreateInput): Promise<CompanyBlock>
  findById(companyBlockId: string): Promise<CompanyBlock | null>
  update(
    data: Prisma.CompanyBlockUncheckedUpdateInput,
    id: string,
  ): Promise<CompanyBlock>
  delete(companyBlockId: string): Promise<boolean>
  listAll(
    unblockedCompanyBlocks?: string,
    activeCompanyBlocks?: string,
  ): Promise<CompanyBlock[]>
  findBlockByCompanyId(companyId: string): Promise<CompanyBlock[] | null>
}
