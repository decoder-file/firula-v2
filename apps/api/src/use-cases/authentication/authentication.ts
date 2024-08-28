import { Company, User } from '@prisma/client'
import { compare } from 'bcryptjs'

import { CompanyRepository } from '@/repositories/company-repository'
import { UsersRepository } from '@/repositories/users-repository'

import { AuthenticationError } from '../errors/authentication/authentication-error'

interface AuthenticationUseCaseRequest {
  email: string
  password: string
}

interface AuthenticationUseCaseResponse {
  user: User
  company: Company[]
}

export class AuthenticationUseCase {
  constructor(
    private userUsesRepository: UsersRepository,
    private companyRepository: CompanyRepository,
  ) {}

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

    const company = await this.companyRepository.findByUserId(user.id)

    return {
      user,
      company,
    }
  }
}
