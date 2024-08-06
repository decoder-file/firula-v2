import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { UserAddressNotFound } from '@/use-cases/errors/userAddress/user-address-not-found'
import { makeDeleteUserAddressUseCase } from '@/use-cases/factories/UserAddress/make-delete-user-address-use-case'

export async function deleteUserAddress(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const deleteUserAddressQuerySchema = z.object({
    addressId: z.string(),
  })

  const { addressId } = deleteUserAddressQuerySchema.parse(request.query)

  try {
    const getUserAddressUseCase = makeDeleteUserAddressUseCase()

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
