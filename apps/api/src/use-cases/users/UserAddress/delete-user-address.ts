import { UserAddressRepository } from '@/repositories/user-address-repository'
import { UserAddressNotFound } from '@/use-cases/errors/userAddress/user-address-not-found'

interface DeleteUserAddressUseCaseRequest {
  userAddressId: string
}

interface DeleteUserAddressUseCaseResponse {
  success: boolean
}

export class DeleteUserAddressUseCase {
  constructor(private userAddressRepository: UserAddressRepository) {}

  async execute({
    userAddressId,
  }: DeleteUserAddressUseCaseRequest): Promise<DeleteUserAddressUseCaseResponse> {
    const userAddress = await this.userAddressRepository.findById(userAddressId)

    if (!userAddress) {
      throw new UserAddressNotFound()
    }

    await this.userAddressRepository.delete(userAddressId)

    return { success: true }
  }
}
