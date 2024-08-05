import { User } from '@prisma/client'

import { UsersRepository } from '@/repositories/users-repository'

import { UserNotFound } from '../errors/users/user-not-found'

interface GetUserByIdUserUseCaseRequest {
  userId: string
}

interface GetUserByIdUserUseCaseResponse {
  user: User | null
}

export class GetUserByIdUserUseCase {
  constructor(private userUsesRepository: UsersRepository) {}

  async execute({
    userId,
  }: GetUserByIdUserUseCaseRequest): Promise<GetUserByIdUserUseCaseResponse> {
    const { user } = await this.userUsesRepository.findById(userId)

    if (!user) {
      throw new UserNotFound()
    }

    const response = await this.userUsesRepository.getUserById(userId)

    return {
      user: response,
    }
  }
}
