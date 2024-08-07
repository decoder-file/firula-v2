import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { UserNotFound } from '@/use-cases/errors/users/user-not-found'
import { makeGetCompanyByUserIdUseCase } from '@/use-cases/factories/company/make-get-company-bt-user-id-use-case'

export async function getCompanyByUserId(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getByUserIdQuerySchema = z.object({
    userId: z.string(),
  })

  const { userId } = getByUserIdQuerySchema.parse(request.query)

  try {
    const getCompanyUseCase = makeGetCompanyByUserIdUseCase()

    const { company } = await getCompanyUseCase.execute({
      userId,
    })

    return reply.status(201).send({ company })
  } catch (err) {
    if (err instanceof UserNotFound) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }
}
