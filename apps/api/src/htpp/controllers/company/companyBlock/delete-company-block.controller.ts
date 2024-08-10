import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { CompanyBlockNotFound } from '@/use-cases/errors/companyBlock/company-block-not-found'
import { makeDeleteCompanyBlockUseCase } from '@/use-cases/factories/CompanyBlock/make-delete-company-block-use-case'

export async function deleteCompanyBlock(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const delteCompanyBlockQuerySchema = z.object({
    blockId: z.string(),
  })

  const { blockId } = delteCompanyBlockQuerySchema.parse(request.query)

  try {
    const deleteCompanyBlockUseCase = makeDeleteCompanyBlockUseCase()

    const { success } = await deleteCompanyBlockUseCase.execute({
      blockId,
    })

    return reply.status(201).send({ success })
  } catch (err) {
    if (err instanceof CompanyBlockNotFound) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }
}
