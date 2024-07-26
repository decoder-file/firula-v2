import { compare } from 'bcryptjs'
import { describe, expect, it } from 'vitest'

import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'

import { UserAlreadyExistsError } from '../errors/users/user-already-exists-error'
import { UserCpfAlreadyExistsError } from '../errors/users/user-cpf-already-exists-error'
import { UserInvalidCpfError } from '../errors/users/user-invalid-cpf-error'
import { CreateUserUseCase } from './create-user'

describe('Register Use Case', () => {
  it('should to register', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const registerUseCase = new CreateUserUseCase(usersRepository)

    const { user } = await registerUseCase.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      cpf: '14841575677',
      passwordHash: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should hash user password upon registration', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const registerUseCase = new CreateUserUseCase(usersRepository)

    const { user } = await registerUseCase.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      cpf: '14841575677',
      passwordHash: '123456',
    })

    const isPasswordCorrectlyHashed = await compare('123456', user.passwordHash)

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register with same email twice', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const registerUseCase = new CreateUserUseCase(usersRepository)

    const email = 'johndoe@example.com'

    await registerUseCase.execute({
      name: 'John Doe',
      email,
      cpf: '14841575677',
      passwordHash: '123456',
    })

    expect(() =>
      registerUseCase.execute({
        name: 'John Doe',
        email,
        cpf: '14841575677',
        passwordHash: '123456',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })

  it('should not be able to register with same CPF twice', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const registerUseCase = new CreateUserUseCase(usersRepository)

    const cpf = '14841575677'

    await registerUseCase.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      cpf,
      passwordHash: '123456',
    })

    expect(() =>
      registerUseCase.execute({
        name: 'John Doe',
        email: 'johndoe1@example.com',
        cpf,
        passwordHash: '123456',
      }),
    ).rejects.toBeInstanceOf(UserCpfAlreadyExistsError)
  })

  it('should not be able to register with an invalid CPF', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const registerUseCase = new CreateUserUseCase(usersRepository)

    expect(() =>
      registerUseCase.execute({
        name: 'John Doe',
        email: 'johndoe1@example.com',
        cpf: '12345678910',
        passwordHash: '123456',
      }),
    ).rejects.toBeInstanceOf(UserInvalidCpfError)
  })
})
