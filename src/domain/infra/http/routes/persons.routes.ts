import { FastifyInstance } from 'fastify'
import { createPerson } from '../controllers/create-person'
import { getPerson } from '../controllers/get-person'

export async function personsRoutes(app: FastifyInstance) {
  app.post('/pessoas', createPerson)
  app.get('/pessoas/:id', getPerson)
}