import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { CompanyOpeningHourNotFound } from '@/use-cases/errors/CompanyOpeningHour/company-opening-hour-not-found'
import { makeGetCompanyOpeningHourByIdUseCase } from '@/use-cases/factories/CompanyOpeningHour/make-get-company-opening-hour-by-id-use-case'

export async function getCompanyOpeningHourById(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getCompanyOpeningHourByIdQuerySchema = z.object({
    openingHourId: z.string(),
  })

  const { openingHourId } = getCompanyOpeningHourByIdQuerySchema.parse(
    request.query,
  )

  try {
    const getCompanyOpeningHourByIdUseCase =
      makeGetCompanyOpeningHourByIdUseCase()

    const { openingHour } = await getCompanyOpeningHourByIdUseCase.execute({
      openingHourId,
    })

    return reply.status(201).send({ openingHour })
  } catch (err) {
    if (err instanceof CompanyOpeningHourNotFound) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }
}
