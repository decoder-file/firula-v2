import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { CompanyOpeningHourNotFound } from '@/use-cases/errors/CompanyOpeningHour/company-opening-hour-not-found'
import { makeUpdateCompanyOpeningHourUseCase } from '@/use-cases/factories/CompanyOpeningHour/make-update-company-opening-hour-use-case'

export async function updateCompanyOpeningHour(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const updateCompanyOpeningHourBodySchema = z.object({
    openAt: z.string(),
    closeAt: z.string(),
  })

  const updateCompanyOpeningHourQuerySchema = z.object({
    openingHourId: z.string(),
  })

  const { openAt, closeAt } = updateCompanyOpeningHourBodySchema.parse(
    request.body,
  )

  const { openingHourId } = updateCompanyOpeningHourQuerySchema.parse(
    request.query,
  )

  try {
    const updateCompanyOpeningHourUseCase =
      makeUpdateCompanyOpeningHourUseCase()

    const { openingHour } = await updateCompanyOpeningHourUseCase.execute({
      openAt,
      closeAt,
      openingHourId,
    })

    return reply.status(201).send({ openingHourId: openingHour.id })
  } catch (err) {
    if (err instanceof CompanyOpeningHourNotFound) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }
}
