import { Person } from '@/domain/entities/person'

export class PersonViewModel {
  static toHTTP(person: Person) {
    return {
      id: person.id.toString(),
      apelido: person.nickname,
      nome: person.name,
      nascimento: person.birthdate.toISOString().split('T')[0],
      stack: person.techs ? JSON.parse(person.techs) : null,
    }
  }
}
