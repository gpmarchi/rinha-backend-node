import { Person } from '@/domain/entities/person'
import { PersonsRepository } from '@/domain/repositories/persons-repository'
import { PrismaPersonMapper } from '../mappers/prisma-person-mapper'
import { prisma } from '../prisma'

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

  async findByNickname(nickname: string): Promise<Person | null> {
    const person = await prisma.person.findUnique({
      where: {
        nickname,
      },
    })

    if (!person) {
      return null
    }

    return PrismaPersonMapper.toDomain(person)
  }
}
