import { CompanyOpeningHour } from '@prisma/client'

import { CompanyOpeningHoursRepository } from '@/repositories/company-opening-hours'
import { CompanyRepository } from '@/repositories/company-repository'
import { CompanyNotFound } from '@/use-cases/errors/company/company-not-found'
import { CompanyOpeningHourAlreadyExists } from '@/use-cases/errors/CompanyOpeningHour/company-opening-hour-already-exists'

interface CreateCompanyOpeningHourUseCaseRequest {
  dayOfWeek: string
  openAt: string
  closeAt: string
  companyId: string
}

interface CreateCompanyOpeningHourUseCaseResponse {
  openingHour: CompanyOpeningHour
}

export class CreateCompanyOpeningHourUseCase {
  constructor(
    private companyRepository: CompanyRepository,
    private companyOpeningHourRepository: CompanyOpeningHoursRepository,
  ) {}

  async execute({
    dayOfWeek,
    openAt,
    closeAt,
    companyId,
  }: CreateCompanyOpeningHourUseCaseRequest): Promise<CreateCompanyOpeningHourUseCaseResponse> {
    const companyData = await this.companyRepository.findById(companyId)

    if (!companyData) {
      throw new CompanyNotFound()
    }

    const companyOpeningHour =
      await this.companyOpeningHourRepository.searchSpecificDay(
        companyId,
        dayOfWeek.toLowerCase(),
      )

    if (companyOpeningHour) {
      throw new CompanyOpeningHourAlreadyExists()
    }

    const openingHour = await this.companyOpeningHourRepository.create({
      dayOfWeek: dayOfWeek.toLowerCase(),
      openAt,
      closeAt,
      companyId,
    })

    return { openingHour }
  }
}
