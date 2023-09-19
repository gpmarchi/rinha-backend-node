import { PrismaPersonsRepository } from '@/domain/infra/database/prisma/repositories/prisma-persons-repository'
import { PersonsRepository } from '@/domain/repositories/persons-repository'
import { container } from 'tsyringe'

container.registerSingleton<PersonsRepository>(
  'PersonsRepository',
  PrismaPersonsRepository,
)
