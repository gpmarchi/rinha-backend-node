import { AppError } from '@/domain/errors/app-error'
import { env } from '@/env'
import { FastifyReply, FastifyRequest } from 'fastify'
import { ZodError, z } from 'zod'

export function errorHandler(
  error: Error,
  _: FastifyRequest,
  reply: FastifyReply,
) {
  if (error instanceof ZodError) {
    const zodError = error.issues[0]

    let statusCode = 400

    if (
      zodError.code === z.ZodIssueCode.invalid_type &&
      (zodError.received === 'null' || zodError.received === 'undefined')
    ) {
      statusCode = 422
    }

    return reply
      .status(statusCode)
      .send({ message: 'Validation error.', issue: zodError })
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
