import { z } from 'zod'

import { ClassSchema } from '../models/class'

export const classSubject = z.tuple([
  z.union([
    z.literal('manage'),
    z.literal('get'),
    z.literal('create'),
    z.literal('update'),
    z.literal('delete'),
  ]),
  z.union([z.literal('Class'), ClassSchema]),
])

export type ClassSubject = z.infer<typeof classSubject>