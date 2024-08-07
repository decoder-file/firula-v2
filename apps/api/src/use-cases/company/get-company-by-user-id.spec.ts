import { describe, expect, it } from 'vitest'

import { InMemoryCompanyRepository } from '@/repositories/in-memory/in-memory-company-repository'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'

import { UserNotFound } from '../errors/users/user-not-found'
import { CreateUserUseCase } from '../users/create-user'
import { CreateCompanyUseCase } from './create-company'
import { GetCompanyByUserIdUseCase } from './get-company-by-user-id'

describe('Get Company By User Id Use Case', () => {
  it('it must be possible to list all companies that belong to a userId', async () => {
    const companyRepository = new InMemoryCompanyRepository()
    const usersRepository = new InMemoryUsersRepository()

    const getCompanyByUserIdUseCase = new GetCompanyByUserIdUseCase(
      companyRepository,
      usersRepository,
    )
    const createCompanyUseCase = new CreateCompanyUseCase(
      companyRepository,
      usersRepository,
    )
    const registerUseCase = new CreateUserUseCase(usersRepository)

    const { user } = await registerUseCase.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      cpf: '14841575677',
      passwordHash: '123456',
    })

    await createCompanyUseCase.execute({
      cpfCnpj: '14841575677',
      imageUrl: 'https://example.com/image.jpg',
      mobilePhone: '123456789',
      name: 'Company Test',
      typeDocument: 'cpf',
      userId: user.id,
    })

    await createCompanyUseCase.execute({
      cpfCnpj: '14841575677',
      imageUrl: 'https://example.com/image.jpg',
      mobilePhone: '123456789',
      name: 'Company Test',
      typeDocument: 'cpf',
      userId: user.id,
    })

    const companies = await getCompanyByUserIdUseCase.execute({
      userId: user.id,
    })

    expect(companies.company).toEqual(expect.any(Array))
  })

  it('It should not be possible to search for the companies of a user that does not exist', async () => {
    const companyRepository = new InMemoryCompanyRepository()
    const usersRepository = new InMemoryUsersRepository()

    const getCompanyByUserIdUseCase = new GetCompanyByUserIdUseCase(
      companyRepository,
      usersRepository,
    )
    expect(() =>
      getCompanyByUserIdUseCase.execute({
        userId: 'invalid-user-id',
      }),
    ).rejects.toBeInstanceOf(UserNotFound)
  })
})
