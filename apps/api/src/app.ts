import fastifyCookie from '@fastify/cookie'
import fastifyCors from '@fastify/cors'
import fastify from 'fastify'

import { appRoutes } from './htpp/controllers/routes'

export const app = fastify()

app.register(fastifyCookie)

app.register(fastifyCors, {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
})

app.register(appRoutes)
