import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { CompanyNotFound } from '@/use-cases/errors/company/company-not-found'
import { UserInvalidCNPJError } from '@/use-cases/errors/company/user-invalid-cnpj-error'
import { UserInvalidCpfError } from '@/use-cases/errors/users/user-invalid-cpf-error'
import { makeUpdateCompanyUseCase } from '@/use-cases/factories/company/make-update-company-use-case'

export async function updateCompany(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const updateBodySchema = z.object({
    name: z.string(),
    cpfCnpj: z.string(),
    typeDocument: z.string(),
    mobilePhone: z.string(),
    imageUrl: z.string().optional(),
    walletId: z.string().optional(),
    apiKey: z.string().optional(),
    companyType: z.string().optional(),
    incomeValue: z.string().optional(),
    isActive: z.boolean().optional(),
    isBlock: z.boolean().optional(),
  })

  const updateQuerySchema = z.object({
    companyId: z.string(),
  })

  const {
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
  } = updateBodySchema.parse(request.body)

  const { companyId } = updateQuerySchema.parse(request.query)

  try {
    const updateCompanyUseCase = makeUpdateCompanyUseCase()

    const { company } = await updateCompanyUseCase.execute({
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
    })

    return reply.status(201).send({ companyId: company.id })
  } catch (err) {
    if (err instanceof CompanyNotFound) {
      return reply.status(409).send({ message: err.message })
    }

    if (err instanceof UserInvalidCpfError) {
      return reply.status(409).send({ message: err.message })
    }

    if (err instanceof UserInvalidCNPJError) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }
}
