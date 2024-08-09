import { describe, expect, it } from 'vitest'

import { InMemoryTypeBlockRepository } from '@/repositories/in-memory/in-memory-type-block-repository'
import { TypeBlockNotFound } from '@/use-cases/errors/typeBlock/type-block-not-found'

import { CreateTypeBlockUseCase } from './create-type-block'
import { DeleteTypeBlockUseCase } from './delete-type-block'

describe('Delete Type Block Use Case', () => {
  it('should to delete type block', async () => {
    const typeBlockRepository = new InMemoryTypeBlockRepository()

    const createTypeBlockUseCase = new CreateTypeBlockUseCase(
      typeBlockRepository,
    )

    const deleteTypeBlockUseCase = new DeleteTypeBlockUseCase(
      typeBlockRepository,
    )

    const { typeBlock } = await createTypeBlockUseCase.execute({
      name: 'Grama sintética',
    })

    const response = await deleteTypeBlockUseCase.execute({
      typeBlockId: typeBlock.id,
    })

    expect(response.success).toBe(true)
  })

  it('It should not be possible to delete a type block that does not exist', async () => {
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
