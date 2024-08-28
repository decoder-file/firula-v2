import { CompanyBlockRepository } from '@/repositories/company-block-repository'
import { CompanyRepository } from '@/repositories/company-repository'
import { UsersRepository } from '@/repositories/users-repository'

interface GetAllUserUseCaseResponse {
  numberOfCompanies: number
  numberOfBlocks: number
  numberOfCustomers: number
}

export class GetStatisticUseCase {
  constructor(
    private userUsesRepository: UsersRepository,
    private blockRepository: CompanyBlockRepository,
    private companyRepository: CompanyRepository,
  ) {}

  async execute(): Promise<GetAllUserUseCaseResponse> {
    const numberOfCustomers = await this.userUsesRepository.countCostumers()

    const numberOfCompanies = await this.companyRepository.countCompanies()

    const numberOfBlocks = await this.blockRepository.countBlocks()

    return {
      numberOfCompanies,
      numberOfBlocks,
      numberOfCustomers,
    }
  }
}
