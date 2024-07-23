import { z } from 'zod'

export const roleSchema = z.union([
  z.literal('ADMIN'),
  z.literal('OWNER'),
  z.literal('SECRETARY'),
  z.literal('PROFESSOR'),
  z.literal('CUSTOMER'),
])

export type Role = z.infer<typeof roleSchema>
