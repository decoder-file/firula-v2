import { CompanyBlock } from '@prisma/client'

import { CompanyBlockRepository } from '@/repositories/company-block-repository'

interface GetAllCompanyBlockUseCaseRequest {
  page: number
  nameQuery?: string
  activeBlocks?: string
}

interface GetAllCompanyBlockUseCaseResponse {
  blocks: CompanyBlock[]
}

export class GetAllCompanyBlockUseCase {
  constructor(private companyBlockRepository: CompanyBlockRepository) {}

  async execute({
    page,
    nameQuery,
    activeBlocks,
  }: GetAllCompanyBlockUseCaseRequest): Promise<GetAllCompanyBlockUseCaseResponse> {
    const blocks = await this.companyBlockRepository.listAll(
      page,
      nameQuery?.toLocaleLowerCase(),
      activeBlocks === 'true',
    )

    return { blocks }
  }
}
