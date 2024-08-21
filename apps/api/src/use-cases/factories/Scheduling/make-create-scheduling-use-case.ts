import { PrismaCompanyBlockHourRepository } from '@/repositories/prisma/prisma-company-block-hour-repository'
import { PrismaCompanyBlockRepository } from '@/repositories/prisma/prisma-company-block-repository'
import { PrismaCompanyOpeningHoursRepository } from '@/repositories/prisma/prisma-company-opening-hours-repository'
import { PrismaCompanyRepository } from '@/repositories/prisma/prisma-company-repository'
import { PrismaSchedulingRepository } from '@/repositories/prisma/prisma-scheduling-repository'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-user-repository'
import { CreateSchedulingUseCase } from '@/use-cases/scheduling/create-scheduling'

export function makeCreateSchedulingUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const companyRepository = new PrismaCompanyRepository()
  const schedulingRepository = new PrismaSchedulingRepository()
  const companyBlockRepository = new PrismaCompanyBlockRepository()
  const companyBlockHourRepository = new PrismaCompanyBlockHourRepository()
  const companyOpeningHour = new PrismaCompanyOpeningHoursRepository()

  const createSchedulingUseCase = new CreateSchedulingUseCase(
    companyRepository,
    usersRepository,
    companyOpeningHour,
    companyBlockRepository,
    companyBlockHourRepository,
    schedulingRepository,
  )

  return createSchedulingUseCase
}
