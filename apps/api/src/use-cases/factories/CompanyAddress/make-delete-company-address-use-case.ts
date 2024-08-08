import { PrismaCompanyAddressRepository } from '@/repositories/prisma/prisma-company-address-repository'
import { DeleteCompanyAddressUseCase } from '@/use-cases/company/CompanyAddress/delete-company-address'

export function makeDeleteCompanyAddressUseCase() {
  const companyAddressRepository = new PrismaCompanyAddressRepository()
  const deleteCompanyAddressUseCase = new DeleteCompanyAddressUseCase(
    companyAddressRepository,
  )

  return deleteCompanyAddressUseCase
}
