import { TypeBlock } from '@prisma/client'

import { TypeBlockRepository } from '@/repositories/type-block-repository'

interface GetAllTypeBlockUseCaseResponse {
  typeBlock: TypeBlock[]
}

export class GetAllTypeBlockUseCase {
  constructor(private typeBlockRepository: TypeBlockRepository) {}

  async execute(): Promise<GetAllTypeBlockUseCaseResponse> {
    const typeBlock = await this.typeBlockRepository.listAll()

    return { typeBlock }
  }
}
