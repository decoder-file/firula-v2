import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { CompanyOpeningHourNotFound } from '@/use-cases/errors/CompanyOpeningHour/company-opening-hour-not-found'
import { makeDeleteCompanyOpeningHourUseCase } from '@/use-cases/factories/CompanyOpeningHour/make-delete-company-opening-hour-use-case'

export async function deleteCompanyOpeningHour(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const deleteCompanyOpeningHourQuerySchema = z.object({
    openingHourId: z.string(),
  })

  const { openingHourId } = deleteCompanyOpeningHourQuerySchema.parse(
    request.query,
  )

  try {
    const deleteCompanyOpeningHourUseCase =
      makeDeleteCompanyOpeningHourUseCase()

    const { success } = await deleteCompanyOpeningHourUseCase.execute({
      openingHourId,
    })

    return reply.status(201).send({ success })
  } catch (err) {
    if (err instanceof CompanyOpeningHourNotFound) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }
}
