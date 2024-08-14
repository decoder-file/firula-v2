import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { CompanyBlockHourLowerDate } from '@/use-cases/errors/companyBlock/BlockHour/company-block-hour-lower-date'
import { CompanyBlockNotFound } from '@/use-cases/errors/companyBlock/company-block-not-found'
import { makeCreateCompanyBlockHourUseCase } from '@/use-cases/factories/CompanyBlock/CompanyBlockHour/make-create-company-block-hour-use-case'

export async function createCompanyBlockHour(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const createCompanyBlockHourBodySchema = z.object({
    date: z.string(),
    startTime: z.string(),
    endTime: z.string(),
    blockId: z.string(),
  })

  const { date, startTime, endTime, blockId } =
    createCompanyBlockHourBodySchema.parse(request.body)

  try {
    const createCompanyBlockHourUseCase = makeCreateCompanyBlockHourUseCase()

    const { blockHour } = await createCompanyBlockHourUseCase.execute({
      date,
      startTime,
      endTime,
      blockId,
    })

    return reply.status(201).send({ blockHourId: blockHour.id })
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
