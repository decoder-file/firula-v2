import { CompanyOpeningHour } from '@prisma/client'

import { CompanyOpeningHoursRepository } from '@/repositories/company-opening-hours'
import { CompanyOpeningHourNotFound } from '@/use-cases/errors/CompanyOpeningHour/company-opening-hour-not-found'

interface UpdateCompanyOpeningHourUseCaseRequest {
  openAt: string
  closeAt: string
  openingHourId: string
}

interface UpdateCompanyOpeningHourUseCaseResponse {
  openingHour: CompanyOpeningHour
}

export class UpdateCompanyOpeningHourUseCase {
  constructor(
    private companyOpeningHourRepository: CompanyOpeningHoursRepository,
  ) {}

  async execute({
    openAt,
    closeAt,
    openingHourId,
  }: UpdateCompanyOpeningHourUseCaseRequest): Promise<UpdateCompanyOpeningHourUseCaseResponse> {
    const openingHourFound =
      await this.companyOpeningHourRepository.findById(openingHourId)

    if (!openingHourFound) {
      throw new CompanyOpeningHourNotFound()
    }

    const openingHour = await this.companyOpeningHourRepository.update(
      {
        id: openingHourId,
        openAt,
        closeAt,
      },
      openingHourId,
    )

    return { openingHour }
  }
}
