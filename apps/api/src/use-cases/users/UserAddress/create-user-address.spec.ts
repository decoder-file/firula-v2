import { describe, expect, it } from 'vitest'

import { InMemoryUserAddressRepository } from '@/repositories/in-memory/in-memory-user-address-repository'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserNotFound } from '@/use-cases/errors/users/user-not-found'

import { CreateUserUseCase } from '../create-user'
import { CreateUserAddressUseCase } from './create-user-address'

describe('Create Use Profile Case', () => {
  it('should to register user profile', async () => {
    const userAddressRepository = new InMemoryUserAddressRepository()
    const usersRepository = new InMemoryUsersRepository()

    const createUserAddressUseCase = new CreateUserAddressUseCase(
      userAddressRepository,
      usersRepository,
    )
    const registerUseCase = new CreateUserUseCase(usersRepository)

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

    expect(address.id).toEqual(expect.any(String))
  })

  it('It should not be possible to register a profile for a user that does not exist', async () => {
    const userAddressRepository = new InMemoryUserAddressRepository()
    const usersRepository = new InMemoryUsersRepository()

    const createUserAddressUseCase = new CreateUserAddressUseCase(
      userAddressRepository,
      usersRepository,
    )
    const registerUseCase = new CreateUserUseCase(usersRepository)
    await registerUseCase.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      cpf: '14841575677',
      passwordHash: '123456',
    })

    expect(() =>
      createUserAddressUseCase.execute({
        street: 'Rua Teste',
        number: '123',
        complement: 'Complemento',
        neighborhood: 'Bairro Teste',
        city: 'Cidade Teste',
        state: 'Estado Teste',
        zipCode: '12345678',
        userId: 'invalid-id',
      }),
    ).rejects.toBeInstanceOf(UserNotFound)
  })
})
