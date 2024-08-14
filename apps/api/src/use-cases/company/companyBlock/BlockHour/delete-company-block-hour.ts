import { CompanyBlockHourRepository } from '@/repositories/company-block-hour-repository'
import { CompanyBlockHourNotFound } from '@/use-cases/errors/companyBlock/BlockHour/company-block-hour-not-found'

interface DeleteCompanyBlockHourUseCaseRequest {
  blockHourId: string
}

interface DeleteCompanyBlockHourUseCaseResponse {
  success: boolean
}

export class DeleteCompanyBlockHourUseCase {
  constructor(private companyBlockHourRepository: CompanyBlockHourRepository) {}

  async execute({
    blockHourId,
  }: DeleteCompanyBlockHourUseCaseRequest): Promise<DeleteCompanyBlockHourUseCaseResponse> {
    const foundBlock =
      await this.companyBlockHourRepository.findById(blockHourId)

    if (!foundBlock) {
      throw new CompanyBlockHourNotFound()
    }

    const blockHour = await this.companyBlockHourRepository.delete(blockHourId)

    return { success: blockHour }
  }
}
