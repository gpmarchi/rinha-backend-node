import { FetchPersonsUseCase } from '@/domain/use-cases/fetch-persons'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { PrismaPersonsRepository } from '../../database/prisma/repositories/prisma-persons-repository'
import { PersonViewModel } from '../view-models/person-view-model'

export async function fetchPersons(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const fetchPersonsQueryParamSchema = z.object({
    t: z.string(),
  })

  const { t } = fetchPersonsQueryParamSchema.parse(request.query)

  const personsRepository = new PrismaPersonsRepository()
  const fetchPersons = new FetchPersonsUseCase(personsRepository)

  const { persons } = await fetchPersons.execute({
    searchTerm: t,
  })

  return reply.status(200).send(persons.map(PersonViewModel.toHTTP))
}
