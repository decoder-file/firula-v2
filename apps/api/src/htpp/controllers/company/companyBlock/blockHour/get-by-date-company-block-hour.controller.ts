import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { CompanyBlockHourLowerDate } from '@/use-cases/errors/companyBlock/BlockHour/company-block-hour-lower-date'
import { CompanyBlockNotFound } from '@/use-cases/errors/companyBlock/company-block-not-found'
import { makeGetByDateCompanyBlockHourUseCase } from '@/use-cases/factories/CompanyBlock/CompanyBlockHour/make-get-by-date-company-block-hour-use-case'

export async function getByDateCompanyBlockHour(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getByDateCompanyBlockHourQuerySchema = z.object({
    date: z.string(),
    companyBlockId: z.string(),
  })

  const { date, companyBlockId } = getByDateCompanyBlockHourQuerySchema.parse(
    request.query,
  )

  try {
    const getByDateCompanyBlockHourUseCase =
      makeGetByDateCompanyBlockHourUseCase()

    const { blockHours } = await getByDateCompanyBlockHourUseCase.execute({
      date,
      companyBlockId,
    })

    return reply.status(201).send({ blockHours })
  } catch (err) {
    if (err instanceof CompanyBlockNotFound) {
      return reply.status(409).send({ message: err.message })
    }

    if (err instanceof CompanyBlockHourLowerDate) {
      return reply.status(400).send({ message: err.message })
    }

    throw err
  }
}
