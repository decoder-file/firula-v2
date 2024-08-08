import { describe, expect, it } from 'vitest'

import { InMemoryCompanyAddressRepository } from '@/repositories/in-memory/in-memory-company-address-repository'
import { InMemoryCompanyRepository } from '@/repositories/in-memory/in-memory-company-repository'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAddressNotFound } from '@/use-cases/errors/userAddress/user-address-not-found'
import { CreateUserUseCase } from '@/use-cases/users/create-user'

import { CreateCompanyUseCase } from '../create-company'
import { CreateCompanyAddressUseCase } from './create-company-address'
import { UpdateCompanyAddressUseCase } from './update-company-address'

describe('Update Company Address Case', () => {
  it('should to update user address', async () => {
    const companyAddressRepository = new InMemoryCompanyAddressRepository()
    const companyRepository = new InMemoryCompanyRepository()
    const usersRepository = new InMemoryUsersRepository()

    const createCompanyAddressUseCase = new CreateCompanyAddressUseCase(
      companyAddressRepository,
      companyRepository,
    )

    const registerUseCase = new CreateUserUseCase(usersRepository)
    const createCompanyUseCase = new CreateCompanyUseCase(
      companyRepository,
      usersRepository,
    )
    const updateCompanyAddressUseCase = new UpdateCompanyAddressUseCase(
      companyAddressRepository,
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

    const { address } = await createCompanyAddressUseCase.execute({
      street: 'Rua Teste',
      number: '123',
      complement: 'Complemento',
      neighborhood: 'Bairro Teste',
      city: 'Cidade Teste',
      state: 'Estado Teste',
      zipCode: '12345678',
      companyId: company.id,
    })

    const { addressId } = await updateCompanyAddressUseCase.execute({
      street: 'Rua Teste 2',
      number: '123',
      complement: 'Complemento',
      neighborhood: 'Bairro Teste',
      city: 'Cidade Teste',
      addressId: address.id,
    })

    expect(addressId).toEqual(address.id)
  })

  it('It should not be possible to update a address that does not exist', async () => {
    const companyAddressRepository = new InMemoryCompanyAddressRepository()

    const updateCompanyAddressUseCase = new UpdateCompanyAddressUseCase(
      companyAddressRepository,
    )
    expect(() =>
      updateCompanyAddressUseCase.execute({
        street: 'Rua Teste',
        number: '123',
        complement: 'Complemento',
        neighborhood: 'Bairro Teste',
        city: 'Cidade Teste',
        addressId: 'invalid-id',
      }),
    ).rejects.toBeInstanceOf(UserAddressNotFound)
  })
})
