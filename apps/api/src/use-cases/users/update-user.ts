import { Role, User } from '@prisma/client'

import { UsersRepository } from '@/repositories/users-repository'

import { UserNotFound } from '../errors/users/user-not-found'

interface UpdateUserUseCaseRequest {
  userId: string
  name: string
  role: Role
  isBlock?: boolean
  image?: string
}

interface UpdateUserUseCaseResponse {
  user: User | null
}

export class UpdateUserUseCase {
  constructor(private userUsesRepository: UsersRepository) {}

  async execute({
    userId,
    name,
    role,
    isBlock,
    image,
  }: UpdateUserUseCaseRequest): Promise<UpdateUserUseCaseResponse> {
    const userData = await this.userUsesRepository.findById(userId)

    if (!userData.user) {
      throw new UserNotFound()
    }

    const userUpdate = await this.userUsesRepository.update(
      {
        name,
        imageUrl: image,
        role,
        isBlock,
      },
      userId,
    )

    return {
      user: userUpdate,
    }
  }
}
