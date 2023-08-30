import { personsRoutes } from '@/domain/infra/http/routes/persons.routes'
import { FastifyInstance } from 'fastify'

export async function appRoutes(app: FastifyInstance) {
  app.register(personsRoutes)
}
