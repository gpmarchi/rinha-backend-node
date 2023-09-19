import { CountPersonsUseCase } from '@/domain/use-cases/count-persons'
import { FastifyReply, FastifyRequest } from 'fastify'
import { container } from 'tsyringe'

export async function countPersons(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const countPersons = container.resolve(CountPersonsUseCase)

  const { count } = await countPersons.execute()

  return reply.status(200).send(count)
}
