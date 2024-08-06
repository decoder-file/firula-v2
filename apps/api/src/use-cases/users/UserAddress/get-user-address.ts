import { UserAddress } from '@prisma/client'

import { UserAddressRepository } from '@/repositories/user-address-repository'
import { UserAddressNotFound } from '@/use-cases/errors/userAddress/user-address-not-found'

interface GetUserAddressUseCaseRequest {
  userAddressId: string
}

interface GetUserAddressUseCaseResponse {
  userAddress: UserAddress
}

export class GetUserAddressUseCase {
  constructor(private userAddressRepository: UserAddressRepository) {}

  async execute({
    userAddressId,
  }: GetUserAddressUseCaseRequest): Promise<GetUserAddressUseCaseResponse> {
    const userAddress = await this.userAddressRepository.findById(userAddressId)

    if (!userAddress) {
      throw new UserAddressNotFound()
    }

    return { userAddress }
  }
}
