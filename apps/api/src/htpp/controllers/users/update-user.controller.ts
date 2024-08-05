import { Role } from '@prisma/client'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { UserNotFound } from '@/use-cases/errors/users/user-not-found'
import { makeUpdateUserUseCase } from '@/use-cases/factories/users/make-update-user-use-case'

export async function updateUser(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string().optional(),
    role: z.string().optional(),
    isBlock: z.boolean().optional(),
    image: z.string().optional(),
  })

  const registerQuerySchema = z.object({
    userId: z.string(),
  })

  const { name, role, isBlock, image } = registerBodySchema.parse(request.body)

  const { userId } = registerQuerySchema.parse(request.query)

  try {
    const updateUserUseCase = makeUpdateUserUseCase()

    const response = await updateUserUseCase.execute({
      name: name?.toLocaleLowerCase() || '',
      role: role as Role,
      isBlock,
      image,
      userId,
    })

    return reply.status(201).send({ userId: response.user?.id })
  } catch (err) {
    if (err instanceof UserNotFound) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }
}
