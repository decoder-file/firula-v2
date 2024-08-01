import { Role } from '@prisma/client'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { UserAlreadyExistsError } from '@/use-cases/errors/users/user-already-exists-error'
import { UserCpfAlreadyExistsError } from '@/use-cases/errors/users/user-cpf-already-exists-error'
import { UserInvalidCpfError } from '@/use-cases/errors/users/user-invalid-cpf-error'
import { makeRegisterUserUseCase } from '@/use-cases/factories/users/make-create-user-use-case'

export async function createUser(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string(),
    cpf: z.string(),
    role: z.string().optional(),
    passwordHash: z.string(),
  })

  const { name, email, cpf, passwordHash, role } = registerBodySchema.parse(
    request.body,
  ) as {
    name: string
    email: string
    cpf: string
    passwordHash: string
    role: Role | undefined
  }

  try {
    const registerUserUseCase = makeRegisterUserUseCase()

    const response = await registerUserUseCase.execute({
      name: name.toLocaleLowerCase(),
      email,
      cpf,
      role,
      passwordHash,
    })

    return reply.status(201).send({ userId: response.user.id })
  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }

    if (err instanceof UserCpfAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }

    if (err instanceof UserInvalidCpfError) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }
}
