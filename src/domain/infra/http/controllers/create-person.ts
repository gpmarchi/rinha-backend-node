import { CreatePersonUseCase } from '@/domain/use-cases/create-person'
import { FastifyReply, FastifyRequest } from 'fastify'
import { container } from 'tsyringe'
import { z } from 'zod'

export async function createPerson(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const createPersonBodySchema = z.object({
    apelido: z.string().max(32),
    nome: z.string().max(100),
    nascimento: z.coerce.date(),
    stack: z.string().max(32).array().nullable(),
  })

  const { apelido, nome, nascimento, stack } = createPersonBodySchema.parse(
    request.body,
  )

  const createPerson = container.resolve(CreatePersonUseCase)

  const { person } = await createPerson.execute({
    nickname: apelido,
    name: nome,
    birthdate: nascimento,
    techs: stack ? JSON.stringify(stack) : '',
  })

  return reply
    .status(201)
    .header('Location', `${request.routerPath}/${person.id.toString()}`)
    .send()
}
