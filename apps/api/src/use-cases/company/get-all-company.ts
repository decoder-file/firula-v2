import { Company } from '@prisma/client'

import { CompanyRepository } from '@/repositories/company-repository'

interface GetAllCompanyUseCaseRequest {
  unblockedCompanies?: string
  activeCompanies?: string
}

interface GetAllCompanyUseCaseResponse {
  company: Company[]
}

export class GetAllCompanyUseCase {
  constructor(private companyRepository: CompanyRepository) {}

  async execute({
    unblockedCompanies,
    activeCompanies,
  }: GetAllCompanyUseCaseRequest): Promise<GetAllCompanyUseCaseResponse> {
    const company = await this.companyRepository.listAll(
      unblockedCompanies,
      activeCompanies,
    )

    return { company }
  }
}
