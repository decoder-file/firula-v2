import { describe, expect, it } from 'vitest'

import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'

import { CreateUserUseCase } from './create-user'
import { GetAllUserUseCase } from './get-all-user'

describe('Get all user Use Case', () => {
  it('should to get all user', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const getUsersUseCase = new GetAllUserUseCase(usersRepository)
    const registerUseCase = new CreateUserUseCase(usersRepository)

    await registerUseCase.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      cpf: '14841575677',
      passwordHash: '123456',
    })

    await registerUseCase.execute({
      name: 'John Doe',
      email: 'johndoe1@example.com',
      cpf: '86008110072',
      passwordHash: '123456',
    })

    const { users } = await getUsersUseCase.execute()

    expect(users).toHaveLength(2)
  })
})
