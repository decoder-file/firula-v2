import { UsersRepository } from '@/repositories/users-repository'

import { UserNotExistsError } from '../errors/users/user-already-exists-error copy'

interface DeleteUserUseCaseRequest {
  userId: string
}

interface DeleteUserUseCaseResponse {
  userId: string
}

export class DeleteUserUseCase {
  constructor(private userUsesRepository: UsersRepository) {}

  async execute({
    userId,
  }: DeleteUserUseCaseRequest): Promise<DeleteUserUseCaseResponse> {
    const { user } = await this.userUsesRepository.findById(userId)

    if (!user) {
      throw new UserNotExistsError()
    }

    await this.userUsesRepository.delete(userId)

    return {
      userId,
    }
  }
}
