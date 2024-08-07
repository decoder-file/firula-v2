import { describe, expect, it } from 'vitest'

import { InMemoryCompanyRepository } from '@/repositories/in-memory/in-memory-company-repository'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'

import { CompanyNotFound } from '../errors/company/company-not-found'
import { CreateUserUseCase } from '../users/create-user'
import { CreateCompanyUseCase } from './create-company'
import { GetCompanyByIdUseCase } from './get-company-by-id'

describe('Get Company By Id Use Case', () => {
  it('It must be possible to search for a company by ID', async () => {
    const companyRepository = new InMemoryCompanyRepository()
    const usersRepository = new InMemoryUsersRepository()

    const getCompanyByIdUseCase = new GetCompanyByIdUseCase(companyRepository)
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

    const updatedCompany = await getCompanyByIdUseCase.execute({
      companyId: company.id,
    })

    expect(updatedCompany.company.id).toEqual(expect.any(String))
  })

  it('It should not be possible to update a company that does not exist', async () => {
    const companyRepository = new InMemoryCompanyRepository()

    const getCompanyByIdUseCase = new GetCompanyByIdUseCase(companyRepository)

    expect(() =>
      getCompanyByIdUseCase.execute({
        companyId: 'invalid-id',
      }),
    ).rejects.toBeInstanceOf(CompanyNotFound)
  })
})
