import fastify from 'fastify'
import { errorHandler } from './error-handler'
import { appRoutes } from './routes'

export const app = fastify()

app.register(appRoutes)

app.setErrorHandler(errorHandler)
