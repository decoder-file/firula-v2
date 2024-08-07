import { Company } from '@prisma/client'

import { CompanyRepository } from '@/repositories/company-repository'
import { UsersRepository } from '@/repositories/users-repository'

import { UserNotFound } from '../errors/users/user-not-found'

interface GetCompanyByUserIdUseCaseRequest {
  userId: string
}

interface GetCompanyByUserIdUseCaseResponse {
  company: Company[]
}

export class GetCompanyByUserIdUseCase {
  constructor(
    private companyRepository: CompanyRepository,
    private userUsesRepository: UsersRepository,
  ) {}

  async execute({
    userId,
  }: GetCompanyByUserIdUseCaseRequest): Promise<GetCompanyByUserIdUseCaseResponse> {
    const { user } = await this.userUsesRepository.findById(userId)

    if (!user) {
      throw new UserNotFound()
    }

    const company = await this.companyRepository.findByUserId(userId)

    return { company }
  }
}
