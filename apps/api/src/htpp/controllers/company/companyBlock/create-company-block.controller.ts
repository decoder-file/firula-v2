import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { CompanyNotFound } from '@/use-cases/errors/company/company-not-found'
import { TypeBlockNotFound } from '@/use-cases/errors/typeBlock/type-block-not-found'
import { makeCreateCompanyBlockUseCase } from '@/use-cases/factories/CompanyBlock/make-create-company-block-use-case'

export async function createCompanyBlock(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const createCompanyBlockBodySchema = z.object({
    name: z.string(),
    valueForHour: z.string(),
    imageUrl: z.string().optional(),
    typeBlockId: z.string(),
    companyId: z.string(),
  })

  const { name, valueForHour, imageUrl, typeBlockId, companyId } =
    createCompanyBlockBodySchema.parse(request.body)

  try {
    const createCompanyBlockUseCase = makeCreateCompanyBlockUseCase()

    const { companyBlock } = await createCompanyBlockUseCase.execute({
      name,
      valueForHour,
      imageUrl,
      typeBlockId,
      companyId,
    })

    return reply.status(201).send({ blockId: companyBlock.id })
  } catch (err) {
    if (err instanceof CompanyNotFound) {
      return reply.status(409).send({ message: err.message })
    }

    if (err instanceof TypeBlockNotFound) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }
}
