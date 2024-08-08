import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { CompanyNotFound } from '@/use-cases/errors/company/company-not-found'
import { makeDeleteCompanyAddressUseCase } from '@/use-cases/factories/CompanyAddress/make-delete-company-address-use-case'

export async function deleteCompanyAddress(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const deleteCompanyAddressQuerySchema = z.object({
    addressId: z.string(),
  })

  const { addressId } = deleteCompanyAddressQuerySchema.parse(request.query)

  try {
    const deleteCompanyAddressUseCase = makeDeleteCompanyAddressUseCase()

    const response = await deleteCompanyAddressUseCase.execute({
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
