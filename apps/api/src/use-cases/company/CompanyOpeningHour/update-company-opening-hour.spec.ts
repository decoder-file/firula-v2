import { describe, expect, it } from 'vitest'

import { InMemoryCompanyOpeningHoursRepository } from '@/repositories/in-memory/in-memory-company-opening-hours-repository'
import { InMemoryCompanyRepository } from '@/repositories/in-memory/in-memory-company-repository'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { CompanyOpeningHourNotFound } from '@/use-cases/errors/CompanyOpeningHour/company-opening-hour-not-found'
import { CreateUserUseCase } from '@/use-cases/users/create-user'

import { CreateCompanyUseCase } from '../create-company'
import { CreateCompanyOpeningHourUseCase } from './create-company-opening-hour'
import { UpdateCompanyOpeningHourUseCase } from './update-company-opening-hour'

describe('Update Company Opening Hour Use Case', () => {
  it('should to update opening hour', async () => {
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

    const updateCompanyOpeningHourUseCase = new UpdateCompanyOpeningHourUseCase(
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

    const { openingHour: updatedOpeningHour } =
      await updateCompanyOpeningHourUseCase.execute({
        openAt: '09:00',
        closeAt: '19:00',
        openingHourId: openingHour.id,
      })

    expect(updatedOpeningHour.id).toEqual(expect.any(String))
  })

  it('It should not be possible to update for opening hours that do not exist', async () => {
    const companyOpeningHoursRepository =
      new InMemoryCompanyOpeningHoursRepository()

    const updateCompanyOpeningHourUseCase = new UpdateCompanyOpeningHourUseCase(
      companyOpeningHoursRepository,
    )

    expect(() =>
      updateCompanyOpeningHourUseCase.execute({
        openAt: '09:00',
        closeAt: '19:00',
        openingHourId: 'invalid-id',
      }),
    ).rejects.toBeInstanceOf(CompanyOpeningHourNotFound)
  })
})
