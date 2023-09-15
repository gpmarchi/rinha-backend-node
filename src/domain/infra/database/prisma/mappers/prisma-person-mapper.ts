import { Person } from '@/domain/entities/person'
import { UniqueEntityID } from '@/domain/entities/value-objects/unique-entity-id'
import { Person as PrismaPerson } from '@prisma/client'

type RawPerson = Omit<PrismaPerson, 'searchableTrgm'>

export class PrismaPersonMapper {
  static toPrisma(person: Person): RawPerson {
    return {
      id: person.id.toString(),
      nickname: person.nickname.toLowerCase(),
      name: person.name,
      birthdate: person.birthdate,
      techs: person.techs,
    }
  }

  static toDomain(raw: RawPerson): Person {
    return Person.create(
      {
        nickname: raw.nickname,
        name: raw.name,
        birthdate: raw.birthdate,
        techs: raw.techs,
      },
      new UniqueEntityID(raw.id),
    )
  }
}
