import { FastifyInstance } from 'fastify'

import { createUser } from './users/create-user.controller'

export async function appRoutes(app: FastifyInstance) {
  // user
  app.post('/users', createUser)
}
