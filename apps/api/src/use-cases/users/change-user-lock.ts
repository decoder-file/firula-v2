import { User } from '@prisma/client'

import { UsersRepository } from '@/repositories/users-repository'

import { UserNotExistsError } from '../errors/users/user-already-exists-error copy'

interface ChangeUserLockUseCaseRequest {
  userId: string
}

interface ChangeUserLockUseCaseResponse {
  user: User | null
}

export class ChangeUserLockUseCase {
  constructor(private userUsesRepository: UsersRepository) {}

  async execute({
    userId,
  }: ChangeUserLockUseCaseRequest): Promise<ChangeUserLockUseCaseResponse> {
    const { user } = await this.userUsesRepository.findById(userId)

    if (!user) {
      throw new UserNotExistsError()
    }

    const response = await this.userUsesRepository.update(
      {
        isBlock: !user.isBlock,
      },
      userId,
    )

    return {
      user: response,
    }
  }
}
