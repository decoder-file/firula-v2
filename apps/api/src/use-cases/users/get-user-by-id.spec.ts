import { describe, expect, it } from 'vitest'

import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'

import { UserNotExistsError } from '../errors/users/user-already-exists-error copy'
import { CreateUserUseCase } from './create-user'
import { GetUserByIdUserUseCase } from './get-user-by-id'

describe('Get user by Id Use Case', () => {
  it('should to get user', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const getUserUseCase = new GetUserByIdUserUseCase(usersRepository)
    const registerUseCase = new CreateUserUseCase(usersRepository)

    const { user: userInfo } = await registerUseCase.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      cpf: '14841575677',
      passwordHash: '123456',
    })

    const { user } = await getUserUseCase.execute({ userId: userInfo.id })

    expect(user?.id).toEqual(userInfo.id)
  })

  it('it should not be possible to get a user that does not exist', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const getUserUseCase = new GetUserByIdUserUseCase(usersRepository)

    expect(() =>
      getUserUseCase.execute({ userId: '3214124' }),
    ).rejects.toBeInstanceOf(UserNotExistsError)
  })
})
