import { CompanyBlock } from '@prisma/client'

import { CompanyBlockRepository } from '@/repositories/company-block-repository'
import { CompanyBlockNotFound } from '@/use-cases/errors/companyBlock/company-block-not-found'

interface GetCompanyBlockByIdUseCaseRequest {
  blockId: string
}

interface GetCompanyBlockByIdUseCaseResponse {
  block: CompanyBlock
}

export class GetCompanyBlockByIdUseCase {
  constructor(private companyBlockRepository: CompanyBlockRepository) {}

  async execute({
    blockId,
  }: GetCompanyBlockByIdUseCaseRequest): Promise<GetCompanyBlockByIdUseCaseResponse> {
    const block = await this.companyBlockRepository.findById(blockId)

    if (!block) {
      throw new CompanyBlockNotFound()
    }

    return { block }
  }
}
