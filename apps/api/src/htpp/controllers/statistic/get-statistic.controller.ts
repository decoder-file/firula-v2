import { FastifyReply, FastifyRequest } from 'fastify'

import { UserNotFound } from '@/use-cases/errors/users/user-not-found'
import { makeStatisticUseCase } from '@/use-cases/factories/statistic/make-statistic-use-case'

export async function getStatistic(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const getStatisticUseCase = makeStatisticUseCase()

    const { numberOfBlocks, numberOfCompanies, numberOfCustomers } =
      await getStatisticUseCase.execute()

    return reply
      .status(201)
      .send({ numberOfBlocks, numberOfCompanies, numberOfCustomers })
  } catch (err) {
    if (err instanceof UserNotFound) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }
}
