import { FastifyInstance } from 'fastify'

import { changeUserLockByIdUser } from './users/change-user-lock.controller'
import { createUser } from './users/create-user.controller'
import { deleteUser } from './users/delete-user.controller'
import { getAllUsers } from './users/get-all-users.controller'
import { getUserByIdUser } from './users/get-user-by-id.controller'
import { updateUser } from './users/update-user.controller'

export async function appRoutes(app: FastifyInstance) {
  // user
  app.post('/users', createUser)
  app.patch('/users', updateUser)
  app.delete('/users', deleteUser)
  app.get('/users', getUserByIdUser)
  app.get('/users/all', getAllUsers)
  app.post('/users/change-lock', changeUserLockByIdUser)
}
