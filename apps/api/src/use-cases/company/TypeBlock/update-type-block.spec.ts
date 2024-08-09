import { describe, expect, it } from 'vitest'

import { InMemoryTypeBlockRepository } from '@/repositories/in-memory/in-memory-type-block-repository'
import { TypeBlockNotFound } from '@/use-cases/errors/typeBlock/type-block-not-found'

import { CreateTypeBlockUseCase } from './create-type-block'
import { DeleteTypeBlockUseCase } from './delete-type-block'
import { UpdateTypeBlockUseCase } from './update-type-block'

describe('Update Type Block Use Case', () => {
  it('should to update type block', async () => {
    const typeBlockRepository = new InMemoryTypeBlockRepository()

    const createTypeBlockUseCase = new CreateTypeBlockUseCase(
      typeBlockRepository,
    )

    const updateTypeBlockUseCase = new UpdateTypeBlockUseCase(
      typeBlockRepository,
    )

    const { typeBlock } = await createTypeBlockUseCase.execute({
      name: 'Grama sintética',
    })

    const response = await updateTypeBlockUseCase.execute({
      name: 'Grama sintética atualizada',
      typeBlockId: typeBlock.id,
    })

    expect(response.typeBlock.name).toBe('Grama sintética atualizada')
  })

  it('It should not be possible to update a type block that does not exist', async () => {
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
