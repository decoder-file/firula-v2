import { CompanyOpeningHour } from '@prisma/client'

import { CompanyOpeningHoursRepository } from '@/repositories/company-opening-hours'
import { CompanyOpeningHourNotFound } from '@/use-cases/errors/CompanyOpeningHour/company-opening-hour-not-found'

interface GetCompanyOpeningHourByIdUseCaseRequest {
  openingHourId: string
}

interface GetCompanyOpeningHourByIdUseCaseResponse {
  openingHour: CompanyOpeningHour
}

export class GetCompanyOpeningHourByIdUseCase {
  constructor(
    private companyOpeningHourRepository: CompanyOpeningHoursRepository,
  ) {}

  async execute({
    openingHourId,
  }: GetCompanyOpeningHourByIdUseCaseRequest): Promise<GetCompanyOpeningHourByIdUseCaseResponse> {
    const openingHour =
      await this.companyOpeningHourRepository.findById(openingHourId)

    if (!openingHour) {
      throw new CompanyOpeningHourNotFound()
    }

    return {
      openingHour,
    }
  }
}
