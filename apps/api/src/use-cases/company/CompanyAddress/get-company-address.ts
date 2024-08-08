import { CompanyAddress } from '@prisma/client'

import { CompanyAddressRepository } from '@/repositories/company-address-repository'
import { CompanyNotFound } from '@/use-cases/errors/company/company-not-found'

interface GetCompanyAddressUseCaseRequest {
  addressId: string
}

interface GetCompanyAddressUseCaseResponse {
  companyAddress: CompanyAddress
}

export class GetCompanyAddressUseCase {
  constructor(private companyAddressRepository: CompanyAddressRepository) {}

  async execute({
    addressId,
  }: GetCompanyAddressUseCaseRequest): Promise<GetCompanyAddressUseCaseResponse> {
    const companyAddress =
      await this.companyAddressRepository.findById(addressId)

    if (!companyAddress) {
      throw new CompanyNotFound()
    }

    return { companyAddress }
  }
}
