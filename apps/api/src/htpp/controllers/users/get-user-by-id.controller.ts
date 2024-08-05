import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { UserNotFound } from '@/use-cases/errors/users/user-not-found'
import { makeGetUserByIdUserUseCase } from '@/use-cases/factories/users/make-get-user-by-id-use-case'

export async function getUserByIdUser(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const deleteQuerySchema = z.object({
    userId: z.string(),
  })

  const { userId } = deleteQuerySchema.parse(request.query)

  try {
    const updateUserUseCase = makeGetUserByIdUserUseCase()

    const { user } = await updateUserUseCase.execute({ userId })

    return reply.status(201).send({ user })
  } catch (err) {
    if (err instanceof UserNotFound) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }
}
