import { Prisma, User } from '@prisma/client'

export interface UsersRepository {
  create(data: Prisma.UserCreateInput): Promise<User>
  findByEmail(email: string): Promise<{ user: User | null }>
  findByCpf(cpf: string): Promise<{ user: User | null }>
}
