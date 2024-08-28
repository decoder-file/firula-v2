import { PrismaCompanyBlockRepository } from '@/repositories/prisma/prisma-company-block-repository'
import { PrismaCompanyRepository } from '@/repositories/prisma/prisma-company-repository'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-user-repository'
import { GetStatisticUseCase } from '@/use-cases/statistic/get-statistic'

export function makeStatisticUseCase() {
  const companyRepository = new PrismaCompanyRepository()
  const CompanyBlockRepository = new PrismaCompanyBlockRepository()
  const userRepository = new PrismaUsersRepository()

  const getStatisticUseCase = new GetStatisticUseCase(
    userRepository,
    CompanyBlockRepository,
    companyRepository,
  )

  return getStatisticUseCase
}
