import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { UserInvalidCNPJError } from '@/use-cases/errors/company/user-invalid-cnpj-error'
import { UserInvalidCpfError } from '@/use-cases/errors/users/user-invalid-cpf-error'
import { UserNotFound } from '@/use-cases/errors/users/user-not-found'
import { makeAuthenticationUseCase } from '@/use-cases/factories/authentication/make-authentication-use-case'

export async function authentication(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const registerBodySchema = z.object({
    email: z.string().email(),
    password: z.string(),
  })

  const { email, password } = registerBodySchema.parse(request.body)

  try {
    const authenticationUseCase = makeAuthenticationUseCase()

    const { user } = await authenticationUseCase.execute({
      email,
      password,
    })

    const userId = await request.getCurrentUserId()

    console.log('##########', userId)

    const token = await reply.jwtSign(
      {
        sub: user.id,
      },
      {
        sign: {
          expiresIn: '7d',
        },
      },
    )

    const userWithoutPassword = {
      ...user,
      passwordHash: undefined,
    }

    return reply.status(201).send({ token, userWithoutPassword })
  } catch (err) {
    if (err instanceof UserNotFound) {
      return reply.status(409).send({ message: err.message })
    }

    if (err instanceof UserInvalidCpfError) {
      return reply.status(409).send({ message: err.message })
    }

    if (err instanceof UserInvalidCNPJError) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }
}
