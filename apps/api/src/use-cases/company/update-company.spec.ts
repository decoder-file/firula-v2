import { describe, expect, it } from 'vitest'

import { InMemoryCompanyRepository } from '@/repositories/in-memory/in-memory-company-repository'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'

import { CompanyNotFound } from '../errors/company/company-not-found'
import { UserInvalidCNPJError } from '../errors/company/user-invalid-cnpj-error'
import { UserInvalidCpfError } from '../errors/users/user-invalid-cpf-error'
import { CreateUserUseCase } from '../users/create-user'
import { CreateCompanyUseCase } from './create-company'
import { UpdateCompanyUseCase } from './update-company'

describe('Update Company Use Case', () => {
  it('should to update user profile', async () => {
    const companyRepository = new InMemoryCompanyRepository()
    const usersRepository = new InMemoryUsersRepository()

    const updateCompanyUseCase = new UpdateCompanyUseCase(companyRepository)
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

    const updatedCompany = await updateCompanyUseCase.execute({
      companyId: company.id,
      name: 'Company Test Updated',
    })

    expect(updatedCompany.company.id).toEqual(expect.any(String))
  })

  it('It should not be possible to update a company that does not exist', async () => {
    const companyRepository = new InMemoryCompanyRepository()

    const updateCompanyUseCase = new UpdateCompanyUseCase(companyRepository)

    expect(() =>
      updateCompanyUseCase.execute({
        companyId: 'invalid-id',
        name: 'Company Test Updated',
      }),
    ).rejects.toBeInstanceOf(CompanyNotFound)
  })

  it('It should not be possible to update an invalid CPF', async () => {
    const companyRepository = new InMemoryCompanyRepository()
    const usersRepository = new InMemoryUsersRepository()

    const createCompanyUseCase = new CreateCompanyUseCase(
      companyRepository,
      usersRepository,
    )
    const registerUseCase = new CreateUserUseCase(usersRepository)
    const updateCompanyUseCase = new UpdateCompanyUseCase(companyRepository)

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

    expect(() =>
      updateCompanyUseCase.execute({
        companyId: company.id,
        cpfCnpj: '343241234',
        typeDocument: 'cpf',
      }),
    ).rejects.toBeInstanceOf(UserInvalidCpfError)
  })

  it('It should not be possible to update an invalid CNPJ', async () => {
    const companyRepository = new InMemoryCompanyRepository()
    const usersRepository = new InMemoryUsersRepository()

    const createCompanyUseCase = new CreateCompanyUseCase(
      companyRepository,
      usersRepository,
    )
    const registerUseCase = new CreateUserUseCase(usersRepository)
    const updateCompanyUseCase = new UpdateCompanyUseCase(companyRepository)

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

    expect(() =>
      updateCompanyUseCase.execute({
        companyId: company.id,
        cpfCnpj: '324142134',
        typeDocument: 'cnpj',
      }),
    ).rejects.toBeInstanceOf(UserInvalidCNPJError)
  })
})
