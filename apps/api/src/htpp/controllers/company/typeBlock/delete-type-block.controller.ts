import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { TypeBlockNotFound } from '@/use-cases/errors/typeBlock/type-block-not-found'
import { makeDeleteTypeBlockUseCase } from '@/use-cases/factories/typeBlock/make-delete-type-block-use-case'

export async function deleteTypeBlock(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const deleteTypeBlockQuerySchema = z.object({
    typeBlockId: z.string(),
  })

  const { typeBlockId } = deleteTypeBlockQuerySchema.parse(request.query)

  try {
    const deleteTypeBlockUseCase = makeDeleteTypeBlockUseCase()

    const { success } = await deleteTypeBlockUseCase.execute({
      typeBlockId,
    })

    return reply.status(201).send({ success })
  } catch (err) {
    if (err instanceof TypeBlockNotFound) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }
}
