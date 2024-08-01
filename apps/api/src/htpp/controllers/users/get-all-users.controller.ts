import { FastifyReply, FastifyRequest } from 'fastify'

import { makeGetAllUsersUserUseCase } from '@/use-cases/factories/users/make-get-all-users-use-case'

export async function getAllUsers(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const getAllUsersUseCase = makeGetAllUsersUserUseCase()

    const { users } = await getAllUsersUseCase.execute()

    return reply.status(201).send({ users })
  } catch (err) {
    return reply
      .status(501)
      .send({ message: 'Ocorreu um erro interno, tente novamente mais tarde!' })

    throw err
  }
}
