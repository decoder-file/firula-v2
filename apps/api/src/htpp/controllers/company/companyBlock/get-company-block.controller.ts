import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { CompanyBlockNotFound } from '@/use-cases/errors/companyBlock/company-block-not-found'
import { TypeBlockNotFound } from '@/use-cases/errors/typeBlock/type-block-not-found'
import { makeGetCompanyBlockByIdUseCase } from '@/use-cases/factories/CompanyBlock/make-get-company-block-by-id-use-case'

export async function getCompanyBlockById(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getCompanyBlockByIdQuerySchema = z.object({
    blockId: z.string(),
  })

  const { blockId } = getCompanyBlockByIdQuerySchema.parse(request.query)

  try {
    const getCompanyBlockByIdUseCase = makeGetCompanyBlockByIdUseCase()

    const { block } = await getCompanyBlockByIdUseCase.execute({
      blockId,
    })

    return reply.status(201).send({ block })
  } catch (err) {
    if (err instanceof CompanyBlockNotFound) {
      return reply.status(409).send({ message: err.message })
    }

    if (err instanceof TypeBlockNotFound) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }
}
