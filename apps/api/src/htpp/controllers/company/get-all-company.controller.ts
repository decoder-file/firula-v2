import { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

import { UserNotFound } from '@/use-cases/errors/users/user-not-found'
import { makeGetAllCompanyUseCase } from '@/use-cases/factories/company/make-get-all-company-use-case'

export async function getAllCompany(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const getAllCompanyQuerySchema = z.object({
      unblockedCompanies: z.string().optional(),
      activeCompanies: z.string().optional(),
      page: z.string(),
      nameQuery: z.string().optional(),
    })

    const { unblockedCompanies, activeCompanies, page, nameQuery } =
      getAllCompanyQuerySchema.parse(request.query)

    const getCompanyUseCase = makeGetAllCompanyUseCase()

    const { company } = await getCompanyUseCase.execute({
      page: parseInt(page, 10),
      nameQuery,
      unblockedCompanies,
      activeCompanies,
    })

    return reply.status(201).send({ company })
  } catch (err) {
    if (err instanceof UserNotFound) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }
}
