import { GetPersonUseCase } from '@/domain/use-cases/get-person'
import { FastifyReply, FastifyRequest } from 'fastify'
import { container } from 'tsyringe'
import { z } from 'zod'

export async function getPerson(request: FastifyRequest, reply: FastifyReply) {
  const getPersonUrlParamSchema = z.object({
    id: z.string().uuid(),
  })

  const { id } = getPersonUrlParamSchema.parse(request.params)

  const getPerson = container.resolve(GetPersonUseCase)

  const { person } = await getPerson.execute({
    id,
  })

  // return reply.status(200).send(PersonViewModel.toHTTP(person))
  return reply.status(200).send(person)
}
