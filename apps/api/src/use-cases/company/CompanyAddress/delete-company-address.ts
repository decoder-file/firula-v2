import { CompanyAddressRepository } from '@/repositories/company-address-repository'
import { UserAddressNotFound } from '@/use-cases/errors/userAddress/user-address-not-found'

interface DeleteCompanyAddressUseCaseRequest {
  addressId: string
}

interface DeleteCompanyAddressUseCaseResponse {
  success: boolean
}

export class DeleteCompanyAddressUseCase {
  constructor(private companyAddressRepository: CompanyAddressRepository) {}

  async execute({
    addressId,
  }: DeleteCompanyAddressUseCaseRequest): Promise<DeleteCompanyAddressUseCaseResponse> {
    const userAddress = await this.companyAddressRepository.findById(addressId)

    if (!userAddress) {
      throw new UserAddressNotFound()
    }

    await this.companyAddressRepository.delete(addressId)

    return { success: true }
  }
}
