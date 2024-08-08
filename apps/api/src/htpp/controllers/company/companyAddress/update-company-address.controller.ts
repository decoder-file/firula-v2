import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { CompanyNotFound } from '@/use-cases/errors/company/company-not-found'
import { makeUpdateCompanyAddressUseCase } from '@/use-cases/factories/CompanyAddress/make-update-company-address-use-case'

export async function updateCompanyAddress(
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
    const updateUserAddressUseCase = makeUpdateCompanyAddressUseCase()

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
    if (err instanceof CompanyNotFound) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }
}
