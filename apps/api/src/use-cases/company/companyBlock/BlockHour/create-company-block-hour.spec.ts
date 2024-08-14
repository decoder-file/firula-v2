import { describe, expect, it } from 'vitest'

import { InMemoryCompanyBlockHourRepository } from '@/repositories/in-memory/in-memory-company-block-hour-repository'
import { InMemoryCompanyBlockRepository } from '@/repositories/in-memory/in-memory-company-block-repository'
import { InMemoryCompanyRepository } from '@/repositories/in-memory/in-memory-company-repository'
import { InMemoryTypeBlockRepository } from '@/repositories/in-memory/in-memory-type-block-repository'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { CompanyBlockNotFound } from '@/use-cases/errors/companyBlock/company-block-not-found'
import { CreateUserUseCase } from '@/use-cases/users/create-user'

import { CreateCompanyUseCase } from '../../create-company'
import { CreateTypeBlockUseCase } from '../../TypeBlock/create-type-block'
import { CreateCompanyBlockUseCase } from '../create-company-block'
import { CreateCompanyBlockHourUseCase } from './create-company-block-hour'

describe('Create Company Block Hour Use Case', () => {
  it('should to create company block hour', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const typeBlockRepository = new InMemoryTypeBlockRepository()
    const companyRepository = new InMemoryCompanyRepository()
    const companyBlockRepository = new InMemoryCompanyBlockRepository()
    const companyBlockHourRepository = new InMemoryCompanyBlockHourRepository()

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
    const createCompanyBlockHourUseCase = new CreateCompanyBlockHourUseCase(
      companyBlockRepository,
      companyBlockHourRepository,
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

    const { blockHour } = await createCompanyBlockHourUseCase.execute({
      date: '2021-09-01',
      startTime: '08:00',
      endTime: '09:00',
      blockId: companyBlock.id,
    })

    expect(blockHour.date).toEqual(expect.any(String))
  })

  it('It should not be possible to create a timetable for a court that does not exist', async () => {
    const companyBlockRepository = new InMemoryCompanyBlockRepository()
    const companyBlockHourRepository = new InMemoryCompanyBlockHourRepository()
    const createCompanyBlockHourUseCase = new CreateCompanyBlockHourUseCase(
      companyBlockRepository,
      companyBlockHourRepository,
    )

    expect(() =>
      createCompanyBlockHourUseCase.execute({
        date: '2021-09-01',
        startTime: '08:00',
        endTime: '09:00',
        blockId: 'invalid-id',
      }),
    ).rejects.toBeInstanceOf(CompanyBlockNotFound)
  })
})
