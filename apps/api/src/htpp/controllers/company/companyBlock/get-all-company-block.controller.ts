import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { CompanyBlockNotFound } from '@/use-cases/errors/companyBlock/company-block-not-found'
import { makeGetAllCompanyBlockUseCase } from '@/use-cases/factories/CompanyBlock/make-get-all-company-block-use-case'

export async function getAllCompanyBlock(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getAllCompanyBlockQuerySchema = z.object({
    activeBlocks: z.string().optional(),
    page: z.string(),
    nameQuery: z.string().optional(),
  })

  const { page, nameQuery, activeBlocks } = getAllCompanyBlockQuerySchema.parse(
    request.query,
  )

  try {
    const getAllCompanyBlockUseCase = makeGetAllCompanyBlockUseCase()

    const { blocks } = await getAllCompanyBlockUseCase.execute({
      page: parseInt(page, 10),
      nameQuery,
      activeBlocks,
    })

    return reply.status(201).send({ blocks })
  } catch (err) {
    if (err instanceof CompanyBlockNotFound) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }
}
