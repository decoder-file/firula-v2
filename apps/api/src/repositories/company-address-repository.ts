import { CompanyAddress, Prisma } from '@prisma/client'

export interface CompanyAddressRepository {
  create(
    data: Prisma.CompanyAddressUncheckedCreateInput,
  ): Promise<CompanyAddress>
  findById(addressId: string): Promise<CompanyAddress | null>
  update(
    data: Prisma.CompanyAddressUncheckedUpdateInput,
    id: string,
  ): Promise<CompanyAddress>
  delete(addressId: string): Promise<CompanyAddress>
}
