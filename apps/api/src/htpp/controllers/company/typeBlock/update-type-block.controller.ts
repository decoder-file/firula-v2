import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { TypeBlockNotFound } from '@/use-cases/errors/typeBlock/type-block-not-found'
import { makeUpdateTypeBlockUseCase } from '@/use-cases/factories/typeBlock/make-update-type-block-use-case'

export async function updateTypeBlock(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const updateTypeBlockBodySchema = z.object({
    name: z.string(),
  })

  const updateTypeBlockQuerySchema = z.object({
    typeBlockId: z.string(),
  })

  const { typeBlockId } = updateTypeBlockQuerySchema.parse(request.query)

  const { name } = updateTypeBlockBodySchema.parse(request.body)

  try {
    const updateTypeBlockUseCase = makeUpdateTypeBlockUseCase()

    const { typeBlock } = await updateTypeBlockUseCase.execute({
      name,
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
