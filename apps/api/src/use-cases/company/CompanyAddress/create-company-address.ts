import { CompanyAddress } from '@prisma/client'

import { CompanyAddressRepository } from '@/repositories/company-address-repository'
import { CompanyRepository } from '@/repositories/company-repository'
import { CompanyNotFound } from '@/use-cases/errors/company/company-not-found'

interface CreateCompanyAddressUseCaseRequest {
  street: string
  number: string
  complement: string
  neighborhood: string
  city: string
  state: string
  zipCode: string
  isMain?: boolean
  companyId: string
}

interface CreateCompanyAddressUseCaseResponse {
  address: CompanyAddress
}

export class CreateCompanyAddressUseCase {
  constructor(
    private companyAddressRepository: CompanyAddressRepository,
    private companyRepository: CompanyRepository,
  ) {}

  async execute({
    street,
    number,
    complement,
    neighborhood,
    city,
    state,
    zipCode,
    isMain,
    companyId,
  }: CreateCompanyAddressUseCaseRequest): Promise<CreateCompanyAddressUseCaseResponse> {
    const company = await this.companyRepository.findById(companyId)

    if (!company) {
      throw new CompanyNotFound()
    }

    const addressData = await this.companyAddressRepository.create({
      street,
      number,
      complement,
      neighborhood,
      city,
      state,
      zipCode,
      isMain,
      companyId,
    })

    return {
      address: addressData,
    }
  }
}
