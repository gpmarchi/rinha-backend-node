import { AppError } from '@/domain/errors/app-error'
import { env } from '@/env'
import { FastifyReply, FastifyRequest } from 'fastify'
import { ZodError } from 'zod'

export function errorHandler(
  error: Error,
  _: FastifyRequest,
  reply: FastifyReply,
) {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error.', issues: error.format() })
  }

  if (error instanceof AppError) {
    return reply.status(error.statusCode).send({ message: error.message })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    // TODO: Here we should log to an external tool like DataDog/NewRelic/Sentry
  }

  return reply.status(500).send({ message: 'Internal server error.' })
}
