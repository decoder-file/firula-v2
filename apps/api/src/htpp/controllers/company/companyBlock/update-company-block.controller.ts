import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { CompanyBlockNotFound } from '@/use-cases/errors/companyBlock/company-block-not-found'
import { TypeBlockNotFound } from '@/use-cases/errors/typeBlock/type-block-not-found'
import { makeUpdateCompanyBlockUseCase } from '@/use-cases/factories/CompanyBlock/make-update-company-block-use-case'

export async function updateCompanyBlock(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const createCompanyBlockBodySchema = z.object({
    name: z.string().optional(),
    valueForHour: z.string().optional(),
    imageUrl: z.string().optional(),
    typeBlockId: z.string().optional(),
    isActive: z.boolean().optional(),
  })

  const createCompanyBlockQuerySchema = z.object({
    blockId: z.string(),
  })

  const { blockId } = createCompanyBlockQuerySchema.parse(request.query)

  const { name, valueForHour, imageUrl, typeBlockId, isActive } =
    createCompanyBlockBodySchema.parse(request.body)

  try {
    const updateCompanyBlockUseCase = makeUpdateCompanyBlockUseCase()

    const { companyBlock } = await updateCompanyBlockUseCase.execute({
      name,
      valueForHour,
      imageUrl,
      typeBlockId,
      blockId,
      isActive,
    })

    return reply.status(201).send({ blockId: companyBlock.id })
  } catch (err) {
    if (err instanceof CompanyBlockNotFound) {
      return reply.status(409).send({ message: err.message })
    }

    if (err instanceof TypeBlockNotFound) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }
}
