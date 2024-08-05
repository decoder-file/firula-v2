import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { UserProfileMobilePhoneExistsError } from '@/use-cases/errors/userProfile/user-profile-mobile-phone-exists-error'
import { UserNotFound } from '@/use-cases/errors/users/user-not-found'
import { makeRegisterUserProfileUseCase } from '@/use-cases/factories/userProfile/make-create-user-profile-use-case'

export async function createUserProfile(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const registerBodySchema = z.object({
    mobilePhone: z.string(),
    dateOfBirth: z.preprocess((arg) => {
      if (typeof arg === 'string' || arg instanceof Date) {
        return new Date(arg)
      }
    }, z.date()),
    walletId: z.string().optional(),
    apiKey: z.string().optional(),
  })

  const registerQuerySchema = z.object({
    userId: z.string(),
  })

  const { userId } = registerQuerySchema.parse(request.query)

  const { mobilePhone, dateOfBirth, walletId, apiKey } =
    registerBodySchema.parse(request.body)

  try {
    const registerUserProfileUseCase = makeRegisterUserProfileUseCase()

    const response = await registerUserProfileUseCase.execute({
      userId,
      mobilePhone,
      dateOfBirth,
      walletId,
      apiKey,
    })

    return reply.status(201).send({ userId: response.userProfile.id })
  } catch (err) {
    if (err instanceof UserNotFound) {
      return reply.status(409).send({ message: err.message })
    }

    if (err instanceof UserProfileMobilePhoneExistsError) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }
}
