import { PrismaCompanyAddressRepository } from '@/repositories/prisma/prisma-company-address-repository'
import { UpdateCompanyAddressUseCase } from '@/use-cases/company/CompanyAddress/update-company-address'

export function makeUpdateCompanyAddressUseCase() {
  const companyAddressRepository = new PrismaCompanyAddressRepository()

  const updateCompanyAddressUseCase = new UpdateCompanyAddressUseCase(
    companyAddressRepository,
  )

  return updateCompanyAddressUseCase
}
