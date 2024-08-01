import { describe, expect, it } from 'vitest'

import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'

import { UserNotExistsError } from '../errors/users/user-already-exists-error copy'
import { CreateUserUseCase } from './create-user'
import { UpdateUserUseCase } from './update-user'

describe('Update Use Case', () => {
  it('should to update user', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const updateUseCase = new UpdateUserUseCase(usersRepository)
    const registerUseCase = new CreateUserUseCase(usersRepository)

    const { user } = await registerUseCase.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      cpf: '14841575677',
      passwordHash: '123456',
    })

    const { user: userUpdate } = await updateUseCase.execute({
      userId: user.id,
      name: 'John',
      role: 'ADMIN',
    })

    expect(userUpdate?.name).toEqual('John')
  })

  it('it should not be possible to update a user that does not exist', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const updateUseCase = new UpdateUserUseCase(usersRepository)

    expect(() =>
      updateUseCase.execute({
        userId: '3214124',
        name: 'John',
        role: 'ADMIN',
      }),
    ).rejects.toBeInstanceOf(UserNotExistsError)
  })
})
