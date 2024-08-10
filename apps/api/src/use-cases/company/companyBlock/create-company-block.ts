import { CompanyBlock } from '@prisma/client'

import { CompanyBlockRepository } from '@/repositories/company-block-repository'
import { CompanyRepository } from '@/repositories/company-repository'
import { TypeBlockRepository } from '@/repositories/type-block-repository'
import { CompanyNotFound } from '@/use-cases/errors/company/company-not-found'
import { TypeBlockNotFound } from '@/use-cases/errors/typeBlock/type-block-not-found'

interface CreateCompanyBlockUseCaseRequest {
  name: string
  valueForHour: string
  imageUrl?: string
  typeBlockId: string
  companyId: string
}

interface CreateCompanyBlockUseCaseResponse {
  companyBlock: CompanyBlock
}

export class CreateCompanyBlockUseCase {
  constructor(
    private companyRepository: CompanyRepository,
    private typeBlockRepository: TypeBlockRepository,
    private companyBlockRepository: CompanyBlockRepository,
  ) {}

  async execute({
    name,
    valueForHour,
    imageUrl,
    typeBlockId,
    companyId,
  }: CreateCompanyBlockUseCaseRequest): Promise<CreateCompanyBlockUseCaseResponse> {
    const foundCompany = await this.companyRepository.findById(companyId)

    if (!foundCompany) {
      throw new CompanyNotFound()
    }

    const foundTypeBlock = await this.typeBlockRepository.findById(typeBlockId)

    if (!foundTypeBlock) {
      throw new TypeBlockNotFound()
    }

    const companyBlock = await this.companyBlockRepository.create({
      name,
      valueForHour,
      imageUrl,
      isActive: true,
      TypeBlock: {
        connect: {
          id: typeBlockId,
        },
      },
      Company: {
        connect: {
          id: companyId,
        },
      },
    })

    return { companyBlock }
  }
}
