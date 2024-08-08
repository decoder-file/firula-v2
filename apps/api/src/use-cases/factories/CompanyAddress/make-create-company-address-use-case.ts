import { PrismaCompanyAddressRepository } from '@/repositories/prisma/prisma-company-address-repository'
import { PrismaCompanyRepository } from '@/repositories/prisma/prisma-company-repository'
import { CreateCompanyAddressUseCase } from '@/use-cases/company/CompanyAddress/create-company-address'

export function makeCreateCompanyAddressUseCase() {
  const companyAddressRepository = new PrismaCompanyAddressRepository()
  const companyRepository = new PrismaCompanyRepository()

  const createUserAddressUseCase = new CreateCompanyAddressUseCase(
    companyAddressRepository,
    companyRepository,
  )

  return createUserAddressUseCase
}
