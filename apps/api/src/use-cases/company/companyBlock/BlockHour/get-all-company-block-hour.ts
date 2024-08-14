import { CompanyBlockHour } from '@prisma/client'

import { CompanyBlockHourRepository } from '@/repositories/company-block-hour-repository'

interface GetAllCompanyBlockHourUseCaseResponse {
  blockHour: CompanyBlockHour[]
}

export class GetAllCompanyBlockHourUseCase {
  constructor(private companyBlockHourRepository: CompanyBlockHourRepository) {}

  async execute(): Promise<GetAllCompanyBlockHourUseCaseResponse> {
    const blockHour = await this.companyBlockHourRepository.listAll()

    return { blockHour }
  }
}
