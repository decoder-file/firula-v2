import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { CompanyNotFound } from '@/use-cases/errors/company/company-not-found'
import { makeGetCompanyBlockByCompanyIdUseCase } from '@/use-cases/factories/CompanyBlock/make-get-company-block-by-company-id-use-case'

export async function getCompanyBlockByCompanyId(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getCompanyBlockByIdQuerySchema = z.object({
    companyId: z.string(),
  })

  const { companyId } = getCompanyBlockByIdQuerySchema.parse(request.query)

  try {
    const getCompanyBlockByCompanyIdUseCase =
      makeGetCompanyBlockByCompanyIdUseCase()

    const { block } = await getCompanyBlockByCompanyIdUseCase.execute({
      companyId,
    })

    return reply.status(201).send({ block })
  } catch (err) {
    if (err instanceof CompanyNotFound) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }
}
