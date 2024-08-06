import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { UserAddressNotFound } from '@/use-cases/errors/userAddress/user-address-not-found'
import { makeUpdateUserAddressUseCase } from '@/use-cases/factories/UserAddress/make-update-user-address-use-case'

export async function updateUserAddress(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const registerUserAddressBodySchema = z.object({
    street: z.string().optional(),
    number: z.string().optional(),
    complement: z.string().optional(),
    neighborhood: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    zipCode: z.string().optional(),
    isMain: z.boolean().optional(),
  })

  const registerUserAddressQuerySchema = z.object({
    addressId: z.string(),
  })

  const {
    street,
    number,
    complement,
    neighborhood,
    city,
    state,
    zipCode,
    isMain,
  } = registerUserAddressBodySchema.parse(request.body)

  const { addressId } = registerUserAddressQuerySchema.parse(request.query)

  try {
    const updateUserAddressUseCase = makeUpdateUserAddressUseCase()

    const response = await updateUserAddressUseCase.execute({
      street,
      number,
      complement,
      neighborhood,
      city,
      state,
      zipCode,
      isMain,
      addressId,
    })

    return reply.status(201).send({ success: response })
  } catch (err) {
    if (err instanceof UserAddressNotFound) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }
}
