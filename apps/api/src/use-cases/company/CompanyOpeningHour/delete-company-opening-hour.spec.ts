import { describe, expect, it } from 'vitest'

import { InMemoryCompanyOpeningHoursRepository } from '@/repositories/in-memory/in-memory-company-opening-hours-repository'
import { InMemoryCompanyRepository } from '@/repositories/in-memory/in-memory-company-repository'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { CompanyOpeningHourNotFound } from '@/use-cases/errors/CompanyOpeningHour/company-opening-hour-not-found'
import { CreateUserUseCase } from '@/use-cases/users/create-user'

import { CreateCompanyUseCase } from '../create-company'
import { CreateCompanyOpeningHourUseCase } from './create-company-opening-hour'
import { DeleteCompanyOpeningHourUseCase } from './delete-company-opening-hour'

describe('Delete Company Opening Use Case', () => {
  it('should to delete opening hour', async () => {
    const companyRepository = new InMemoryCompanyRepository()
    const usersRepository = new InMemoryUsersRepository()
    const companyOpeningHoursRepository =
      new InMemoryCompanyOpeningHoursRepository()

    const createCompanyUseCase = new CreateCompanyUseCase(
      companyRepository,
      usersRepository,
    )
    const registerUseCase = new CreateUserUseCase(usersRepository)
    const createOpeningHourUseCase = new CreateCompanyOpeningHourUseCase(
      companyRepository,
      companyOpeningHoursRepository,
    )
    const deleteCompanyOpeningHourUseCase = new DeleteCompanyOpeningHourUseCase(
      companyOpeningHoursRepository,
    )

    const { user } = await registerUseCase.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      cpf: '14841575677',
      passwordHash: '123456',
    })

    const { company } = await createCompanyUseCase.execute({
      cpfCnpj: '14841575677',
      imageUrl: 'https://example.com/image.jpg',
      mobilePhone: '123456789',
      name: 'Company Test',
      typeDocument: 'cpf',
      userId: user.id,
    })

    const { openingHour } = await createOpeningHourUseCase.execute({
      companyId: company.id,
      dayOfWeek: 'monday',
      openAt: '08:00',
      closeAt: '18:00',
    })

    const { success } = await deleteCompanyOpeningHourUseCase.execute({
      openingHourId: openingHour.id,
    })

    expect(success).toBe(true)
  })

  it('It should not be possible to delete for opening hours that do not exist', async () => {
    const companyOpeningHoursRepository =
      new InMemoryCompanyOpeningHoursRepository()

    const deleteCompanyOpeningHourUseCase = new DeleteCompanyOpeningHourUseCase(
      companyOpeningHoursRepository,
    )

    expect(() =>
      deleteCompanyOpeningHourUseCase.execute({
        openingHourId: 'invalid-id',
      }),
    ).rejects.toBeInstanceOf(CompanyOpeningHourNotFound)
  })
})
