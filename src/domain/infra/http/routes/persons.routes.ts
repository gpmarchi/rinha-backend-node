import { FastifyInstance } from 'fastify'
import { createPerson } from '../controllers/create-person'

export async function personsRoutes(app: FastifyInstance) {
  app.post('/pessoas', createPerson)
}
