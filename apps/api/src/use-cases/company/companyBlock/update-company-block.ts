import { CompanyBlock } from '@prisma/client'

import { CompanyBlockRepository } from '@/repositories/company-block-repository'
import { TypeBlockRepository } from '@/repositories/type-block-repository'
import { CompanyBlockNotFound } from '@/use-cases/errors/companyBlock/company-block-not-found'
import { TypeBlockNotFound } from '@/use-cases/errors/typeBlock/type-block-not-found'

interface UpdateCompanyBlockUseCaseRequest {
  name?: string
  valueForHour?: string
  imageUrl?: string
  typeBlockId?: string
  blockId: string
  isActive?: boolean
}

interface UpdateCompanyBlockUseCaseResponse {
  companyBlock: CompanyBlock
}

export class UpdateCompanyBlockUseCase {
  constructor(
    private typeBlockRepository: TypeBlockRepository,
    private companyBlockRepository: CompanyBlockRepository,
  ) {}

  async execute({
    name,
    valueForHour,
    imageUrl,
    typeBlockId,
    blockId,
    isActive,
  }: UpdateCompanyBlockUseCaseRequest): Promise<UpdateCompanyBlockUseCaseResponse> {
    const block = await this.companyBlockRepository.findById(blockId)

    if (!block) {
      throw new CompanyBlockNotFound()
    }

    if (typeBlockId) {
      const typeBlock = await this.typeBlockRepository.findById(typeBlockId)

      if (!typeBlock) {
        throw new TypeBlockNotFound()
      }
    }

    const companyBlock = await this.companyBlockRepository.update(
      {
        name,
        valueForHour,
        imageUrl,
        isActive,
        typeBlockId,
      },
      blockId,
    )

    return { companyBlock }
  }
}
