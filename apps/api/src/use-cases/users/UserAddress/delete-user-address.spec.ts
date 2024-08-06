import { describe, expect, it } from 'vitest'

import { InMemoryUserAddressRepository } from '@/repositories/in-memory/in-memory-user-address-repository'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAddressNotFound } from '@/use-cases/errors/userAddress/user-address-not-found'

import { CreateUserUseCase } from '../create-user'
import { CreateUserAddressUseCase } from './create-user-address'
import { DeleteUserAddressUseCase } from './delete-user-address'

describe('Delete Profile Case', () => {
  it('should to delete user profile', async () => {
    const userAddressRepository = new InMemoryUserAddressRepository()
    const usersRepository = new InMemoryUsersRepository()

    const createUserAddressUseCase = new CreateUserAddressUseCase(
      userAddressRepository,
      usersRepository,
    )
    const registerUseCase = new CreateUserUseCase(usersRepository)
    const deleteUserProfileUserCase = new DeleteUserAddressUseCase(
      userAddressRepository,
    )

    const { user } = await registerUseCase.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      cpf: '14841575677',
      passwordHash: '123456',
    })

    const { address } = await createUserAddressUseCase.execute({
      street: 'Rua Teste',
      number: '123',
      complement: 'Complemento',
      neighborhood: 'Bairro Teste',
      city: 'Cidade Teste',
      state: 'Estado Teste',
      zipCode: '12345678',
      userId: user.id,
    })

    const { success } = await deleteUserProfileUserCase.execute({
      userAddressId: address.id,
    })

    expect(success).toBe(true)
  })

  it('It should not be possible to delete a address that does not exist', async () => {
    const userAddressRepository = new InMemoryUserAddressRepository()

    const deleteUserProfileUserCase = new DeleteUserAddressUseCase(
      userAddressRepository,
    )

    expect(() =>
      deleteUserProfileUserCase.execute({
        userAddressId: 'invalid-id',
      }),
    ).rejects.toBeInstanceOf(UserAddressNotFound)
  })
})
