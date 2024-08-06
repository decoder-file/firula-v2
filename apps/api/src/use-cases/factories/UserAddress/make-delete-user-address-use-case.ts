import { PrismaUserAddressRepository } from '@/repositories/prisma/prisma-user-address-repository'
import { DeleteUserAddressUseCase } from '@/use-cases/users/UserAddress/delete-user-address'

export function makeDeleteUserAddressUseCase() {
  const userAddressRepository = new PrismaUserAddressRepository()
  const deleteUserAddressUseCase = new DeleteUserAddressUseCase(
    userAddressRepository,
  )

  return deleteUserAddressUseCase
}
