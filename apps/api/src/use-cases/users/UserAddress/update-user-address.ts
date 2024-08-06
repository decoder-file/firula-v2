import { UserAddressRepository } from '@/repositories/user-address-repository'
import { UserAddressNotFound } from '@/use-cases/errors/userAddress/user-address-not-found'

interface CreateUserAddressUseCaseRequest {
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

interface CreateUserAddressUseCaseResponse {
  addressId: string
}

export class UpdateUserAddressUseCase {
  constructor(private userAddressUsesRepository: UserAddressRepository) {}

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
  }: CreateUserAddressUseCaseRequest): Promise<CreateUserAddressUseCaseResponse> {
    const userAddress = await this.userAddressUsesRepository.findById(addressId)

    if (!userAddress) {
      throw new UserAddressNotFound()
    }

    const addressData = await this.userAddressUsesRepository.update(
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
