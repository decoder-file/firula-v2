import { FastifyReply, FastifyRequest } from 'fastify'

import { CompanyBlockHourNotFound } from '@/use-cases/errors/companyBlock/BlockHour/company-block-hour-not-found'
import { makeGetAllCompanyBlockHourUseCase } from '@/use-cases/factories/CompanyBlock/CompanyBlockHour/make-get-all-company-block-hour-use-case'

export async function getAllCompanyBlockHour(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const getAllCompanyBlockHourUseCase = makeGetAllCompanyBlockHourUseCase()

    const { blockHour } = await getAllCompanyBlockHourUseCase.execute()

    return reply.status(201).send({ blockHour })
  } catch (err) {
    if (err instanceof CompanyBlockHourNotFound) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }
}
