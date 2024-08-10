import { describe, expect, it } from 'vitest'

import { InMemoryCompanyBlockRepository } from '@/repositories/in-memory/in-memory-company-block-repository'
import { InMemoryCompanyRepository } from '@/repositories/in-memory/in-memory-company-repository'
import { InMemoryTypeBlockRepository } from '@/repositories/in-memory/in-memory-type-block-repository'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { CompanyBlockNotFound } from '@/use-cases/errors/companyBlock/company-block-not-found'
import { CreateUserUseCase } from '@/use-cases/users/create-user'

import { CreateCompanyUseCase } from '../create-company'
import { CreateTypeBlockUseCase } from '../TypeBlock/create-type-block'
import { CreateCompanyBlockUseCase } from './create-company-block'
import { DeleteCompanyBlockUseCase } from './delete-company-block'

describe('Delete Company Block Use Case', () => {
  it('should to delete company block', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const typeBlockRepository = new InMemoryTypeBlockRepository()
    const companyRepository = new InMemoryCompanyRepository()
    const companyBlockRepository = new InMemoryCompanyBlockRepository()

    const registerUseCase = new CreateUserUseCase(usersRepository)
    const createTypeBlockUseCase = new CreateTypeBlockUseCase(
      typeBlockRepository,
    )
    const createCompanyUseCase = new CreateCompanyUseCase(
      companyRepository,
      usersRepository,
    )
    const createCompanyBlockUseCase = new CreateCompanyBlockUseCase(
      companyRepository,
      typeBlockRepository,
      companyBlockRepository,
    )
    const deleteCompanyBlockUseCase = new DeleteCompanyBlockUseCase(
      companyRepository,
      typeBlockRepository,
      companyBlockRepository,
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

    const { typeBlock } = await createTypeBlockUseCase.execute({
      name: 'Type Block Test',
    })

    const { companyBlock } = await createCompanyBlockUseCase.execute({
      companyId: company.id,
      imageUrl: 'https://example.com/image.jpg',
      name: 'Company Block Test',
      typeBlockId: typeBlock.id,
      valueForHour: '10',
    })

    const response = await deleteCompanyBlockUseCase.execute({
      blockId: companyBlock.id,
    })

    expect(response.success).toEqual(expect.any(Boolean))
  })

  it('It should not be possible to delete a block that does not exist', async () => {
    const typeBlockRepository = new InMemoryTypeBlockRepository()
    const companyRepository = new InMemoryCompanyRepository()
    const companyBlockRepository = new InMemoryCompanyBlockRepository()

    const deleteCompanyBlockUseCase = new DeleteCompanyBlockUseCase(
      companyRepository,
      typeBlockRepository,
      companyBlockRepository,
    )

    expect(() =>
      deleteCompanyBlockUseCase.execute({
        blockId: 'invalid-id',
      }),
    ).rejects.toBeInstanceOf(CompanyBlockNotFound)
  })
})
