import { FetchPersonsUseCase } from '@/domain/use-cases/fetch-persons'
import { FastifyReply, FastifyRequest } from 'fastify'
import { container } from 'tsyringe'
import { z } from 'zod'

export async function fetchPersons(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const fetchPersonsQueryParamSchema = z.object({
    t: z.string(),
  })

  const { t } = fetchPersonsQueryParamSchema.parse(request.query)

  const fetchPersons = container.resolve(FetchPersonsUseCase)

  const { persons } = await fetchPersons.execute({
    searchTerm: t,
  })

  // return reply.status(200).send(persons.map(PersonViewModel.toHTTP))
  return reply.status(200).send(persons)
}
