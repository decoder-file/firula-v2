import { TypeBlockRepository } from '@/repositories/type-block-repository'
import { TypeBlockNotFound } from '@/use-cases/errors/typeBlock/type-block-not-found'

interface DeleteTypeBlockUseCaseRequest {
  typeBlockId: string
}

interface DeleteTypeBlockUseCaseResponse {
  success: boolean
}

export class DeleteTypeBlockUseCase {
  constructor(private typeBlockRepository: TypeBlockRepository) {}

  async execute({
    typeBlockId,
  }: DeleteTypeBlockUseCaseRequest): Promise<DeleteTypeBlockUseCaseResponse> {
    const isTypeBlockExists =
      await this.typeBlockRepository.findById(typeBlockId)

    if (!isTypeBlockExists) {
      throw new TypeBlockNotFound()
    }

    const typeBlock = await this.typeBlockRepository.delete(typeBlockId)

    return { success: typeBlock }
  }
}
