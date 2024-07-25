import { User } from '@prisma/client'
import { hash } from 'bcryptjs'

import { UsersRepository } from '@/repositories/users-repository'

import { UserAlreadyExistsError } from '../errors/users/user-already-exists-error'

interface CreateUserUseCaseRequest {
  name: string
  email: string
  cpf: string
  passwordHash: string
}

interface CreateUserUseCaseResponse {
  user: User
}

export class CreateUserUseCase {
  constructor(private userUsesRepository: UsersRepository) {}

  async execute({
    name,
    email,
    cpf,
    passwordHash,
  }: CreateUserUseCaseRequest): Promise<CreateUserUseCaseResponse> {
    const password = await hash(passwordHash, 6)

    const { user } = await this.userUsesRepository.findByEmail(email)

    if (user) {
      throw new UserAlreadyExistsError()
    }

    const userData = await this.userUsesRepository.create({
      name,
      email,
      cpf,
      passwordHash: password,
    })

    return {
      user: userData,
    }
  }
}
