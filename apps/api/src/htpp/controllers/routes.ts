import { FastifyInstance } from 'fastify'

import { createCompanyAddress } from './company/companyAddress/create-company-address.controller'
import { deleteCompanyAddress } from './company/companyAddress/delete-company-address.controller'
import { getCompanyAddress } from './company/companyAddress/get-company-address.controller'
import { updateCompanyAddress } from './company/companyAddress/update-company-address.controller'
import { createCompanyBlockHour } from './company/companyBlock/blockHour/create-company-block.controller'
import { deleteCompanyBlockHour } from './company/companyBlock/blockHour/delete-company-block-hour.controller'
import { getAllCompanyBlockHour } from './company/companyBlock/blockHour/get-all-company-block-hour.controller'
import { getByDateCompanyBlockHour } from './company/companyBlock/blockHour/get-by-date-company-block-hour.controller'
import { createCompanyBlock } from './company/companyBlock/create-company-block.controller'
import { deleteCompanyBlock } from './company/companyBlock/delete-company-block.controller'
import { getCompanyBlockById } from './company/companyBlock/get-company-block.controller'
import { getCompanyBlockByCompanyId } from './company/companyBlock/get-company-block-by-company-id.controller'
import { updateCompanyBlock } from './company/companyBlock/update-company-block.controller'
import { createCompanyOpeningHour } from './company/CompanyOpeningHour/create-company-opening-hour.controller'
import { deleteCompanyOpeningHour } from './company/CompanyOpeningHour/delete-company-opening-hour.controller'
import { getCompanyOpeningHourById } from './company/CompanyOpeningHour/get-company-opening-hour-by-id.controller'
import { updateCompanyOpeningHour } from './company/CompanyOpeningHour/update-company-opening-hour.controller'
import { createCompany } from './company/create-company.controller'
import { getAllCompany } from './company/get-all-company.controller'
import { getCompanyById } from './company/get-company-by-id.controller'
import { getCompanyByUserId } from './company/get-company-by-user-id.controller'
import { createTypeBlock } from './company/typeBlock/create-type-block.controller'
import { deleteTypeBlock } from './company/typeBlock/delete-type-block.controller'
import { getAllTypeBlock } from './company/typeBlock/get-all-type-block.controller'
import { getTypeByIdBlock } from './company/typeBlock/get-type-block-by-id.controller'
import { updateTypeBlock } from './company/typeBlock/update-type-block.controller'
import { updateCompany } from './company/update-company.controller'
import { createScheduling } from './scheduling/create-scheduling.controller'
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

  // companyAddress
  app.post('/company-address', createCompanyAddress)
  app.delete('/company-address', deleteCompanyAddress)
  app.get('/company-address', getCompanyAddress)
  app.patch('/company-address', updateCompanyAddress)

  // typeBlock
  app.post('/type-block', createTypeBlock)
  app.patch('/type-block', updateTypeBlock)
  app.delete('/type-block', deleteTypeBlock)
  app.get('/type-block', getAllTypeBlock)
  app.get('/type-block/id', getTypeByIdBlock)

  // companyBlock
  app.post('/company-block', createCompanyBlock)
  app.patch('/company-block', updateCompanyBlock)
  app.get('/company-block', getCompanyBlockById)
  app.delete('/company-block', deleteCompanyBlock)
  app.get('/company-block/companyId', getCompanyBlockByCompanyId)

  // companyOpeningHour
  app.post('/company-opening-hour', createCompanyOpeningHour)
  app.patch('/company-opening-hour', updateCompanyOpeningHour)
  app.get('/company-opening-hour', getCompanyOpeningHourById)
  app.delete('/company-opening-hour', deleteCompanyOpeningHour)

  // companyBlockHour
  app.post('/company-block-hour', createCompanyBlockHour)
  app.get('/company-block-hour', getAllCompanyBlockHour)
  app.delete('/company-block-hour', deleteCompanyBlockHour)
  app.get('/company-block-hour/date', getByDateCompanyBlockHour)

  // scheduling
  app.post('/scheduling', createScheduling)
}
