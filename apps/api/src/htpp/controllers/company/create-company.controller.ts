import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { UserInvalidCNPJError } from '@/use-cases/errors/company/user-invalid-cnpj-error'
import { UserInvalidCpfError } from '@/use-cases/errors/users/user-invalid-cpf-error'
import { UserNotFound } from '@/use-cases/errors/users/user-not-found'
import { makeCreateCompanyUseCase } from '@/use-cases/factories/company/make-create-company-use-case'

export async function createCompany(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const registerBodySchema = z.object({
    name: z.string(),
    cpfCnpj: z.string(),
    typeDocument: z.string(),
    mobilePhone: z.string(),
    imageUrl: z.string().optional(),
    walletId: z.string().optional(),
    apiKey: z.string().optional(),
    companyType: z.string().optional(),
    incomeValue: z.string().optional(),
  })

  const registerQuerySchema = z.object({
    userId: z.string(),
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
  } = registerBodySchema.parse(request.body)

  const { userId } = registerQuerySchema.parse(request.query)

  try {
    const createCompanyUseCase = makeCreateCompanyUseCase()

    const { company } = await createCompanyUseCase.execute({
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
    })

    return reply.status(201).send({ companyId: company.id })
  } catch (err) {
    if (err instanceof UserNotFound) {
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
