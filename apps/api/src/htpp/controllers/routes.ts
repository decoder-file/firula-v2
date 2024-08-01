import { FastifyInstance } from 'fastify'

import { createUser } from './users/create-user.controller'
import { deleteUser } from './users/delete-user.controller'
import { getUserByIdUser } from './users/get-user-by-id.controller'
import { updateUser } from './users/update-user.controller'

export async function appRoutes(app: FastifyInstance) {
  // user
  app.post('/users', createUser)
  app.patch('/users', updateUser)
  app.delete('/users', deleteUser)
  app.get('/users', getUserByIdUser)
}
