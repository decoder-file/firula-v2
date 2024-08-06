import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { UserAddressNotFound } from '@/use-cases/errors/userAddress/user-address-not-found'
import { makeGetUserAddressUseCase } from '@/use-cases/factories/UserAddress/make-get-user-address-use-case'

export async function getUserAddress(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getUserAddressQuerySchema = z.object({
    addressId: z.string(),
  })

  const { addressId } = getUserAddressQuerySchema.parse(request.query)

  try {
    const getUserAddressUseCase = makeGetUserAddressUseCase()

    const response = await getUserAddressUseCase.execute({
      userAddressId: addressId,
    })

    return reply.status(201).send({ address: response })
  } catch (err) {
    if (err instanceof UserAddressNotFound) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }
}
