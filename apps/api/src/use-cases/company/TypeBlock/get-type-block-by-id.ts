import { TypeBlock } from '@prisma/client'

import { TypeBlockRepository } from '@/repositories/type-block-repository'
import { TypeBlockNotFound } from '@/use-cases/errors/typeBlock/type-block-not-found'

interface GetTypeBlockByIdUseCaseRequest {
  typeBlockId: string
}

interface GetTypeBlockByIdUseCaseResponse {
  typeBlock: TypeBlock
}

export class GetTypeBlockByIdUseCase {
  constructor(private typeBlockRepository: TypeBlockRepository) {}

  async execute({
    typeBlockId,
  }: GetTypeBlockByIdUseCaseRequest): Promise<GetTypeBlockByIdUseCaseResponse> {
    const typeBlock = await this.typeBlockRepository.findById(typeBlockId)

    if (!typeBlock) {
      throw new TypeBlockNotFound()
    }

    return { typeBlock }
  }
}
