import { UserAddress } from '@prisma/client'

import { UserAddressRepository } from '@/repositories/user-address-repository'
import { UsersRepository } from '@/repositories/users-repository'
import { UserNotFound } from '@/use-cases/errors/users/user-not-found'

interface CreateUserAddressUseCaseRequest {
  street: string
  number: string
  complement: string
  neighborhood: string
  city: string
  state: string
  zipCode: string
  isMain?: boolean
  userId: string
}

interface CreateUserAddressUseCaseResponse {
  address: UserAddress
}

export class CreateUserAddressUseCase {
  constructor(
    private userAddressUsesRepository: UserAddressRepository,
    private userUsesRepository: UsersRepository,
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
    userId,
  }: CreateUserAddressUseCaseRequest): Promise<CreateUserAddressUseCaseResponse> {
    const { user } = await this.userUsesRepository.findById(userId)

    if (!user) {
      throw new UserNotFound()
    }

    const addressData = await this.userAddressUsesRepository.create({
      street,
      number,
      complement,
      neighborhood,
      city,
      state,
      zipCode,
      isMain,
      userId,
    })

    return {
      address: addressData,
    }
  }
}
