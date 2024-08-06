import { describe, expect, it } from 'vitest'

import { InMemoryUserProfileRepository } from '@/repositories/in-memory/in-memory-user-profile-repository'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserProfileNotFound } from '@/use-cases/errors/userProfile/user-profie-not-found'

import { CreateUserUseCase } from '../create-user'
import { CreateUserProfileUseCase } from './create-userProfile'
import { GetUserProfileUseCase } from './get-user-profile'

describe('Get Use Profile Case', () => {
  it('should to get user profile', async () => {
    const userProfileRepository = new InMemoryUserProfileRepository()
    const usersRepository = new InMemoryUsersRepository()

    const createUserProfileUseCase = new CreateUserProfileUseCase(
      userProfileRepository,
      usersRepository,
    )
    const registerUseCase = new CreateUserUseCase(usersRepository)
    const getUserProfileUserCase = new GetUserProfileUseCase(
      userProfileRepository,
    )

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

    const { userProfile: userProfileInfo } =
      await getUserProfileUserCase.execute({
        userProfileId: userProfile.id,
      })

    expect(userProfileInfo.id).toEqual(userProfile.id)
  })

  it('It should not be possible to get a profile that does not exist', async () => {
    const userProfileRepository = new InMemoryUserProfileRepository()
    const usersRepository = new InMemoryUsersRepository()

    const createUserProfileUseCase = new CreateUserProfileUseCase(
      userProfileRepository,
      usersRepository,
    )
    const registerUseCase = new CreateUserUseCase(usersRepository)
    const getUserProfileUserCase = new GetUserProfileUseCase(
      userProfileRepository,
    )

    const { user } = await registerUseCase.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      cpf: '14841575677',
      passwordHash: '123456',
    })

    await createUserProfileUseCase.execute({
      mobilePhone: '11999999999',
      dateOfBirth: new Date(),
      walletId: 'walletId',
      apiKey: 'apiKey',
      userId: user.id,
    })

    expect(() =>
      getUserProfileUserCase.execute({
        userProfileId: '4314141',
      }),
    ).rejects.toBeInstanceOf(UserProfileNotFound)
  })
})
