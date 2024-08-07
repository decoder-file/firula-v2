import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { CompanyNotFound } from '@/use-cases/errors/company/company-not-found'
import { makeGetCompanyByIdUseCase } from '@/use-cases/factories/company/make-get-company-by-id-use-case'

export async function getCompanyById(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getByIdQuerySchema = z.object({
    companyId: z.string(),
  })

  const { companyId } = getByIdQuerySchema.parse(request.query)

  try {
    const getCompanyUseCase = makeGetCompanyByIdUseCase()

    const { company } = await getCompanyUseCase.execute({
      companyId,
    })

    return reply.status(201).send({ company })
  } catch (err) {
    if (err instanceof CompanyNotFound) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }
}
