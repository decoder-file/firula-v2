import { describe, expect, it } from 'vitest'

import { InMemoryCompanyRepository } from '@/repositories/in-memory/in-memory-company-repository'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserNotFound } from '@/use-cases/errors/users/user-not-found'

import { UserInvalidCNPJError } from '../errors/company/user-invalid-cnpj-error'
import { UserInvalidCpfError } from '../errors/users/user-invalid-cpf-error'
import { CreateUserUseCase } from '../users/create-user'
import { CreateCompanyUseCase } from './create-company'

describe('Create Company Use Case', () => {
  it('should to register user profile', async () => {
    const companyRepository = new InMemoryCompanyRepository()
    const usersRepository = new InMemoryUsersRepository()

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

    const { company } = await createCompanyUseCase.execute({
      cpfCnpj: '14841575677',
      imageUrl: 'https://example.com/image.jpg',
      mobilePhone: '123456789',
      name: 'Company Test',
      typeDocument: 'cpf',
      userId: user.id,
    })

    expect(company.id).toEqual(expect.any(String))
  })

  it('It should not be possible to register a profile for a user that does not exist', async () => {
    const companyRepository = new InMemoryCompanyRepository()
    const usersRepository = new InMemoryUsersRepository()

    const createCompanyUseCase = new CreateCompanyUseCase(
      companyRepository,
      usersRepository,
    )
    const registerUseCase = new CreateUserUseCase(usersRepository)

    await registerUseCase.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      cpf: '14841575677',
      passwordHash: '123456',
    })

    expect(() =>
      createCompanyUseCase.execute({
        cpfCnpj: '78376610000181',
        imageUrl: 'https://example.com/image.jpg',
        mobilePhone: '123456789',
        name: 'Company Test',
        typeDocument: 'cnpj',
        userId: 'invalid-user-id',
      }),
    ).rejects.toBeInstanceOf(UserNotFound)
  })

  it('It should not be possible to register an invalid CPF', async () => {
    const companyRepository = new InMemoryCompanyRepository()
    const usersRepository = new InMemoryUsersRepository()

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

    expect(() =>
      createCompanyUseCase.execute({
        cpfCnpj: '4312412412',
        imageUrl: 'https://example.com/image.jpg',
        mobilePhone: '123456789',
        name: 'Company Test',
        typeDocument: 'cpf',
        userId: user.id,
      }),
    ).rejects.toBeInstanceOf(UserInvalidCpfError)
  })

  it('It should not be possible to register an invalid CNPJ', async () => {
    const companyRepository = new InMemoryCompanyRepository()
    const usersRepository = new InMemoryUsersRepository()

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

    expect(() =>
      createCompanyUseCase.execute({
        cpfCnpj: '41234123412',
        imageUrl: 'https://example.com/image.jpg',
        mobilePhone: '123456789',
        name: 'Company Test',
        typeDocument: 'cnpj',
        userId: user.id,
      }),
    ).rejects.toBeInstanceOf(UserInvalidCNPJError)
  })
})
