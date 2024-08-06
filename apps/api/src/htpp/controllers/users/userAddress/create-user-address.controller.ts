import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { UserNotFound } from '@/use-cases/errors/users/user-not-found'
import { makeCreateUserAddressUseCase } from '@/use-cases/factories/UserAddress/make-create-user-address-use-case'

export async function createUserAddress(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const registerUserAddressBodySchema = z.object({
    street: z.string(),
    number: z.string(),
    complement: z.string(),
    neighborhood: z.string(),
    city: z.string(),
    state: z.string(),
    zipCode: z.string(),
  })

  const registerUserAddressQuerySchema = z.object({
    userId: z.string(),
  })

  const { street, number, complement, neighborhood, city, state, zipCode } =
    registerUserAddressBodySchema.parse(request.body)

  const { userId } = registerUserAddressQuerySchema.parse(request.query)

  try {
    const createUserAddressUseCase = makeCreateUserAddressUseCase()

    const response = await createUserAddressUseCase.execute({
      street,
      number,
      complement,
      neighborhood,
      city,
      state,
      zipCode,
      isMain: true,
      userId,
    })

    return reply.status(201).send({ addressId: response.address.id })
  } catch (err) {
    if (err instanceof UserNotFound) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }
}
