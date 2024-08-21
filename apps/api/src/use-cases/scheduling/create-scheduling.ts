import { Scheduling } from '@prisma/client'
import moment from 'moment'

import { CompanyBlockHourRepository } from '@/repositories/company-block-hour-repository'
import { CompanyBlockRepository } from '@/repositories/company-block-repository'
import { CompanyOpeningHoursRepository } from '@/repositories/company-opening-hours'
import { CompanyRepository } from '@/repositories/company-repository'
import { SchedulingRepository } from '@/repositories/scheduling-repository'
import { UsersRepository } from '@/repositories/users-repository'
import { getDayOfWeek } from '@/utils/functions'
import { isTimeAvailable } from '@/utils/sheduling-functions'

import { CompanyNotFound } from '../errors/company/company-not-found'
import { CompanyBlockHourNotAvailable } from '../errors/companyBlock/BlockHour/company-block-hour-not-available'
import { CompanyBlockNotFound } from '../errors/companyBlock/company-block-not-found'
import { CompanyClosed } from '../errors/CompanyOpeningHour/company-closed'
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
    private companyRepository: CompanyRepository,
    private usersRepository: UsersRepository,
    private companyOpeningHourRepository: CompanyOpeningHoursRepository,
    private companyBlockRepository: CompanyBlockRepository,
    private companyBlockHourRepository: CompanyBlockHourRepository,
    private schedulingRepository: SchedulingRepository,
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
    // verifica se a empresa selecionada existe
    const companyExists = await this.companyRepository.findById(companyId)

    if (!companyExists) {
      throw new CompanyNotFound()
    }

    // verifica se a quadra escolhida existe
    const block = await this.companyBlockRepository.findById(companyBlockId)

    if (!block) {
      throw new CompanyBlockNotFound()
    }

    // verifica se o usuário que fez a requisição existe
    const userData = await this.usersRepository.findById(userId)

    if (!userData.user) {
      throw new UserNotFound()
    }

    // verificar se no horário escolhido a empresa esta aberta
    const companyOpeningHour =
      await this.companyOpeningHourRepository.searchSpecificDay(
        companyId,
        getDayOfWeek(date),
      )

    if (!companyOpeningHour) {
      throw new CompanyClosed()
    }

    const startTimeFormat = moment(startTime, 'HH:mm')
    const endTimeFormat = moment(endTime, 'HH:mm')
    const openAt = moment(companyOpeningHour.openAt, 'HH:mm')
    const closeAt = moment(companyOpeningHour.closeAt, 'HH:mm')

    const isOpen =
      startTimeFormat.isSameOrAfter(openAt) &&
      endTimeFormat.isSameOrBefore(closeAt)

    if (!isOpen) {
      throw new CompanyClosed()
    }
    // verifica se o horário está disponível
    const dateformat = moment(date).startOf('day')

    const getAllBlockHoursByDate =
      await this.companyBlockHourRepository.getByDateRange(
        companyBlockId,
        dateformat.toDate(),
      )

    const checkTimetableAvailable = isTimeAvailable(
      startTime,
      endTime,
      getAllBlockHoursByDate,
    )

    if (!checkTimetableAvailable) {
      throw new CompanyBlockHourNotAvailable()
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
