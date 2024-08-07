import { Company } from '@prisma/client'

import { CompanyRepository } from '@/repositories/company-repository'

interface GetAllCompanyUseCaseRequest {
  active?: string
}

interface GetAllCompanyUseCaseResponse {
  company: Company[]
}

export class GetAllCompanyUseCase {
  constructor(private companyRepository: CompanyRepository) {}

  async execute({
    active,
  }: GetAllCompanyUseCaseRequest): Promise<GetAllCompanyUseCaseResponse> {
    console.log('active', active)
    const company = await this.companyRepository.listAll(active)

    return { company }
  }
}
