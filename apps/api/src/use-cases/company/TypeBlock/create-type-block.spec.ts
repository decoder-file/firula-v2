import { describe, expect, it } from 'vitest'

import { InMemoryTypeBlockRepository } from '@/repositories/in-memory/in-memory-type-block-repository'

import { CreateTypeBlockUseCase } from './create-type-block'

describe('Create Type Block Use Case', () => {
  it('should to create type block', async () => {
    const typeBlockRepository = new InMemoryTypeBlockRepository()

    const createTypeBlockUseCase = new CreateTypeBlockUseCase(
      typeBlockRepository,
    )

    const { typeBlock } = await createTypeBlockUseCase.execute({
      name: 'Grama sintética',
    })

    expect(typeBlock.name).toEqual(expect.any(String))
  })
})
