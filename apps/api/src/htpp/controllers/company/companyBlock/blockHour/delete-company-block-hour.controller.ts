import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { CompanyBlockHourNotFound } from '@/use-cases/errors/companyBlock/BlockHour/company-block-hour-not-found'
import { makeDeleteCompanyBlockHourUseCase } from '@/use-cases/factories/CompanyBlock/CompanyBlockHour/make-delete-company-block-hour-use-case'

export async function deleteCompanyBlockHour(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const delteCompanyBlockQuerySchema = z.object({
    blockHourId: z.string(),
  })

  const { blockHourId } = delteCompanyBlockQuerySchema.parse(request.query)

  try {
    const deleteCompanyBlockHourUseCase = makeDeleteCompanyBlockHourUseCase()

    const { success } = await deleteCompanyBlockHourUseCase.execute({
      blockHourId,
    })

    return reply.status(201).send({ success })
  } catch (err) {
    if (err instanceof CompanyBlockHourNotFound) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }
}
