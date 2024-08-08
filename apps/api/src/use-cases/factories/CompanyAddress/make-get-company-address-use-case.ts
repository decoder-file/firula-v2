import { PrismaCompanyAddressRepository } from '@/repositories/prisma/prisma-company-address-repository'
import { GetCompanyAddressUseCase } from '@/use-cases/company/CompanyAddress/get-company-address'

export function makeGetCompanyAddressUseCase() {
  const companyAddressRepository = new PrismaCompanyAddressRepository()

  const updateCompanyAddressUseCase = new GetCompanyAddressUseCase(
    companyAddressRepository,
  )

  return updateCompanyAddressUseCase
}
