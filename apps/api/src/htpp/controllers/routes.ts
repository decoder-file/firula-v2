import { FastifyInstance } from 'fastify'

import { createCompany } from './company/create-company.controller'
import { getAllCompany } from './company/get-all-company.controller'
import { getCompanyById } from './company/get-company-by-id.controller'
import { getCompanyByUserId } from './company/get-company-by-user-id.controller'
import { updateCompany } from './company/update-company.controller'
import { changeUserLockByIdUser } from './users/change-user-lock.controller'
import { createUser } from './users/create-user.controller'
import { deleteUser } from './users/delete-user.controller'
import { getAllUsers } from './users/get-all-users.controller'
import { getUserByIdUser } from './users/get-user-by-id.controller'
import { updateUser } from './users/update-user.controller'
import { createUserAddress } from './users/userAddress/create-user-address.controller'
import { deleteUserAddress } from './users/userAddress/delete-user-address.controller'
import { getUserAddress } from './users/userAddress/get-user-address.controller'
import { updateUserAddress } from './users/userAddress/update-user-address.controller'
import { createUserProfile } from './users/userProfile/create-user-profile.controller'
import { getUserProfile } from './users/userProfile/get-user-profile.controller'
import { updateUserProfile } from './users/userProfile/update-user-profile.controller'

export async function appRoutes(app: FastifyInstance) {
  // user
  app.post('/users', createUser)
  app.patch('/users', updateUser)
  app.delete('/users', deleteUser)
  app.get('/users', getUserByIdUser)
  app.get('/users/all', getAllUsers)
  app.post('/users/change-lock', changeUserLockByIdUser)

  // userProfile
  app.post('/user-profile', createUserProfile)
  app.patch('/user-profile', updateUserProfile)
  app.get('/user-profile', getUserProfile)

  // userAddress
  app.post('/user-address', createUserAddress)
  app.patch('/user-address', updateUserAddress)
  app.get('/user-address', getUserAddress)
  app.delete('/user-address', deleteUserAddress)

  // company
  app.post('/company', createCompany)
  app.patch('/company', updateCompany)
  app.get('/company/companyId', getCompanyById)
  app.get('/company/userId', getCompanyByUserId)
  app.get('/company', getAllCompany)
}
