import { Company } from '@prisma/client'

import { CompanyRepository } from '@/repositories/company-repository'

interface GetAllCompanyUseCaseRequest {
  page: number
  nameQuery?: string
  unblockedCompanies?: string
  activeCompanies?: string
}

interface GetAllCompanyUseCaseResponse {
  company: Company[]
}

export class GetAllCompanyUseCase {
  constructor(private companyRepository: CompanyRepository) {}

  async execute({
    page,
    nameQuery,
    unblockedCompanies,
    activeCompanies,
  }: GetAllCompanyUseCaseRequest): Promise<GetAllCompanyUseCaseResponse> {
    const company = await this.companyRepository.listAll(
      page,
      nameQuery?.toLocaleLowerCase(),
      unblockedCompanies === 'true',
      activeCompanies === 'true',
    )

    return { company }
  }
}
