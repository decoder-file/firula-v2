import { CompanyOpeningHoursRepository } from '@/repositories/company-opening-hours'
import { CompanyOpeningHourNotFound } from '@/use-cases/errors/CompanyOpeningHour/company-opening-hour-not-found'

interface DeleteCompanyOpeningHourUseCaseRequest {
  openingHourId: string
}

interface DeleteCompanyOpeningHourUseCaseResponse {
  success: boolean
}

export class DeleteCompanyOpeningHourUseCase {
  constructor(
    private companyOpeningHourRepository: CompanyOpeningHoursRepository,
  ) {}

  async execute({
    openingHourId,
  }: DeleteCompanyOpeningHourUseCaseRequest): Promise<DeleteCompanyOpeningHourUseCaseResponse> {
    const openingHour =
      await this.companyOpeningHourRepository.findById(openingHourId)

    if (!openingHour) {
      throw new CompanyOpeningHourNotFound()
    }

    const deletedOpeningHour =
      await this.companyOpeningHourRepository.delete(openingHourId)

    return {
      success: deletedOpeningHour,
    }
  }
}
