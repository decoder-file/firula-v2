import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { UserProfileNotFound } from '@/use-cases/errors/userProfile/user-profie-not-found'
import { makeGetUserProfileUseCase } from '@/use-cases/factories/userProfile/make-get-user-profile-use-case'

export async function getUserProfile(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const userProfileIdQuerySchema = z.object({
    userProfileId: z.string(),
  })

  const { userProfileId } = userProfileIdQuerySchema.parse(request.query)

  try {
    const getUserProfileUseCase = makeGetUserProfileUseCase()

    const response = await getUserProfileUseCase.execute({
      userProfileId,
    })

    return reply.status(201).send({ userProfile: response.userProfile })
  } catch (err) {
    if (err instanceof UserProfileNotFound) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }
}
