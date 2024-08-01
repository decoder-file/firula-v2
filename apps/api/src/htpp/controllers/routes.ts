import { FastifyInstance } from 'fastify'

import { createUser } from './users/create-user.controller'
import { updateUser } from './users/update-user.controller'

export async function appRoutes(app: FastifyInstance) {
  // user
  app.post('/users', createUser)
  app.patch('/users', updateUser)
}
