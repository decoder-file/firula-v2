import { FastifyReply, FastifyRequest } from 'fastify'

import { TypeBlockNotFound } from '@/use-cases/errors/typeBlock/type-block-not-found'
import { makeGetAllTypeBlockUseCase } from '@/use-cases/factories/typeBlock/make-get-all-type-block-use-case'

export async function getAllTypeBlock(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const getAllTypeBlockUseCase = makeGetAllTypeBlockUseCase()

    const { typeBlock } = await getAllTypeBlockUseCase.execute()

    return reply.status(201).send({ typeBlock })
  } catch (err) {
    if (err instanceof TypeBlockNotFound) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }
}
