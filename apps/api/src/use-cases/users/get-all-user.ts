import { User } from '@prisma/client'

import { UsersRepository } from '@/repositories/users-repository'

interface GetAllUserUseCaseResponse {
  users: User[]
}

export class GetAllUserUseCase {
  constructor(private userUsesRepository: UsersRepository) {}

  async execute(): Promise<GetAllUserUseCaseResponse> {
    const users = await this.userUsesRepository.getAllUsers()

    return {
      users,
    }
  }
}
