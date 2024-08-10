import { CompanyBlock } from '@prisma/client'

import { CompanyBlockRepository } from '@/repositories/company-block-repository'
import { CompanyRepository } from '@/repositories/company-repository'
import { CompanyNotFound } from '@/use-cases/errors/company/company-not-found'

interface GetCompanyBlockByCompanyIdUseCaseRequest {
  companyId: string
}

interface GetCompanyBlockByCompanyIdUseCaseResponse {
  block: CompanyBlock[] | []
}

export class GetCompanyBlockByCompanyIdUseCase {
  constructor(
    private companyBlockRepository: CompanyBlockRepository,
    private companyRepository: CompanyRepository,
  ) {}

  async execute({
    companyId,
  }: GetCompanyBlockByCompanyIdUseCaseRequest): Promise<GetCompanyBlockByCompanyIdUseCaseResponse> {
    const company = await this.companyRepository.findById(companyId)

    if (!company) {
      throw new CompanyNotFound()
    }

    const block =
      await this.companyBlockRepository.findBlockByCompanyId(companyId)

    if (!block) {
      return { block: [] }
    }

    return { block }
  }
}
