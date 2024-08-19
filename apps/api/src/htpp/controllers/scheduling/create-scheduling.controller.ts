import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { CompanyNotFound } from '@/use-cases/errors/company/company-not-found'
import { CompanyBlockHourNotFound } from '@/use-cases/errors/companyBlock/BlockHour/company-block-hour-not-found'
import { CompanyBlockNotFound } from '@/use-cases/errors/companyBlock/company-block-not-found'
import { UserNotFound } from '@/use-cases/errors/users/user-not-found'
import { makeCreateSchedulingUseCase } from '@/use-cases/factories/Scheduling/make-create-scheduling-use-case'

export async function createScheduling(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const createSchedulingBodySchema = z.object({
    date: z.string(),
    status: z.string(),
    paymentStatus: z.string(),
    companyId: z.string(),
    companyBlockId: z.string(),
    userId: z.string(),
    startTime: z.string(),
    endTime: z.string(),
  })

  const {
    date,
    status,
    paymentStatus,
    companyId,
    companyBlockId,
    userId,
    startTime,
    endTime,
  } = createSchedulingBodySchema.parse(request.body)

  try {
    const createSchedulingUseCase = makeCreateSchedulingUseCase()

    const { scheduling } = await createSchedulingUseCase.execute({
      date,
      status,
      paymentStatus,
      companyId,
      companyBlockId,
      userId,
      startTime,
      endTime,
    })

    return reply.status(201).send({ scheduling })
  } catch (err) {
    if (err instanceof CompanyNotFound) {
      return reply.status(409).send({ message: err.message })
    }

    if (err instanceof CompanyBlockNotFound) {
      return reply.status(409).send({ message: err.message })
    }

    if (err instanceof UserNotFound) {
      return reply.status(409).send({ message: err.message })
    }

    if (err instanceof CompanyBlockHourNotFound) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }
}
