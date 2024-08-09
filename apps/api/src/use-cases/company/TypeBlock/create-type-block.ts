import { TypeBlock } from '@prisma/client'

import { TypeBlockRepository } from '@/repositories/type-block-repository'

interface CreateTypeBlockUseCaseRequest {
  name: string
}

interface CreateTypeBlockUseCaseResponse {
  typeBlock: TypeBlock
}

export class CreateTypeBlockUseCase {
  constructor(private typeBlockRepository: TypeBlockRepository) {}

  async execute({
    name,
  }: CreateTypeBlockUseCaseRequest): Promise<CreateTypeBlockUseCaseResponse> {
    const typeBlock = await this.typeBlockRepository.create({ name })

    return { typeBlock }
  }
}
