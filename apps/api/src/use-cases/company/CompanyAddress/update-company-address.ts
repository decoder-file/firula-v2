import { CompanyAddressRepository } from '@/repositories/company-address-repository'
import { UserAddressNotFound } from '@/use-cases/errors/userAddress/user-address-not-found'

interface CreateCompanyAddressUseCaseRequest {
  street?: string
  number?: string
  complement?: string
  neighborhood?: string
  city?: string
  state?: string
  zipCode?: string
  isMain?: boolean
  addressId: string
}

interface CreateCompanyAddressUseCaseResponse {
  addressId: string
}

export class UpdateCompanyAddressUseCase {
  constructor(private companyAddressUsesRepository: CompanyAddressRepository) {}

  async execute({
    street,
    number,
    complement,
    neighborhood,
    city,
    state,
    zipCode,
    isMain,
    addressId,
  }: CreateCompanyAddressUseCaseRequest): Promise<CreateCompanyAddressUseCaseResponse> {
    const userAddress =
      await this.companyAddressUsesRepository.findById(addressId)

    if (!userAddress) {
      throw new UserAddressNotFound()
    }

    const addressData = await this.companyAddressUsesRepository.update(
      {
        street,
        number,
        complement,
        neighborhood,
        city,
        state,
        zipCode,
        isMain,
      },
      addressId,
    )

    return {
      addressId: addressData.id,
    }
  }
}
