import { Scheduling } from '@prisma/client'

import { CompanyBlockHourRepository } from '@/repositories/company-block-hour-repository'
import { CompanyBlockRepository } from '@/repositories/company-block-repository'
import { CompanyRepository } from '@/repositories/company-repository'
import { SchedulingRepository } from '@/repositories/scheduling-repository'
import { UsersRepository } from '@/repositories/users-repository'

import { CompanyNotFound } from '../errors/company/company-not-found'
import { CompanyBlockNotFound } from '../errors/companyBlock/company-block-not-found'
import { UserNotFound } from '../errors/users/user-not-found'

interface CreateSchedulingUseCaseRequest {
  date: string
  status: string
  paymentStatus: string
  companyId: string
  companyBlockId: string
  userId: string
  startTime: string
  endTime: string
}

interface CreateSchedulingUseCaseResponse {
  scheduling: Scheduling
}

export class CreateSchedulingUseCase {
  constructor(
    private schedulingRepository: SchedulingRepository,
    private companyRepository: CompanyRepository,
    private usersRepository: UsersRepository,
    private companyBlockRepository: CompanyBlockRepository,
    private companyBlockHourRepository: CompanyBlockHourRepository,
  ) {}

  async execute({
    date,
    status,
    paymentStatus,
    companyId,
    companyBlockId,
    userId,
    startTime,
    endTime,
  }: CreateSchedulingUseCaseRequest): Promise<CreateSchedulingUseCaseResponse> {
    const companyExists = await this.companyRepository.findById(companyId)

    if (!companyExists) {
      throw new CompanyNotFound()
    }

    const block = await this.companyBlockRepository.findById(companyBlockId)

    if (!block) {
      throw new CompanyBlockNotFound()
    }

    const userData = await this.usersRepository.findById(userId)

    if (!userData.user) {
      throw new UserNotFound()
    }

    const createBlockHour = await this.companyBlockHourRepository.create({
      date,
      startTime,
      endTime,
      CompanyBlock: {
        connect: {
          id: companyBlockId,
        },
      },
    })

    if (!createBlockHour) {
      throw new Error('Ocorreu um erro ao criar o horário')
    }

    const scheduling = await this.schedulingRepository.create({
      date,
      status,
      paymentStatus,
      company: {
        connect: {
          id: companyId,
        },
      },
      companyBlock: {
        connect: {
          id: companyBlockId,
        },
      },
      companyBlockHour: {
        connect: {
          id: createBlockHour.id,
        },
      },
      user: {
        connect: {
          id: userId,
        },
      },
    })

    return { scheduling }
  }
}
