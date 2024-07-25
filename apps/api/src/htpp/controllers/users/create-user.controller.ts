import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { UserAlreadyExistsError } from '@/use-cases/errors/users/user-already-exists-error'
import { makeRegisterUserUseCase } from '@/use-cases/factories/users/make-create-user-use-case'

export async function createUser(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string(),
    cpf: z.string(),
    passwordHash: z.string(),
  })

  const { name, email, cpf, passwordHash } = registerBodySchema.parse(
    request.body,
  )

  try {
    const registerUserUseCase = makeRegisterUserUseCase()

    const response = await registerUserUseCase.execute({
      name: name.toLocaleLowerCase(),
      email,
      cpf,
      passwordHash,
    })

    return reply.status(201).send({ userId: response.user.id })
  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }
}
