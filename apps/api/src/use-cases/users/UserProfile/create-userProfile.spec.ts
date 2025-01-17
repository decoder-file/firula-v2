import { describe, expect, it } from 'vitest'

import { InMemoryUserProfileRepository } from '@/repositories/in-memory/in-memory-user-profile-repository'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserProfileMobilePhoneExistsError } from '@/use-cases/errors/userProfile/user-profile-mobile-phone-exists-error'
import { UserNotFound } from '@/use-cases/errors/users/user-not-found'

import { CreateUserUseCase } from '../create-user'
import { CreateUserProfileUseCase } from './create-userProfile'

describe('Create Use Profile Case', () => {
  it('should to register user profile', async () => {
    const userProfileRepository = new InMemoryUserProfileRepository()
    const usersRepository = new InMemoryUsersRepository()

    const createUserProfileUseCase = new CreateUserProfileUseCase(
      userProfileRepository,
      usersRepository,
    )
    const registerUseCase = new CreateUserUseCase(usersRepository)

    const { user } = await registerUseCase.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      cpf: '14841575677',
      passwordHash: '123456',
    })

    const { userProfile } = await createUserProfileUseCase.execute({
      mobilePhone: '11999999999',
      dateOfBirth: new Date(),
      walletId: 'walletId',
      apiKey: 'apiKey',
      userId: user.id,
    })

    expect(userProfile.mobilePhone).toEqual(expect.any(String))
  })

  it('It should not be possible to register an existing cell phone number', async () => {
    const userProfileRepository = new InMemoryUserProfileRepository()
    const usersRepository = new InMemoryUsersRepository()

    const createUserProfileUseCase = new CreateUserProfileUseCase(
      userProfileRepository,
      usersRepository,
    )
    const registerUseCase = new CreateUserUseCase(usersRepository)

    const { user } = await registerUseCase.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      cpf: '14841575677',
      passwordHash: '123456',
    })

    const mobilePhone = '11999999999'

    await createUserProfileUseCase.execute({
      mobilePhone,
      dateOfBirth: new Date(),
      walletId: 'walletId',
      apiKey: 'apiKey',
      userId: user.id,
    })

    expect(() =>
      createUserProfileUseCase.execute({
        mobilePhone,
        dateOfBirth: new Date(),
        walletId: 'walletId',
        apiKey: 'apiKey',
        userId: user.id,
      }),
    ).rejects.toBeInstanceOf(UserProfileMobilePhoneExistsError)
  })

  it('It should not be possible to register a profile for a user that does not exist', async () => {
    const userProfileRepository = new InMemoryUserProfileRepository()
    const usersRepository = new InMemoryUsersRepository()

    const createUserProfileUseCase = new CreateUserProfileUseCase(
      userProfileRepository,
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
      createUserProfileUseCase.execute({
        mobilePhone: '11999999999',
        dateOfBirth: new Date(),
        walletId: 'walletId',
        apiKey: 'apiKey',
        userId: '3241412',
      }),
    ).rejects.toBeInstanceOf(UserNotFound)
  })
})
