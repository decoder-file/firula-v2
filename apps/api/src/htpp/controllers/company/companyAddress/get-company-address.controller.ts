import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { CompanyNotFound } from '@/use-cases/errors/company/company-not-found'
import { makeGetCompanyAddressUseCase } from '@/use-cases/factories/CompanyAddress/make-get-company-address-use-case'

export async function getCompanyAddress(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getUserAddressQuerySchema = z.object({
    addressId: z.string(),
  })

  const { addressId } = getUserAddressQuerySchema.parse(request.query)

  try {
    const getCompanyAddressUseCase = makeGetCompanyAddressUseCase()

    const response = await getCompanyAddressUseCase.execute({
      addressId,
    })

    return reply.status(201).send({ address: response })
  } catch (err) {
    if (err instanceof CompanyNotFound) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }
}
