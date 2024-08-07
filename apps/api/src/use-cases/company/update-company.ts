import { Company } from '@prisma/client'

import { CompanyRepository } from '@/repositories/company-repository'
import { validateCNPJ, validateCPF } from '@/utils/functions'

import { CompanyNotFound } from '../errors/company/company-not-found'
import { UserInvalidCNPJError } from '../errors/company/user-invalid-cnpj-error'
import { UserInvalidCpfError } from '../errors/users/user-invalid-cpf-error'

interface UpdateCompanyUseCaseRequest {
  name?: string
  cpfCnpj?: string
  typeDocument?: string
  mobilePhone?: string
  imageUrl?: string
  walletId?: string
  apiKey?: string
  companyType?: string
  incomeValue?: string
  isActive?: boolean
  isBlock?: boolean
  companyId: string
}

interface UpdateCompanyUseCaseResponse {
  company: Company
}

export class UpdateCompanyUseCase {
  constructor(private companyRepository: CompanyRepository) {}

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
    isActive,
    isBlock,
    companyId,
  }: UpdateCompanyUseCaseRequest): Promise<UpdateCompanyUseCaseResponse> {
    const companyExists = await this.companyRepository.findById(companyId)

    if (!companyExists) {
      throw new CompanyNotFound()
    }

    if (cpfCnpj && typeDocument === 'cpf') {
      const isInValidCpf = validateCPF(cpfCnpj)

      if (!isInValidCpf) {
        throw new UserInvalidCpfError()
      }
    }

    if (cpfCnpj && typeDocument === 'cnpj') {
      const isInvalidCNPJ = validateCNPJ(cpfCnpj)

      if (!isInvalidCNPJ) {
        throw new UserInvalidCNPJError()
      }
    }

    const company = await this.companyRepository.update(
      {
        name,
        cpf_cnpj: cpfCnpj,
        typeDocument,
        mobilePhone,
        imageUrl,
        walletId,
        apiKey,
        companyType,
        incomeValue,
        isActive,
        isBlock,
      },
      companyId,
    )

    return { company }
  }
}
