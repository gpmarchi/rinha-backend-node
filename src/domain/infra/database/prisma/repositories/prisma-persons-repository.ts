import { Person } from '@/domain/entities/person'
import { PersonsRepository } from '@/domain/repositories/persons-repository'
import { prisma } from '@/shared/infra/database/prisma/prisma'
import { PrismaPersonMapper } from '../mappers/prisma-person-mapper'

export class PrismaPersonsRepository implements PersonsRepository {
  async create(person: Person): Promise<void> {
    const raw = PrismaPersonMapper.toPrisma(person)

    await prisma.person.create({
      data: {
        ...raw,
      },
    })
  }

  async findByNickname(nickname: string): Promise<number> {
    const count = await prisma.person.count({
      where: {
        nickname: nickname.toLowerCase(),
      },
    })

    return count
  }

  async findById(id: string): Promise<Person | null> {
    const person = await prisma.person.findUnique({
      where: {
        id,
      },
    })

    if (!person) {
      return null
    }

    return PrismaPersonMapper.toDomain(person)
  }

  async findBySearchTerm(searchTerm: string): Promise<Person[]> {
    const persons = await prisma.person.findMany({
      where: {
        searchableTrgm: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      },
      take: 50,
    })

    return persons.map(PrismaPersonMapper.toDomain)
  }

  async countAll(): Promise<number> {
    return prisma.person.count()
  }
}
