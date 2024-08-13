import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { CompanyNotFound } from '@/use-cases/errors/company/company-not-found'
import { CompanyOpeningHourAlreadyExists } from '@/use-cases/errors/CompanyOpeningHour/company-opening-hour-already-exists'
import { makeCreateCompanyOpeningHourUseCase } from '@/use-cases/factories/CompanyOpeningHour/make-create-company-opening-hour-use-case'

export async function createCompanyOpeningHour(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const createCompanyOpeningHourBodySchema = z.object({
    dayOfWeek: z.string(),
    openAt: z.string(),
    closeAt: z.string(),
  })

  const createCompanyOpeningHourQuerySchema = z.object({
    companyId: z.string(),
  })

  const { dayOfWeek, openAt, closeAt } =
    createCompanyOpeningHourBodySchema.parse(request.body)

  const { companyId } = createCompanyOpeningHourQuerySchema.parse(request.query)

  try {
    const createCompanyOpeningHourUseCase =
      makeCreateCompanyOpeningHourUseCase()

    const { openingHour } = await createCompanyOpeningHourUseCase.execute({
      dayOfWeek,
      openAt,
      closeAt,
      companyId,
    })

    return reply.status(201).send({ openingHourId: openingHour.id })
  } catch (err) {
    if (err instanceof CompanyNotFound) {
      return reply.status(409).send({ message: err.message })
    }

    if (err instanceof CompanyOpeningHourAlreadyExists) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }
}
