import { Company } from '@prisma/client'

import { CompanyRepository } from '@/repositories/company-repository'

interface GetAllCompanyUseCaseResponse {
  company: Company[]
}

export class GetAllCompanyUseCase {
  constructor(private companyRepository: CompanyRepository) {}

  async execute(): Promise<GetAllCompanyUseCaseResponse> {
    const company = await this.companyRepository.listAll()

    return { company }
  }
}
