import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { TypeBlockNotFound } from '@/use-cases/errors/typeBlock/type-block-not-found'
import { makeGetTypeBlockByIdUseCase } from '@/use-cases/factories/typeBlock/make-get-type-block-by-id-use-case'

export async function getTypeByIdBlock(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getTypeBlockByIdQuerySchema = z.object({
    typeBlockId: z.string(),
  })

  const { typeBlockId } = getTypeBlockByIdQuerySchema.parse(request.query)

  try {
    const getTypeBlockByIdUseCase = makeGetTypeBlockByIdUseCase()

    const { typeBlock } = await getTypeBlockByIdUseCase.execute({
      typeBlockId,
    })

    return reply.status(201).send({ typeBlock })
  } catch (err) {
    if (err instanceof TypeBlockNotFound) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }
}
