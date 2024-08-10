import { CompanyBlockRepository } from '@/repositories/company-block-repository'
import { CompanyRepository } from '@/repositories/company-repository'
import { TypeBlockRepository } from '@/repositories/type-block-repository'
import { CompanyBlockNotFound } from '@/use-cases/errors/companyBlock/company-block-not-found'

interface DeleteCompanyBlockUseCaseRequest {
  blockId: string
}

interface DeleteCompanyBlockUseCaseResponse {
  success: boolean
}

export class DeleteCompanyBlockUseCase {
  constructor(
    private companyRepository: CompanyRepository,
    private typeBlockRepository: TypeBlockRepository,
    private companyBlockRepository: CompanyBlockRepository,
  ) {}

  async execute({
    blockId,
  }: DeleteCompanyBlockUseCaseRequest): Promise<DeleteCompanyBlockUseCaseResponse> {
    const companyBlock = await this.companyBlockRepository.findById(blockId)

    if (!companyBlock) {
      throw new CompanyBlockNotFound()
    }

    const response = await this.companyBlockRepository.delete(blockId)

    return { success: response }
  }
}
