import { PrismaCompanyBlockHourRepository } from '@/repositories/prisma/prisma-company-block-hour-repository'
import { PrismaCompanyBlockRepository } from '@/repositories/prisma/prisma-company-block-repository'
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

  const createSchedulingUseCase = new CreateSchedulingUseCase(
    schedulingRepository,
    companyRepository,
    usersRepository,
    companyBlockRepository,
    companyBlockHourRepository,
  )

  return createSchedulingUseCase
}
