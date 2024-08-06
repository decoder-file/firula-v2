import { PrismaUserAddressRepository } from '@/repositories/prisma/prisma-user-address-repository'
import { UpdateUserAddressUseCase } from '@/use-cases/users/UserAddress/update-user-address'

export function makeUpdateUserAddressUseCase() {
  const updateUserAddressRepository = new PrismaUserAddressRepository()
  const updateUserAddressUseCase = new UpdateUserAddressUseCase(
    updateUserAddressRepository,
  )

  return updateUserAddressUseCase
}
