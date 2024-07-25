import { env } from '@saas/env'

import { app } from './app'

app
  .listen({
    port: env.SERVER_PORT,
    host: '0.0.0.0',
  })
  .then(() => {
    console.log('🚀 HTTP Server Running')
  })
