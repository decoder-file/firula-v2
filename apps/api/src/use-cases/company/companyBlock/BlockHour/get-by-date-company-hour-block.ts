import { CompanyBlockHour } from '@prisma/client'
import moment from 'moment'

import { CompanyBlockHourRepository } from '@/repositories/company-block-hour-repository'
import { CompanyBlockRepository } from '@/repositories/company-block-repository'
import { CompanyBlockHourLowerDate } from '@/use-cases/errors/companyBlock/BlockHour/company-block-hour-lower-date'
import { CompanyBlockNotFound } from '@/use-cases/errors/companyBlock/company-block-not-found'

interface GetByDateCompanyBlockHourUseCaseRequest {
  date: string
  companyBlockId: string
}

interface GetByDateCompanyBlockHourUseCaseResponse {
  blockHours: CompanyBlockHour[]
}

export class GetByDateCompanyBlockHourUseCase {
  constructor(
    private companyBlockRepository: CompanyBlockRepository,
    private companyBlockHourRepository: CompanyBlockHourRepository,
  ) {}

  async execute({
    date,
    companyBlockId,
  }: GetByDateCompanyBlockHourUseCaseRequest): Promise<GetByDateCompanyBlockHourUseCaseResponse> {
    const dateformat = moment(date).startOf('day')
    const currentDate = moment().startOf('day')

    if (dateformat.isBefore(currentDate)) {
      throw new CompanyBlockHourLowerDate()
    }

    const companyBlock =
      await this.companyBlockRepository.findById(companyBlockId)

    if (!companyBlock) {
      throw new CompanyBlockNotFound()
    }

    const blockHours = await this.companyBlockHourRepository.getByDateRange(
      companyBlockId,
      dateformat.toDate(),
    )

    return { blockHours }
  }
}
