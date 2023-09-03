import { FastifyInstance } from 'fastify'
import { countPersons } from '../controllers/count-persons'
import { createPerson } from '../controllers/create-person'
import { fetchPersons } from '../controllers/fetch-persons'
import { getPerson } from '../controllers/get-person'

export async function personsRoutes(app: FastifyInstance) {
  app.post('/pessoas', createPerson)
  app.get('/pessoas/:id', getPerson)
  app.get('/pessoas', fetchPersons)
  app.get('/pessoas/count', countPersons)
}
