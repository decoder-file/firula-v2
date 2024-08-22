import { User } from '@prisma/client'
import { compare } from 'bcryptjs'

import { UsersRepository } from '@/repositories/users-repository'

import { AuthenticationError } from '../errors/authentication/authentication-error'

interface AuthenticationUseCaseRequest {
  email: string
  password: string
}

interface AuthenticationUseCaseResponse {
  user: User
}

export class AuthenticationUseCase {
  constructor(private userUsesRepository: UsersRepository) {}

  async execute({
    email,
    password,
  }: AuthenticationUseCaseRequest): Promise<AuthenticationUseCaseResponse> {
    const { user } = await this.userUsesRepository.findByEmail(email)

    if (!user) {
      throw new AuthenticationError()
    }

    const doesPasswordMatches = await compare(password, user.passwordHash)

    if (!doesPasswordMatches) {
      throw new AuthenticationError()
    }

    return {
      user,
    }
  }
}
