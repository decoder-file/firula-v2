import { describe, expect, it } from 'vitest'

import { InMemoryCompanyBlockRepository } from '@/repositories/in-memory/in-memory-company-block-repository'
import { InMemoryCompanyRepository } from '@/repositories/in-memory/in-memory-company-repository'
import { InMemoryTypeBlockRepository } from '@/repositories/in-memory/in-memory-type-block-repository'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { CompanyBlockNotFound } from '@/use-cases/errors/companyBlock/company-block-not-found'
import { TypeBlockNotFound } from '@/use-cases/errors/typeBlock/type-block-not-found'
import { CreateUserUseCase } from '@/use-cases/users/create-user'

import { CreateCompanyUseCase } from '../create-company'
import { CreateTypeBlockUseCase } from '../TypeBlock/create-type-block'
import { CreateCompanyBlockUseCase } from './create-company-block'
import { UpdateCompanyBlockUseCase } from './update-company-block'

describe('Update Company Block Use Case', () => {
  it('should to update company block', async () => {
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

    const updateCompanyBlockUseCase = new UpdateCompanyBlockUseCase(
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

    const { companyBlock: companyBlockUpdate } =
      await updateCompanyBlockUseCase.execute({
        name: 'Company Block Test Updated',
        blockId: companyBlock.id,
      })

    expect(companyBlockUpdate.name).toBe('Company Block Test Updated')
  })

  it('It should not be possible to update a block that does not have a valid type block', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const typeBlockRepository = new InMemoryTypeBlockRepository()
    const companyRepository = new InMemoryCompanyRepository()
    const companyBlockRepository = new InMemoryCompanyBlockRepository()

    const registerUseCase = new CreateUserUseCase(usersRepository)
    const createCompanyUseCase = new CreateCompanyUseCase(
      companyRepository,
      usersRepository,
    )
    const createCompanyBlockUseCase = new CreateCompanyBlockUseCase(
      companyRepository,
      typeBlockRepository,
      companyBlockRepository,
    )
    const updateCompanyBlockUseCase = new UpdateCompanyBlockUseCase(
      typeBlockRepository,
      companyBlockRepository,
    )
    const createTypeBlockUseCase = new CreateTypeBlockUseCase(
      typeBlockRepository,
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

    expect(() =>
      updateCompanyBlockUseCase.execute({
        name: 'Company Block Test Updated',
        blockId: companyBlock.id,
        typeBlockId: 'invalid-type-block-id',
      }),
    ).rejects.toBeInstanceOf(TypeBlockNotFound)
  })

  it('It should not be possible to update a block that does not exist', async () => {
    const typeBlockRepository = new InMemoryTypeBlockRepository()
    const companyBlockRepository = new InMemoryCompanyBlockRepository()

    const updateCompanyBlockUseCase = new UpdateCompanyBlockUseCase(
      typeBlockRepository,
      companyBlockRepository,
    )

    expect(() =>
      updateCompanyBlockUseCase.execute({
        blockId: 'invalid-id',
        name: 'Company Block Test Updated',
      }),
    ).rejects.toBeInstanceOf(CompanyBlockNotFound)
  })
})
