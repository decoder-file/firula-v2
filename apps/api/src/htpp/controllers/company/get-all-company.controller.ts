import { FastifyReply, FastifyRequest } from 'fastify'

import { UserNotFound } from '@/use-cases/errors/users/user-not-found'
import { makeGetAllCompanyUseCase } from '@/use-cases/factories/company/make-get-all-company-use-case'

export async function getAllCompany(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const getCompanyUseCase = makeGetAllCompanyUseCase()

    const { company } = await getCompanyUseCase.execute()

    return reply.status(201).send({ company })
  } catch (err) {
    if (err instanceof UserNotFound) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }
}
