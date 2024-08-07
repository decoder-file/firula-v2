import { describe, expect, it } from 'vitest'

import { InMemoryCompanyRepository } from '@/repositories/in-memory/in-memory-company-repository'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'

import { CreateUserUseCase } from '../users/create-user'
import { CreateCompanyUseCase } from './create-company'
import { GetAllCompanyUseCase } from './get-all-company'

describe('Get All Company Use Case', () => {
  it('it must be possible to list all companies', async () => {
    const companyRepository = new InMemoryCompanyRepository()
    const usersRepository = new InMemoryUsersRepository()

    const getCompanyByIdUseCase = new GetAllCompanyUseCase(companyRepository)
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

    const allCompany = await getCompanyByIdUseCase.execute({})

    expect(allCompany.company).toEqual(expect.any(Array))
  })
})
