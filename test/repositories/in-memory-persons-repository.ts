import { Person } from '@/domain/entities/person'
import { PersonsRepository } from '@/domain/repositories/persons-repository'

export class InMemoryPersonsRepository implements PersonsRepository {
  public items: Person[] = []

  async create(person: Person): Promise<void> {
    this.items.push(person)
  }

  async findByNickname(nickname: string): Promise<Person | null> {
    const person = this.items.find(
      (person) => person.nickname.toLowerCase() === nickname.toLowerCase(),
    )

    if (!person) {
      return null
    }

    return person
  }
}
