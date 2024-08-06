import { PrismaUserAddressRepository } from '@/repositories/prisma/prisma-user-address-repository'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-user-repository'
import { CreateUserAddressUseCase } from '@/use-cases/users/UserAddress/create-user-address'

export function makeCreateUserAddressUseCase() {
  const userRepository = new PrismaUsersRepository()
  const createUserAddressRepository = new PrismaUserAddressRepository()
  const createUserAddressUseCase = new CreateUserAddressUseCase(
    createUserAddressRepository,
    userRepository,
  )

  return createUserAddressUseCase
}
