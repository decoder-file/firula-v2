import { describe, expect, it } from 'vitest'

import { InMemoryCompanyOpeningHoursRepository } from '@/repositories/in-memory/in-memory-company-opening-hours-repository'
import { InMemoryCompanyRepository } from '@/repositories/in-memory/in-memory-company-repository'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { CompanyNotFound } from '@/use-cases/errors/company/company-not-found'
import { CompanyOpeningHourAlreadyExists } from '@/use-cases/errors/CompanyOpeningHour/company-opening-hour-already-exists'
import { CreateUserUseCase } from '@/use-cases/users/create-user'

import { CreateCompanyUseCase } from '../create-company'
import { CreateCompanyOpeningHourUseCase } from './create-company-opening-hour'

describe('Create Company Opening Hour Use Case', () => {
  it('should to create opening hour', async () => {
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

    expect(openingHour.id).toEqual(expect.any(String))
  })

  it('It should not be possible to create opening hours for a company that does not exist', async () => {
    const companyRepository = new InMemoryCompanyRepository()
    const companyOpeningHoursRepository =
      new InMemoryCompanyOpeningHoursRepository()

    const createOpeningHourUseCase = new CreateCompanyOpeningHourUseCase(
      companyRepository,
      companyOpeningHoursRepository,
    )

    expect(() =>
      createOpeningHourUseCase.execute({
        companyId: 'invalid-id',
        dayOfWeek: 'monday',
        openAt: '08:00',
        closeAt: '18:00',
      }),
    ).rejects.toBeInstanceOf(CompanyNotFound)
  })

  it('It should not be possible to create opening hours for a day that already exists', async () => {
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

    await createOpeningHourUseCase.execute({
      companyId: company.id,
      dayOfWeek: 'Monday',
      openAt: '08:00',
      closeAt: '18:00',
    })

    expect(() =>
      createOpeningHourUseCase.execute({
        companyId: company.id,
        dayOfWeek: 'monday',
        openAt: '08:00',
        closeAt: '18:00',
      }),
    ).rejects.toBeInstanceOf(CompanyOpeningHourAlreadyExists)
  })
})
