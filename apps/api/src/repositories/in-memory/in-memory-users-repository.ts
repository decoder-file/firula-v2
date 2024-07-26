import { Prisma, User } from '@prisma/client'

import { UsersRepository } from '@/repositories/users-repository'

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = []

  async create(data: Prisma.UserCreateInput): Promise<User> {
    const user = {
      id: 'user-1',
      name: data.name || null,
      email: data.email,
      cpf: data.cpf,
      passwordHash: data.passwordHash,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    this.items.push(user)

    return user
  }

  async findByEmail(email: string): Promise<{ user: User | null }> {
    const user = this.items.find((item) => item.email === email)

    if (!user) {
      return { user: null }
    }

    return { user }
  }

  async findByCpf(cpf: string): Promise<{ user: User | null }> {
    const user = this.items.find((item) => item.cpf === cpf)

    if (!user) {
      return { user: null }
    }

    return { user }
  }
}
