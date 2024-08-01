import { Prisma, Role, User } from '@prisma/client'

import { UsersRepository } from '@/repositories/users-repository'

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = []

  async create(data: Prisma.UserCreateInput): Promise<User> {
    const user: User = {
      id: 'user-1',
      name: data.name || null,
      email: data.email,
      cpf: data.cpf,
      role: data.role || ('USER' as Role),
      isBlock: false,
      imageUrl: null,
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

  async findById(id: string): Promise<{ user: User | null }> {
    const user = this.items.find((item) => item.id === id)

    if (!user) {
      return { user: null }
    }

    return { user }
  }

  async update(
    data: Prisma.UserUpdateInput,
    userId: string,
  ): Promise<User | null> {
    const userIndex = this.items.findIndex((item) => item.id === userId)

    if (userIndex === -1) {
      return null
    }

    const user = this.items[userIndex]

    this.items[userIndex] = {
      ...user,
      ...data,
      id: data.id as string,
      name: (data.name as string) || user.name,
      email: data.email as string,
      cpf: data.cpf as string,
      role: data.role as Role,
      isBlock: data.isBlock as boolean,
      imageUrl: (data.imageUrl as string | null) || user.imageUrl,
      passwordHash: data.passwordHash as string,
      createdAt: user.createdAt,
      updatedAt: new Date(),
    }

    return this.items[userIndex]
  }

  async delete(userId: string): Promise<boolean> {
    const userIndex = this.items.findIndex((item) => item.id === userId)

    if (userIndex === -1) {
      return false
    }

    const user = this.items[userIndex]

    console.log(user)

    this.items.splice(userIndex, 1)

    return true
  }

  async getUserById(userId: string): Promise<User | null> {
    const user = this.items.find((item) => item.id === userId)

    if (!user) {
      return null
    }

    return user
  }
}
