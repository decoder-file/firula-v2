import { UsersRepository } from '@/repositories/users-repository'

import { UserNotFound } from '../errors/users/user-not-found'

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
      throw new UserNotFound()
    }

    await this.userUsesRepository.delete(userId)

    return {
      userId,
    }
  }
}
