import { describe, expect, it } from 'vitest'

import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'

import { UserNotFound } from '../errors/users/user-not-found'
import { ChangeUserLockUseCase } from './change-user-lock'
import { CreateUserUseCase } from './create-user'

describe('Change user lock Use Case', () => {
  it('should change lock', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const changeUserLockUseCase = new ChangeUserLockUseCase(usersRepository)
    const registerUseCase = new CreateUserUseCase(usersRepository)

    const { user: userInfo } = await registerUseCase.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      cpf: '14841575677',
      passwordHash: '123456',
    })

    const { user } = await changeUserLockUseCase.execute({
      userId: userInfo.id,
    })

    expect(user?.isBlock).toEqual(true)
  })

  it('it should not be possible to change lock user that does not exist', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const changeUserLockUseCase = new ChangeUserLockUseCase(usersRepository)

    expect(() =>
      changeUserLockUseCase.execute({ userId: '3214124' }),
    ).rejects.toBeInstanceOf(UserNotFound)
  })
})
