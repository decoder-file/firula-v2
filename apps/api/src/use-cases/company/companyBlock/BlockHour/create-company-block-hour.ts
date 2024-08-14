import { CompanyBlockHour } from '@prisma/client'
import moment from 'moment'

import { CompanyBlockHourRepository } from '@/repositories/company-block-hour-repository'
import { CompanyBlockRepository } from '@/repositories/company-block-repository'
import { CompanyBlockHourLowerDate } from '@/use-cases/errors/companyBlock/BlockHour/company-block-hour-lower-date'
import { CompanyBlockNotFound } from '@/use-cases/errors/companyBlock/company-block-not-found'

interface CreateCompanyBlockHourUseCaseRequest {
  date: string
  startTime: string
  endTime: string
  blockId: string
}

interface CreateCompanyBlockHourUseCaseResponse {
  blockHour: CompanyBlockHour
}

export class CreateCompanyBlockHourUseCase {
  constructor(
    private companyBlockRepository: CompanyBlockRepository,
    private companyBlockHourRepository: CompanyBlockHourRepository,
  ) {}

  async execute({
    date,
    startTime,
    endTime,
    blockId,
  }: CreateCompanyBlockHourUseCaseRequest): Promise<CreateCompanyBlockHourUseCaseResponse> {
    const dateformat = moment(date).startOf('day')
    const currentDate = moment().startOf('day')

    if (dateformat.isBefore(currentDate)) {
      throw new CompanyBlockHourLowerDate()
    }

    const foundBlock = await this.companyBlockRepository.findById(blockId)

    if (!foundBlock) {
      throw new CompanyBlockNotFound()
    }

    const blockHour = await this.companyBlockHourRepository.create({
      date,
      startTime,
      endTime,
      CompanyBlock: {
        connect: {
          id: blockId,
        },
      },
    })

    return { blockHour }
  }
}
