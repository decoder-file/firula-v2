import { describe, expect, it } from 'vitest'

import { InMemoryTypeBlockRepository } from '@/repositories/in-memory/in-memory-type-block-repository'

import { CreateTypeBlockUseCase } from './create-type-block'
import { GetAllTypeBlockUseCase } from './get-all-type-block'

describe('Get All Type Block Use Case', () => {
  it('should to get all type block ', async () => {
    const typeBlockRepository = new InMemoryTypeBlockRepository()

    const createTypeBlockUseCase = new CreateTypeBlockUseCase(
      typeBlockRepository,
    )

    const getAllTypeBlockUseCase = new GetAllTypeBlockUseCase(
      typeBlockRepository,
    )

    await createTypeBlockUseCase.execute({
      name: 'Grama sintética',
    })

    await createTypeBlockUseCase.execute({
      name: 'Quadra de areia',
    })

    const { typeBlock: typeBlockData } = await getAllTypeBlockUseCase.execute()

    expect(typeBlockData.length).toBe(2)
  })
})
