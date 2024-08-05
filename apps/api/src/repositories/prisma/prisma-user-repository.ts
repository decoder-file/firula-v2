import { Prisma } from '@prisma/client'

import { prisma } from '@/lib/prisma'

import { UsersRepository } from '../users-repository'

export class PrismaUsersRepository implements UsersRepository {
  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    })

    return user
  }

  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    return { user }
  }

  async findByCpf(cpf: string) {
    const user = await prisma.user.findUnique({
      where: {
        cpf,
      },
    })

    return { user }
  }

  async findById(id: string) {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    })

    return { user }
  }

  async update(data: Prisma.UserUpdateInput, userId: string) {
    const user = await prisma.user.update({
      data,
      where: {
        id: userId,
      },
    })

    return user
  }

  async delete(userId: string) {
    await prisma.user.delete({
      where: {
        id: userId,
      },
    })

    return true
  }

  async getUserById(userId: string) {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        UserAddress: true,
        Company: true,
        UserProfile: true,
      },
    })

    return user
  }

  async getAllUsers() {
    const users = await prisma.user.findMany({
      include: {
        UserAddress: true,
        Company: true,
        UserProfile: true,
      },
    })

    return users
  }
}
