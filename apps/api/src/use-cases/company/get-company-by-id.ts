import { Company } from '@prisma/client'

import { CompanyRepository } from '@/repositories/company-repository'

import { CompanyNotFound } from '../errors/company/company-not-found'

interface GetCompanyByIdUseCaseRequest {
  companyId: string
}

interface GetCompanyByIdUseCaseResponse {
  company: Company
}

export class GetCompanyByIdUseCase {
  constructor(private companyRepository: CompanyRepository) {}

  async execute({
    companyId,
  }: GetCompanyByIdUseCaseRequest): Promise<GetCompanyByIdUseCaseResponse> {
    const company = await this.companyRepository.findById(companyId)

    if (!company) {
      throw new CompanyNotFound()
    }

    return { company }
  }
}
