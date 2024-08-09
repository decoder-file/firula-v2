import { Prisma, TypeBlock } from '@prisma/client'

export interface TypeBlockRepository {
  create(data: Prisma.TypeBlockCreateInput): Promise<TypeBlock>
  findById(typeBlockId: string): Promise<TypeBlock | null>
  update(
    data: Prisma.TypeBlockUncheckedUpdateInput,
    id: string,
  ): Promise<TypeBlock>
  delete(typeBlockId: string): Promise<boolean>
  listAll(
    unblockedTypeBlocks?: string,
    activeTypeBlocks?: string,
  ): Promise<TypeBlock[]>
}
