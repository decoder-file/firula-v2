import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { UserProfileNotFound } from '@/use-cases/errors/userProfile/user-profie-not-found'
import { UserProfileMobilePhoneExistsError } from '@/use-cases/errors/userProfile/user-profile-mobile-phone-exists-error'
import { makeUpdateUserProfileUseCase } from '@/use-cases/factories/userProfile/make-update-user-profile-use-case'

export async function updateUserProfile(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const userProfileIdBodySchema = z.object({
    mobilePhone: z.string().optional(),
    walletId: z.string().optional(),
    apiKey: z.string().optional(),
  })

  const userProfileIdQuerySchema = z.object({
    userProfileId: z.string(),
  })

  const { apiKey, mobilePhone, walletId } = userProfileIdBodySchema.parse(
    request.body,
  )

  const { userProfileId } = userProfileIdQuerySchema.parse(request.query)

  try {
    const updateUserProfileUseCase = makeUpdateUserProfileUseCase()

    const response = await updateUserProfileUseCase.execute({
      mobilePhone,
      walletId,
      apiKey,
      userProfileId,
    })

    return reply.status(201).send({ userProfileId: response.userProfile.id })
  } catch (err) {
    if (err instanceof UserProfileNotFound) {
      return reply.status(409).send({ message: err.message })
    }

    if (err instanceof UserProfileMobilePhoneExistsError) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }
}
