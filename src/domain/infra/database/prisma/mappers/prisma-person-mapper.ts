import { Person } from '@/domain/entities/person'
import { UniqueEntityID } from '@/domain/entities/value-objects/unique-entity-id'
import { Prisma, Person as RawPerson } from '@prisma/client'

type RawPersonWithTechs = Prisma.PersonGetPayload<{
  include: { techs: true }
}>

export class PrismaPersonMapper {
  static toPrisma(person: Person): RawPerson {
    return {
      id: person.id.toString(),
      nickname: person.nickname,
      name: person.name,
      birthdate: person.birthdate,
    }
  }

  static toDomain(raw: RawPerson): Person {
    return Person.create(
      {
        nickname: raw.nickname,
        name: raw.name,
        birthdate: raw.birthdate,
        techs: [],
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toDomainWithTechs(raw: RawPersonWithTechs): Person {
    return Person.create(
      {
        nickname: raw.nickname,
        name: raw.name,
        birthdate: raw.birthdate,
        techs: raw.techs.map((tech) => tech.name),
      },
      new UniqueEntityID(raw.id),
    )
  }
}
