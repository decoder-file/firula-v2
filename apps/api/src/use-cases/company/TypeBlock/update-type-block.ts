import { TypeBlock } from '@prisma/client'

import { TypeBlockRepository } from '@/repositories/type-block-repository'
import { TypeBlockNotFound } from '@/use-cases/errors/typeBlock/type-block-not-found'

interface UpdateTypeBlockUseCaseRequest {
  name: string
  typeBlockId: string
}

interface UpdateTypeBlockUseCaseResponse {
  typeBlock: TypeBlock
}

export class UpdateTypeBlockUseCase {
  constructor(private typeBlockRepository: TypeBlockRepository) {}

  async execute({
    name,
    typeBlockId,
  }: UpdateTypeBlockUseCaseRequest): Promise<UpdateTypeBlockUseCaseResponse> {
    const isTypeBlockExists =
      await this.typeBlockRepository.findById(typeBlockId)

    if (!isTypeBlockExists) {
      throw new TypeBlockNotFound()
    }

    const typeBlock = await this.typeBlockRepository.update(
      { name },
      typeBlockId,
    )

    return { typeBlock }
  }
}
