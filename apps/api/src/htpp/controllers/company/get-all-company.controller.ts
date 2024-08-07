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
      active: z.string().optional(),
    })

    const { active } = getAllCompanyQuerySchema.parse(request.query)

    const getCompanyUseCase = makeGetAllCompanyUseCase()

    const { company } = await getCompanyUseCase.execute({ active })

    return reply.status(201).send({ company })
  } catch (err) {
    if (err instanceof UserNotFound) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }
}
