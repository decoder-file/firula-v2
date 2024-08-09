import { describe, expect, it } from 'vitest'

import { InMemoryTypeBlockRepository } from '@/repositories/in-memory/in-memory-type-block-repository'
import { TypeBlockNotFound } from '@/use-cases/errors/typeBlock/type-block-not-found'

import { CreateTypeBlockUseCase } from './create-type-block'
import { DeleteTypeBlockUseCase } from './delete-type-block'
import { GetTypeBlockByIdUseCase } from './get-type-block-by-id'

describe('Get Type Block By Id Use Case', () => {
  it('should to get type block by id', async () => {
    const typeBlockRepository = new InMemoryTypeBlockRepository()

    const createTypeBlockUseCase = new CreateTypeBlockUseCase(
      typeBlockRepository,
    )

    const getTypeBlockByIdUseCase = new GetTypeBlockByIdUseCase(
      typeBlockRepository,
    )

    const { typeBlock } = await createTypeBlockUseCase.execute({
      name: 'Grama sintética',
    })

    const { typeBlock: typeBlockData } = await getTypeBlockByIdUseCase.execute({
      typeBlockId: typeBlock.id,
    })

    expect(typeBlockData.id).toBe(typeBlock.id)
  })

  it('It should not be possible to get a type block that does not exist', async () => {
    const typeBlockRepository = new InMemoryTypeBlockRepository()

    const deleteTypeBlockUseCase = new DeleteTypeBlockUseCase(
      typeBlockRepository,
    )

    expect(() =>
      deleteTypeBlockUseCase.execute({
        typeBlockId: 'typeBlockId-not-exists',
      }),
    ).rejects.toBeInstanceOf(TypeBlockNotFound)
  })
})
