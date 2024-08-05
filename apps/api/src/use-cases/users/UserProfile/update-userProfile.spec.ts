import { describe, expect, it } from 'vitest'

import { InMemoryUserProfileRepository } from '@/repositories/in-memory/in-memory-user-profile-repository'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserProfileNotFound } from '@/use-cases/errors/userProfile/user-profie-not-found'
import { UserProfileMobilePhoneExistsError } from '@/use-cases/errors/userProfile/user-profile-mobile-phone-exists-error'

import { CreateUserUseCase } from '../create-user'
import { CreateUserProfileUseCase } from './create-userProfile'
import { UpdateUserProfileUseCase } from './update-userProfile'

describe('Update Use Profile Case', () => {
  it('should to update user profile', async () => {
    const userProfileRepository = new InMemoryUserProfileRepository()
    const usersRepository = new InMemoryUsersRepository()

    const createUserProfileUseCase = new CreateUserProfileUseCase(
      userProfileRepository,
      usersRepository,
    )
    const registerUseCase = new CreateUserUseCase(usersRepository)
    const updateUserProfileUserCase = new UpdateUserProfileUseCase(
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

    const { userProfile: updateUser } = await updateUserProfileUserCase.execute(
      {
        mobilePhone: '11888888888',
        userProfileId: userProfile.id,
      },
    )

    expect(updateUser.mobilePhone).toEqual('11888888888')
  })

  it('It should not be possible to update a profile that does not exist', async () => {
    const userProfileRepository = new InMemoryUserProfileRepository()
    const usersRepository = new InMemoryUsersRepository()

    const createUserProfileUseCase = new CreateUserProfileUseCase(
      userProfileRepository,
      usersRepository,
    )
    const registerUseCase = new CreateUserUseCase(usersRepository)
    const updateUserProfileUserCase = new UpdateUserProfileUseCase(
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
      updateUserProfileUserCase.execute({
        mobilePhone: '41241234124',
        userProfileId: '1313',
      }),
    ).rejects.toBeInstanceOf(UserProfileNotFound)
  })

  it('It should not be possible to update an existing cell phone number', async () => {
    const userProfileRepository = new InMemoryUserProfileRepository()
    const usersRepository = new InMemoryUsersRepository()

    const createUserProfileUseCase = new CreateUserProfileUseCase(
      userProfileRepository,
      usersRepository,
    )
    const registerUseCase = new CreateUserUseCase(usersRepository)
    const updateUserProfileUserCase = new UpdateUserProfileUseCase(
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

    expect(() =>
      updateUserProfileUserCase.execute({
        mobilePhone: '11999999999',
        userProfileId: userProfile.id,
      }),
    ).rejects.toBeInstanceOf(UserProfileMobilePhoneExistsError)
  })
})
