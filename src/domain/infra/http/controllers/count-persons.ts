import { CountPersonsUseCase } from '@/domain/use-cases/count-persons'
import { FastifyReply, FastifyRequest } from 'fastify'
import { PrismaPersonsRepository } from '../../database/prisma/repositories/prisma-persons-repository'

export async function countPersons(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const personsRepository = new PrismaPersonsRepository()
  const countPersons = new CountPersonsUseCase(personsRepository)

  const { count } = await countPersons.execute()

  return reply.status(200).send(count)
}
