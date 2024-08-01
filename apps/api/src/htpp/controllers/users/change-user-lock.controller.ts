import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { UserNotExistsError } from '@/use-cases/errors/users/user-already-exists-error copy'
import { makeChangeUserLockUseCase } from '@/use-cases/factories/users/make-change-user-lock-use-case'

export async function changeUserLockByIdUser(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const deleteQuerySchema = z.object({
    userId: z.string(),
  })

  const { userId } = deleteQuerySchema.parse(request.query)

  try {
    const updateUserUseCase = makeChangeUserLockUseCase()

    const { user } = await updateUserUseCase.execute({ userId })

    return reply.status(201).send({ user })
  } catch (err) {
    if (err instanceof UserNotExistsError) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }
}
