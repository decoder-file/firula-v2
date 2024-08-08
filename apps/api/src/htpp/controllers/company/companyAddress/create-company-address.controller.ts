import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { CompanyNotFound } from '@/use-cases/errors/company/company-not-found'
import { makeCreateCompanyAddressUseCase } from '@/use-cases/factories/CompanyAddress/make-create-company-address-use-case'

export async function createCompanyAddress(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const createCompanyAddressBodySchema = z.object({
    street: z.string(),
    number: z.string(),
    complement: z.string(),
    neighborhood: z.string(),
    city: z.string(),
    state: z.string(),
    zipCode: z.string(),
  })

  const createCompanyAddressQuerySchema = z.object({
    companyId: z.string(),
  })

  const { street, number, complement, neighborhood, city, state, zipCode } =
    createCompanyAddressBodySchema.parse(request.body)

  const { companyId } = createCompanyAddressQuerySchema.parse(request.query)

  try {
    const createCompanyAddressUseCase = makeCreateCompanyAddressUseCase()

    const response = await createCompanyAddressUseCase.execute({
      street,
      number,
      complement,
      neighborhood,
      city,
      state,
      zipCode,
      isMain: true,
      companyId,
    })

    return reply.status(201).send({ addressId: response.address.id })
  } catch (err) {
    if (err instanceof CompanyNotFound) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }
}
