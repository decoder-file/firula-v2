import { describe, expect, it } from 'vitest'

import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'

import { UserNotFound } from '../errors/users/user-not-found'
import { CreateUserUseCase } from './create-user'
import { DeleteUserUseCase } from './delete-user'

describe('Delete Use Case', () => {
  it('should to update user', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const deleteUseCase = new DeleteUserUseCase(usersRepository)
    const registerUseCase = new CreateUserUseCase(usersRepository)

    const { user } = await registerUseCase.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      cpf: '14841575677',
      passwordHash: '123456',
    })

    const { userId } = await deleteUseCase.execute({ userId: user.id })

    expect(userId).toEqual(user.id)
  })

  it('it should not be possible to delete a user that does not exist', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const deleteUseCase = new DeleteUserUseCase(usersRepository)

    expect(() =>
      deleteUseCase.execute({ userId: '3214124' }),
    ).rejects.toBeInstanceOf(UserNotFound)
  })
})
