import { Company } from '@prisma/client'

import { CompanyRepository } from '@/repositories/company-repository'
import { UsersRepository } from '@/repositories/users-repository'
import { createSlug, validateCNPJ, validateCPF } from '@/utils/functions'

import { UserInvalidCNPJError } from '../errors/company/user-invalid-cnpj-error'
import { UserInvalidCpfError } from '../errors/users/user-invalid-cpf-error'
import { UserNotFound } from '../errors/users/user-not-found'

interface CreateCompanyUseCaseRequest {
  name: string
  cpfCnpj: string
  typeDocument: string
  mobilePhone: string
  imageUrl?: string
  walletId?: string
  apiKey?: string
  companyType?: string
  incomeValue?: string
  userId: string
}

interface CreateCompanyUseCaseResponse {
  company: Company
}

export class CreateCompanyUseCase {
  constructor(
    private companyRepository: CompanyRepository,
    private userUsesRepository: UsersRepository,
  ) {}

  async execute({
    name,
    cpfCnpj,
    typeDocument,
    mobilePhone,
    imageUrl,
    walletId,
    apiKey,
    companyType,
    incomeValue,
    userId,
  }: CreateCompanyUseCaseRequest): Promise<CreateCompanyUseCaseResponse> {
    const { user } = await this.userUsesRepository.findById(userId)

    if (!user) {
      throw new UserNotFound()
    }

    if (typeDocument === 'cpf') {
      const isInValidCpf = validateCPF(cpfCnpj)

      if (!isInValidCpf) {
        throw new UserInvalidCpfError()
      }
    }

    if (typeDocument === 'cnpj') {
      const isInvalidCNPJ = validateCNPJ(cpfCnpj)

      if (!isInvalidCNPJ) {
        throw new UserInvalidCNPJError()
      }
    }

    const company = await this.companyRepository.create({
      name,
      slug: createSlug(name),
      cpf_cnpj: cpfCnpj,
      typeDocument,
      mobilePhone,
      imageUrl,
      walletId,
      apiKey,
      companyType,
      incomeValue,
      isActive: true,
      isBlock: false,
      userId,
    })

    return { company }
  }
}
