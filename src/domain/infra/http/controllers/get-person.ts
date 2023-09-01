import { GetPersonUseCase } from '@/domain/use-cases/get-person'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { PrismaPersonsRepository } from '../../database/prisma/repositories/prisma-persons-repository'
import { PersonViewModel } from '../view-models/person-view-model'

export async function getPerson(request: FastifyRequest, reply: FastifyReply) {
  const getPersonUrlParamSchema = z.object({
    id: z.string().uuid(),
  })

  const { id } = getPersonUrlParamSchema.parse(request.params)

  const personsRepository = new PrismaPersonsRepository()
  const getPerson = new GetPersonUseCase(personsRepository)

  const { person } = await getPerson.execute({
    id,
  })

  return reply.status(200).send(PersonViewModel.toHTTP(person))
}
