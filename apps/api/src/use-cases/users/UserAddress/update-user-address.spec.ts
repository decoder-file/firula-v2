import { describe, expect, it } from 'vitest'

import { InMemoryUserAddressRepository } from '@/repositories/in-memory/in-memory-user-address-repository'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAddressNotFound } from '@/use-cases/errors/userAddress/user-address-not-found'

import { CreateUserUseCase } from '../create-user'
import { CreateUserAddressUseCase } from './create-user-address'
import { UpdateUserAddressUseCase } from './update-user-address'

describe('Update Use Address Case', () => {
  it('should to update user address', async () => {
    const userAddressRepository = new InMemoryUserAddressRepository()
    const usersRepository = new InMemoryUsersRepository()

    const createUserProfileUseCase = new CreateUserAddressUseCase(
      userAddressRepository,
      usersRepository,
    )
    const registerUseCase = new CreateUserUseCase(usersRepository)
    const updateUserProfileUserCase = new UpdateUserAddressUseCase(
      userAddressRepository,
    )

    const { user } = await registerUseCase.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      cpf: '14841575677',
      passwordHash: '123456',
    })

    const { address } = await createUserProfileUseCase.execute({
      street: 'Rua Teste',
      number: '123',
      complement: 'Complemento',
      neighborhood: 'Bairro Teste',
      city: 'Cidade Teste',
      state: 'Estado Teste',
      zipCode: '12345678',
      userId: user.id,
    })

    const { addressId } = await updateUserProfileUserCase.execute({
      street: 'Rua Teste',
      number: '123',
      complement: 'Complemento',
      neighborhood: 'Bairro Teste',
      city: 'Cidade Teste',
      addressId: address.id,
    })

    expect(addressId).toEqual(address.id)
  })

  it('It should not be possible to update a address that does not exist', async () => {
    const userAddressRepository = new InMemoryUserAddressRepository()
    const usersRepository = new InMemoryUsersRepository()

    const createUserProfileUseCase = new CreateUserAddressUseCase(
      userAddressRepository,
      usersRepository,
    )
    const registerUseCase = new CreateUserUseCase(usersRepository)
    const updateUserProfileUserCase = new UpdateUserAddressUseCase(
      userAddressRepository,
    )

    const { user } = await registerUseCase.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      cpf: '14841575677',
      passwordHash: '123456',
    })

    await createUserProfileUseCase.execute({
      street: 'Rua Teste',
      number: '123',
      complement: 'Complemento',
      neighborhood: 'Bairro Teste',
      city: 'Cidade Teste',
      state: 'Estado Teste',
      zipCode: '12345678',
      userId: user.id,
    })

    expect(() =>
      updateUserProfileUserCase.execute({
        street: 'Rua Teste',
        number: '123',
        complement: 'Complemento',
        neighborhood: 'Bairro Teste',
        city: 'Cidade Teste',
        addressId: 'invalid-id',
      }),
    ).rejects.toBeInstanceOf(UserAddressNotFound)
  })
})
