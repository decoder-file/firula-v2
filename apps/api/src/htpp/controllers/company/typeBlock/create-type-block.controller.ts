import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { TypeBlockNotFound } from '@/use-cases/errors/typeBlock/type-block-not-found'
import { makeCreateTypeBlockUseCase } from '@/use-cases/factories/typeBlock/make-create-type-block-use-case'

export async function createTypeBlock(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const createTypeBlockBodySchema = z.object({
    name: z.string(),
  })

  const { name } = createTypeBlockBodySchema.parse(request.body)

  try {
    const createTypeBlockUseCase = makeCreateTypeBlockUseCase()

    const { typeBlock } = await createTypeBlockUseCase.execute({
      name,
    })

    return reply.status(201).send({ typeBlock })
  } catch (err) {
    if (err instanceof TypeBlockNotFound) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }
}
