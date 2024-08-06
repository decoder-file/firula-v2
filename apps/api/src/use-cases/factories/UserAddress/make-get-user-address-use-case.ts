import { PrismaUserAddressRepository } from '@/repositories/prisma/prisma-user-address-repository'
import { GetUserAddressUseCase } from '@/use-cases/users/UserAddress/get-user-address'

export function makeGetUserAddressUseCase() {
  const userAddressRepository = new PrismaUserAddressRepository()
  const updateUserAddressUseCase = new GetUserAddressUseCase(
    userAddressRepository,
  )

  return updateUserAddressUseCase
}
