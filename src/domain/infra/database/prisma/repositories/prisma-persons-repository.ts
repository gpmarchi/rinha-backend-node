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
        techs: {
          createMany: {
            data: person.techs.map((tech) => ({ name: tech })),
            skipDuplicates: true,
          },
        },
      },
      include: {
        techs: true,
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
      include: {
        techs: true,
      },
    })

    if (!person) {
      return null
    }

    return PrismaPersonMapper.toDomainWithTechs(person)
  }

  async findBySearchTerm(searchTerm: string): Promise<Person[]> {
    const persons = await prisma.person.findMany({
      where: {
        OR: [
          {
            name: {
              contains: searchTerm,
              mode: 'insensitive',
            },
          },
          {
            nickname: {
              contains: searchTerm,
              mode: 'insensitive',
            },
          },
          {
            techs: {
              some: {
                name: {
                  contains: searchTerm,
                  mode: 'insensitive',
                },
              },
            },
          },
        ],
      },
      include: {
        techs: true,
      },
      take: 50,
    })

    return persons.map(PrismaPersonMapper.toDomainWithTechs)
  }

  async countAll(): Promise<number> {
    return prisma.person.count()
  }
}
